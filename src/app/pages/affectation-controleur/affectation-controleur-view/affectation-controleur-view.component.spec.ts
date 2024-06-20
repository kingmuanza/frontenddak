import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationControleurViewComponent } from './affectation-controleur-view.component';

describe('AffectationControleurViewComponent', () => {
  let component: AffectationControleurViewComponent;
  let fixture: ComponentFixture<AffectationControleurViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectationControleurViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectationControleurViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
