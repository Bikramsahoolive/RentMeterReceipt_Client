import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsubscribeMailComponent } from './unsubscribe-mail.component';

describe('UnsubscribeMailComponent', () => {
  let component: UnsubscribeMailComponent;
  let fixture: ComponentFixture<UnsubscribeMailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnsubscribeMailComponent]
    });
    fixture = TestBed.createComponent(UnsubscribeMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
