import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanctionneesListComponent } from './sanctionnees-list.component';

describe('SanctionneesListComponent', () => {
  let component: SanctionneesListComponent;
  let fixture: ComponentFixture<SanctionneesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SanctionneesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SanctionneesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
