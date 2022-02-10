import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosteVacantFicheComponent } from './poste-vacant-fiche.component';

describe('PosteVacantFicheComponent', () => {
  let component: PosteVacantFicheComponent;
  let fixture: ComponentFixture<PosteVacantFicheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosteVacantFicheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosteVacantFicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
