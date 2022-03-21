import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuartierEditComponent } from './quartier-edit.component';

describe('QuartierEditComponent', () => {
  let component: QuartierEditComponent;
  let fixture: ComponentFixture<QuartierEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuartierEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuartierEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
