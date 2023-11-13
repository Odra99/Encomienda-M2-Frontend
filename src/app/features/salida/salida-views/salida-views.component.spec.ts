import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalidaViewsComponent } from './salida-views.component';

describe('SalidaViewsComponent', () => {
  let component: SalidaViewsComponent;
  let fixture: ComponentFixture<SalidaViewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalidaViewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalidaViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
