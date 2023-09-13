import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecapVeilleComponent } from './recap-veille.component';

describe('RecapVeilleComponent', () => {
  let component: RecapVeilleComponent;
  let fixture: ComponentFixture<RecapVeilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecapVeilleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecapVeilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
