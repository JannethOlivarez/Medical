import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedidasYotrosDatosComponent } from './medidas-yotros-datos.component';

describe('MedidasYotrosDatosComponent', () => {
  let component: MedidasYotrosDatosComponent;
  let fixture: ComponentFixture<MedidasYotrosDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedidasYotrosDatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedidasYotrosDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
