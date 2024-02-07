import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentholderMenubarComponentComponent } from './rentholder-menubar-component.component';

describe('RentholderMenubarComponentComponent', () => {
  let component: RentholderMenubarComponentComponent;
  let fixture: ComponentFixture<RentholderMenubarComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RentholderMenubarComponentComponent]
    });
    fixture = TestBed.createComponent(RentholderMenubarComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
