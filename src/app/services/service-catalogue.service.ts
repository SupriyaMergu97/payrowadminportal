import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class ServiceCatalogueService {
    constructor(private http: HttpClient) {
    }
    userData = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzFmMGY0YjM0M2JhMDAwODMxMTA5Y2YiLCJlbWFpbElkIjoic3Vwcml5YW1lcmd1MTk5N0BnbWFpbC5jb20iLCJuYW1lIjoiUGF5cm93IiwiZGlzdElkIjoiZGlkNDE0NDYzIiwicm9sZSI6ImRpc3RyaWJ1dG9yIiwiaWF0IjoxNjc4MTkxOTExfQ.jzaB4MG_TrVYEuYODrz-Jbmal8tHFbWdGy-F23VxRQw"
    // const userData = this.cookieService.get("auth_tok");
    decodedToken = jwtDecode(this.userData);
    // emailI
    // deviceId = this.decodedToken.emailId || {};
    createCategory(body: any, headers: any): Observable<any> {
        return this.http.post(`${environment.srvCatalalogue_URL}/category`, body, { headers }).pipe(catchError(error => of(error)))
    }
    getCategories(headers: any): Observable<any> {
        return this.http.get(`${environment.srvCatalalogue_URL}/category`, { headers }).pipe(catchError(err => of(err)));
    }
    getCatbyID(catId: any, headers: any): Observable<any> {
        return this.http.get(`${environment.srvCatalalogue_URL}/category/${catId}`, { headers }).pipe(catchError(err => of(err)));
    }
    updateCatById(body: any, headers: any): Observable<any> {
        return this.http.put(`${environment.srvCatalalogue_URL}/category/update`, body, { headers }).pipe(catchError(err => of(err)));
    }
    createService(body: any, headers: any): Observable<any> {
        return this.http.post(`${environment.srvCatalalogue_URL}/services`, body, { headers }).pipe(catchError(error => of(error)))
    }
    getServices(headers: any): Observable<any> {
        return this.http.get(`${environment.srvCatalalogue_URL}/services`, { headers }).pipe(catchError(err => of(err)));
    }
    getServByCat(catId: any, headers: any): Observable<any> {
        return this.http.get(`${environment.srvCatalalogue_URL}/services/byCatId/${catId}`, { headers }).pipe(catchError(err => of(err)));
    }
    updateServ(body: any, headers: any): Observable<any> {
        return this.http.put(`${environment.srvCatalalogue_URL}/services/update`, body, { headers }).pipe(catchError(err => of(err)));
    }
    getServbyId(servId: any, headers: any): Observable<any> {
        return this.http.get(`${environment.srvCatalalogue_URL}/services/${servId}`, { headers }).pipe(catchError(err => of(err)));
    }
    getTaxCodes(headers: any): Observable<any> {
        return this.http.get(`${environment.gateway_URL}/taxMaster/list`, { headers }).pipe(catchError(err => of(err)));
    }
    getTaxDetailsByTaxCode(taxCode: any, headers: any): Observable<any> {
        return this.http.get(`${environment.gateway_URL}/taxMaster/${taxCode}`, { headers }).pipe(catchError(err => of(err)));
    }





    createMaster(data: any): Observable<any> {
        return this.http.post(`${environment.srvCatalalogue_URL}/merchants`, data).pipe(catchError(error => of(error)));
    }
    createServices(data: any): Observable<any> {
        return this.http.post(`${environment.srvCatalalogue_URL}/governametServices`, data).pipe(catchError(error => of(error)));
    }
    getMasterSheet(mid: any): Observable<any> {
        return this.http.get(`${environment.srvCatalalogue_URL}/merchantServices/${mid}`).pipe(catchError(err => of(err)));
    }
    getService(): Observable<any> {
        return this.http.get(`${environment.srvCatalalogue_URL}/governametServices`).pipe(catchError(err => of(err)));
    }
    getmasters(): Observable<any> {
        return this.http.get(`${environment.srvCatalalogue_URL}/merchants`).pipe(catchError(err => of(err)));
    }
    crtMrchntServices(data: any): Observable<any> {
        return this.http.post(`${environment.srvCatalalogue_URL}/merchantServices`, data).pipe(catchError(error => of(error)));
    }
    getMerchntServices(): Observable<any> {
        return this.http.get(`${environment.srvCatalalogue_URL}/merchantServices`).pipe(catchError(err => of(err)));
    }
}
