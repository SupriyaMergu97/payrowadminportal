import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { IdentityService } from '../services/identity.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private identity: IdentityService
  ) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
   // Check if the required data exists in localStorage
  //  const userData = localStorage.getItem('auth_token');
  //  if (userData) {
  //    // Data exists, allow access to the route
  //    return true;
  //  } else {
  //    // Data does not exist, redirect to the login page
  //    window.open('localhost:4100', '_self');
  //    return false;
  //  }
     return true;
  }
}
