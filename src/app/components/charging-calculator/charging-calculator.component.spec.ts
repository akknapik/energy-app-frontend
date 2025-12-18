import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargingCalculatorComponent } from './charging-calculator.component';

describe('ChargingCalculatorComponent', () => {
  let component: ChargingCalculatorComponent;
  let fixture: ComponentFixture<ChargingCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChargingCalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChargingCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
