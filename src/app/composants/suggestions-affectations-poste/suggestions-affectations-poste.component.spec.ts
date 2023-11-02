import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionsAffectationsPosteComponent } from './suggestions-affectations-poste.component';

describe('SuggestionsAffectationsPosteComponent', () => {
  let component: SuggestionsAffectationsPosteComponent;
  let fixture: ComponentFixture<SuggestionsAffectationsPosteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestionsAffectationsPosteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionsAffectationsPosteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
