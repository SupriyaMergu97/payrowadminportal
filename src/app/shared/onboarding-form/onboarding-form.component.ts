import { Component, Input, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas'
import * as $ from 'jquery';
@Component({
	selector: 'app-onboarding-form',
	templateUrl: './onboarding-form.component.html',
	styleUrls: ['./onboarding-form.component.scss']
})
export class OnboardingFormComponent implements OnInit {
	@Input() distData: any;
	sampleOne: any;
	objSheet: any;
	products: any;
	img1: any
	img2: any
	parentData: any;
	constructor() { }

	ngOnInit(): void {
		console.log(this.distData)
		this.getData()
	}
	getData() {
		let dob;
		if (this.distData.dateOfBirth != null) {
			dob = this.distData.dateOfBirth
		}
		else {
			dob = new Date();
		}
		this.objSheet = {
			Name: this.distData.firstName,
			typeOfDistributor: this.distData.typeOfDistributor,
			nation: this.distData.country,
			passportNumber: this.distData?.passportNum ?? "",
			passportExpiry: this.distData?.passportExpiry ?? "",
			passportIssued: this.distData?.city ?? "",
			emiratesNumber: this.distData?.emiratesId ?? this.distData?.degreeNumber ?? "",
			emiratesExpiry: this.distData?.emiratesExpiry ?? this.distData?.degreeExpiry ?? "",
			emiratesIssued: this.distData?.city ?? "",
			licenseNumber: this.distData.licenseDetails?.licenseNumber ?? "",
			licenseExpiry: this.distData.licenseDetails?.licenseExpiry ?? "",
			licenseIssued: this.distData.city,
			companyName: this.distData.licenseDetails.companyName,
			shortName: this.distData.licenseDetails.companyShortName,
			natureOfBusiness: this.distData.licenseDetails?.natureOfBusiness ?? "",
			dob: dob,
			bankName: this.distData.bankDetails[0].bankName,
			acntNumber: this.distData.bankDetails[0].accountNumber,
			IbanNo: this.distData.bankDetails[0].ibanNumber,
			bankLocation: this.distData.bankDetails[0].branchName,
			trn: this.distData.bankDetails[0].trn,
			revenue: this.distData.businessDetails['annualTurnOver'],
			adminName: this.distData.adminDetails[0].adminName,
			adminEmail: this.distData.adminDetails[0].emailId,
			adminMobile: this.distData.adminDetails[0].mobileNumber,
			//   adminName:this.distData.adminInfo['adminName'],
			//   adminEmail:this.distData.adminInfo['email'],
			//   adminMobile:this.distData.adminInfo['mobileNumber'],
			// catId: this.distData.merchantItems[0].catId,

			// email:this.sampleOne.emailId,
			// location:`${this.sampleOne.city}`+' '+`${this.sampleOne.country}`,
			// tranByYear:`${'$'}${this.sampleOne.businessDetails['annualTurnOver']}`,
			// // IbanNo:this.sampleOne.bankDetails[0].ibanNumber,
			// bankNamendBranch:`${this.sampleOne.bankDetails[0].bankName}`+','+`${this.sampleOne.bankDetails[0].branchName}`
		}

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
				PDF.addImage(FILEURI2, 'PNG', 40, 40, (setWidth * .62) - 190, (setHeight * .20) - 70);
				PDF.save('Distributor Agreement.pdf');
			})

		});

	};

}
