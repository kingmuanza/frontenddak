import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayLignePourcentageComponent } from './display-ligne-pourcentage.component';

describe('DisplayLignePourcentageComponent', () => {
  let component: DisplayLignePourcentageComponent;
  let fixture: ComponentFixture<DisplayLignePourcentageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayLignePourcentageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayLignePourcentageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
