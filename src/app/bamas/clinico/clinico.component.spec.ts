import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicoComponent } from './clinico.component';

describe('ClinicoComponent', () => {
  let component: ClinicoComponent;
  let fixture: ComponentFixture<ClinicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
