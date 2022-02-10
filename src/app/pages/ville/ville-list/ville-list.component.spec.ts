import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VilleListComponent } from './ville-list.component';

describe('VilleListComponent', () => {
  let component: VilleListComponent;
  let fixture: ComponentFixture<VilleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VilleListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VilleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
