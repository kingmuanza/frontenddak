import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratAvenantComponent } from './contrat-avenant.component';

describe('ContratAvenantComponent', () => {
  let component: ContratAvenantComponent;
  let fixture: ComponentFixture<ContratAvenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContratAvenantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratAvenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
