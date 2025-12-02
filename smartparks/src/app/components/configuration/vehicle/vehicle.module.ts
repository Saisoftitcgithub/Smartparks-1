import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleRoutingModule } from './vehicle-routing.module';
import { VehicleComponent } from './vehicle.component';
import { FormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    VehicleComponent
  ],
  imports: [
    CommonModule,
    VehicleRoutingModule,
    FormsModule,
    InputSwitchModule,
    InputTextModule,
    TableModule,
    ToolbarModule,
    DropdownModule,
    ButtonModule,
    SharedModule
  ]
})
export class VehicleModule { }
