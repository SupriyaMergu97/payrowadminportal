import { Component, Input, OnInit } from '@angular/core';
import{CreateAcntService} from 'src/app/services/create-acnt.service';
import{jsPDF} from 'jspdf';
import  html2canvas from 'html2canvas'
import * as $ from 'jquery';
@Component({
  selector: 'app-mid-req-form',
  templateUrl: './mid-req-form.component.html',
  styleUrls: ['./mid-req-form.component.scss']
})
export class MidReqFormComponent implements OnInit {
	@Input() captureData:any;
	sampleOne :any ;
	objSheet:any;
	img1:any
	img2:any
	constructor() { }

	ngOnInit(): void {
		console.log("333333333333333333333333",this.captureData);
		this.getData()
	}

	getData(){
		this.sampleOne = 
{
	
	"firstName" : "Dharma",
	"lastName" : "state",
	"groupId" : "grpId688778",
	"gender" : "Male",
	"title" : "Mr",
	"emailId" : "p@gmail.com",
	"mobileNumber" : "8342643265432",
	"dateOfBirth" : "1991-07-11T05:30:00.000+05:30",
	"globalUserRole" : "store owner",
	"merchantPIN" : 1234,
	"status" : {
		"status" : "Ongoing",
		"stage" : "item details"
	},
	"distributorId" : "did268167",
	"mSalesPersonId" : "sp009",
	"authCode" : [ ],
	"documentsData" : [
		{
			"documentType" : "licenseDocument",
			"documentTitle" : "License Document",
			"documentNumber" : "8327632576",
			"documentPath" : "payrowusers\\6316f64b1aa4d46ce589b8da\\cr_letter-1662449437440.pdf",
			"createdDate" :"2022-09-05T17:52:53.647+05:30",
		},
		{
			"documentType" : "ecCopy",
			"documentTitle" : "EC Document",
			"documentNumber" : "327643",
		},
		{
			"documentType" : "emiratesDocument",
			"documentTitle" : "Emirates Document",
			"documentNumber" : "123456789123456",
			"documentPath" : "payrowusers\\6316f64b1aa4d46ce589b8da\\cr_letter-1662449280387.pdf",
		},
		{
			"documentType" : "passportDocument",
			"documentTitle" : "Passport Document",
			"documentNumber" : "432664324",
			"documentPath" : "payrowusers\\6316f64b1aa4d46ce589b8da\\cr_letter-1662449280388.pdf",
		}
	],
	"bankDetails" : [
		{
			"bankName" : "Sbi",
			"accountNumber" : "982387646",
			"ibanNumber" : "SBIN009",
			"branchName" : "tripuranthakam",
			"vatNumber" : "873463",
		}
	],
	"cardDetails" : [ ],
	"merchantItems" : [
		{
			"catId" : "567",
			"categoryName" : "Vegtables",
			"categoryItems" : [
				{
					"serviceId" : "1",
					"serviceName" : "gongura",
				},
				{
					"serviceId" : "2",
					"serviceName" : "dosakaya",
				}
			],
		}
	],
	"staffInfo" : [
		{
			"storeId" : null,
			"userId" : "PRTID4",
			"staffRole" : "General",
			"staffStatus" : "Active",
			"emiratesId" : "123456789123456",
			"firstName" : "sudhakar",
			"lastName" : "p",
			"gender" : "Male",
			"title" : "Mr.",
			"mobileNumber" : "947465",
			"salaryDetails" : {
				"basicSalary" : 5000,
				"houseAllowance" : 2000,
				"transportAllowance" : 200,
				"bonus" : 3000
			},
			"joiningDate" : "2022-09-05T17:52:53.647+05:30",
			"bankDetails" : [
				{
					"bankName" : "SBi",
					"accountNumber" : "98734364",
				}
			],
			"documentsData" : [ ]
		}
	],
	"storeDetails" : [
		{
			"storeId" : "PRSID14",
			"storeAddress" : {
				"addressTitle" : "Default",
				"completeAddress" : "kukatpally",
				"latitude" : "hyderabad",
				"longitude" : "123.23"
			},
			"mobileNumber" : "7423647",
			"website" : "payrow.ae",
			"brachAccountDetails" : {
				"name" : "sualtana travels",
				"bankName" : "SBI",
				"accNumber" : "8473264574",
				"ibanNumber" : "SBIN007"
			},
			"storeItems" : [ ]
		},
		{
			"storeId" : "PRSID15",
			"storeAddress" : {
				"addressTitle" : "Default",
				"completeAddress" : "sulana bazar",
				"latitude" : "dubai",
				"longitude" : "123.23"
			},
			"mobileNumber" : "8742464645",
			"website" : "payrow.uae",
			"brachAccountDetails" : {
				"name" : "eid travels",
				"bankName" : "sbi",
				"accNumber" : "87437468463",
				"ibanNumber" : "sbin009"
			},
			"storeItems" : [ ]
		}
	],
	"terminalsInfo" : [ ],
	"payRowId" : "PRMID65",
	"__v" : 0,
	"addressDetails" : "Dubai",
	"city" : "Dubai",
	"country" : "U.A.E",
	"emiratesId" : "123456789123456",
	"businessDetails" : {
		"yearsInBusiness" : 10,
		"annualTurnOver" : 100000,
		"noOfEmployees" : 200,
		"noOfOutlets" : 2
	},
	"merchantType" : "SMB"
		}
		this.objSheet={
			merchntName : `${this.sampleOne.firstName}`+' '+`${this.sampleOne.lastName}`,
			address: this.sampleOne.addressDetails,
			poAdress:`${this.sampleOne.city}`+' '+`${this.sampleOne.country}`,
			mobileNo:this.sampleOne.mobileNumber,
			email:this.sampleOne.emailId,
			location:`${this.sampleOne.city}`+' '+`${this.sampleOne.country}`,
			tranByYear:`${'$'}${this.sampleOne.businessDetails['annualTurnOver']}`,
			IbanNo:this.sampleOne.bankDetails[0].ibanNumber,
			bankNamendBranch:`${this.sampleOne.bankDetails[0].bankName}`+','+`${this.sampleOne.bankDetails[0].branchName}`
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
			html2canvas(DATA2).then((cn2)=>{
				const FILEURI2 = cn2.toDataURL('image/png');
				PDF.addImage(FILEURI, 'PNG', 40, 40, (setWidth*.62) - 190, (setHeight*.62) - 90);
				PDF.addPage();
				PDF.addImage(FILEURI2, 'PNG', 40, 40, (setWidth*.62) - 190, (setHeight*.62) - 90);
				PDF.save('mid-form.pdf');
			})

		});

	};

}


