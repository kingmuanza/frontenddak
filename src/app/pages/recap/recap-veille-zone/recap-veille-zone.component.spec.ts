import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecapVeilleZoneComponent } from './recap-veille-zone.component';

describe('RecapVeilleZoneComponent', () => {
  let component: RecapVeilleZoneComponent;
  let fixture: ComponentFixture<RecapVeilleZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecapVeilleZoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecapVeilleZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
