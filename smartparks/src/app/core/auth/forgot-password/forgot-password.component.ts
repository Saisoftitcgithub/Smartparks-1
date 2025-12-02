import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertStatus } from 'src/app/shared/components/status-messsage/status-messsage.component';
import { UserService } from 'src/app/components/configuration/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

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
    private userService: UserService,
    private router: Router) {
  }

  resetPassword() {
    if (this.userGroup.valid) {
      this.isLoader = true;
      let request = {
        userName: this.userGroup.value.userName,
        password: this.userGroup.value.password
      }
      this.userService.resetPassword(request).subscribe((res: any) => {
        if (!!res.token) {
          this.router.navigate(['/auth/login']);
        }
        this.isLoader = false;
      }, (error => {
        this.isLoader = false;
        this.showStatusDialog(AlertStatus.error, 'Please try once again with valid details.');
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

}
