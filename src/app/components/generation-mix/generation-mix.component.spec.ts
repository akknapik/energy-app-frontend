import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerationMixComponent } from './generation-mix.component';

describe('GenerationMixComponent', () => {
  let component: GenerationMixComponent;
  let fixture: ComponentFixture<GenerationMixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerationMixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerationMixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
