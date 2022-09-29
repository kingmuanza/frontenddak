import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleViewComponent } from './controle-view.component';

describe('ControleViewComponent', () => {
  let component: ControleViewComponent;
  let fixture: ComponentFixture<ControleViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControleViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
