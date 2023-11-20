import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardGastosComponent } from './dashboard-gastos.component';

describe('DashboardGastosComponent', () => {
  let component: DashboardGastosComponent;
  let fixture: ComponentFixture<DashboardGastosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardGastosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardGastosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
