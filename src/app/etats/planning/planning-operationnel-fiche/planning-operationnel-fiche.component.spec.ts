import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningOperationnelFicheComponent } from './planning-operationnel-fiche.component';

describe('PlanningOperationnelFicheComponent', () => {
  let component: PlanningOperationnelFicheComponent;
  let fixture: ComponentFixture<PlanningOperationnelFicheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanningOperationnelFicheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningOperationnelFicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
