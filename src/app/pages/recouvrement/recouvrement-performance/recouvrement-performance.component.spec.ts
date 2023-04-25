import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecouvrementPerformanceComponent } from './recouvrement-performance.component';

describe('RecouvrementPerformanceComponent', () => {
  let component: RecouvrementPerformanceComponent;
  let fixture: ComponentFixture<RecouvrementPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecouvrementPerformanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecouvrementPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
