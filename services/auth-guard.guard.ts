import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  isUserLoggedIn: boolean
  role: any 
 
  constructor(private router: Router, private authService: AuthService) {
    this.isUserLoggedIn = authService.isUserLoggedIn()
    this.role = authService.getRole()
  }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
 
    if (this.isUserLoggedIn) {    //authentication --> checking username , password
      if (next.data.role === sessionStorage.getItem('userrole')) {   //authorization --> checking role is correct
        return true;
      } else {
        this.router.navigate(['login'])
        return false;
      }
 
    } else {
      this.router.navigate(['login'])
      return false;
    }
 
  }
}
