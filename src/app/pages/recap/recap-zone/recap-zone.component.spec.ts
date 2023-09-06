import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecapZoneComponent } from './recap-zone.component';

describe('RecapZoneComponent', () => {
  let component: RecapZoneComponent;
  let fixture: ComponentFixture<RecapZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecapZoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecapZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
