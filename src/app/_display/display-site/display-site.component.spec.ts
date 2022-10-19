import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySiteComponent } from './display-site.component';

describe('DisplaySiteComponent', () => {
  let component: DisplaySiteComponent;
  let fixture: ComponentFixture<DisplaySiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaySiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaySiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
