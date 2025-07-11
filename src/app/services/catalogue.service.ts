import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  constructor(private http: HttpClient) {}

  list():Observable<any> {
    return this.http.get(`${environment.Admin_URL}/catalogue/list`)
  }

  create(body:any):Observable<any> {
    return this.http.post(`${environment.Admin_URL}/catalogue/create`, body)
  }

  update(_id:any,body:any):Observable<any> {
    return this.http.put(`${environment.Admin_URL}/catalogue/${_id}/update`, body)
  }
}
