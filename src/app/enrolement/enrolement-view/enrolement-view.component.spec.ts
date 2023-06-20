import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolementViewComponent } from './enrolement-view.component';

describe('EnrolementViewComponent', () => {
  let component: EnrolementViewComponent;
  let fixture: ComponentFixture<EnrolementViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrolementViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrolementViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
