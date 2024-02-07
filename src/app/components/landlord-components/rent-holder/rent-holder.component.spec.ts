import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentHolderComponent } from './rent-holder.component';

describe('RentHolderComponent', () => {
  let component: RentHolderComponent;
  let fixture: ComponentFixture<RentHolderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RentHolderComponent]
    });
    fixture = TestBed.createComponent(RentHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
