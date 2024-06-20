import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationControleurListComponent } from './affectation-controleur-list.component';

describe('AffectationControleurListComponent', () => {
  let component: AffectationControleurListComponent;
  let fixture: ComponentFixture<AffectationControleurListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectationControleurListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectationControleurListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
