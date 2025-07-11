import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-risk-staff',
  templateUrl: './risk-staff.component.html',
  styleUrls: ['./risk-staff.component.scss']
})
export class RiskStaffComponent implements OnInit {

  constructor() { }
  isStore: boolean = false
  staffData: any = [];
  @Input() storeCatData: any;
  // storeCatData: any = [{
  //   staffName: 'Supriya', emiratesId: 86418234, mobileNumber: 8644218234, joiningDate: '02-05-2021',
  //   staffVisaNumber: 86418234, staffBankName: 'HDFC', staffAcNumber: '973241', basicSal: '5000', homeAllowance: '5000',
  //   transAllowance: '5000', bonus: '5000', ibanNum: '9947294'
  // },
  // {
  //   staffName: 'Rishabh', emiratesId: 8962348, mobileNumber: 6836413242, joiningDate: '02-05-2021',
  //   staffVisaNumber: 86418234, staffBankName: 'HDFC', staffAcNumber: '973241', basicSal: '5000', homeAllowance: '5000',
  //   transAllowance: '5000', bonus: '5000', ibanNum: '9947294'
  // },
  // {
  //   staffName: 'Sathya', emiratesId: 3298137, mobileNumber: 8472944872, joiningDate: '02-05-2021',
  //   staffVisaNumber: 86418234, staffBankName: 'HDFC', staffAcNumber: '973241', basicSal: '5000', homeAllowance: '5000',
  //   transAllowance: '5000', bonus: '5000', ibanNum: '9947294'
  // },
  // ]

  ngOnInit(): void {
    console.log(this.storeCatData)

    this.details()
  }
  details() {
    this.staffData = [];
    console.log(this.storeCatData)
    // this.storeCatData.staffInfo.map((sData: any) => {
    //   this.staffData = sData
    //   console.log(this.staffData)
    // })
    // this.isStore=!this.isStore;
    // this.storeCatData.map((sData: any) => {
    //   this.staffData=sData
    // if (parseInt(eid) === sData.emiratesId) {
    //   // this.isStore = emir;
    //   this.staffData.push(sData);
    //   // this.selectStoreCat = sData.data[0].cat;
    // }
    // if (eid == sData.emiratesId) {
    //   this.isStore=!this.isStore
    // }
    // })
  }
  back() {
    this.isStore = !this.isStore
  }
}
