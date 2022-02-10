import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationaliteEditComponent } from './nationalite-edit.component';

describe('NationaliteEditComponent', () => {
  let component: NationaliteEditComponent;
  let fixture: ComponentFixture<NationaliteEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NationaliteEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NationaliteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
