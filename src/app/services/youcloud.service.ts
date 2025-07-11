import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class YoucloudService {

  constructor(private http: HttpClient) { }
  registerMerchant(body: any): Observable<any> {
    return this.http.put(`${environment.Admin_URL}/merchant/register`, body)
  }
}
