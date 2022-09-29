import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointageSuiviComponent } from './pointage-suivi.component';

describe('PointageSuiviComponent', () => {
  let component: PointageSuiviComponent;
  let fixture: ComponentFixture<PointageSuiviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointageSuiviComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PointageSuiviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
