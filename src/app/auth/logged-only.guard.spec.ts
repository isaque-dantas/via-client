import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loggedOnlyGuard } from './logged-only.guard';

describe('loggedOnlyGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loggedOnlyGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
