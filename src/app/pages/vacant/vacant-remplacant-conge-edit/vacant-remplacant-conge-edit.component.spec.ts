import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacantRemplacantCongeEditComponent } from './vacant-remplacant-conge-edit.component';

describe('VacantRemplacantCongeEditComponent', () => {
  let component: VacantRemplacantCongeEditComponent;
  let fixture: ComponentFixture<VacantRemplacantCongeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacantRemplacantCongeEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacantRemplacantCongeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
