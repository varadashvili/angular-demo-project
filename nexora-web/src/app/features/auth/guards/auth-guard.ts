import { CanActivateFn } from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  const isAuthenticated:boolean = authService.isAuthenticated() && !!localStorage.getItem('user');

  if(!isAuthenticated) {
    authService.$showLoginPublisher.next(true);
  }

  return isAuthenticated;
};
