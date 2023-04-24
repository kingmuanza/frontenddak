import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsableViewComponent } from './responsable-view.component';

describe('ResponsableViewComponent', () => {
  let component: ResponsableViewComponent;
  let fixture: ComponentFixture<ResponsableViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsableViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
