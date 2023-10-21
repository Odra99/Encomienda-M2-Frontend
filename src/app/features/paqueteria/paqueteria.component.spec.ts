import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaqueteriaComponent } from './paqueteria.component';


describe('PaqueteriaComponent', () => {
  let component: PaqueteriaComponent;
  let fixture: ComponentFixture<PaqueteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaqueteriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaqueteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
