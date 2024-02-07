import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentholderDashbordContentComponent } from './rentholder-dashbord-content.component';

describe('RentholderDashbordContentComponent', () => {
  let component: RentholderDashbordContentComponent;
  let fixture: ComponentFixture<RentholderDashbordContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RentholderDashbordContentComponent]
    });
    fixture = TestBed.createComponent(RentholderDashbordContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
