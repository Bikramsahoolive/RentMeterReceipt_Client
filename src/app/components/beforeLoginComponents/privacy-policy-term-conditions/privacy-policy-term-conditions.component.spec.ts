import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyPolicyTermConditionsComponent } from './privacy-policy-term-conditions.component';

describe('PrivacyPolicyTermConditionsComponent', () => {
  let component: PrivacyPolicyTermConditionsComponent;
  let fixture: ComponentFixture<PrivacyPolicyTermConditionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrivacyPolicyTermConditionsComponent]
    });
    fixture = TestBed.createComponent(PrivacyPolicyTermConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
