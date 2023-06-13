import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongeViewComponent } from './conge-view.component';

describe('CongeViewComponent', () => {
  let component: CongeViewComponent;
  let fixture: ComponentFixture<CongeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CongeViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CongeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
