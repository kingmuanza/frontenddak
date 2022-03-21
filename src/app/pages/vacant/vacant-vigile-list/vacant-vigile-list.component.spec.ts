import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacantVigileListComponent } from './vacant-vigile-list.component';

describe('VacantVigileListComponent', () => {
  let component: VacantVigileListComponent;
  let fixture: ComponentFixture<VacantVigileListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacantVigileListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacantVigileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
