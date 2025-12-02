import { Component } from '@angular/core';
import { OrganizationService } from '../services/organization.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertStatus } from 'src/app/shared/components/status-messsage/status-messsage.component';
import { BranchService } from '../services/branch.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent {

  selectedOrganization!: any;
  orgList: any = [];
  orgDetails!: any;
  isFormSubmitted: boolean = false;
  isLoader: boolean = false;
  countriesList: any = [];
  alertType: string = "";
  statusMessage: string = "";
  showDialog: boolean = false;

  orgFormGroup!: FormGroup;

  constructor(private organizationService: OrganizationService,
    private branchService: BranchService,
    private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.fetchOrganizations();
    this.fetchCountires();
  }

  fetchOrganizations() {
    this.isLoader = true;
    this.organizationService.getOrganizationDetails().subscribe((res: any) => {
      this.orgList = [];
      this.isLoader = false;
      if (!!res.id) {
        this.orgList.push(res);
      }
    }, (error => {
      this.isLoader = false;
    }));
  }

  fetchCountires() {
    this.branchService.getCountriesList().subscribe((res: any) => {
      if (res.length > 0) {
        this.countriesList = res;
      }
      else {
        this.countriesList = [];
      }
    }, (error => {
      this.countriesList = [];
    }));
  }

  onOrgSelect(event: any) {
    this.selectedOrganization = event.value;
    this.createNewForm();
    this.orgDetails = event.value;
    this.setFormValues();
  }

  public addNewOrganization() {
    this.isFormSubmitted = false;
    this.selectedOrganization = undefined;
    this.orgDetails = {
      name: '',
      id: '',
      email: '',
      website: '',
      businessType: '',
      dateOfIncorporation: '',
      headQuarters: {
        building: '',
        street: '',
        area: '',
        city: '',
        zip: '',
        country: '',
        location: {
          x: '',
          y: ''
        }
      },
      active: false
    };
    this.createNewForm();
  }

  createNewForm() {
    this.orgFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z- ]*$')]),
      id: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')]),
      website: new FormControl(''),
      businessType: new FormControl('', [Validators.pattern('^[a-zA-Z- ]*$')]),
      dateOfIncorporation: new FormControl(''),
      headQuarters: new FormGroup({
        building: new FormControl('', [Validators.pattern('^[a-zA-Z- ]*$')]),
        street: new FormControl('', [Validators.pattern('^[a-zA-Z0-9- ]*$')]),
        area: new FormControl('', [Validators.pattern('^[a-zA-Z0-9- ]*$')]),
        city: new FormControl('', [Validators.pattern('^[a-zA-Z0-9- ]*$')]),
        zip: new FormControl('',[Validators.pattern('^[a-zA-Z0-9- ]*$')]),
        country: new FormControl('', [Validators.pattern('^[a-zA-Z ]*$')]),
        location: new FormGroup({
          x: new FormControl(''),
          y: new FormControl('')
        })
      }),
      active: new FormControl(false)
    });
  }

  setFormValues() {
    this.orgFormGroup.patchValue({
      name: this.orgDetails.name,
      id: this.orgDetails.id,
      email: this.orgDetails.email,
      website: this.orgDetails.website,
      businessType: this.orgDetails.businessType,
      dateOfIncorporation: this.orgDetails.dateOfIncorporation,
      active: this.orgDetails.active
    });
    // this.orgFormGroup.updateValueAndValidity(true);
    this.orgFormGroup.get('headQuarters')?.patchValue({
      building: this.orgDetails.headQuarters.building,
      street: this.orgDetails.headQuarters.street,
      area: this.orgDetails.headQuarters.area,
      city: this.orgDetails.headQuarters.city,
      zip: this.orgDetails.headQuarters.zip,
      country: this.orgDetails.headQuarters.country,
      location: {
        x: this.orgDetails.headQuarters.location.x,
        y: this.orgDetails.headQuarters.location.y
      }
    });
    this.orgFormGroup.updateValueAndValidity();
  }

  public saveOrg() {
    this.isFormSubmitted = true;
    this.orgFormGroup.markAllAsTouched();
    if (!!this.orgFormGroup.valid) {
      this.isLoader = true;
      let request = this.orgFormGroup.value;
      delete request['id']
      this.organizationService.saveOrganizationDetails(request).subscribe((res: any) => {
        this.isLoader = false;
        if (!!res.id) {
          this.showStatusDialog(AlertStatus.success, 'Details saved successfully.');
          this.fetchOrganizations();
          this.addNewOrganization();
          this.isFormSubmitted = false;
          this._snackBar.open("Details saved successfully.", '', {
            duration: 4000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      }, (error => {
        this.isLoader = false;
        this.showStatusDialog(AlertStatus.error, 'Saving details failed. Please try once again.');
      }));
    }
  }

  public updateOrg() {
    this.isFormSubmitted = true;
    this.orgFormGroup.markAllAsTouched();
    if (!!this.orgFormGroup.valid) {
      this.isLoader = true;
      let request = this.orgFormGroup.value;
      this.organizationService.updateOrganizationDetails(request).subscribe((res: any) => {
        this.isLoader = false;
        if (!!res.id) {
          this.showStatusDialog(AlertStatus.success, 'Details updated successfully.');
          this.fetchOrganizations();
          this.addNewOrganization();
          this.isFormSubmitted = false;
        }
      }, (error => {
        this.isLoader = false;
        this.showStatusDialog(AlertStatus.error, 'Updating details failed. Please try once again.');
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
