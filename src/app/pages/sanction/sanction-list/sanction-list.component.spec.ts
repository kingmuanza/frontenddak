import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanctionListComponent } from './sanction-list.component';

describe('SanctionListComponent', () => {
  let component: SanctionListComponent;
  let fixture: ComponentFixture<SanctionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SanctionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SanctionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
