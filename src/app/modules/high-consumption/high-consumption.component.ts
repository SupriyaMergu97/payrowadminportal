import { Component, OnInit, ViewChild } from '@angular/core';
import { AppManagerService } from 'src/app/core/services/app-manager.service';
import { FormGroup } from '@angular/forms';
import { BarServiceService } from 'src/services/bar-service.service';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
import { WizardComponent } from 'angular-archwizard';
import { CustomersService } from 'src/app/services/customers.service';
import { SignatureEncryptionService } from 'src/app/services/signature-encryption.service';

declare var jQuery: any;

@Component({
	selector: 'app-high-consumption',
	templateUrl: './high-consumption.component.html',
	styleUrls: ['./high-consumption.component.scss']
})
export class HighConsumptionComponent implements OnInit {
	constructor(private app: AppManagerService, private bar_Service: BarServiceService, private cust_serv: CustomersService,
		private encryption: SignatureEncryptionService
	) {
		this.app.ShowReportDate = 'true';
	}
	months: any = [
		{ "month": "Jan", "id": 1 }, { "month": "Feb", "id": 2 }, { "month": "Mar", "id": 3 }, { "month": "Apr", "id": 4 },
		{ "month": "May", "id": 5 }, { "month": "Jun", "id": 6 }, { "month": "Jul", "id": 7 }, { "month": "Aug", "id": 8 },
		{ "month": "Sep", "id": 9 }, { "month": "Oct", "id": 10 }, { "month": "Nov", "id": 11 }, { "month": "Dec", "id": 12 },
	]
	highCustomers: any = [];
	itemsPerPage: any = 9;
	currentPage: any = 1;
	showDialog: boolean = false;
	dialogData: any = {};
	isLoading: boolean = true;

	public month: any;
	searchText: any;
	selected: any;
	csvData: any = [];
	merchant_identify: string;
	finalData: any = [];
	public csvOptions: any = {};
	report_title: string;
	public jsonData: any = [];
	showDetail: boolean = false;
	@ViewChild(WizardComponent)
	public wizard: WizardComponent;

	ngOnInit(): void {
		this.month = new Date().toLocaleDateString(undefined, { month: 'short' });
		this.loadScripts();
		//this.stepperfunction();

		this.getTopCustomers();
	}

	private loadScripts(): void {
		(function ($) {
			'use strict';

			$('#side_menu_bar > ul > li.nav-item > a').removeClass('active');
			$('#side_menu_bar > ul > li.nav-item > a#li_high_consumption').addClass(
				'active'
			);
		})(jQuery);
	}

	//   private stepperfunction(): void {
	//     (($) => {
	//       'use strict';
	//       $(document).ready(function () {
	//         $('.stepper').mdbStepper();
	//       });

	//       function someFunction21() {
	//         setTimeout(function () {
	//           $('#horizontal-stepper').nextStep();
	//         }, 2000);
	//       }
	//     })(jQuery);
	//   }

	// jQuery SATHYA

	accountForm!: FormGroup;
	gatePassForm: FormGroup;
	notification = false;
	appreciation = false;
	negotiate = false;
	apply_rate = false;
	step = 1;
	hr_Tag: boolean = false

	async getTopCustomers() {
		let reqhead = this.encryption.createHeader();
		const key = this.encryption.generateKey(reqhead.key)
		this.cust_serv.getHighCustDetails(reqhead.headers).subscribe(async res => {
			console.log(res)
			if (res.success == true) {
				const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
				const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
				this.highCustomers = decryptedData
			}
			if (res) {
				this.isLoading = false;
			}
		})
		// await this.bar_Service.getTopCustomers().then(data=>{
		// 	this.jsonData =data;

		// });
		// this.jsonData.map((mData:any)=>{
		// 	if(this.month === mData.month){
		// 		this.finalData =mData.data;
		// 	}
		// })
		// this.finalData.map((jData:any)=>{
		// 	jData['step']=1;
		// 	jData['showDetail']=false;
		// });
		// console.log("topc",this.finalData)
	};
	onPageChange(page: number) {
		this.currentPage = page;
	}
	getPage(): any[] {
		const startIndex = (this.currentPage - 1) * this.itemsPerPage;
		const endIndex = startIndex + this.itemsPerPage;
		return this.highCustomers.slice(startIndex, endIndex);
	}
	openDialog(id: any) {
		this.showDialog = true;
		this.highCustomers.map((d: any) => {
			if (d._id == id) {
				this.dialogData = {
					header1: "Merchant Details",
					subHeader11: "Merchant ID",
					content11: d.mainMerchantId !== undefined && d.mainMerchantId !== null ? d.mainMerchantId : '',
					subHeader12: "Terminal ID",
					content12: d._id !== undefined && d._id !== null ? d._id : '',
					subHeader13: "Email ID",
					content13: d.emailId !== undefined && d.emailId !== null ? d.emailId : '',
					header2: "Details",
					subHeader21: "Total Credit",
					content21: d.totalAmount !== undefined && d.totalAmount !== null ? d.totalAmount : '',
					subHeader22: "Sequence No.",
					content22: d.count !== undefined && d.count !== null ? d.count : '',
					subHeader23: "Average",
					content23: d.average !== undefined && d.average !== null ? d.average : '',
					header3: "",
					subHeader31: "",
					content31: '',
					subHeader32: "",
					content32: '',
				}
			}
		})
	}
	closeDialog(): void {
		this.showDialog = false;
	}

