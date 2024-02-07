import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionFinesComponent } from './addition-fines.component';

describe('AdditionFinesComponent', () => {
  let component: AdditionFinesComponent;
  let fixture: ComponentFixture<AdditionFinesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdditionFinesComponent]
    });
    fixture = TestBed.createComponent(AdditionFinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
