import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningIncompletFicheComponent } from './planning-incomplet-fiche.component';

describe('PlanningIncompletFicheComponent', () => {
  let component: PlanningIncompletFicheComponent;
  let fixture: ComponentFixture<PlanningIncompletFicheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanningIncompletFicheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningIncompletFicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
