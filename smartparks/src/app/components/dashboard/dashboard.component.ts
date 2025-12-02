import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { BranchService } from '../configuration/services/branch.service';
import { DashboardService } from './dashboard.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];
    products!: any[];

    sessionChartData: any;
    sessionChartOptions!: any;
    hourlyChartData: any;
    hourlyChartOptions: any;

    pieData: any;
    pieOptions: any;
    selectedDate!: any;
    selectedBranch!: any;
    branchList: any = [];
    isLoader: boolean = false;

    subscription!: Subscription;

    constructor(public layoutService: LayoutService,
        private branchService: BranchService,
        private dashboardService: DashboardService) {
    }

    ngOnInit() {
        this.selectedDate = new Date();
        this.fetchBranches();
        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];
    }

    fetchBranches() {
        let userDetails = JSON.parse(localStorage.getItem('employee') || '{}');
        if (userDetails['branches'].length > 0) {
            this.branchList = userDetails['branches'];
            this.selectedBranch = this.branchList[0];
            this.refreshDashboard();
        }
        else {
            this.isLoader = true;
            this.branchService.getBranchDetails().subscribe((res: any) => {
                this.isLoader = false;
                if (res.content.length > 0) {
                    this.branchList = res.content;
                    this.selectedBranch = this.branchList[0];
                    this.refreshDashboard();
                }
                else {
                    this.branchList = [];
                }
            }, (error => {
                this.isLoader = false;
            }));
        }
    }

    onBranchSelect(event: any) {
        this.selectedBranch = event.value;
    }

    refreshDashboard() {
        let request = {
            "branchSet": [this.selectedBranch.id],
            "start": new Date(Date.UTC(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), this.selectedDate.getDate())),
        }
        this.dashboardService.fetchDashboardData(request).subscribe((res: any) => {
            console.log(res);
            this.initPieChart(res);
            this.initHourChart(res);
            this.initSessionChart(res);
        });
    }

    initPieChart(dataSet: any) {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.pieData = {
            labels: ['Entered', 'Accepted', 'Rejected'],
            datasets: [
                {
                    data: [dataSet['entered'], dataSet['accepted'], dataSet['rejected']],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--indigo-500'),
                        documentStyle.getPropertyValue('--purple-500'),
                        documentStyle.getPropertyValue('--teal-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--indigo-400'),
                        documentStyle.getPropertyValue('--purple-400'),
                        documentStyle.getPropertyValue('--teal-400')
                    ]
                }]
        };

        this.pieOptions = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };

    }

    initHourChart(dataSet: any) {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        let keys: any = [];
        let values: any = [];
        dataSet.hrrpt.forEach((x: any) => {
            keys.push(...Object.keys(x));
            values.push(...Object.values(x));
        });
        this.hourlyChartData = {
            labels: keys,
            datasets: [
                {
                    label: 'Vehicles Visited',
                    data: values,
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: .4
                },
            ]
        };

        this.hourlyChartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    initSessionChart(dataSet: any) {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        this.sessionChartData = {
            labels: ['Morning', 'Afternoon', 'Evening'],
            datasets: [
                {
                    label: 'Vehicles Visited',
                    data: [dataSet['entered12'], dataSet['entered16'], dataSet['entered24']],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--orange-600'),
                    borderColor: documentStyle.getPropertyValue('--orange-600'),
                    tension: .4
                },
            ]
        };

        this.sessionChartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                        display: false,
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                        display: false,
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
