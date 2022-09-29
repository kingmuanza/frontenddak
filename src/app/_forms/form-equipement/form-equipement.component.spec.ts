import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEquipementComponent } from './form-equipement.component';

describe('FormEquipementComponent', () => {
  let component: FormEquipementComponent;
  let fixture: ComponentFixture<FormEquipementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEquipementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEquipementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
