import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecouvrementEtatComponent } from './recouvrement-etat.component';

describe('RecouvrementEtatComponent', () => {
  let component: RecouvrementEtatComponent;
  let fixture: ComponentFixture<RecouvrementEtatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecouvrementEtatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecouvrementEtatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
