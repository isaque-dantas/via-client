import { CanActivateFn } from '@angular/router';

export const loggedOnlyGuard: CanActivateFn = (route, state) => {
  return true;
};
