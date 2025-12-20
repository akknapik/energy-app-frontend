import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerationMixComponent } from './generation-mix.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('GenerationMixComponent', () => {
  let component: GenerationMixComponent;
  let fixture: ComponentFixture<GenerationMixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerationMixComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerationMixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have null errorMessage initially', () => {
    expect(component.errorMessage).toBeNull();
  });

  it('should call loadGenerationMix on init', () => {
    spyOn(component, 'loadGenerationMix');
    component.ngOnInit();
    expect(component.loadGenerationMix).toHaveBeenCalled();
  });
});
