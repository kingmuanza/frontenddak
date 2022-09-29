import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratViewComponent } from './contrat-view.component';

describe('ContratViewComponent', () => {
  let component: ContratViewComponent;
  let fixture: ComponentFixture<ContratViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContratViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
