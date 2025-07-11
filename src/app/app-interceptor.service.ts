import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CookieService} from 'ngx-cookie-service'
@Injectable({
  providedIn: 'root'
})
export class AppInterceptorService {

  constructor(public cookieService:CookieService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = sessionStorage.getItem("token");
    // const token = this.cookieService.get("auth_tok");
    console.log(token,"token")
    // const token = this.auth.getAccessToken('isLoggedIn');
    req = req.clone({
      setHeaders: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${token}`
      }
    });
    /**
    const headers = req.headers.set('Authorization', `Bearer ${token}`)
      .set('x-request-id', 'identification');
    req = req.clone({ headers });
     */
    return next.handle(req);
  }
}
