import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacantRemplacantCongeListComponent } from './vacant-remplacant-conge-list.component';

describe('VacantRemplacantCongeListComponent', () => {
  let component: VacantRemplacantCongeListComponent;
  let fixture: ComponentFixture<VacantRemplacantCongeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacantRemplacantCongeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacantRemplacantCongeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
