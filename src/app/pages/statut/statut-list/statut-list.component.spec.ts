import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatutListComponent } from './statut-list.component';

describe('StatutListComponent', () => {
  let component: StatutListComponent;
  let fixture: ComponentFixture<StatutListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatutListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
