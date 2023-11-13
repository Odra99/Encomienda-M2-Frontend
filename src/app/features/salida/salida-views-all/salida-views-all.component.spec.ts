import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalidaViewsAllComponent } from './salida-views-all.component';

describe('SalidaViewsAllComponent', () => {
  let component: SalidaViewsAllComponent;
  let fixture: ComponentFixture<SalidaViewsAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalidaViewsAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalidaViewsAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
