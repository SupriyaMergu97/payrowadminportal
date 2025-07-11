import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MdrService {

  constructor(private http:HttpClient) { }

  getMdr(){
    return this.http.get<any>('../admin/assets/jsons/mdr.json');
            
}
}
