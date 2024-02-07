import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMeterMenuComponent } from './main-meter-menu.component';

describe('MainMeterMenuComponent', () => {
  let component: MainMeterMenuComponent;
  let fixture: ComponentFixture<MainMeterMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainMeterMenuComponent]
    });
    fixture = TestBed.createComponent(MainMeterMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
