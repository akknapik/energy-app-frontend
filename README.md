# Energy App - Frontend

Frontend for the Energy App built with Angular. It uses Nginx to serve static files and acts as a Reverse Proxy for secure communication with the backend.

## 🛠 Tech Stack
* **Framework:** Angular (v17+)
* **Web Server / Proxy:** Nginx (Alpine Linux)
* **Containerization:** Docker

---

## ⚙️ Nginx Configuration (`nginx.conf`)

This project uses `nginx.conf` to handle API routing. **You need to swap the configuration content depending on whether you are running locally or deploying to Render.**

### 1. Configuration for LOCAL DOCKER (Default)
Use this configuration when running the app on your computer. It connects to the backend running on your host machine via `host.docker.internal`.

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://host.docker.internal:8080;
        
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 2. Configuration for RENDER.COM (Production)
Before deploying, replace the content of `nginx.conf` with the following block. This configuration proxies requests to the public HTTPS address of the backend.

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass https://energy-app-backend-xyz.onrender.com;

        proxy_ssl_server_name on;
        proxy_ssl_name energy-app-backend-qrf0.onrender.com;

        proxy_set_header Host energy-app-backend-xyz.onrender.com;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

---

## 🚀 Local Execution (Docker)

1.  **Check Config:** Ensure your `nginx.conf` contains the **LOCAL DOCKER** configuration (Option 1 above).

2.  **Build the image:**
    ```bash
    docker build -t energy-app-frontend .
    ```

3.  **Run the container:**
    ```bash
    docker run -p 80:80 energy-app-frontend
    ```
    The app will be available at: `http://localhost/`

---

## 🌍 Deployment (Render.com)

1.  **Update `nginx.conf`:**
    Overwrite your `nginx.conf` with the **RENDER.COM** configuration (Option 2 above).
    * Commit and push changes to GitHub.

2.  **Create Web Service:**
    Create a new Web Service on Render with **Docker** runtime.

3.  **Critical Setting (DNS Fix):**
    The `Dockerfile` contains a `sleep 30` command to ensure the network is ready before Nginx starts.
