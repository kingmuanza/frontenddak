import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchEditComponent } from './switch-edit.component';

describe('SwitchEditComponent', () => {
  let component: SwitchEditComponent;
  let fixture: ComponentFixture<SwitchEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
