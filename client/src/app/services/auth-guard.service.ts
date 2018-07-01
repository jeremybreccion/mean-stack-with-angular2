import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    
    if(this.authService.isLoggedIn) {
      
      this.authService.redirectUrl = url;

      return true;
    }

    this.router.navigateByUrl('/login');
    return false;
  }
  constructor(private authService: AuthService, private router: Router) { }
}
