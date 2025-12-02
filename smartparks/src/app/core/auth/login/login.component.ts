import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertStatus } from 'src/app/shared/components/status-messsage/status-messsage.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    // password!: string;
    // userName!: string;
    // isPasswordValid!: boolean;
    isLoader: boolean = false;

    userGroup = new FormGroup(
        {
            userName: new FormControl('', {
                validators: [Validators.required]
            }),
            password: new FormControl('', {
                validators: [Validators.required, Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/)]
            })
        }
    );
    alertType: string = "";
    statusMessage: string = "";
    showDialog: boolean = false;

    constructor(public layoutService: LayoutService,
        private authService: AuthService,
        private router: Router) {
    }

    login() {
        if (this.userGroup.valid) {
            this.isLoader = true;
            this.authService.login(this.userGroup.value.userName, this.userGroup.value.password).subscribe((res: any) => {
                if (!!res.token) {
                    localStorage.setItem('token', res.token);
                    localStorage.setItem('employee', JSON.stringify(res.employee));
                    this.router.navigate(['/app/dashboard']);
                    this.authService.isAuthenticatedFlag = true;
                }
                this.isLoader = false;
            }, (error => {
                this.isLoader = false;
                console.error('Login error:', error);
                let errorMessage = 'Please try once again with valid details.';
                if (error && error.status) {
                    if (error.status === 0) {
                        errorMessage = 'Cannot connect to server. Please check if the backend API is running.';
                    } else if (error.status === 401) {
                        errorMessage = 'Invalid username or password.';
                    } else if (error.status === 404) {
                        errorMessage = 'API endpoint not found. Please check the API configuration.';
                    } else if (error.status === 500) {
                        errorMessage = 'Server error. Please try again later.';
                    }
                }
                this.showStatusDialog(AlertStatus.error, errorMessage);
            }));
        }
    }


  showStatusDialog(alertType: string, message: string) {
    this.showDialog = true;
    this.alertType = alertType;
    this.statusMessage = message;
  }

  closeAlertDialog(status: boolean) {
    this.showDialog = status;
  }

  onForgotClick() {
    this.router.navigate(['/auth/forgot-password']);
  }

}
