import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecouvrementEvaluationComponent } from './recouvrement-evaluation.component';

describe('RecouvrementEvaluationComponent', () => {
  let component: RecouvrementEvaluationComponent;
  let fixture: ComponentFixture<RecouvrementEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecouvrementEvaluationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecouvrementEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
