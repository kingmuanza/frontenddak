import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsableEditComponent } from './responsable-edit.component';

describe('ResponsableEditComponent', () => {
  let component: ResponsableEditComponent;
  let fixture: ComponentFixture<ResponsableEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsableEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsableEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
