import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPointagesComponent } from './display-pointages.component';

describe('DisplayPointagesComponent', () => {
  let component: DisplayPointagesComponent;
  let fixture: ComponentFixture<DisplayPointagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayPointagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayPointagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
