import { Component, OnInit } from '@angular/core';
import { BarServiceService } from 'src/services/bar-service.service';
import { environment } from 'src/environments/environment';
import {CookieService} from 'ngx-cookie-service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'PayRow Web';
  constructor(private bar_serv: BarServiceService,public cookieService:CookieService) { }
  ngOnInit(): void {
    this.getData();
    // this.bar_serv.getToken().then((data: any)=>{
      console.log(this.cookieService.get("auth_tok"),'cookieserv')
      sessionStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzFmMGY0YjM0M2JhMDAwODMxMTA5Y2YiLCJlbWFpbElkIjoic3Vwcml5YW1lcmd1MTk5N0BnbWFpbC5jb20iLCJuYW1lIjoiUGF5cm93IiwiZGlzdElkIjoiZGlkNDE0NDYzIiwicm9sZSI6ImRpc3RyaWJ1dG9yIiwiaWF0IjoxNjc4MTkxOTExfQ.jzaB4MG_TrVYEuYODrz-Jbmal8tHFbWdGy-F23VxRQw");
       
      let tok = sessionStorage.getItem("token");
      // let email = sessionStorage.getItem("emailId");
      // let password = sessionStorage.getItem("password");
      console.log("token",tok)
    // })
  }
  getData = async () => {
    const response = await fetch(`${environment.Admin_URL}/users/keys`);
    const data = await response.json();
    const decodedString = atob(data.data)
    sessionStorage.setItem('keyData',decodedString)
    // return JSON.parse(decodedString);
  }
}
