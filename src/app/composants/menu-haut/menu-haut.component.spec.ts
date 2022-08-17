import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuHautComponent } from './menu-haut.component';

describe('MenuHautComponent', () => {
  let component: MenuHautComponent;
  let fixture: ComponentFixture<MenuHautComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuHautComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuHautComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
