import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { BranchService } from '../services/branch.service';
import { AlertStatus } from 'src/app/shared/components/status-messsage/status-messsage.component';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  selectedUser!: any;
  userList: any = [];
  branchList: any = [];
  authoritiesList: any = [];
  userDetails!: any;
  isFormSubmitted: boolean = false;
  isLoader: boolean = false;
  isValidPassword!: boolean;
  alertType: string = "";
  statusMessage: string = "";
  showDialog: boolean = false;
  resetPassword: boolean = false;
  userFormGroup!: FormGroup;

  constructor(private userService: UserService,
    private branchService: BranchService) {
  }

  ngOnInit(): void {
    this.fetchUsers();
    this.fetchBranches();
    this.fetchRoles();
  }

  fetchUsers() {
    this.isLoader = true;
    this.userService.getUserListDetails().subscribe((res: any) => {
      this.userList = [];
      this.isLoader = false;
      if (res.content.length > 0) {
        this.userList = res.content;
      }
    }, (error => {
      this.isLoader = false;
    }));
  }

  fetchBranches() {
    this.branchService.getBranchDetails().subscribe((res: any) => {
      this.branchList = [];
      if (res.content.length > 0) {
        this.branchList = res.content;
      }
    }, (error => {
      this.isLoader = false;
    }));
  }

  fetchRoles() {
    this.userService.getRoles().subscribe((res: any) => {
      this.authoritiesList = [];
      if (res.length > 0) {
        this.authoritiesList = res;
      }
    }, (error => {
      this.isLoader = false;
    }));
  }

  onUserSelect(event: any) {
    this.createNewForm();
    this.selectedUser = event.value;
    this.userDetails = event.value;
    this.setFormValues();
  }

  public addUser() {
    this.isFormSubmitted = false;
    this.userDetails = {
      id: '',
      username: '',
      password: '',
      firstname: {
        name: ''
      },
      middlename: {
        name: ''
      },
      lastname: {
        name: ''
      },
      branches: this.branchList,
      authorities: this.authoritiesList.filter((x: any) => x.authority == 'USER')
    };
    this.selectedUser = undefined;
    this.createNewForm();
  }

  createNewForm() {
    this.userFormGroup = new FormGroup({
      id: new FormControl(''),
      username: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')]),
      password: new FormControl('', [Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/)]),
      firstname: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z- ]*$')]),
      middlename: new FormControl('', [Validators.pattern('^[a-zA-Z- ]*$')]),
      lastname: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z- ]*$')]),
      branches: new FormControl([]),
      authorities: new FormControl(this.authoritiesList.filter((x: any) => x.authority == 'USER'))
    });
    if (!this.selectedUser) {
      this.userFormGroup.get('password')?.addValidators([Validators.required]);
    }
  }

  setFormValues() {
    this.userFormGroup.patchValue({
      username: this.userDetails.username,
      id: this.userDetails.id,
      firstname: this.userDetails.firstname.name,
      middlename: this.userDetails.middlename.name,
      lastname: this.userDetails.lastname.name,
      branches: this.userDetails.branches,
      authorities: this.userDetails.authorities
    });
    this.userFormGroup.updateValueAndValidity();
  }

  public saveUser() {
    this.isFormSubmitted = true;
    this.userFormGroup.markAllAsTouched();
    if (!!this.userFormGroup.valid) {
      this.isLoader = true;
      let request = this.userFormGroup.value;
      request['branches'] = request.branches.map((x: any) => x.id);
      this.userService.saveUserDetails(request).subscribe((res: any) => {
        this.isLoader = false;
        if (!!res.id) {
          this.showStatusDialog(AlertStatus.success, 'Details saved successfully.');
          this.fetchUsers();
          this.addUser();
          this.isFormSubmitted = false;
        }
      }, (error => {
        this.isLoader = false;
        this.showStatusDialog(AlertStatus.error, 'Saving details failed. Please try once again.');
      }));
    }
  }

  public updateUser() {
    this.isFormSubmitted = true;
    this.userFormGroup.markAllAsTouched();
    if (!!this.userFormGroup.valid) {
      let request = this.userFormGroup.value;
      request['branch'] = request.branches.map((x: any) => x.id);
      delete request['password'];
      this.isLoader = true;
      this.userService.updateUserDetails(request).subscribe((res: any) => {
        this.isLoader = false;
        if (!!res.id) {
          this.showStatusDialog(AlertStatus.success, 'Details updated successfully.');
          this.fetchUsers();
          this.addUser();
          this.isFormSubmitted = false;
        }
      }, ((error: HttpErrorResponse) => {
        this.isLoader = false;
        this.showStatusDialog(AlertStatus.error, 'Updating details failed. Please try once again.');
      }));
    }
  }

  updatePassword() {
    if (this.onPasswordBlur({})) {
      this.isLoader = true;
      let req = {
        userName: this.userDetails.username,
        password: this.userDetails.password
      }
      this.userService.resetPassword(req).subscribe((res: any) => {
        this.isLoader = false;
        this.showStatusDialog(AlertStatus.success, 'Password updated successfully.');
      }, (error => {
        this.isLoader = false;
        this.showStatusDialog(AlertStatus.error, 'Password update failed, please try once again.');
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

  // currently not using
  onPasswordBlur(event: any) {
    let regExp: any = new RegExp(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/);
    if (regExp.test(this.userDetails.password)) {
      this.isValidPassword = true;
    }
    else {
      this.isValidPassword = false;
    }
    return this.isValidPassword;
  }

}
