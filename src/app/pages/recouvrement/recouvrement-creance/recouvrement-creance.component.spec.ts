import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecouvrementCreanceComponent } from './recouvrement-creance.component';

describe('RecouvrementCreanceComponent', () => {
  let component: RecouvrementCreanceComponent;
  let fixture: ComponentFixture<RecouvrementCreanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecouvrementCreanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecouvrementCreanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
