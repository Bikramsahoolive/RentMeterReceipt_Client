import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubMeterComponent } from './create-sub-meter.component';

describe('CreateSubMeterComponent', () => {
  let component: CreateSubMeterComponent;
  let fixture: ComponentFixture<CreateSubMeterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSubMeterComponent]
    });
    fixture = TestBed.createComponent(CreateSubMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
