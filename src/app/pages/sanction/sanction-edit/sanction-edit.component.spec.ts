import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanctionEditComponent } from './sanction-edit.component';

describe('SanctionEditComponent', () => {
  let component: SanctionEditComponent;
  let fixture: ComponentFixture<SanctionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SanctionEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SanctionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
