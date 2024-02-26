import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAffectationVigilesComponent } from './display-affectation-vigiles.component';

describe('DisplayAffectationVigilesComponent', () => {
  let component: DisplayAffectationVigilesComponent;
  let fixture: ComponentFixture<DisplayAffectationVigilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayAffectationVigilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayAffectationVigilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
