import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosteViewComponent } from './poste-view.component';

describe('PosteViewComponent', () => {
  let component: PosteViewComponent;
  let fixture: ComponentFixture<PosteViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosteViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosteViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
