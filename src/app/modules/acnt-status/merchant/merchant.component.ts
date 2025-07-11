import { Component, OnInit } from '@angular/core';
import { CreateAcntService } from 'src/app/services/create-acnt.service';

@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.scss']
})
export class MerchantComponent implements OnInit {
  isMerchant: boolean = true
  isStaff:boolean=false
  merchantList:any=[]
  staffList:any=[]
  staffListA: any = [
    {tid:'87328322',mobileNumber: '8921398212', storeId: '12345',imeiNo:'293729310',joiningDate: '04-05-2022'},
    {tid:'92846372',mobileNumber: '9293872192', storeId: '12345',imeiNo:'247129819',joiningDate: '04-05-2022'},
    {tid:'10238190',mobileNumber: '7798217981', storeId: '12345',imeiNo:'982399279',joiningDate: '04-05-2022'},
    {tid:'21387191',mobileNumber: '8163871821', storeId: '12345',imeiNo:'247293293',joiningDate: '04-05-2022'},
    {tid:'29329382',mobileNumber: '7635983764', storeId: '12345',imeiNo:'294729202',joiningDate: '04-05-2022'},
  ]
  constructor(private createAcnt:CreateAcntService) { }

  ngOnInit(): void {
    this.getMerchantsList()
  }
  merchant() {
    this.isMerchant = !this.isMerchant
  }
  staff(){
    this.isStaff=!this.isStaff
  }
  getMerchantsList() {
    this.createAcnt.getMerchants().subscribe(data => {
      this.merchantList = data.data;
      console.log(this.merchantList)
    })
  }
  details(id: any) {
    this.staffList = []
    this.createAcnt.getMerchantById(id).subscribe(data => {
      data.data.map((mData: any) => {
        mData.staffInfo.map((staffData: any) => {
          this.staffList.push(staffData)
          console.log(this.staffList)
        })
        this.isStaff = !this.isStaff
      })
    })
  }
}
