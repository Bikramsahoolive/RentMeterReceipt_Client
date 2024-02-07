import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubMeterMenuComponent } from './sub-meter-menu.component';

describe('SubMeterMenuComponent', () => {
  let component: SubMeterMenuComponent;
  let fixture: ComponentFixture<SubMeterMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubMeterMenuComponent]
    });
    fixture = TestBed.createComponent(SubMeterMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
