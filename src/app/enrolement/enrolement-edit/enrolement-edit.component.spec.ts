import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolementEditComponent } from './enrolement-edit.component';

describe('EnrolementEditComponent', () => {
  let component: EnrolementEditComponent;
  let fixture: ComponentFixture<EnrolementEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrolementEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrolementEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
