import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandlordPaymentHistoryComponent } from './landlord-payment-history.component';

describe('LandlordPaymentHistoryComponent', () => {
  let component: LandlordPaymentHistoryComponent;
  let fixture: ComponentFixture<LandlordPaymentHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LandlordPaymentHistoryComponent]
    });
    fixture = TestBed.createComponent(LandlordPaymentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
