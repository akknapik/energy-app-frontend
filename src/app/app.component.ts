import { Component } from '@angular/core';
import { GenerationMixComponent } from './components/generation-mix/generation-mix.component';

@Component({
  selector: 'app-root',
  imports: [GenerationMixComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'energy-app-frontend';
}
