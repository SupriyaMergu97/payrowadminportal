import { Injectable } from '@angular/core';
import {HttpClient,HttpEvent,HttpRequest} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class OpCenterService {

    constructor(private http:HttpClient) { }
    salesPerformance():Observable<any>{
            
            return this.http.get(`${environment.Admin_URL}/opc/salesPerformance`).pipe(catchError(err=>of(err)));
    }
    storePerformancebyDid(distId:any):Observable<any>{
        return this.http.get(`${environment.Admin_URL}/opc/allStores/${distId}`).pipe(catchError(err=>of(err)));
    }
    storePerformance():Observable<any>{
        return this.http.get(`${environment.Admin_URL}/opc/allStores`).pipe(catchError(err=>of(err)));
    }
    statusIntidPerformance(distId:any,tid:any,body:any):Observable<any>{
        return this.http.put(`${environment.Admin_URL}/opc/status/${distId}/${tid}`,body).pipe(catchError(err=>of(err)));
    }
    gMapsLocations(distId:any):Observable<any>{
        return this.http.get(`${environment.Admin_URL}/opc/locations/${distId}`).pipe(catchError(err=>of(err)));
    }
    appDownloads():Observable<any>{
        return this.http.get(`${environment.Admin_URL}/opc/downloads`).pipe(catchError(err=>of(err)));
    }
    targetUpdate(body:any):Observable<any>{
        return this.http.put(`${environment.Admin_URL}/opc/update/appDownload`,body).pipe(catchError(err=>of(err)));
    }
}
