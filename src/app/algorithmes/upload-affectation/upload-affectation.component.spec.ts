import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadAffectationComponent } from './upload-affectation.component';

describe('UploadAffectationComponent', () => {
  let component: UploadAffectationComponent;
  let fixture: ComponentFixture<UploadAffectationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadAffectationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadAffectationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
