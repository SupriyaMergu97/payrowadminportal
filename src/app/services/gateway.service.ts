import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class GatewayService {

  constructor(private http: HttpClient) { }

  //merchant config gateway
  createMerchantConfig(body: any, headers: any): Observable<any> {
    return this.http.post(`${environment.gateway_URL}/merchantGatewayConfig/create`, body, { headers }).pipe(catchError(err => of(err)));
  }
  getConfigDetails(headers: any): Observable<any> {
    return this.http.get(`${environment.gateway_URL}/merchantGatewayConfig/list`, { headers });
  }
  gatewayConfigById(id: any, headers: any): Observable<any> {
    return this.http.get(`${environment.gateway_URL}/merchantGatewayConfig/getbyID/${id}`, { headers })
  }
  updateDetailsbyId(body: any, id: any, headers: any): Observable<any> {
    return this.http.put(`${environment.gateway_URL}/merchantGatewayConfig/${id}/update`, body, { headers }).pipe(catchError(err => of(err)));
  }
  //merchant config pos
  createPosMerchantConfig(body: any, headers: any): Observable<any> {
    return this.http.post(`${environment.gateway_URL}/merchantPosConfig/create`, body, { headers }).pipe(catchError(err => of(err)));
  }
  getPosConfigDetails(headers: any): Observable<any> {
    return this.http.get(`${environment.gateway_URL}/merchantPosConfig/list`, { headers });
  }
  posConfigById(id: any, headers: any): Observable<any> {
    return this.http.get(`${environment.gateway_URL}/merchantPosConfig/getbyID/${id}`, { headers })
  }
  updatePosConfigbyId(body: any, id: any, headers: any): Observable<any> {
    return this.http.put(`${environment.gateway_URL}/merchantPosConfig/${id}/update`, body, { headers }).pipe(catchError(err => of(err)));
  }

  //master Merchants users
  getpgUsersDetails(headers: any): Observable<any> {
    return this.http.get(`${environment.gateway_URL}/merchant/list`, { headers })
  }
  createpgUser(body: any, headers: any): Observable<any> {
    return this.http.post(`${environment.gateway_URL}/merchant/create`, body, { headers }).pipe(catchError(err => of(err)));
  }
  updatepgUser(body: any, headers: any): Observable<any> {
    return this.http.put(`${environment.gateway_URL}/merchant/update`, body, { headers }).pipe(catchError(err => of(err)));
  }
  getAdminByID(id: any, headers: any): Observable<any> {
    return this.http.get(`${environment.gateway_URL}/merchant/getAdmin/${id}`, { headers })
  }
  getpgMerbyId(id: any, headers: any): Observable<any> {
    return this.http.get(`${environment.gateway_URL}/merchant/getbyID/${id}`, { headers })
  }
  getPosMIDbyLicense(id: any, headers: any): Observable<any> {
    return this.http.get(`${environment.Onboarding_URL}/merchant/findPos/${id}`, { headers })
  }

  //merchant services
  addServToPGMer(body: any, headers: any): Observable<any> {
    return this.http.post(`${environment.gateway_URL}/mService/create`, body, { headers }).pipe(catchError(err => of(err)));
  }
  getServofPGMer(id: any, headers: any): Observable<any> {
    // console.log(id)
    return this.http.get(`${environment.gateway_URL}/mService/list/${id}`, { headers });
  }
  getServofPGMerbyId(id: any, headers: any): Observable<any> {
    return this.http.get(`${environment.gateway_URL}/mService/getbyID/${id}`, { headers });
  }
  updateServFrmPGMer(body: any, id: any, headers: any): Observable<any> {
    return this.http.put(`${environment.gateway_URL}/mService/${id}/update`, body, { headers }).pipe(catchError(err => of(err)));
  }
  removeServFrmPGMer(id: any, headers: any): Observable<any> {
    return this.http.delete(`${environment.gateway_URL}/mService/${id}/delete`, { headers }).pipe(catchError(err => of(err)));
  }
  getServbyPGMer(id: any, headers: any): Observable<any> {
    return this.http.get(`${environment.gateway_URL}/mService/filterData/filter/${id}`, { headers });
  }

  //posMerchant services
  addServToPosMer(body: any, headers: any): Observable<any> {
    return this.http.post(`${environment.gateway_URL}/posMerServices/create`, body, { headers }).pipe(catchError(err => of(err)));
  }
  getServofPosMer(id: any, headers: any): Observable<any> {
    // console.log(id)
    return this.http.get(`${environment.gateway_URL}/posMerServices/list/${id}`, { headers });
  }
  getServofPosMerbyId(id: any, headers: any): Observable<any> {
    return this.http.get(`${environment.gateway_URL}/posMerServices/getbyID/${id}`, { headers });
  }
  updateServFrmPosMer(body: any, id: any, headers: any): Observable<any> {
    return this.http.put(`${environment.gateway_URL}/posMerServices/${id}/update`, body, { headers }).pipe(catchError(err => of(err)));
  }
  removeServFrmPosMer(id: any, headers: any): Observable<any> {
    return this.http.delete(`${environment.gateway_URL}/posMerServices/${id}/delete`, { headers }).pipe(catchError(err => of(err)));
  }
  getServbyPosMer(id: any, headers: any): Observable<any> {
    return this.http.get(`${environment.gateway_URL}/posMerServices/filterData/filter/${id}`, { headers });
  }

  //gateway users
  creategatewayUser(body: any, headers: any): Observable<any> {
    return this.http.post(`${environment.gateway_URL}/gatewayUsers/create`, body, { headers }).pipe(catchError(err => of(err)))
  }
  getGatewayUser(headers: any): Observable<any> {
    return this.http.get(`${environment.gateway_URL}/gatewayUsers/list`, { headers }).pipe(catchError(err => of(err)))
  }
  getGatewayUserbyID(id: any, headers: any): Observable<any> {
    return this.http.get(`${environment.gateway_URL}/gatewayUsers/getbyID/${id}`, { headers }).pipe(catchError(err => of(err)))
  }
  delGatewayUserbyID(id: any, headers: any): Observable<any> {
    return this.http.delete(`${environment.gateway_URL}/gatewayUsers/${id}/delete`, { headers }).pipe(catchError(err => of(err)))
  }
  updateGatewayUserByID(body: any, id: any, headers: any): Observable<any> {
    return this.http.put(`${environment.gateway_URL}/gatewayUsers/${id}/update`, body, { headers }).pipe(catchError(err => of(err)))
  }

  //pos users
  createposUser(body: any, headers: any): Observable<any> {
    return this.http.post(`${environment.gateway_URL}/posUsers/create`, body, { headers }).pipe(catchError(err => of(err)))
  }
  getposUser(headers: any): Observable<any> {
    return this.http.get(`${environment.gateway_URL}/posUsers/list`, { headers }).pipe(catchError(err => of(err)))
  }
  getposUserbyID(id: any, headers: any): Observable<any> {
    return this.http.get(`${environment.gateway_URL}/posUsers/getbyID/${id}`, { headers }).pipe(catchError(err => of(err)))
  }
  delposUserbyID(id: any, headers: any): Observable<any> {
    return this.http.delete(`${environment.gateway_URL}/posUsers/${id}/delete`, { headers }).pipe(catchError(err => of(err)))
  }
  updateposUserByID(body: any, id: any, headers: any): Observable<any> {
    return this.http.put(`${environment.gateway_URL}/posUsers/${id}/update`, body, { headers }).pipe(catchError(err => of(err)))
  }

  //submerchants
  createSubMerchant(body: any, headers: any): Observable<any> {
    return this.http.post(`${environment.gateway_URL}/mSubMerchant/create`, body, { headers }).pipe(catchError(err => of(err)))
  }
  getSubMerchant(headers: any): Observable<any> {
    return this.http.get(`${environment.gateway_URL}/mSubMerchant/list`, { headers }).pipe(catchError(err => of(err)))
  }
  getSubMerchantbyID(id: any, headers: any): Observable<any> {
    return this.http.get(`${environment.gateway_URL}/mSubMerchant/getbyID/${id}`, { headers }).pipe(catchError(err => of(err)))
  }
  delSubMerchant(id: any, headers: any): Observable<any> {
    return this.http.delete(`${environment.gateway_URL}/mSubMerchant/${id}/delete`, { headers }).pipe(catchError(err => of(err)))
  }
  updateSubMerchantByID(body: any, id: any, headers: any): Observable<any> {
    return this.http.put(`${environment.gateway_URL}/mSubMerchant/${id}/update`, body, { headers }).pipe(catchError(err => of(err)))
  }

  //fee master
  createFee(body: any, headers: any): Observable<any> {
    return this.http.post(`${environment.gateway_URL}/feeMaster/create`, body, { headers }).pipe(catchError(err => of(err)))
  }
  getFee(headers: any): Observable<any> {
    return this.http.get(`${environment.gateway_URL}/feeMaster/list`, { headers }).pipe(catchError(err => of(err)))
  }
  getFeebyId(id: any, headers: any): Observable<any> {
    return this.http.get(`${environment.gateway_URL}/feeMaster/getbyID/${id}`, { headers }).pipe(catchError(err => of(err)))
  }
  updateFee(body: any, id: any, headers: any): Observable<any> {
    return this.http.put(`${environment.gateway_URL}/feeMaster/${id}/update`, body, { headers }).pipe(catchError(err => of(err)))
  }
  removeFee(id: any, headers: any): Observable<any> {
    return this.http.delete(`${environment.gateway_URL}/feeMaster/${id}/delete`, { headers }).pipe(catchError(err => of(err)))
  }

  //transactions
  getTransactions(): Observable<any> {
    return this.http.get(`https://gatewaydev.payrow.ae/gateway/payrow/paymentdetails`).pipe(catchError(err => of(err)))
  }

  //taxes
  getTaxes(headers: any): Observable<any> {
    return this.http.get(`${environment.gateway_URL}/taxMaster/list`, { headers }).pipe(catchError(err => of(err)))
  }
}
