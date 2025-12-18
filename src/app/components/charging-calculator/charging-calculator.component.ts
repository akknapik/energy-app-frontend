import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OptimalWindowDTO } from '../../models/optimal-window.dto';
import { EnergyService } from '../../services/energy.service';

@Component({
  selector: 'app-charging-calculator',
  imports: [CommonModule, FormsModule],
  templateUrl: './charging-calculator.component.html',
  styleUrl: './charging-calculator.component.css'
})
export class ChargingCalculatorComponent {
  private energyService = inject(EnergyService);

  numberOfHours: number = 1
  result: OptimalWindowDTO | null = null;
  errorMessage: string | null = null;
  isLoading: boolean = false;

  calculateOptimalWindow() {
    this.errorMessage = null;
    this.result = null;

    if(this.numberOfHours < 1 || this.numberOfHours > 6) {
      this.errorMessage = "Please enter a number of hours between 1 and 6.";
      return;
    }

    this.isLoading = true;
    this.energyService.calculateOptimalChargingWindow(this.numberOfHours).subscribe({
      next: (data) => {
        this.result = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error?.message ?? "An error occurred while calculating optimal charging windows.";
        this.isLoading = false;
      }
    });
  }
}
