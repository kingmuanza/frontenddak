import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationControleurEditComponent } from './affectation-controleur-edit.component';

describe('AffectationControleurEditComponent', () => {
  let component: AffectationControleurEditComponent;
  let fixture: ComponentFixture<AffectationControleurEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectationControleurEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectationControleurEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
