import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayHistoriqueContratComponent } from './display-historique-contrat.component';

describe('DisplayHistoriqueContratComponent', () => {
  let component: DisplayHistoriqueContratComponent;
  let fixture: ComponentFixture<DisplayHistoriqueContratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayHistoriqueContratComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayHistoriqueContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
