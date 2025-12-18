import { Component } from '@angular/core';
import { GenerationMixComponent } from './components/generation-mix/generation-mix.component';
import { ChargingCalculatorComponent } from './components/charging-calculator/charging-calculator.component';

@Component({
  selector: 'app-root',
  imports: [GenerationMixComponent, ChargingCalculatorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'energy-app-frontend';
}
