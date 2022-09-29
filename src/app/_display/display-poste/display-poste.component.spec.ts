import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPosteComponent } from './display-poste.component';

describe('DisplayPosteComponent', () => {
  let component: DisplayPosteComponent;
  let fixture: ComponentFixture<DisplayPosteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayPosteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayPosteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
