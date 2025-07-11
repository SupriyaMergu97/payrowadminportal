import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { catchError } from "rxjs/operators";
import { SignatureEncryptionService } from "./signature-encryption.service";

@Injectable({
  providedIn: "root",
})
export class CreateAcntService {
  constructor(
    private http: HttpClient,
    private encryption: SignatureEncryptionService,
  ) {}

  createPayrowId(body: any, headers: any): Observable<any> {
    return this.http
      .put(`${environment.Onboarding_URL}/payrowId`, body, { headers })
      .pipe(catchError((err) => of(err)));
  }
  getPrid(headers: any): Observable<any> {
    return this.http.get(`${environment.Onboarding_URL}/payrowId`, { headers });
  }
  getPridbyId(id: any, headers: any): Observable<any> {
    return this.http.get(`${environment.Onboarding_URL}/payrowId/${id}`, {
      headers,
    });
  }
  // updatePayrowId(boddy)
  createMerchant(body: any, headers: any): Observable<any> {
    return this.http
      .post(`${environment.Onboarding_URL}/merchant`, body, { headers })
      .pipe(catchError((err) => of(err)));
  }
  updateMerchant(body: any, headers: any): Observable<any> {
    return this.http.put(`${environment.Onboarding_URL}/merchant`, body, {
      headers,
    });
  }
  getAllMerchants(headers: any): Observable<any> {
    return this.http.get(`${environment.Onboarding_URL}/merchant`, { headers });
  }
  getMerbyid(id: any, headers: any): Observable<any> {
    return this.http.get(`${environment.Onboarding_URL}/merchant/${id}`, {
      headers,
    });
  }
  getMerchantsbyPrid(prid: any, headers: any): Observable<any> {
    return this.http.get(
      `${environment.Onboarding_URL}/merchant/getbyPrid/${prid}`,
      { headers },
    );
  }
  getForm(): Observable<any> {
    return this.http.get(
      `https://payrowdev.uaenorth.cloudapp.azure.com/merchant/merchantAgreement`,
      { responseType: "text" },
    );
  }
  getTidList(mid: any, headers: any): Observable<any> {
    return this.http.get(`${environment.Onboarding_URL}/terminalId/${mid}`, {
      headers,
    });
  }
  getAllTids(headers: any): Observable<any> {
    return this.http.get(`${environment.Onboarding_URL}/terminalId`, {
      headers,
    });
  }
  createTerminalId(body: any, headers: any): Observable<any> {
    return this.http.post(`${environment.Onboarding_URL}/terminalId`, body, {
      headers,
    });
  }
  createTidbyFile(body: any, headers: any): Observable<any> {
    return this.http
      .post(`${environment.Onboarding_URL}/terminalId/uploadFile`, body, {
        headers,
      })
      .pipe(catchError((err) => of(err)));
  }
  addServtoMerchant(body: any, headers: any): Observable<any> {
    return this.http.post(
      `${environment.gateway_URL}/posMerServices/create`,
      body,
      { headers },
    );
  }
  getMerItems(headers: any): Observable<any> {
    return this.http.get(`${environment.gateway_URL}/posMerServices/list`, {
      headers,
    });
  }
  getTransValuebyMid(headers: any): Observable<any> {
    return this.http.get(`${environment.Mobile_URL}/midTrans`, { headers });
  }
  getTransValuebyTid(headers: any): Observable<any> {
    return this.http.get(`${environment.Mobile_URL}/tidTrans`, { headers });
  }
  getTransValuebyPrid(headers: any): Observable<any> {
    return this.http.get(`${environment.Mobile_URL}/pridTrans`, { headers });
  }

  createMerchantBasic(body: any): Observable<any> {
    return this.http.post(`${environment.Onboarding_URL}/users`, body);
  }

  updateMerchantPersonal(formData: any, mid: any): Observable<any> {
    return this.http.put(
      `${environment.Onboarding_URL}/users/owner/${mid}`,
      formData,
    );
  }
  getMerchants(): Observable<any> {
    return this.http.get(`${environment.Onboarding_URL}/users/merchants`);
  }
  getItems(): Observable<any> {
    return this.http.get(`https://payrowqa.payrow.ae/api/items/category`);
  }
  getMerchantById(mid: any): Observable<any> {
    return this.http.get(
      `${environment.Admin_URL}/merchant/getMerchants/${mid}`,
    );
  }
  createTID(body: any): Observable<any> {
    return this.http.put(`${environment.Onboarding_URL}/pos`, body);
  }
  deActivateMerchant(mid: any, body: any): Observable<any> {
    return this.http.put(
      `${environment.Mobile_URL}/youCloud/delete/${mid}`,
      body,
    );
  }
  updateDevice(mid: any): Observable<any> {
    return this.http.put(
      `${environment.Mobile_URL}/youCloud/sendTid/${mid}`,
      mid,
    );
  }
  sendAuthCode(mid: any): Observable<any> {
    return this.http.get(`${environment.Mobile_URL}/youCloud/sendTid/${mid}`);
  }
  transationRate(body: any): Observable<any> {
    return this.http.post(`${environment.Mobile_URL}/transRate/Trans`, body);
  }
  bankObdCreation(body: any): Observable<any> {
    return this.http.post(`${environment.Admin_URL}/ca/bank`, body);
  }
  getBankDetails(): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/ca/banks`);
  }
  updateBankStatus(id: any, body: any): Observable<any> {
    return this.http.put(`${environment.Admin_URL}/ca/bank/${id}`, body);
  }
  checkUserByEmId(id: any): Observable<any> {
    return this.http
      .get(`${environment.Admin_URL}/ca/checkUser/${id}`)
      .pipe(catchError((err) => of(err)));
  }
}
