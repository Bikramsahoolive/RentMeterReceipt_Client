import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashbordUserComponent } from './admin-dashbord-user.component';

describe('AdminDashbordUserComponent', () => {
  let component: AdminDashbordUserComponent;
  let fixture: ComponentFixture<AdminDashbordUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDashbordUserComponent]
    });
    fixture = TestBed.createComponent(AdminDashbordUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
