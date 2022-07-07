import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SynchroniserComponent } from './synchroniser.component';

describe('SynchroniserComponent', () => {
  let component: SynchroniserComponent;
  let fixture: ComponentFixture<SynchroniserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SynchroniserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SynchroniserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
