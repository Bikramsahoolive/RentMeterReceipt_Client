import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintRentBillComponent } from './print-rent-bill.component';

describe('PrintRentBillComponent', () => {
  let component: PrintRentBillComponent;
  let fixture: ComponentFixture<PrintRentBillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrintRentBillComponent]
    });
    fixture = TestBed.createComponent(PrintRentBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
