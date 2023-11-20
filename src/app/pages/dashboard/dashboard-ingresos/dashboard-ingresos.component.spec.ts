import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardIngresosComponent } from './dashboard-ingresos.component';

describe('DashboardIngresosComponent', () => {
  let component: DashboardIngresosComponent;
  let fixture: ComponentFixture<DashboardIngresosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardIngresosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardIngresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
