import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandlordProfileComponent } from './landlord-profile.component';

describe('LandlordProfileComponent', () => {
  let component: LandlordProfileComponent;
  let fixture: ComponentFixture<LandlordProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LandlordProfileComponent]
    });
    fixture = TestBed.createComponent(LandlordProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
