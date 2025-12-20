import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargingCalculatorComponent } from './charging-calculator.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ChargingCalculatorComponent', () => {
  let component: ChargingCalculatorComponent;
  let fixture: ComponentFixture<ChargingCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChargingCalculatorComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChargingCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have isLoading set to false initially', () => {
    expect(component.isLoading).toBeFalse();
  });

  it('should set errorMessage if numberOfHours < 1', () => {
    component.numberOfHours = 0;
    component.calculateOptimalWindow();

    expect(component.errorMessage).toContain('Please enter a number of hours between 1 and 6');
    expect(component.result).toBeNull();
  });
});
