import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { RoleGuard } from 'src/app/core/services/role-guard';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: UsersComponent, canActivate: [RoleGuard] }
    ])],
    exports: [RouterModule]
})
export class UsersRoutingModule { }
