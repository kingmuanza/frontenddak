import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecouvrementEditionComponent } from './recouvrement-edition.component';

describe('RecouvrementEditionComponent', () => {
  let component: RecouvrementEditionComponent;
  let fixture: ComponentFixture<RecouvrementEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecouvrementEditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecouvrementEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
