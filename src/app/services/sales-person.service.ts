import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SalesPersonService {

  constructor(private http: HttpClient) { }

  getRegions(headers: any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/salesPerson/byCity`, { headers })
  }
  createSales(body: any, headers: any): Observable<any> {
    return this.http.put(`${environment.Admin_URL}/salesPerson`, body, { headers })
  }
  getAllSales(headers: any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/salesPerson/allSales`, { headers })
  }
  getSalesbyCity(city: any, headers: any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/salesPerson/byCity/${city}`, { headers })
  }
  getSalesbyID(salesId: any, headers: any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/salesPerson/allSales/${salesId}`, { headers })
  }
  getMerbySalesID(headers: any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/salesPerson/bysalesId`, { headers })
  }
  getCompbysales(headers:any):Observable<any>{
    return this.http.get(`${environment.Mobile_URL}/complaints/getbySales`,{headers})
  }
}
