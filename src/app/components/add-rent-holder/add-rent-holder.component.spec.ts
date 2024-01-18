import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRentHolderComponent } from './add-rent-holder.component';

describe('AddRentHolderComponent', () => {
  let component: AddRentHolderComponent;
  let fixture: ComponentFixture<AddRentHolderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRentHolderComponent]
    });
    fixture = TestBed.createComponent(AddRentHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
