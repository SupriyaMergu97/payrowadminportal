import { Component, Input, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import * as $ from 'jquery';

@Component({
  selector: 'app-merchant-agreement',
  templateUrl: './merchant-agreement.component.html',
  styleUrls: ['./merchant-agreement.component.scss']
})
export class MerchantAgreementComponent implements OnInit {
  @Input() merchantData: any;
  @Input() pridData: any;
  sampleOne: any;
  objSheet: any;
  ngOnInit(): void {
    this.getData()
    // console.log(this.distData)
  }
  getData() {
    console.log(this.pridData, this.merchantData)
    this.objSheet = {
      Name: this.pridData.firstName,
      dob: this.pridData.dateOfBirth,
      typeOfDistributor: this.pridData.typeOfCustomer,
      nation: this.pridData.country,
      passportNumber: this.pridData?.passportNum ?? "",
      passportExpiry: this.pridData?.passportExpiry ?? "",
      passportIssued: this.pridData?.city ?? "",
      emiratesNumber: this.pridData?.emiratesId ?? this.pridData?.degreeNumber ?? "",
      emiratesExpiry: this.pridData?.emiratesExpiry ?? this.pridData?.degreeExpiry ?? "",
      emiratesIssued: this.pridData?.city ?? "",
      licenseNumber: this.merchantData.licenseDetails?.licenseNumber ?? "",
      licenseExpiry: this.merchantData.licenseDetails?.licenseExpiry ?? "",
      licenseIssued: this.pridData.city,
      companyName: this.merchantData.licenseDetails.companyName,
      shortName: this.merchantData.licenseDetails.companyShortName,
      natureOfBusiness: this.merchantData.licenseDetails?.natureOfBusiness ?? "",
      // natureOfBusiness: this.merchantData.typeOfBusiness,
      bankName: this.merchantData.bankDetails.bankName,
      acntNumber: this.merchantData.bankDetails.accountNumber,
      IbanNo: this.merchantData.bankDetails.ibanNumber,
      bankLocation: this.merchantData.bankDetails.branchName,
      trn: this.merchantData.bankDetails.trn,
      revenue: this.merchantData.businessDetails.annualTurnOver,
      adminName: this.merchantData.adminDetails[0].adminName,
      adminEmail: this.merchantData.adminDetails[0].emailId,
      adminMobile: this.merchantData.adminDetails[0].mobileNumber,
      //   adminName:this.merchantData.adminInfo['adminName'],
      //   adminEmail:this.merchantData.adminInfo['email'],
      //   adminMobile:this.merchantData.adminInfo['mobileNumber'],
      // catId: this.merchantData.merchantItems[0].catId,

      // email:this.sampleOne.emailId,
      // location:`${this.sampleOne.city}`+' '+`${this.sampleOne.country}`,
      // tranByYear:`${'$'}${this.sampleOne.businessDetails['annualTurnOver']}`,
      // // IbanNo:this.sampleOne.bankDetails[0].ibanNumber,
      // bankNamendBranch:`${this.sampleOne.bankDetails[0].bankName}`+','+`${this.sampleOne.bankDetails[0].branchName}`
    }
    console.log(this.objSheet)
  }
  reset() {

    // Reset child component state
  }
  async openPDF() {
    let DATA1: any = document.getElementById('htmlData');

    let DATA2: any = document.getElementById('htmlTwo');
    html2canvas(DATA1).then(async (canvas) => {

      var setWidth = 1150; var setHeight = 1400.118;
      // var setWidth = 1170; var setHeight = 1514.118;//ORIGINAL
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'pt', 'a4');
      let position = 0;
      html2canvas(DATA2).then((cn2) => {
        const FILEURI2 = cn2.toDataURL('image/png');
        PDF.addImage(FILEURI, 'PNG', 40, 40, (setWidth * .62) - 190, (setHeight * .62) - 90);
        PDF.addPage();
        PDF.addImage(FILEURI2, 'PNG', 40, 40, (setWidth * .62) - 190, (setHeight * .10) - 70);
        PDF.save('Merchant Agreement.pdf');
      })

    });

  };

}
