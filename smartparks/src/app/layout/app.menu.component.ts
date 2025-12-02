import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        // this.model = [
        //     {
        //         label: 'Home',
        //         items: [
        //             { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/app/dashboard'] },
        //             { label: 'Reports', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/app/reports'] },
        //             {
        //                 label: 'Configuration',
        //                 items: [
        //                     { label: 'Organization', icon: 'pi pi-fw pi-home', routerLink: ['/app/config/organization'] },
        //                     { label: 'Branch', icon: 'pi pi-fw pi-server', routerLink: ['/app/config/branch'] },
        //                     { label: 'Users', icon: 'pi pi-fw pi-users', routerLink: ['/app/config/users'] },
        //                     { label: 'Vehicle', icon: 'pi pi-fw pi-car', routerLink: ['/app/config/vehicle'] },
        //                     { label: 'Integration', icon: 'pi pi-fw pi-copy', routerLink: ['/app/config/integration'] }
        //                 ]
        //             },
        //         ]
        //     },
        // ];
        this.createMenu();
    }

    createMenu() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/app/dashboard'] },
                    { label: 'Reports', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/app/reports'] }
                ]
            }
        ];
        if (this.checkAdminUser()) {
            this.model[0].items.push(
                {
                    label: 'Configuration',
                    items: [
                        { label: 'Organization', icon: 'pi pi-fw pi-home', routerLink: ['/app/config/organization'] },
                        { label: 'Branch', icon: 'pi pi-fw pi-server', routerLink: ['/app/config/branch'] },
                        { label: 'Users', icon: 'pi pi-fw pi-users', routerLink: ['/app/config/users'] },
                        { label: 'Vehicle', icon: 'pi pi-fw pi-car', routerLink: ['/app/config/vehicle'] },
                        // { label: 'Integration', icon: 'pi pi-fw pi-copy', routerLink: ['/app/config/integration'] }
                    ]
                }
            );
        }
    }

    checkAdminUser() {
        let userDetails = JSON.parse(localStorage.getItem('employee') || '{}');
        let userAuthoritiesList = userDetails.authorities.map((x: any) => x.authority);
        if (userAuthoritiesList.indexOf('ADMIN') >= 0) {
            return true;
        }
        else {
            return false;
        }
    }
}
