import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCongeComponent } from './form-conge.component';

describe('FormCongeComponent', () => {
  let component: FormCongeComponent;
  let fixture: ComponentFixture<FormCongeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCongeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
