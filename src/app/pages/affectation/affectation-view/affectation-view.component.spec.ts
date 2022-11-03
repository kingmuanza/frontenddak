import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationViewComponent } from './affectation-view.component';

describe('AffectationViewComponent', () => {
  let component: AffectationViewComponent;
  let fixture: ComponentFixture<AffectationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectationViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
