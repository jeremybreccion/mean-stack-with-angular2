import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    /**
     * when user is logged on, he/she can still access login & register wews
     * code below does not work
     */

    if(this.authService.isLoggedIn === undefined) {
      if(url === '/login' || url === '/register') {
        return true;
      } else {
        this.authService.current().subscribe((res: any) => {
          this.authService.setToken(res.token);
          this.router.navigateByUrl(url);
          return true;
        }, err => {
          this.router.navigateByUrl('/login');
          return false;
        });
      }
    }
    
    if(this.authService.isLoggedIn) {
      
      this.authService.redirectUrl = url;

      return (url !== '/login' && url !== '/register') ? true : false;
    }

    this.router.navigateByUrl('/login');
    return false;
  }
  constructor(private authService: AuthService, private router: Router) { }
}
