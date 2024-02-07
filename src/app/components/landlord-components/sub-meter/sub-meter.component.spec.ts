import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubMeterComponent } from './sub-meter.component';

describe('SubMeterComponent', () => {
  let component: SubMeterComponent;
  let fixture: ComponentFixture<SubMeterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubMeterComponent]
    });
    fixture = TestBed.createComponent(SubMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
