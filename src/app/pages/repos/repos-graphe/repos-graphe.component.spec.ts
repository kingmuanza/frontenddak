import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReposGrapheComponent } from './repos-graphe.component';

describe('ReposGrapheComponent', () => {
  let component: ReposGrapheComponent;
  let fixture: ComponentFixture<ReposGrapheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReposGrapheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReposGrapheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
