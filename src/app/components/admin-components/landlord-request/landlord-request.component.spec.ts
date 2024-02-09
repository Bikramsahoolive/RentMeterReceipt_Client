import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandlordRequestComponent } from './landlord-request.component';

describe('LandlordRequestComponent', () => {
  let component: LandlordRequestComponent;
  let fixture: ComponentFixture<LandlordRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LandlordRequestComponent]
    });
    fixture = TestBed.createComponent(LandlordRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
