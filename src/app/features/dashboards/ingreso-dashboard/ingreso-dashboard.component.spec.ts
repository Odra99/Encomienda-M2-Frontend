import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoDashboardComponent } from './ingreso-dashboard.component';

describe('IngresoDashboardComponent', () => {
  let component: IngresoDashboardComponent;
  let fixture: ComponentFixture<IngresoDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresoDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngresoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
