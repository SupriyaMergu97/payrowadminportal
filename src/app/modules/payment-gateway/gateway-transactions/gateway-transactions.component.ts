import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppManagerService } from 'src/app/core/services/app-manager.service';
import { GatewayService } from 'src/app/services/gateway.service';
import { SignatureEncryptionService } from 'src/app/services/signature-encryption.service';

declare var jQuery: any;
@Component({
  selector: 'app-gateway-transactions',
  templateUrl: './gateway-transactions.component.html',
  styleUrls: ['./gateway-transactions.component.scss']
})
export class GatewayTransactionsComponent implements OnInit {
  months: any = [
    { "month": "Jan", "id": 1 }, { "month": "Feb", "id": 2 }, { "month": "Mar", "id": 3 }, { "month": "Apr", "id": 4 },
    { "month": "May", "id": 5 }, { "month": "Jun", "id": 6 }, { "month": "Jul", "id": 7 }, { "month": "Aug", "id": 8 },
    { "month": "Sep", "id": 9 }, { "month": "Oct", "id": 10 }, { "month": "Nov", "id": 11 }, { "month": "Dec", "id": 12 },
  ]
  public month: any;
  searchText: any;
  transactions: any = []
  selected: any;
  monthlyData: any = []
  statusArray:any=["CAPTURED", "NOT CAPTURED", "APPROVED", "NOT APPROVED", "VOIDED",
"    NOT VOIDED", "DENIED BY RISK", "HOST TIMEOUT"];
  constructor(private app: AppManagerService,private router: Router, private gatewayServ: GatewayService,
    private encryption:SignatureEncryptionService
  ) { 
    this.app.ShowReportDate = 'true';
  }

  ngOnInit(): void {
    this.selected = new Date().toLocaleDateString(undefined, { month: 'short' });

    this.loadjQueryScripts()
    this.getTransactionDetails()
  }
  private loadjQueryScripts(): void {
    (($) => {
      "use strict";
      $('.knob').knob();

      $('#side_menu_bar > ul > li.nav-item > a').removeClass("active");
      $('#side_menu_bar > ul > li.nav-item > a#li_payment_gateway').addClass("active");
    })(jQuery);
  }
  downloadCSV() { }

  getTransactionDetails() {
    
    this.gatewayServ.getTransactions().subscribe(res => {
      this.transactions = res.data
      // this.transactions.map((data: any) => {
      //   if (data.checkoutStatus == '') {
      //     data.status = "failed"
      //   }
      //   else {
      //     data.status = "Success"
      //   }
      // })
      // this.getMonthlyData(this.selected)
    })
  }
  onSelectMonth(event: any) {
    this.selected = event.target.value;
    console.log(this.selected)
    // this.getfTapToPayData(this.selected)
    this.getMonthlyData(this.selected)
  }

  async getMonthlyData(month: any) {
    this.monthlyData = [];
    await this.transactions.map((data: any) => {
      let m=data.paymentDate;
      this.months.map((mData: any) => {
        console.log(m.toLocaleString('en-us', { month: 'short' }))
      if (mData.month ===  m.toLocaleString('en-us', { month: 'short' })) {
        // mData.data.map((fData: any) => {
          this.monthlyData.push(data);
          console.log(this.monthlyData)
        }
      })
    })
  }
}
