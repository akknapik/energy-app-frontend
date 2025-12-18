import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DailyMixDTO } from '../models/daily-mix.dto';
import { OptimalWindowDTO } from '../models/optimal-window.dto';
import { ChargingRequest } from '../models/charging.request';

@Injectable({
  providedIn: 'root'
})
export class EnergyService {
  private apiUrl = '/api/energy';

  constructor(private http: HttpClient) { }

  getGenerationMix(): Observable<DailyMixDTO[]> {
    return this.http.get<DailyMixDTO[]>(`${this.apiUrl}/mix`);
  }

  calculateOptimalChargingWindow(numberOfHours: number): Observable<OptimalWindowDTO> {
    const request: ChargingRequest = { numberOfHours };
    return this.http.post<OptimalWindowDTO>(`${this.apiUrl}/optimal-charging`, request);
  }
}
