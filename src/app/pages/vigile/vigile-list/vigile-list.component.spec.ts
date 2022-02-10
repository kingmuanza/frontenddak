import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VigileListComponent } from './vigile-list.component';

describe('VigileListComponent', () => {
  let component: VigileListComponent;
  let fixture: ComponentFixture<VigileListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VigileListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VigileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
