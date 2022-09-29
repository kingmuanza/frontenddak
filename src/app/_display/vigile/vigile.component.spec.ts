import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VigileComponent } from './vigile.component';

describe('VigileComponent', () => {
  let component: VigileComponent;
  let fixture: ComponentFixture<VigileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VigileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VigileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
