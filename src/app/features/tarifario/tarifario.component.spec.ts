import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifarioComponent } from './tarifario.component';

describe('TarifarioComponent', () => {
  let component: TarifarioComponent;
  let fixture: ComponentFixture<TarifarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarifarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarifarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
