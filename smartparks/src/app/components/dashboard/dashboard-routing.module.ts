import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { RoleGuard } from 'src/app/core/services/role-guard';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: DashboardComponent, canActivate: [RoleGuard] }
    ])],
    exports: [RouterModule]
})
export class DashboardsRoutingModule { }
