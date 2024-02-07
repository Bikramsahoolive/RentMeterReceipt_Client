import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashbordContentComponent } from './admin-dashbord-content.component';

describe('AdminDashbordContentComponent', () => {
  let component: AdminDashbordContentComponent;
  let fixture: ComponentFixture<AdminDashbordContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDashbordContentComponent]
    });
    fixture = TestBed.createComponent(AdminDashbordContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
