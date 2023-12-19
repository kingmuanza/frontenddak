import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JourprisListComponent } from './jourpris-list.component';

describe('JourprisListComponent', () => {
  let component: JourprisListComponent;
  let fixture: ComponentFixture<JourprisListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JourprisListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JourprisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
