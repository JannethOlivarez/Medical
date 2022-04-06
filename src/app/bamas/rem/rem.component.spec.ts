import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemComponent } from './rem.component';

describe('RemComponent', () => {
  let component: RemComponent;
  let fixture: ComponentFixture<RemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
