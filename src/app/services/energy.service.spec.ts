import { TestBed } from '@angular/core/testing';

import { EnergyService } from './energy.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('EnergyService', () => {
  let service: EnergyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(EnergyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
