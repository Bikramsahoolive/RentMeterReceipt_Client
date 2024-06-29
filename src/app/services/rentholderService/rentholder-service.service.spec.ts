import { TestBed } from '@angular/core/testing';

import { RentholderServiceService } from './rentholder-service.service';

describe('RentholderServiceService', () => {
  let service: RentholderServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentholderServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
