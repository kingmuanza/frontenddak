import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacantRemplacantListComponent } from './vacant-remplacant-list.component';

describe('VacantRemplacantListComponent', () => {
  let component: VacantRemplacantListComponent;
  let fixture: ComponentFixture<VacantRemplacantListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacantRemplacantListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacantRemplacantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
