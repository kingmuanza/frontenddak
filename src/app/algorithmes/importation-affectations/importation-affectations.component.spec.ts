import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportationAffectationsComponent } from './importation-affectations.component';

describe('ImportationAffectationsComponent', () => {
  let component: ImportationAffectationsComponent;
  let fixture: ComponentFixture<ImportationAffectationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportationAffectationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportationAffectationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
