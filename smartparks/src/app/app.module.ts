import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseHttpInterceptor } from './core/services/base-http-intercept.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppLayoutModule } from './layout/app.layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideUserIdleConfig } from 'angular-user-idle';
import { MatDialogModule } from '@angular/material/dialog';
import { SessionInActivityModalComponent } from './shared/dialogs/session-in-activity-modal/session-in-activity-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    SessionInActivityModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppLayoutModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BaseHttpInterceptor, multi: true },
    provideUserIdleConfig({ idle: 3600, timeout: 3600, ping: 120 })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
