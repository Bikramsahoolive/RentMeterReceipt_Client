import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordContentComponent } from './dashbord-content.component';

describe('DashbordContentComponent', () => {
  let component: DashbordContentComponent;
  let fixture: ComponentFixture<DashbordContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashbordContentComponent]
    });
    fixture = TestBed.createComponent(DashbordContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
