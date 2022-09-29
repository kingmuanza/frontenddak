import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VigileBadgeListComponent } from './vigile-badge-list.component';

describe('VigileBadgeListComponent', () => {
  let component: VigileBadgeListComponent;
  let fixture: ComponentFixture<VigileBadgeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VigileBadgeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VigileBadgeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
