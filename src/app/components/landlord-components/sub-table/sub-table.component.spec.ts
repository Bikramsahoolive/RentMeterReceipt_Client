import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubTableComponent } from './sub-table.component';

describe('SubTableComponent', () => {
  let component: SubTableComponent;
  let fixture: ComponentFixture<SubTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubTableComponent]
    });
    fixture = TestBed.createComponent(SubTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
