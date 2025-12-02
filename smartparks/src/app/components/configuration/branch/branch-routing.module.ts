import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BranchComponent } from './branch.component';
import { RoleGuard } from 'src/app/core/services/role-guard';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: BranchComponent, canActivate: [RoleGuard] }
    ])],
    exports: [RouterModule]
})
export class BranchRoutingModule { }
