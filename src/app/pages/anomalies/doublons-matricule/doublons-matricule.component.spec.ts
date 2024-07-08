import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoublonsMatriculeComponent } from './doublons-matricule.component';

describe('DoublonsMatriculeComponent', () => {
  let component: DoublonsMatriculeComponent;
  let fixture: ComponentFixture<DoublonsMatriculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoublonsMatriculeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoublonsMatriculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
