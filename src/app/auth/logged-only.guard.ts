import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {AlertService} from '../services/alert.service';

export const loggedOnlyGuard: CanActivateFn = (route, state) => {
  const alertService = inject(AlertService)
  const authService = inject(AuthService)
  const router = inject(Router)

  if (authService.isAuthenticated()) return true

  console.log('bababa')

  router.navigate(['login'])
    .then(() => alertService.error('Você precisa estar logado para acessar essa página.'))

  return false
};
