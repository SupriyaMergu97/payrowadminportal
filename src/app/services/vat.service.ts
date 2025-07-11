import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class VatService {

    constructor(private http: HttpClient) { }

    createAuditor(formData: any): Observable<any> {
        return this.http.put(`${environment.Admin_URL}/vat/auditor`, formData).pipe(catchError(error => of(error)));
    };
    getAuditorList(): Observable<any> {
        return this.http.get(`${environment.Admin_URL}/vat/auditors`).pipe(catchError(error => of(error)));
    }
    updateStatus(id: any, body: any): Observable<any> {
        return this.http.put(`${environment.Admin_URL}/vat/auditor/${id}`, body).pipe(catchError(err => of(err)))
    }
    updateStatusVat(id: any, body: any): Observable<any> {
        return this.http.put(`${environment.Admin_URL}/vat/vatData/status/${id}`, body).pipe(catchError(err => of(err)))
    }
    getVatData(): Observable<any> {
        return this.http.get(`${environment.Admin_URL}/vat/vatData`).pipe(catchError(err => of(err)))
    }


}
