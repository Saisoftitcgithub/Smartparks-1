import { Component, OnInit } from '@angular/core';
import { BranchService } from '../services/branch.service';
import { MenuItem } from 'primeng/api';
import { Timings } from '../utility/timings';
import { AlertStatus } from 'src/app/shared/components/status-messsage/status-messsage.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit {

  selectedBranch!: any;
  branchList: any = [];
  branchDetails!: any;
  gateDetailObj!: any;
  isEditGate: boolean = false;
  isLoader: boolean = false;
  cols!: any;
  menuList: MenuItem[] | undefined;
  activeMenu: MenuItem | undefined;
  activeIndex: number = 0;
  gateDetails: any = [];
  gatesData: any = [];
  isFormSubmitted: boolean = false;
  isGateFormSubmitted: boolean = false;
  countriesList: any = [];
  alertType: string = "";
  statusMessage: string = "";
  showDialog: boolean = false;
  branchFormGroup!: FormGroup;
  gateFormGroup!: FormGroup;

  constructor(private branchService: BranchService) {
  }

  ngOnInit() {
    this.menuList = [
      { label: 'Branch Details' },
      { label: 'Gates' }
    ];
    this.fetchBranches();
    this.initiateGateObjects();
    this.fetchCountires();
  }

  public addBranch() {
    this.isFormSubmitted = false;
    this.isGateFormSubmitted = false;
    this.selectedBranch = "";
    this.branchDetails = {
      name: '',
      id: '',
      type: '',
      address: {
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
      workstationId: '',
      latitude: '',
      longitude: '',
      startTime: '',
      endTime: '',
      totalSlots: 0,
      active: false
    };
    this.createNewForm();
  }

  initiateGateObjects() {
    this.cols = [
      { 'header': 'gateName', 'label': 'Gate Name' },
      { 'header': 'vehCameraName', 'label': 'Vehicle Camera Name' },
      { 'header': 'anprCameraName', 'label': 'Anpr Camera Name' },
      { 'header': 'qrsno', 'label': 'QR S.No' },
    ];
  }

  fetchBranches() {
    this.isLoader = true;
    this.branchService.getBranchDetails().subscribe((res: any) => {
      this.isLoader = false;
      if (res.content.length > 0) {
        this.branchList = res.content;
      }
      else {
        this.branchList = [];
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

  onBranchSelect(event: any) {
    this.createNewForm();
    this.selectedBranch = event.value;
    this.branchDetails = event.value;
    this.setFormValues();
  }

  createNewForm() {
    this.branchFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z- ]*$')]),
      id: new FormControl(''),
      workstationId: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9- ]*$')]),
      type: new FormControl('', [Validators.pattern('^[a-zA-Z- ]*$')]),
      startTime: new FormControl(''),
      endTime: new FormControl(''),
      totalSlots: new FormControl('', [Validators.pattern('^[0-9]*$')]),
      active: new FormControl(true),
      address: new FormGroup({
        building: new FormControl('', [Validators.pattern('^[a-zA-Z- ]*$')]),
        street: new FormControl('', [Validators.pattern('^[a-zA-Z0-9- ]*$')]),
        area: new FormControl('', [Validators.pattern('^[a-zA-Z0-9- ]*$')]),
        city: new FormControl('', [Validators.pattern('^[a-zA-Z0-9- ]*$')]),
        zip: new FormControl('', [Validators.pattern('^[a-zA-Z0-9- ]*$')]),
        country: new FormControl('', [Validators.pattern('^[a-zA-Z ]*$')]),
        location: new FormGroup({
          x: new FormControl(''),
          y: new FormControl(''),
        })
      }),
    });
  }

  setFormValues() {
    this.branchFormGroup.patchValue({
      name: this.branchDetails.name,
      id: this.branchDetails.id,
      workstationId: this.branchDetails.workstationId,
      type: this.branchDetails.type,
      active: this.branchDetails.active,
      totalSlots: this.branchDetails.totalSlots,
      startTime: this.branchDetails.startTime.split(':')[0] + ':' + this.branchDetails.startTime.split(':')[1],
      endTime: this.branchDetails.endTime.split(':')[0] + ':' + this.branchDetails.endTime.split(':')[1]
    });
    this.branchFormGroup.get('address')?.patchValue({
      building: this.branchDetails.address.building,
      street: this.branchDetails.address.street,
      area: this.branchDetails.address.area,
      city: this.branchDetails.address.city,
      zip: this.branchDetails.address.zip,
      country: this.branchDetails.address.country,
      location: {
        x: this.branchDetails.address.location.x,
        y: this.branchDetails.address.location.y
      }
    });
    this.branchFormGroup.updateValueAndValidity();
  }

  public saveBranch() {
    this.isFormSubmitted = true;
    this.branchFormGroup.markAllAsTouched();
    if (this.branchFormGroup.valid) {
      this.isLoader = true;
      let request = this.branchFormGroup.value;
      this.branchService.saveBranchDetails(request).subscribe((res: any) => {
        this.isLoader = false;
        if (!!res.id) {
          this.showStatusDialog(AlertStatus.success, 'Details saved successfully.');
          this.fetchBranches();
          this.activeIndex = 1;
          this.selectedBranch.id = res.id;
          this.isFormSubmitted = false;
          this.addBranch();
        }
      }, (error => {
        this.isLoader = false;
        this.showStatusDialog(AlertStatus.error, 'Saving details failed. Please try once again.');
      }));
    }
  }

  public updateBranch() {
    this.isFormSubmitted = true;
    this.branchFormGroup.markAllAsTouched();
    if (!!this.branchFormGroup.valid) {
      this.isLoader = true;
      let request = this.branchFormGroup.value;
      this.branchService.updateBranchDetails(request).subscribe((res: any) => {
        this.isLoader = false;
        if (!!res.id) {
          this.showStatusDialog(AlertStatus.success, 'Details updated successfully.');
          this.fetchBranches();
          this.addBranch();
        }
      }, (error => {
        this.isLoader = false;
        this.showStatusDialog(AlertStatus.error, 'Updating details failed. Please try once again.');
      }));
    }
  }

  public onTabChange(event: any) {
    this.fetchGates();
  }

  addGate() {
    this.gateDetailObj = {
      gateName: '',
      vehCameraName: '',
      anprCameraName: '',
      qrsno: ''
    }
    this.isEditGate = false;
    this.isGateFormSubmitted = false;
    this.createGateForm();
  }

  createGateForm() {
    this.gateFormGroup = new FormGroup({
      id: new FormControl(''),
      gateName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9-_ ]*$')]),
      vehCameraName: new FormControl('', [Validators.pattern('^[a-zA-Z0-9-_ ]*$')]),
      anprCameraName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9-_ ]*$')]),
      qrsno: new FormControl('', [Validators.pattern('^[a-zA-Z0-9-_ ]*$')])
    });
  }

  fetchGates() {
    this.isLoader = true;
    this.branchService.getGateDetails(this.selectedBranch.id).subscribe((res: any) => {
      this.gatesData = res.content;
      this.isLoader = false;
    }, (error => {
      this.isLoader = false;
    }));
  }

  editGate(event: any) {
    this.createGateForm();
    this.gateDetailObj = { ...event };
    this.isEditGate = true;
    this.isGateFormSubmitted = false;
    this.setGateFormValue();
  }

  setGateFormValue() {
    this.gateFormGroup.patchValue({
      id: this.gateDetailObj.id,
      gateName: this.gateDetailObj.gateName,
      vehCameraName: this.gateDetailObj.vehCameraName,
      anprCameraName: this.gateDetailObj.anprCameraName,
      qrsno: this.gateDetailObj.qrsno
    });
    this.gateFormGroup.updateValueAndValidity();
  }

  saveGate() {
    this.isGateFormSubmitted = true;
    this.gateFormGroup.markAllAsTouched();
    if (!!this.gateFormGroup.valid) {
      this.isLoader = true;
      let request = this.gateFormGroup.value;
      request['branch'] = this.selectedBranch.id;
      request['qrSNo'] = request.qrsno;
      this.branchService.saveGateDetails(request).subscribe((res: any) => {
        this.isLoader = false;
        if (!!res?.id) {
          this.showStatusDialog(AlertStatus.success, 'Details saved successfully.');
          this.gateDetailObj = undefined;
          this.fetchGates();
          this.addGate();
          this.isGateFormSubmitted = false;
        }
      }, (error => {
        this.isLoader = false;
        this.showStatusDialog(AlertStatus.error, 'Saving details failed. Please try once again.');
      }));
    }
  }

  updateGate() {
    this.isGateFormSubmitted = true;
    this.gateFormGroup.markAllAsTouched();
    if (!!this.gateFormGroup.valid) {
      this.isLoader = true;
      let request = this.gateFormGroup.value;
      request['branch'] = this.selectedBranch.id;
      request['qrSNo'] = request.qrsno;
      this.branchService.updateGateDetails(request).subscribe((res: any) => {
        this.isLoader = false;
        this.showStatusDialog(AlertStatus.success, 'Details updated successfully.');
        this.fetchGates();
        this.addGate()
        this.isGateFormSubmitted = false;
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
