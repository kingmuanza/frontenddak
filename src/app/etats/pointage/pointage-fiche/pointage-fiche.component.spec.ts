import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointageFicheComponent } from './pointage-fiche.component';

describe('PointageFicheComponent', () => {
  let component: PointageFicheComponent;
  let fixture: ComponentFixture<PointageFicheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointageFicheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PointageFicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
