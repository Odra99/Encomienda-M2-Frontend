import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptoGastoFormComponent } from './concepto-gasto-form.component';

describe('ConceptoGastoFormComponent', () => {
  let component: ConceptoGastoFormComponent;
  let fixture: ComponentFixture<ConceptoGastoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceptoGastoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceptoGastoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
