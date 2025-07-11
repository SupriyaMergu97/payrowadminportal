import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { nanoid } from 'nanoid';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})

export class QrCodeComponent implements OnInit {
  router: any;
  transactionId: any;
  orderNumber: any;
  totalAmount: any;
  customerDetails: any;
  constructor(private route: Router, private http: HttpClient, private routew: ActivatedRoute) { }
  baseURL: string = "https://payrowdev.uaenorth.cloudapp.azure.com/mobileapis/payrow";
  ngOnInit() {
    this.routew.params.subscribe(params => {
      this.orderNumber = params.id;
      console.log(this.orderNumber, "orderNumber");
      //get order status
      //make async function
      const getOrderStatus = async () => {
        const response = await fetch(`https://payrowdev.uaenorth.cloudapp.azure.com/mobileapis/payrow/getQrCodeOrderDetails/${this.orderNumber}`);
        const data = await response.json();
        this.customerDetails = data.data[0];
        this.transactionId = this.orderNumber;
        this.totalAmount = this.customerDetails.purchaseBreakdown.service[0].totalAmount;
        const paymentDate = this.customerDetails.paymentDate;
        //redirect to different page if paymentDate is more not than 30 minutes
        if (paymentDate) {
          const date = new Date(paymentDate);
          console.log(date, "paymentdate");
          const currentDate = new Date();
          const diff = Math.abs(date.getTime() - currentDate.getTime());
          const diffMins = Math.ceil(diff / (1000 * 60));
          console.log(diffMins, "diffMins");
          // if (diffMins < 30) {
          //   this.route.navigate(['/dashboard']);
          // }
        }
      }
      getOrderStatus();
    });
  }
  //get random number in typescript
  getRandomInt(max: any) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  closeClick() {
    //close current tab
    var win:any = window.open("about:blank", "_self");
    win.close();
  }


  btnClick() {
    const headers = { 'content-type': 'application/json' }
    let obj = {
      "username": "DED",
      "password": "k9WXdMG9U0IINHN",
      "orderNumber": `${this.orderNumber}`,
      "customerAddressLine1": "3435646464",
      "customerAddressLine2": "MagnatiPay",
      "language": "EN",
      "channel": "QR Code",
      "governmentServices": true,
      "addTransactionFeesOnTop": true,
      "merchantSiteUrl": "https://payrowdev.uaenorth.cloudapp.azure.com/gateway/payrow/reponseCheck",
      "merchantBankTransferReturnUrl": "https://payrowdev.uaenorth.cloudapp.azure.com/gateway/payrow/reponseCheck",
      "paymentMethodList": ["EDIRHAM_CARD", "NON_EDIRHAM_CARD"],
      "sessionTimeoutSecs": "600",
      "customerName": `${this.customerDetails.customerName}`,
      "paymentMethod": "EDIRHAM_CARD",
      "orderStatus": "Pending",
      "customerEmail": `${this.customerDetails.customerEmail}`,
      "customerPhone": `${this.customerDetails.customerPhone}`,
      "customerCity": `${this.customerDetails.customerCity}`,
      "customerState": `${this.customerDetails.customerState}`,
      "customerCountry": `${this.customerDetails.customerCountry}`,
      "customerPostalCode": `${this.customerDetails.customerPostalCode}`,
      "purchaseDetails": {
        "service": [
          {
            "serviceCode": `${this.customerDetails.purchaseBreakdown.service[0].serviceCode}`,
            "quantity": 1,
            "transactionAmount": `${this.customerDetails.purchaseBreakdown.service[0].totalAmount}`,
            "numberOfUnits": 1
          }
        ]
      }
    }
    console.log(obj, "object");
    this.http.post(`${this.baseURL}/purchase`, obj, { 'headers': headers }).subscribe((data: any) => {
      window.location.replace(data.checkoutUrl);
    })
  }


}
