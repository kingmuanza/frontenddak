import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolementListComponent } from './enrolement-list.component';

describe('EnrolementListComponent', () => {
  let component: EnrolementListComponent;
  let fixture: ComponentFixture<EnrolementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrolementListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrolementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
