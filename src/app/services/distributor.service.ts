import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { values } from 'lodash';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DistributorService {

  constructor(private http: HttpClient) { }
  createDistributorBasic(body: any, headers: any): Observable<any> {
    return this.http.post(`${environment.Admin_URL}/distributor/newDistributor`, body, { headers });
  }
  getDistbyId(did: any, headers: any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/distributor/getDistributor/${did}`, { headers })
  }
  getAllDistributors(headers: any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/distributor/getDistributor`, { headers })
  }
  updateDistributor(body: any, headers: any): Observable<any> {
    return this.http.put(`${environment.Admin_URL}/distributor/updateDistributor`, body, { headers })
  }
  getRegMngr(headers: any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/emp/onlineEmp`, { headers })
  }
  getAllAdminDetails(headers: any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/distributor/getAdmin`, { headers })
  }
  getAdminByID(id: any, headers: any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/distributor/getAdmin/${id}`, { headers })
  }
  addSalesPerson(body: any, id: any, headers: any): Observable<any> {
    return this.http.put(`${environment.Admin_URL}/distributor/addSalePerson/${id}`, body, { headers })
  }
  addGroupId(body: any, headers: any): Observable<any> {
    return this.http.post(`${environment.Admin_URL}/ca/group/creation`, body, { headers })
  }
  getGroupIds(headers: any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/ca/group`, { headers })
  }
}
