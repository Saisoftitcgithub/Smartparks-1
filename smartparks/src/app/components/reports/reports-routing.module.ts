import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReportsComponent } from './reports.component';
import { RoleGuard } from 'src/app/core/services/role-guard';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ReportsComponent, canActivate: [RoleGuard] }
    ])],
    exports: [RouterModule]
})
export class ReportsRoutingModule { }