	reportDownload() {
		console.log("report", this.highCustomers)
		this.csvData = [];
		if (this.highCustomers) {
			this.highCustomers.map((csv: any) => {
				let Obj: any = {};
				Obj['merchant_id'] = csv._id.mainMerchantId;
				Obj['merchant_name'] = csv._id.merchantName;
				Obj['emailId'] = csv._id.customerEmail;
				Obj['seq_no'] = csv.count;
				Obj['average'] = csv.average;
				Obj['total_credit'] = csv.totalAmount;
				this.csvData = [...this.csvData, Obj];
			})
		}
		const options = {
			title: '', fieldSeparator: ',', quoteStrings: '"', decimalseparator: '.', showLabels: true, showTitle: true,
			headers: ['Merchant ID', 'Merchant Name', 'Email ID', 'Sequence No', 'Average', 'Total Credit']
		};
		this.csvOptions = options;
		this.report_title = 'Top customers List';

		new AngularCsv(this.csvData, this.report_title, this.csvOptions);
	}


















	next(data: any) {
		console.log("next", this.finalData)
		this.finalData.map((obj: any) => {
			if (this.merchant_identify === obj.merchant_name) {
				obj.step++
			}
		})
		// if (this.step == 1) {
		//     this.notification = true;
		//     this.step++
		// } else if (this.step == 2) {
		//     this.appreciation = true;
		//     this.step++
		// } else if (this.step == 3) {
		// this.negotiate = true;
		// this.step++
		// } else if (this.step == 4) {
		//     this.apply_rate = true;
		//     this.step++;
		// }

	};
	previous() {
		console.log("previous", this.finalData)
		this.finalData.map((obj: any) => {
			if (this.merchant_identify === obj.merchant_name) {
				obj.step--
			}

		})
		//this.step--
		// if (this.step == 1) {
		//   this.notification = false;
		// } else if (this.step == 2) {
		//   this.appreciation = false;
		// } else if (this.step == 3) {
		//   this.negotiate = false;
		// } else if (this.step == 4) {
		//   this.apply_rate = false;
		// }
	};

	onMerchent(data: any) {
		this.merchant_identify = data;
		this.jsonData.map((obj: any) => {
			if (obj['merchant_name'] === data) {
				this.step = obj.step;
			}
		})
	};
	onSubmit(data: any) {
		console.log('Submit', this.accountForm.value);
	};



	onSelectMonth(e: any) {
		console.log("sm", this.finalData)
		this.month = e.target.value;
		this.jsonData.map((mData: any) => {
			if (this.month === mData.month) {
				this.finalData = mData.data;
			}
		});
		this.finalData.map((jData: any) => {
			jData['step'] = 1
		});
	};

	completeStep(e: any) {
		console.log("gggggg", this.wizard);
		// if(this.wizard.currentStepIndex === 3) {
		// 	this.wizard['_wizardSteps'].forEach(p =>{
		// 		if(p.stepTitle=="Warning Letter" || p.stepTitle=="Remarks") {
		// 			p.completed = true;
		// 		}
		// 	})
		// }
		// this.wizard.wizardSteps._results.forEach(res=>{
		// 	if(res.selected){
		// 	  console.log(res.stepTitle, res);
		// 	}
		//   });
	}




}
