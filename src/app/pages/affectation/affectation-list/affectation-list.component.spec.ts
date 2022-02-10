import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationListComponent } from './affectation-list.component';

describe('AffectationListComponent', () => {
  let component: AffectationListComponent;
  let fixture: ComponentFixture<AffectationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
