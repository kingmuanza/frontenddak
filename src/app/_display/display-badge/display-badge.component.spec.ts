import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayBadgeComponent } from './display-badge.component';

describe('DisplayBadgeComponent', () => {
  let component: DisplayBadgeComponent;
  let fixture: ComponentFixture<DisplayBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayBadgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
