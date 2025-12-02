import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IntegrationComponent } from './integration.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: IntegrationComponent }
    ])],
    exports: [RouterModule]
})
export class IntegrationRoutingModule { }
