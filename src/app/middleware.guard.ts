import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MiddlewareGuard implements CanActivate {
  
  constructor(private auth: AuthService, private router: Router){};

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (localStorage.getItem("ACCESS_TOKEN") !== null) {
        return this.auth.isLoggedIn();
      } else {
        this.router.navigate(['login']);
        return false;
      }  
  }
  
  
}
