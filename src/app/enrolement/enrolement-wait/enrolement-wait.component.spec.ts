import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolementWaitComponent } from './enrolement-wait.component';

describe('EnrolementWaitComponent', () => {
  let component: EnrolementWaitComponent;
  let fixture: ComponentFixture<EnrolementWaitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrolementWaitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrolementWaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
