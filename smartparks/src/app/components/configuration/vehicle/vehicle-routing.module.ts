import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VehicleComponent } from './vehicle.component';
import { RoleGuard } from 'src/app/core/services/role-guard';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: VehicleComponent, canActivate: [RoleGuard] }
    ])],
    exports: [RouterModule]
})
export class VehicleRoutingModule { }
