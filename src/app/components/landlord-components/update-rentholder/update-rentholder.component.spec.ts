import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRentholderComponent } from './update-rentholder.component';

describe('UpdateRentholderComponent', () => {
  let component: UpdateRentholderComponent;
  let fixture: ComponentFixture<UpdateRentholderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateRentholderComponent]
    });
    fixture = TestBed.createComponent(UpdateRentholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
