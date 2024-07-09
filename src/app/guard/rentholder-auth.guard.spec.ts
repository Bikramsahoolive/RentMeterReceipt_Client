import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { rentholderAuthGuard } from './rentholder-auth.guard';

describe('rentholderAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => rentholderAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
