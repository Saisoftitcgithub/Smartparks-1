import { Component, OnInit } from '@angular/core';
import { BranchService } from '../services/branch.service';
import { VehicleService } from '../services/vehicle.service';
import { AlertStatus } from 'src/app/shared/components/status-messsage/status-messsage.component';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {

  selectedBranch!: any;
  cols!: any;
  branchList: any = [];
  vehicleDetails: any;
  isEditVehicle: boolean = false;
  vechileTypeData!: any;
  isFormSubmitted: boolean = false;
  isLoader: boolean = false;

  alertType: string = "";
  statusMessage: string = "";
  showDialog: boolean = false;

  constructor(private branchService: BranchService, private vehicleService: VehicleService) {
  }

  ngOnInit(): void {
    this.fetchBranches();
    this.cols=[
      { 'header': 'vehicleType', label: 'Vehicle Type'},
      { 'header': 'active', label: 'Status'}
    ];
  }

  fetchBranches() {
    this.isLoader = true;
    this.branchService.getBranchDetails().subscribe((res: any) => {
      this.branchList = [];
      this.isLoader = false;
      if (res.content.length > 0) {
        this.branchList = res.content;
      }
    }, (error => {
      this.isLoader = false;
    }));
  }

  addVehicle() {
    this.vehicleDetails = {
      vehicleType: '',
      branch: '',
      active: true,
    };
    this.isEditVehicle = false;
    this.isFormSubmitted = false;
  }

  onBranchSelect(event: any) {
    this.selectedBranch = event.value;
    this.getVehicleList();
  }

  public getVehicleList() {
    this.isLoader = true;
    this.vehicleService.getVehicleListDetails(this.selectedBranch.id).subscribe((res: any) => {
      this.isLoader = false;
      if (res.content.length > 0) {
        this.vechileTypeData = res.content;
      }
      else {
        this.vechileTypeData = [];
      }
    }, (error => {
      this.isLoader = false;
    }));
  }

  public saveVehicle() {
    this.isFormSubmitted = true;
    if (this.vehicleDetails.vehicleType) {
      this.isLoader = true;
      let request = this.vehicleDetails;
      request['branch'] = this.selectedBranch.id;
      request['vehType'] = request.vehicleType;
      this.vehicleService.saveVehicleDetails(request).subscribe((res: any) => {
        this.isLoader = false;
        this.showStatusDialog(AlertStatus.success, 'Details saved successfully.');
        this.getVehicleList();
        this.addVehicle();
        this.isFormSubmitted = false;
      }, (error => {
        this.isLoader = false;
        this.showStatusDialog(AlertStatus.error, 'Saving details failed. Please try once again.');
      }));
    }
  }

  editVehicle(rowData: any) {
    this.vehicleDetails = { ...rowData };
    this.isEditVehicle = true;
    this.isFormSubmitted = false;
  }

  updateVehicle() {
    this.isFormSubmitted = true;
    if (this.vehicleDetails.vehicleType) {
      this.isLoader = true;
      let request = this.vehicleDetails;
      request['branch'] = this.selectedBranch.id;
      request['vehicleList'] = [{
        vehType: request.vehicleType,
        active: request.active,
        id: request.id
      }];
      this.vehicleService.updateVehicleDetails(request).subscribe((res: any) => {
        this.isLoader = false;
        this.showStatusDialog(AlertStatus.success, 'Details updated successfully.');
        this.getVehicleList();
        this.addVehicle();
        this.isFormSubmitted = false;
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
