import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
import {OpCenterService} from 'src/app/services/op-center.service';
import {ComplaintsService} from 'src/app/services/complaints.service';
@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
    searchText: any;
    // public salesList:any=[]
    constructor(private op_servce:OpCenterService,private cmp_service:ComplaintsService) { }
    public salesList:any=[
        {userId:"2221",salesPersonName:"John Doe",contact: "9897856863",email:"a@gmail.com",remarks:"update",joiningDate:"12-22-2021",cust_Number:987124,complaints:"7",incentives:"1500"},
        {userId:"2222",salesPersonName:"Aravind",contact: "7725328298",email:"b@gmail.com",remarks:"update",joiningDate:"10-15-2021",cust_Number:912739,complaints:"2",incentives:"1100"},
        {userId:"2223",salesPersonName:"Sudhakar",contact: "8745096543",email:"c@gmail.com",remarks:"update",joiningDate:"04-02-2021",cust_Number:561433,complaints:"10",incentives:"2000"},
        {userId:"2224",salesPersonName:"Chandra",contact: "6532987654",email:"d@gmail.com",remarks:"update",joiningDate:"05-15-2021",cust_Number:614276,complaints:"14",incentives:"2800"},
        {userId:"2225",salesPersonName:"Supriya",contact: "9875983785",email:"e@gmail.com",remarks:"update",joiningDate:"12-05-2021",cust_Number:187251,complaints:"8",incentives:"1200"},
        {userId:"2226",salesPersonName:"Sathya",contact: "8157320946",email:"f@gmail.com",remarks:"update",joiningDate:"09-20-2021",cust_Number:986753,complaints:"12",incentives:"1800"}
    ]
    ngOnInit(): void {
        this.loadScripts();
        // this.getSalesList();
    }

    private loadScripts(): void {
        (function($) {
        "use strict";
        $('.knob').knob();

        $('#side_menu_bar > ul > li.nav-item > a').removeClass("active");
        $('#side_menu_bar > ul > li.nav-item > a#li_distributor').addClass("active");
        })(jQuery);
    };
    // getSalesList(){
    //     this.op_servce.salesPerformance().subscribe(data=>{
    //         console.log(data)
    //         this.salesList = data.data;
    //         this.cmp_service.getAllComplaints().subscribe(cData=>{
    //             this.salesList.map((sData:any)=>{
    //                 let temp:any=[]
    //                 for(let i in cData.data){
    //                     if(cData.data[i].salesPersonId != undefined){
    //                         if(cData.data[i].salesPersonId === sData.salesPersonId){
    //                             temp =[...temp,cData.data[i]];
    //                         }
    //                     }
    //                     sData.complaints=temp.length;
    //                     if(sData.complaints === 0){
    //                         const amount = (5 /100*100) * sData.customers
    //                         sData.incentive = `${amount}`
    //                     }else{
    //                         sData.incentive = 0;
    //                     }
    //                 }
    //             })
    //         })
    //         console.log("&&&&&&&&&&&&&",this.salesList);
    //     })
    // }
}
