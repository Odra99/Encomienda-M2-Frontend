import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptoGastoComponent } from './concepto-gasto.component';

describe('ConceptoGastoComponent', () => {
  let component: ConceptoGastoComponent;
  let fixture: ComponentFixture<ConceptoGastoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceptoGastoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceptoGastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
