import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoublonsCniComponent } from './doublons-cni.component';

describe('DoublonsCniComponent', () => {
  let component: DoublonsCniComponent;
  let fixture: ComponentFixture<DoublonsCniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoublonsCniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoublonsCniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
