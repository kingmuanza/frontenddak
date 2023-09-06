import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecapJourneeComponent } from './recap-journee.component';

describe('RecapJourneeComponent', () => {
  let component: RecapJourneeComponent;
  let fixture: ComponentFixture<RecapJourneeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecapJourneeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecapJourneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
