import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrganizationComponent } from './organization.component';
import { RoleGuard } from 'src/app/core/services/role-guard';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: OrganizationComponent, canActivate: [RoleGuard] }
    ])],
    exports: [RouterModule]
})
export class OrganizationRoutingModule { }
