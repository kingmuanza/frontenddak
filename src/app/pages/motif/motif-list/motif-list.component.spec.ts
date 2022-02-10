import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotifListComponent } from './motif-list.component';

describe('MotifListComponent', () => {
  let component: MotifListComponent;
  let fixture: ComponentFixture<MotifListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotifListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MotifListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
