import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointageEditComponent } from './pointage-edit.component';

describe('PointageEditComponent', () => {
  let component: PointageEditComponent;
  let fixture: ComponentFixture<PointageEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointageEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PointageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
