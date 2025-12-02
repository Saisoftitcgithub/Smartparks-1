import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ReportService } from './reports.service';
import { BranchService } from '../configuration/services/branch.service';
import { DatePipe } from '@angular/common';
import { AlertStatus } from 'src/app/shared/components/status-messsage/status-messsage.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  providers: [DatePipe]
})
export class ReportsComponent implements OnInit {

  startDate!: any;
  endDate!: any;
  selectedReport!: any;
  isLoader: boolean = false;
  cols!: any;
  branchList: any = [];
  selectedBranch!: any;
  reportData!: any;
  reportsList: any = [
    // { name: 'Vehicle Type', value: 'vehicle' },
    { name: 'Activity', value: 'activity' }
  ];

  alertType: string = "";
  statusMessage: string = "";
  showDialog: boolean = false;

  @ViewChild('filter') filter!: ElementRef;

  constructor(private reportsService: ReportService,
    private branchService: BranchService,
    private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.fetchBranches();
  }

  public getReportDetails() {
    let request = {
      type: this.selectedReport?.value,
      start: !!this.startDate ? new Date(Date.UTC(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate())) : '',
      end: !!this.endDate ? new Date(Date.UTC(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate())) : '',
      branchSet: this.selectedBranch?.map((x: any) => x.id),
    }
    this.isLoader = true;
    this.reportsService.fetchReportData(request).subscribe((res: any) => {
      this.isLoader = false;
      if (this.selectedReport.value == 'activity') {
        this.prepareActivityCols();
      }
      if (res.length > 0) {
        this.reportData = res;
        this.reportData.forEach((x: any) => x.branchName = x.branch.name);
      }
      else {
        this.reportData = [];
      }
    }, (error: any) => {
      this.isLoader = false;
      this.reportData = [];
      if (error.status == 'PRECONDITION_FAILED') {
        this.showStatusDialog(AlertStatus.error, 'Please select all the fields to retrieve reports.');
      }
      else {
        this.showStatusDialog(AlertStatus.error, error);
      }
    });
  }

  prepareActivityCols() {
    this.cols = [
      { 'header': 'branchName', 'label': 'Branch Name', 'type': 'string'},
      { 'header': 'eventDate', 'label': 'Event Date', 'type': 'date' },
      { 'header': 'category', 'label': 'Category', 'type': 'string' },
      { 'header': 'plateNumber', 'label': 'License Plate', 'type': 'string' },
      { 'header': 'vehicleType', 'label': 'Vehicle Type', 'type': 'string' },
      { 'header': 'entryTime', 'label': 'Entry Time', 'type': 'time' },
      { 'header': 'exitTime', 'label': 'Exit Time', 'type': 'time' },
      { 'header': 'plateCheckDt', 'label': 'Anpr Check Date', 'type': 'time' },
      { 'header': 'qrcheckDt', 'label': 'Qrcode Check Date', 'type': 'time' },
      { 'header': 'status', 'label': 'Status', 'type': 'string' },
      { 'header': 'reason', 'label': 'Reason', 'type': 'string' },      
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

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
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
