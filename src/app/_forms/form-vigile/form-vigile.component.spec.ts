import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormVigileComponent } from './form-vigile.component';

describe('FormVigileComponent', () => {
  let component: FormVigileComponent;
  let fixture: ComponentFixture<FormVigileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormVigileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormVigileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
