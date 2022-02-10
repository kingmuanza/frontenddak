import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VigileEditComponent } from './vigile-edit.component';

describe('VigileEditComponent', () => {
  let component: VigileEditComponent;
  let fixture: ComponentFixture<VigileEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VigileEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VigileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
