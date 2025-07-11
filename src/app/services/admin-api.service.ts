import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { values } from 'lodash';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminAPIService {

  constructor(private http: HttpClient) { }
  //order details API for cash and tap
  getOrders(body:any):Observable<any>{
    return this.http.post(`${environment.Admin_URL}/orderDetails`,body)
  }
  //tap to pay
  getTapToPayDetailsByDid(did: any, id: any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/tap/tapByDid/${id}/${did}`)
  }
  getTapToPayDetails(id: any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/tap/tapByDid/${id}`)
  }
  getTapToPayDetailsByMid(mid: any, id: any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/tap/tapByMid/${id}/${mid}`)
  }
  //cash invoice
  getcashDetailsByDid(did: any, id: any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/cash/cashbyDid/${id}/${did}`)
  }
  getcashDetails(id: any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/cash/cashbyDid/${id}`)
  }
  getcashDetailsByMid(mid: any, id: any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/cash/cashbyMid/${id}/${mid}`)
  }
  //consolidated
  getConsolidateData(did: any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/consolidated/consolidatedReport/${did}`)
  }
  getConsTapByDid(distributorId: any, id: any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/consolidated/tapReport/${id}/${distributorId}`)
  }
  getConsCashByDid(distributorId: any, id: any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/consolidated/cashReport/${id}/${distributorId}`)
  }
  getConsTotCreditByDid(distributorId: any, id: any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/consolidated/totCredit/${id}/${distributorId}`)
  }
  getConsTotDownByDid(distributorId: any, id: any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/consolidated/totaldownload/${id}/${distributorId}`)
  }
  getConsItem(): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/totItem/getItem`)
  }
  getUsersByDid(distributorId: any, id: any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/consolidated/noOfusers/${id}/${distributorId}`)
  }
  gettotItemsByDid(distributorId: any, id: any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/consolidated/totItems/${id}/${distributorId}`)
  }
  getConsTotOrderByDid(distributorId: any, id: any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/consolidated/totalOrders/${id}/${distributorId}`)
  }
  getConsDailyByDid(distributorId: any, id: any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/consolidated/consolidateddaily/${id}/${distributorId}`)
  }
  //consolidated without did
  getConsTap(id: any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/consolidated/tapReport/${id}`)
  }
  getConsCash(id: any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/consolidated/cashReport/${id}`)
  }
  getConsTotCredit(id: any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/consolidated/totCredit/${id}`)
  }
  getConsTotDown(id: any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/consolidated/totaldownload/${id}`)
  }
  getConsTotOrder(id: any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/consolidated/totalOrders/${id}`)
  }
  getUsers(id: any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/consolidated/noOfusers/${id}`)
  }
  gettotItems(id: any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/consolidated/totItems/${id}`)
  }
  getConsDaily(id: any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/consolidated/consolidateddaily/${id}`)
  }
  addItem(body: any): Observable<any> {
    return this.http.post(`${environment.Admin_URL}/totItem/addItem`, body)
  }

  //marketToday
  uploadImgMT(body: any): Observable<any> {
    return this.http.put(`${environment.Admin_URL}/home/mtupload`, body)
  }
  getMTImg(): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/home/mtimages`)
  }
  barchartbyDid(did: any, itemName: any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/home/getByItem/${itemName}/${did}`,)
  }
  getYearItemDatabyDid(did: any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/home/mtItem/${did}`)
  }
  barchart(did: any, itemName: any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/home/getByItem/${itemName}`,)
  }
  getYearItemData(did: any): Observable<any> {
    return this.http.get(`${environment.Admin_URL}/home/mtItem`)
  }


}