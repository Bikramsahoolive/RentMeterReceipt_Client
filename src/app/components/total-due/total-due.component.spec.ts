import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalDueComponent } from './total-due.component';

describe('TotalDueComponent', () => {
  let component: TotalDueComponent;
  let fixture: ComponentFixture<TotalDueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TotalDueComponent]
    });
    fixture = TestBed.createComponent(TotalDueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
