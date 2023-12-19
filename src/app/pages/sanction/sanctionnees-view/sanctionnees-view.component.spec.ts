import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanctionneesViewComponent } from './sanctionnees-view.component';

describe('SanctionneesViewComponent', () => {
  let component: SanctionneesViewComponent;
  let fixture: ComponentFixture<SanctionneesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SanctionneesViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SanctionneesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
