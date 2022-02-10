import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosteListComponent } from './poste-list.component';

describe('PosteListComponent', () => {
  let component: PosteListComponent;
  let fixture: ComponentFixture<PosteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosteListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
