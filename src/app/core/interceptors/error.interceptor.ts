import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IdentityService } from '../services/identity.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private identity: IdentityService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // return next.handle(request).pipe(catchError((err) => {
        //     if (err instanceof HttpErrorResponse) {
        //         if (err.status === 401) {
        //             // auto logout if 401 response returned from api
        //             if (this.identity.getExpMinutes() <= 0) {
        //                 this.identity.logout();
        //                 this.router.navigate(['login']);
        //             }

        //             this.router.navigate(['/error'], { queryParams: { code: '401' } });
        //             return;
        //         }
        //     }

        //     return throwError(err);
        // }));

        return next.handle(request);
    }
}
