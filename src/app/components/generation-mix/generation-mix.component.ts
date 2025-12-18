import { Component, inject } from '@angular/core';
import { EnergyService } from '../../services/energy.service';
import { DailyMixDTO } from '../../models/daily-mix.dto';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { catchError, Observable, of } from 'rxjs';

@Component({
  selector: 'app-generation-mix',
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './generation-mix.component.html',
  styleUrl: './generation-mix.component.css'
})
export class GenerationMixComponent {
  private energyService = inject(EnergyService);
  
  errorMessage: string | null = null;
  mix$: Observable<DailyMixDTO[]> = of([]);
  chartCache = new Map<string, ChartData<'pie'>>();

  chartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    }
  };

  private colors: Record<string, string> = {
    'wind': '#2ecc71', 'solar': '#f1c40f', 'nuclear': '#9b59b6',
    'gas': '#e67e22', 'coal': '#34495e', 'biomass': '#27ae60',
    'hydro': '#3498db', 'imports': '#95a5a6', 'other': '#7f8c8d'
  };

  ngOnInit() {
    this.loadGenerationMix();
  }

  loadGenerationMix() {
    this.errorMessage = null;
    
    this.mix$ = this.energyService.getGenerationMix().pipe(
      catchError(error => {
        this.errorMessage = error?.message ?? "An error occurred while fetching the generation mix data.";
        return of([] as DailyMixDTO[]);
      })
    );
  }

  getChartData(day: string, metrics: any[]): ChartData<'pie'> {
    const cached = this.chartCache.get(day);

    if(cached) {
      return cached;
    }

    const data : ChartData<'pie'> = {
      labels: metrics.map(m => m.fuelType),
      datasets: [{
        data: metrics.map(m => m.percentage),
        backgroundColor: metrics.map(m => this.colors[m.fuelType] || '#bdc3c7'),
      }]
    } as ChartData<'pie'>;
    this.chartCache.set(day, data);

    return data;
  }
}
