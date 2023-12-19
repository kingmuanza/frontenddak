import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JourprisViewComponent } from './jourpris-view.component';

describe('JourprisViewComponent', () => {
  let component: JourprisViewComponent;
  let fixture: ComponentFixture<JourprisViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JourprisViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JourprisViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
