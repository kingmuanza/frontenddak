import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationCreateComponent } from './affectation-create.component';

describe('AffectationCreateComponent', () => {
  let component: AffectationCreateComponent;
  let fixture: ComponentFixture<AffectationCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectationCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
