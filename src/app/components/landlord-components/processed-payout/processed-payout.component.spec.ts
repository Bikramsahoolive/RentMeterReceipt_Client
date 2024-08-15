import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessedPayoutComponent } from './processed-payout.component';

describe('ProcessedPayoutComponent', () => {
  let component: ProcessedPayoutComponent;
  let fixture: ComponentFixture<ProcessedPayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProcessedPayoutComponent]
    });
    fixture = TestBed.createComponent(ProcessedPayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
