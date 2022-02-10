import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VigileStandbyFicheComponent } from './vigile-standby-fiche.component';

describe('VigileStandbyFicheComponent', () => {
  let component: VigileStandbyFicheComponent;
  let fixture: ComponentFixture<VigileStandbyFicheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VigileStandbyFicheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VigileStandbyFicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
