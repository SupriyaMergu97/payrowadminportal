import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class HomeService {
    // private adminUrl = 'http://localhost:3031/api/'
    constructor(private http: HttpClient) { }
    upload(data: any, headers: any) {
        console.log(data, 'dddddddd')

        // const req = new HttpRequest('PUT',`${this.adminUrl}/home/mtupload`,formData,{
        //     reportProgress:true,
        //     responseType:'json'
        // });
        // return this.http.request(req);
        return this.http.put<any>(`${environment.Admin_URL}/home/mtupload`, data, { headers })
    }
    getFiles(emailId: any, headers: any): Observable<any> {
        return this.http.get(`${environment.Admin_URL}/home/mtimages/${emailId}`, { headers });
    };

    //dashboard consolidate
    getAllProductValues(body: any, headers: any): Observable<any> {
        return this.http.post(`${environment.Admin_URL}/consolidated`, body, { headers })
    }


    //product Type module APIs
    getProductTypeDetails(body: any, headers: any): Observable<any> {
        return this.http.post(`${environment.Admin_URL}/orderDetails/productType`, body, { headers })
    }
    getServiceTypes(headers: any): Observable<any> {
        return this.http.put(`${environment.Admin_URL}/home/service/serviceType`, '', { headers });
    }
    getStatusData(headers: any): Observable<any> {
        return this.http.get(`${environment.Admin_URL}/home/serviceStatus/serviceType`, { headers }).pipe(catchError(err => of(err)));
    }
    updateServceStatus(pos: any, body: any, headers: any): Observable<any> {
        return this.http.put(`${environment.Admin_URL}/home/service/serviceType/${pos}`, body, { headers }).pipe(catchError(err => of(err)));
    }
    updateCurrentStatus(body: any, headers: any): Observable<any> {
        return this.http.put(`${environment.Admin_URL}/home/current/status/currentStatus`, body, { headers }).pipe(catchError(err => of(err)));
    }
    barchart(itemName: any, headers: any): Observable<any> {
        return this.http.get(`${environment.Admin_URL}/home/getByItem/${itemName}`, { headers }).pipe(catchError(err => of(err)));
    }
    DashboardBarchart(headers: any): Observable<any> {
        return this.http.get(`${environment.Admin_URL}/home/distributorReport`, { headers }).pipe(catchError(err => of(err)));
    }

    dashboardChart(year: any, headers: any): Observable<any> {
        return this.http.get(`${environment.Admin_URL}/home/chartData/${year}`, { headers });
    }
    consolidateChart(body: any, headers: any): Observable<any> {
        return this.http.post(`${environment.Admin_URL}/home/product`, body, { headers });
    }
    mtServices(headers: any): Observable<any> {
        return this.http.get(`${environment.Admin_URL}/home/service`, { headers });
    }
    mtBarChart(body: any, headers: any): Observable<any> {
        return this.http.post(`${environment.Admin_URL}/home/mtchart`, body, { headers });
    }
    mtServChart(body: any, headers: any): Observable<any> {
        return this.http.post(`${environment.Admin_URL}/home/martketTdy`, body, { headers });
    }

    getData(signature: any,timestamp:any): Observable<any> {


        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'x-signature': signature,
            'x-deviceid': 'deviceId_value',
            'x-uuid': 'IMEI_value',
            'x-timestamp': timestamp,
        });
        // const params = new HttpParams().set('page', '1');
        return this.http.get(`https://payrowdev.uaenorth.cloudapp.azure.com/mobileapis/settlementJson/1`, { headers})
}
}
