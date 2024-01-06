import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMeterComponent } from './main-meter.component';

describe('MainMeterComponent', () => {
  let component: MainMeterComponent;
  let fixture: ComponentFixture<MainMeterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainMeterComponent]
    });
    fixture = TestBed.createComponent(MainMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
