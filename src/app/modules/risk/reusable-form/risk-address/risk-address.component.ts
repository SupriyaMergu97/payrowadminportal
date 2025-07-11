import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-risk-address',
  templateUrl: './risk-address.component.html',
  styleUrls: ['./risk-address.component.scss']
})
export class RiskAddressComponent implements OnInit {
  storeCatData: any = [{
    staffName: 'Supriya', emiratesId: 86418234, mobileNumber: 8644218234, joiningDate: '02-05-2021',
    staffVisaNumber: 86418234, staffBankName: 'HDFC', staffAcNumber: '973241', basicSal: '5000', homeAllowance: '5000',
    transAllowance: '5000', bonus: '5000', ibanNum: '9947294'
  },
  {
    staffName: 'Rishabh', emiratesId: 8962348, mobileNumber: 6836413242, joiningDate: '02-05-2021',
    staffVisaNumber: 86418234, staffBankName: 'HDFC', staffAcNumber: '973241', basicSal: '5000', homeAllowance: '5000',
    transAllowance: '5000', bonus: '5000', ibanNum: '9947294'
  },
  {
    staffName: 'Sathya', emiratesId: 3298137, mobileNumber: 8472944872, joiningDate: '02-05-2021',
    staffVisaNumber: 86418234, staffBankName: 'HDFC', staffAcNumber: '973241', basicSal: '5000', homeAllowance: '5000',
    transAllowance: '5000', bonus: '5000', ibanNum: '9947294'
  },
  ];
  staffData:any;
  isStore:boolean=false
  constructor() { }

  // @Input() storeCatData: any;


  ngOnInit(): void {
    console.log(this.storeCatData);
  }

  details(eid: any) {
    this.staffData=[];
    this.isStore=!this.isStore;
    this.storeCatData.map((sData: any) => {
      if (parseInt(eid) === sData.emiratesId) {
        // this.isStore = emir;
        this.staffData.push(sData);
        // this.selectStoreCat = sData.data[0].cat;
      }
      // if (eid == sData.emiratesId) {
      //   this.isStore=!this.isStore
      // }
    })
  }
  back(){
    this.isStore=!this.isStore
  }

}
