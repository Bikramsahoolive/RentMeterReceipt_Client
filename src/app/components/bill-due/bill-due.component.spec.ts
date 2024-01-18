import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillDueComponent } from './bill-due.component';

describe('BillDueComponent', () => {
  let component: BillDueComponent;
  let fixture: ComponentFixture<BillDueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillDueComponent]
    });
    fixture = TestBed.createComponent(BillDueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
