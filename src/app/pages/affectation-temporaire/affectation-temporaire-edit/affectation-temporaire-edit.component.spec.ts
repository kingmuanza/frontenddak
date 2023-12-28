import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationTemporaireEditComponent } from './affectation-temporaire-edit.component';

describe('AffectationTemporaireEditComponent', () => {
  let component: AffectationTemporaireEditComponent;
  let fixture: ComponentFixture<AffectationTemporaireEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectationTemporaireEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectationTemporaireEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
