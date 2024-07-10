import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoublonsNomsComponent } from './doublons-noms.component';

describe('DoublonsNomsComponent', () => {
  let component: DoublonsNomsComponent;
  let fixture: ComponentFixture<DoublonsNomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoublonsNomsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoublonsNomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
