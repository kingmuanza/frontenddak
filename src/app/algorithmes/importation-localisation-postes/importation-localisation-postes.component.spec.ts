import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportationLocalisationPostesComponent } from './importation-localisation-postes.component';

describe('ImportationLocalisationPostesComponent', () => {
  let component: ImportationLocalisationPostesComponent;
  let fixture: ComponentFixture<ImportationLocalisationPostesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportationLocalisationPostesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportationLocalisationPostesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
