import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentoFormComponent } from './segmento-form.component';

describe('SegmentoFormComponent', () => {
  let component: SegmentoFormComponent;
  let fixture: ComponentFixture<SegmentoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SegmentoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SegmentoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
