import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { BarServiceService } from '../../../src/services/bar-service.service';

@Injectable({
  providedIn: 'root'
})
export class ComplaintsService {
  header: any

  constructor(private http: HttpClient) { }
  token: any = sessionStorage.getItem("token");
  //new APIS
  getAllComplaints(headers:any): Observable<any> {
    // console.log("token", this.token)
    // this.header = new HttpHeaders().set("Authorization", 'Bearer ' + this.token);
    return this.http.get(`${environment.Mobile_URL}/complaints`,{headers}).pipe(catchError(err => of(err)));
  }
  getCompbyMonth(value:any,headers:any):Observable<any>{
    return this.http.post(`${environment.Mobile_URL}/complaints/byMonth`,value,{headers}).pipe(catchError(err => of(err)));
  }
  getCompchart(value:any,headers:any):Observable<any>{
    return this.http.post(`${environment.Mobile_URL}/complaints/chart`,value,{headers}).pipe(catchError(err => of(err)));
  }
  reAssign(value:any,headers:any):Observable<any>{
    return this.http.put(`${environment.Mobile_URL}/complaints/assign`,value,{headers}).pipe(catchError(err => of(err)));
  }


//old APIS
  updateStatus(id: any, body: any): Observable<any> {
    return this.http.put(`${environment.Mobile_URL}/complaints/${id}`, body).pipe(catchError(err => of(err)));
  }
  cmpHistory(body?: any): Observable<any> {
    return this.http.put(`${environment.Admin_URL}/complaints/cmphistory`, body).pipe(catchError(err => of(err)));
  }
  currentStatus(): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/complaints/cmpstatus/complaintsHistory`).pipe(catchError(err => of(err)));
  }
  updateCurrStatus(body: any): Observable<any> {
    return this.http.put(`${environment.Admin_URL}/complaints/cmpstatus/cmp-currentStatus`, body).pipe(catchError(err => of(err)))
  }
  addRemarks(cmpId: any, body: any): Observable<any> {
    return this.http.put(`${environment.Mobile_URL}/complaints/remarks/${cmpId}`, body).pipe(catchError(err => of(err)));
  }
  cmpById(cmpId: any): Observable<any> {
    return this.http.get(`${environment.Mobile_URL}/complaints/${cmpId}`).pipe(catchError(err => of(err)));
  }
}
