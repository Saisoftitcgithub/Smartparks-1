import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


@NgModule({
    imports: [RouterModule.forChild([
        { path: 'organization', loadChildren: () => import('./organization/organization.module').then(m => m.OrganizationModule) },
        { path: 'branch', loadChildren: () => import('./branch/branch.module').then(m => m.BranchModule) },
        { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
        { path: 'vehicle', loadChildren: () => import('./vehicle/vehicle.module').then(m => m.VehicleModule) },
        // { path: 'integration', loadChildren: () => import('./integration/integration.module').then(m => m.IntegrationModule) },
        { path: '**', redirectTo: '/auth/error' }
    ])],
    exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
