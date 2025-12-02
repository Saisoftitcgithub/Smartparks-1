import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const requiredRoles = next.data as string[];
    // const requiredRoles = next.data.requiredRoles as string[];
    let token = localStorage.getItem('token');
    let employee: any = JSON.parse(localStorage.getItem('employee') || '{}');
    if (!!token) {
      if(state.url.includes('/config/')){
        if (employee.authorities.map((x: any) => x.name).indexOf('ADMIN') >= 0) {
          return true;
        }
        else {
          this.router.navigate(['auth/access'])
          return false;
        }
      }
      else {
        return true;
      }
    } else {
      // Redirect to unauthorized page or somewhere else
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
