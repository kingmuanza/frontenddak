import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauAffectationsComponent } from './tableau-affectations.component';

describe('TableauAffectationsComponent', () => {
  let component: TableauAffectationsComponent;
  let fixture: ComponentFixture<TableauAffectationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableauAffectationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableauAffectationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
