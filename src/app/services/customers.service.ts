import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http: HttpClient) { }

  getTopCustDetailsbyDid(did: any, id: any,headers:any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/topCustomer/topCustomer/${id}/${did}`,{headers})
  }
  getLowCustDetailsbyDid(did: any, id: any,headers:any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/lowCustomer/lowCustomers/${id}/${did}`,{headers})
  }
  getHighCustDetailsbyDid(did: any,headers:any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/highConsumption/highCustomers/${did}`,{headers})
  }
  getTopCustDetails(id: any,headers:any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/topCustomer/topCustomer/${id}`,{headers})
  }
  getLowCustDetails(id: any,headers:any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/lowCustomer/lowCustomers/${id}`,{headers})
  }
  getHighCustDetails(headers:any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/highConsumption/highCustomers`,{headers})
  }
  sendMail(): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/topCustomer/sendMail`)
  }
}
