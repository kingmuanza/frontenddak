import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleListComponent } from './controle-list.component';

describe('ControleListComponent', () => {
  let component: ControleListComponent;
  let fixture: ComponentFixture<ControleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControleListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
