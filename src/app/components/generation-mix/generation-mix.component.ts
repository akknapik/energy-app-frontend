import { Component, inject } from '@angular/core';
import { EnergyService } from '../../services/energy.service';
import { DailyMixDTO } from '../../models/daily-mix.dto';
import { CommonModule } from '@angular/common';
import { catchError, Observable, of } from 'rxjs';

@Component({
  selector: 'app-generation-mix',
  imports: [CommonModule],
  templateUrl: './generation-mix.component.html',
  styleUrl: './generation-mix.component.css'
})
export class GenerationMixComponent {
  private energyService = inject(EnergyService);
  
  errorMessage: string | null = null;
  mix$: Observable<DailyMixDTO[]> = of([]);


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
}
