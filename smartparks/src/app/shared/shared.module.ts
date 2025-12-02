import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { StatusMesssageComponent } from './components/status-messsage/status-messsage.component';
import { DialogModule } from 'primeng/dialog';
import { AlphanumericDirective } from './directives/alphanumeric.directive';


@NgModule({
  exports: [
    LoaderComponent,
    StatusMesssageComponent,
    AlphanumericDirective
  ],
  declarations: [
    LoaderComponent,
    StatusMesssageComponent,
    AlphanumericDirective
  ],
  imports: [
    CommonModule,
    DialogModule
  ]
})
export class SharedModule { }
