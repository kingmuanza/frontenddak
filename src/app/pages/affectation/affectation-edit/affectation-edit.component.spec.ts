import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationEditComponent } from './affectation-edit.component';

describe('AffectationEditComponent', () => {
  let component: AffectationEditComponent;
  let fixture: ComponentFixture<AffectationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectationEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
