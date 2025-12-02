import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../services/base-http.service';
import { CommonRoutes } from '../../common-routes';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthenticatedFlag = false;
  // private currentUser: User; // Assuming you have a User model with roles and permissions
  private currentUser: any; // Assuming you have a User model with roles and permissions

  constructor(private baseHttpService: BaseHttpService, private router: Router) { }

  isAuthenticated(): boolean {
    return this.isAuthenticatedFlag;
  }

  hasRequiredRoles(requiredRoles: string[]): boolean {
    if (!this.currentUser) {
      return false;
    }
    return requiredRoles.every(role => this.currentUser.roles.includes(role));
  }

  login(username: any, password: any) {
    // Perform actual login logic here
    let request = {
      username: username,
      password: password
    }
    return this.baseHttpService.post(CommonRoutes.LOGIN, request);
    // .subscribe((res: any) => {
    //   if (!!res.token) {
    //     localStorage.setItem('token', res.token);
    //     localStorage.setItem('employee', JSON.stringify(res.employee));
    //     this.router.navigate(['/app/dashboard']);
    //   }
    //   this.isAuthenticatedFlag = true;
    // });
    // Set current user with roles and permissions
  }

  logout(): void {
    // Perform actual logout logic here
    this.baseHttpService.get(CommonRoutes.LOGOUT).subscribe((res: any) => console.log(res));
    localStorage.removeItem('token');
    localStorage.removeItem('employee');
    this.router.navigate(['auth/login']);
    this.isAuthenticatedFlag = false;
    this.currentUser = null;
  }

}
