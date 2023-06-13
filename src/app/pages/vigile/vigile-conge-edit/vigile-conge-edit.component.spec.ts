import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VigileCongeEditComponent } from './vigile-conge-edit.component';

describe('VigileCongeEditComponent', () => {
  let component: VigileCongeEditComponent;
  let fixture: ComponentFixture<VigileCongeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VigileCongeEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VigileCongeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
