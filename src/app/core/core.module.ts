import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthGuard } from '../core/guards/auth.guard';
import { NoAuthGuard } from '../core/guards/no-auth.guard';

import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { IdentityService } from './services/identity.service';
import { AppManagerService } from './services/app-manager.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {ToastrModule} from 'ngx-toastr'

@NgModule({
  imports: [HttpClientModule,BrowserAnimationsModule,ToastrModule.forRoot()],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    IdentityService,
    AppManagerService,
    AuthGuard,
    NoAuthGuard
  ]
})
export class CoreModule { }
