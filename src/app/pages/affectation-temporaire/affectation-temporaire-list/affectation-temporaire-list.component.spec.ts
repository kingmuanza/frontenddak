import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationTemporaireListComponent } from './affectation-temporaire-list.component';

describe('AffectationTemporaireListComponent', () => {
  let component: AffectationTemporaireListComponent;
  let fixture: ComponentFixture<AffectationTemporaireListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectationTemporaireListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectationTemporaireListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
