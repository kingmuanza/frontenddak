import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayEquipementComponent } from './display-equipement.component';

describe('DisplayEquipementComponent', () => {
  let component: DisplayEquipementComponent;
  let fixture: ComponentFixture<DisplayEquipementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayEquipementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayEquipementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
