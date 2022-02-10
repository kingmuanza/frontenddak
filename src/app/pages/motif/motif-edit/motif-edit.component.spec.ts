import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotifEditComponent } from './motif-edit.component';

describe('MotifEditComponent', () => {
  let component: MotifEditComponent;
  let fixture: ComponentFixture<MotifEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotifEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MotifEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
