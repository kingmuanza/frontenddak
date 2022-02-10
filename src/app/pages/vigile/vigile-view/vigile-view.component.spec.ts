import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VigileViewComponent } from './vigile-view.component';

describe('VigileViewComponent', () => {
  let component: VigileViewComponent;
  let fixture: ComponentFixture<VigileViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VigileViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VigileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
