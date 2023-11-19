import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosDashboardComponent } from './gastos-dashboard.component';

describe('GastosDashboardComponent', () => {
  let component: GastosDashboardComponent;
  let fixture: ComponentFixture<GastosDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GastosDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GastosDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
