import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongeDashboardComponent } from './conge-dashboard.component';

describe('CongeDashboardComponent', () => {
  let component: CongeDashboardComponent;
  let fixture: ComponentFixture<CongeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CongeDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CongeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
