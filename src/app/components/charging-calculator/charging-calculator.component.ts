import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OptimalWindowDTO } from '../../models/optimal-window.dto';
import { EnergyService } from '../../services/energy.service';
import { HttpErrorResponse } from '@angular/common/http';

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
      error: (error: HttpErrorResponse) => {
        if(error.status === 400) {
          this.errorMessage = "Invalid input. Please ensure the number of hours is between 1 and 6.";
        } else if(error.status === 500) {
          this.errorMessage = "Server error occurred. Please try again later.";
        } else {
          this.errorMessage = "Unexpected error occurred. Please try again.";
        }
        this.isLoading = false;
      }
    });
  }
}
