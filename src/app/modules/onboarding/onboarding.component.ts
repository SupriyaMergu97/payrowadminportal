import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppManagerService } from 'src/app/core/services/app-manager.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { CreateAcntService } from 'src/app/services/create-acnt.service';
import { GatewayService } from 'src/app/services/gateway.service';
import { ServiceCatalogueService } from 'src/app/services/service-catalogue.service';
import { MerchantAgreementComponent } from './reuseble-forms/merchant-agreement/merchant-agreement.component'
import { MidReqFormComponent } from './reuseble-forms/mid-req-form/mid-req-form.component'
import { SignatureEncryptionService } from 'src/app/services/signature-encryption.service';
declare var jQuery: any;

@Component({
	selector: 'app-onboarding',
	templateUrl: './onboarding.component.html',
	styleUrls: ['./onboarding.component.scss'],
})
export class OnboardingComponent implements OnInit {
	// @ViewChild(PersonalComponent) PersonalComponent: PersonalComponent;
	// @ViewChild(CardFormComponent) CardFormComponent: CardFormComponent;
	// @ViewChild(BankFormComponent) BankFormComponent: BankFormComponent;
	// @ViewChild(AddressFormComponent) AddressFormComponent: AddressFormComponent;
	// @ViewChild(LicenceFormComponent) LicenceFormComponent: LicenceFormComponent;
	// @ViewChild(StaffFormComponent) StaffFormComponent: StaffFormComponent;
	@ViewChild(MerchantAgreementComponent) merchantAgreementComponent: MerchantAgreementComponent;
	@ViewChild(MidReqFormComponent) midReqFormComponent: MidReqFormComponent;

	itemsPerPage = 9; // Items per page
	currentPridPage = 1;
	currentMidPage = 1;
	merchantList: any = [];
	merchantData: any;
	isMid: boolean = false;
	isAddMid: boolean = false;
	searchText: any;
	searchId: any;
	isAddPrid: boolean = false;
	pridData: any;
	pridList: any = []
	typeOfCustomer: any;
	idProof: any;
	payrowId: any;
	salesId: any;
	distributorId: any;
	adminList: any = []
	storeMngrList: any = []
	storeList: any = []
	staffList: any = []
	shareHolderData: any[] = [];
	incomeSouceData: any[] = [];
	goodsData: any[] = [];
	selectedAdmin: any;
	selectedMngr: any;
	selectedStore: any;
	selectedStaff: any;
	isAddMngr: boolean = false;
	isStoreMngr: boolean = false;
	isupdateAdmin: boolean = false;
	isupdateMngr: boolean = false;
	isupdateStore: boolean = false;
	isupdateStaff: boolean = false;
	isAddStore: boolean = false;
	isAddAdmin: boolean = false;
	isAddStaff: boolean = false;
	isagreement: boolean = false;
	storeOwnerForm!: FormGroup;
	incomeSourceForm!: FormGroup;
	ShareHolderForm: FormGroup;
	basicsForm!: FormGroup;
	constructor(private app: AppManagerService, private createAcnt: CreateAcntService, private gateway_serv: GatewayService,
		private note_Servce: NotificationService, private fb: FormBuilder, private srvc_Cat: ServiceCatalogueService,
		private encryption: SignatureEncryptionService) {
		this.app.ShowReportDate = 'true';

	}

	ngOnInit(): void {
		// this.getMerchantsList();

		this.ShareHolderForm = this.fb.group({
			name: ['', Validators.required],
			sharesPer: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			nationality: ['', Validators.required],
			address: ['', Validators.required],
			mobileNumber: ['', Validators.required]
		});
		this.incomeSourceForm = this.fb.group({
			country: ['', Validators.required],
			activityDet: ['', Validators.required],
			incomeSource: ['', [Validators.required, Validators.email]],
		});
		this.basicsForm = this.fb.group({
			firstName: new FormControl('', [Validators.required]),
			lastName: new FormControl('', [Validators.required]),
			gender: new FormControl('', Validators.required),
			title: new FormControl('', Validators.required),
			//   merchantType: new FormControl('', Validators.required),
			emailId: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
			mobileNumber: new FormControl('', Validators.required),
			globalUserRole: ('store owner'),
			mSalesPersonId: new FormControl('', Validators.required),
			groupId: new FormControl(''),
			distributorId: new FormControl('did268167', Validators.required),
			merchantPIN: ['', Validators.compose([Validators.required, Validators.pattern("[0-9]{4}")])],
			confirmPIN: ['', Validators.required],
			dateOfBirth: new FormControl('', [Validators.required]),
			status: {
				status: new FormControl(""),
				stage: new FormControl("")
			},
		})

		this.storeOwnerForm = this.fb.group({
			personalDetails: new FormControl(""),
			cardDetails: new FormControl(""),
			bankDetails: new FormControl(""),
			storeManagerDetails: new FormControl(""),
			adminDetails: new FormControl(""),
			addressDetails: new FormControl(""),
			licenseDetails: new FormControl(""),
			businessDetails: new FormControl(""),
			staffDetails: new FormControl(""),
			selectedBank: new FormControl('')
		})
		this.getPrids()
		this.loadScripts();
	}
	private loadScripts(): void {
		(function ($) {
			'use strict';

			$('#side_menu_bar > ul > li.nav-item > a').removeClass('active');
			$('#side_menu_bar > ul > li.nav-item > a#li_onboarding').addClass(
				'active'
			);
		})(jQuery);
	}

	getPrids() {
		this.pridList = [];
		let reqhead = this.encryption.createHeader();
		const key = this.encryption.generateKey(reqhead.key)

		this.createAcnt.getPrid(reqhead.headers).subscribe(async response => {
			const encryptedData = response.data;  // Assuming encrypted data comes under 'data'
			const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
			let reqheadtrans = this.encryption.createHeader();
			const keytrans = this.encryption.generateKey(reqheadtrans.key)

			this.createAcnt.getTransValuebyPrid(reqheadtrans.headers).subscribe(async tData => {
				const encryptedDatatrans = tData.data;  // Assuming encrypted data comes under 'data'
				const decryptedDatatrans = JSON.parse(this.encryption.decodeData(encryptedDatatrans, await keytrans));
				decryptedData.map((d: any) => {
					d.transValue = 0;
					decryptedDatatrans.map((t: any) => {
						console.log(t._id, d.payRowId)
						if (t._id == d.payRowId) {
							d.transValue = t.transValue;
						}
					})
					console.log(d)
					this.pridList.push(d);
				})
			})
			// this.pridList = data.data;
		})
	}
	getPagePrid(): any[] {
		const startIndex = (this.currentPridPage - 1) * this.itemsPerPage;
		const endIndex = startIndex + this.itemsPerPage;
		return this.pridList.slice(startIndex, endIndex);
	}
	onPridPageChange(page: number) {
		this.currentPridPage = page;
	}
	getPageMid(): any[] {
		const startIndex = (this.currentMidPage - 1) * this.itemsPerPage;
		const endIndex = startIndex + this.itemsPerPage;
		return this.merchantList.slice(startIndex, endIndex);
	}
	onMidPageChange(page: number) {
		this.currentMidPage = page;
	}
	onAddPridAction() {
		this.pridData = [];
		this.isAddPrid = !this.isAddPrid
	}
	onEditPridAcrion(id: any) {
		let reqhead = this.encryption.createHeader();
		const key = this.encryption.generateKey(reqhead.key)

		this.createAcnt.getPridbyId(id, reqhead.headers).subscribe(async res => {
			const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
			const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
			this.pridData = decryptedData;
			this.typeOfCustomer = this.pridData[0].typeOfCustomer;
			this.isAddPrid = !this.isAddPrid;
		})
	}
	backToPrIdList() {
		this.isAddPrid = !this.isAddPrid;
		this.typeOfCustomer = "";
		this.idProof = '';
		this.getPrids()
	}
	onSelMerchantType(e: any) {
		this.typeOfCustomer = e.target.value;
		console.log(this.typeOfCustomer);
	}
	getMidbyPrid(prid: any) {
		let tData: any;
		this.merchantList = [];
		this.pridData = [];
		this.payrowId = prid;
		this.isMid = !this.isMid;
		let reqhead = this.encryption.createHeader();
		const key = this.encryption.generateKey(reqhead.key)

		this.createAcnt.getPridbyId(prid, reqhead.headers).subscribe(async res => {
			const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
			const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
			this.pridData = decryptedData[0];
			this.typeOfCustomer = this.pridData.typeOfCustomer
			this.salesId = this.pridData.salesId;
			this.distributorId = this.pridData.distributorId;
			console.log(this.salesId, this.distributorId)
		})
		let reqheadmid = this.encryption.createHeader();
		const keymid = this.encryption.generateKey(reqheadmid.key)

		this.createAcnt.getMerchantsbyPrid(prid, reqheadmid.headers).subscribe(async res => {
			const encryptedDatamid = res.data;  // Assuming encrypted data comes under 'data'
			const decryptedDatamid = JSON.parse(this.encryption.decodeData(encryptedDatamid, await keymid));

			let reqheadtrans = this.encryption.createHeader();
			const keytrans = this.encryption.generateKey(reqheadtrans.key)

			this.createAcnt.getTransValuebyMid(reqheadtrans.headers).subscribe(async tData => {
				const encryptedDatatrans = tData.data;  // Assuming encrypted data comes under 'data'
				const decryptedDatatrans = JSON.parse(this.encryption.decodeData(encryptedDatatrans, await keytrans));
				console.log(tData);
				// tData = tData.data;
				// console.log(tData, 'tData');
				decryptedDatamid.map((mer: any) => {
					mer.transvalue = 0;
					if (!mer.mainMerchantId || mer.mainMerchantId == "" || mer.mainMerchantId == null) {
						mer.disable = true;
						this.merchantList.push(mer);
					}
					else {
						Promise.all([decryptedDatatrans.map((t: any) => {
							if (t._id == mer.mainMerchantId) {
								mer.transvalue = t.transValue;
							}
						})]).then(() => {
							mer.disable = false;
							this.merchantList.push(mer);
						})
					}
					// data.data.map((t:any)=>{
					// 	if(){}
					// })
				})
			})

			// this.merchantData = this.merchantList[0]
			console.log(this.merchantList, 'mmmmmmmmmmmm')
			// this.merchantList = data.data;
			// this.merchantData = this.merchantList[1];
			// this.getCategories()
			// this.getDetails();
			// this.getDetails();
			console.log(this.pridData);
		})
	}
	// onCreateMidAction(){
	//   this.isForm=!this.isForm
	// }
	// onMidDetails(){
	//   this.isForm=!this.isForm
	// }

	getMerbyId(id: any) {
		let reqhead = this.encryption.createHeader();
		const key = this.encryption.generateKey(reqhead.key)
		this.createAcnt.getMerbyid(id, reqhead.headers).subscribe(async res => {
			const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
			const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
			this.merchantData = decryptedData[0]
		})
	}
	onMidDetails() {
		this.isMid = !this.isMid
	}
	onCreateMidAction() {
		this.isAddMid = !this.isAddMid;
		this.merchantData = [];
		// this.storeOwnerForm.reset();
	}
	onEditMidAction(id: any) {
		this.merchantData = []
		let reqhead = this.encryption.createHeader();
		const key = this.encryption.generateKey(reqhead.key)
		this.createAcnt.getMerbyid(id, reqhead.headers).subscribe(async res => {
			const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
			const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
			this.merchantData = decryptedData[0];
			console.log(this.merchantData);
			this.getDetails();
			this.isAddMid = !this.isAddMid;
		})
	}
	backtoMidList() {
		this.isAddMid = !this.isAddMid;
		// this.getMidbyPrid(this.payrowId);
	}
	getDetails() {
		this.adminList = this.merchantData.adminDetails;
		this.storeMngrList = this.merchantData.storeManagerDetails;
		this.storeList = this.merchantData.storeDetails;
		this.staffList = this.merchantData.staffDetails;


		// console.log(this.basicsForm.value);
		console.log(this.storeOwnerForm.value, 'formValue');

	}
	addSHRow() {
		if (this.ShareHolderForm.valid) {
			this.shareHolderData.push(this.ShareHolderForm.value);
			this.ShareHolderForm.reset();
		}
	}
	addincomeRow() {
		if (this.incomeSourceForm.valid) {
			this.incomeSouceData.push(this.incomeSourceForm.value);
			this.incomeSourceForm.reset();
		}
	}
	createMerchant() {
		// this.storeOwnerForm.value.licenseDetails._id = null
		let value = this.storeOwnerForm.value.licenseDetails;
		let fdata = new FormData();
		if (this.merchantData != null) {
			value._id = this.merchantData._id
			// fdata.append("_id", this.merchantData._id);
			// fdata.append("status", "Active");
		}
		else {
			value.status = "Ongoing"
			// fdata.append("_id", value._id);
			// fdata.append("status", "Ongoing");
		}
		// fdata.append("companyName", value.companyName);
		// fdata.append("companyShortName", value.companyShortName);
		// fdata.append("nameOnReceipt", value.nameOnReceipt);
		// fdata.append("licenseNumber", value.licenseNumber);
		// fdata.append("licenseExpiry", value.licenseExpiry);
		// fdata.append("ecNumber", value.ecNumber);
		// fdata.append("ecExpiry", value.ecExpiry);
		// fdata.append("stage", "license Details");
		// fdata.append("payRowId", this.payrowId);
		// fdata.append("distributorId", this.distributorId);
		// fdata.append("salesId", this.salesId);
		// fdata.append("typeOfCustomer", this.typeOfCustomer)

		value.stage = "license Details";
		value.payRowId = this.payrowId;
		value.distributorId = this.distributorId;
		value.salesId = this.salesId;
		value.typeOfCustomer = this.typeOfCustomer;
		console.log(this.payrowId, this.distributorId, this.salesId)

		fdata.append("companyLogo", value.companyLogo);
		fdata.append("ecDocument", value.ecDocument);
		fdata.append("licenseDocument", value.licenseDocument);
		value.companyLogo = "";
		value.ecDocument = "";
		value.licenseDocument = "";
		fdata.append('data', this.encryption.encodeJsonObjectToHex(value))
		let reqhead = this.encryption.createHeader();
		const key = this.encryption.generateKey(reqhead.key)
		this.createAcnt.createMerchant(fdata, reqhead.headers).subscribe(async res => {
			const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
			const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
			this.merchantData = decryptedData;
			if (res.success === true) {
				// console.log(data.data);
				this.note_Servce.showSuccess(`200 - ${res.message}`, '')
			} else {
				this.note_Servce.showError(`${res.message}`, '')
			}
			this.getDetails();
		})
	}

	// getMerchants() {
	// 	this.createAcnt.getAllMerchants().subscribe(data => {
	// 		this.merchantList = data.data;
	// 	})
	// }


	updateBankDetails() {
		let id = this.merchantData._id;
		const value = {
			bankDetails: this.storeOwnerForm.value.bankDetails, "stage": "bank details",
			"_id": id
		};
		let req = { data: this.encryption.encodeJsonObjectToHex(value) }
		let reqhead = this.encryption.createHeader();
		const key = this.encryption.generateKey(reqhead.key)
		this.createAcnt.updateMerchant(req, reqhead.headers).subscribe(async res => {
			const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
			const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
			if (res.success === true) {
				// console.log(data.data);
				this.merchantData = decryptedData;
				this.getDetails();
				this.note_Servce.showSuccess(`200 - 'Bank Details added successfully'`, '')
			} else {
				this.note_Servce.showError(`${res.message}`, '')
			}
		})
	}
	createAdmin() {
		this.selectedAdmin = {};
		let id = this.merchantData._id;
		console.log(this.storeOwnerForm.value.adminDetails, 'adminvalue')
		let val = this.storeOwnerForm.value.adminDetails
		delete val._id;
		let fdata = new FormData();
		// this.storeOwnerForm.value.adminDetails.setValue({ _id: null })
		// fdata.append("_id", val._id);
		// fdata.append("adminId", val.adminId);
		// fdata.append("adminDetails[adminName]", val.adminName);
		// fdata.append("adminDetails[emailId]", val.emailId);
		// fdata.append("adminDetails[mobileNumber]", val.mobileNumber);
		// fdata.append("adminDetails[status]", val.status);
		// fdata.append("adminDetails[address]", val.address);
		// fdata.append("adminDetails[emiratesId]", val.emiratesId);
		// fdata.append("adminDetails[emiratesExpireDate]", val.emiratesExpireDate);
		// fdata.append("adminEmiratesDoc", val.adminEmiratesDoc);
		// fdata.append("stage", "admin Details");
		// fdata.append("_id", id);
		const value = {
			adminDetails: val, "stage": "admin Details", "_id": id
		};
		value.adminDetails.status = "Active"
		fdata.append("adminEmiratesDoc", val.adminEmiratesDoc);
		value.adminDetails.adminEmiratesDoc="";
		fdata.append('data', this.encryption.encodeJsonObjectToHex(value))
		let reqhead = this.encryption.createHeader();
		const key = this.encryption.generateKey(reqhead.key)
		this.createAcnt.updateMerchant(fdata, reqhead.headers).subscribe(async res => {
			const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
			const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
			console.log('2836198', decryptedData)
			if (res.success === true) {
				this.isAddAdmin = !this.isAddAdmin;
				this.merchantData = decryptedData;
				this.getDetails();
				this.storeOwnerForm.get('adminDetails')?.reset();
				this.note_Servce.showSuccess(`200 - 'Admin Created successfully'`, '')
			} else {
				this.note_Servce.showError(`${res.message}`, '')
			}
		})
	}
	onUpdateAdminAction(adminId: any) {
		this.adminList.map((admn: any) => {
			if (admn.adminId == adminId) {
				console.log(admn);
				this.isupdateAdmin = !this.isupdateAdmin;
				this.selectedAdmin = admn;
				this.storeOwnerForm.get('adminDetails')?.setValue(this.selectedAdmin)
			}
		})
	}
	updateAdmin() {
		let id = this.merchantData._id;
		let val = this.storeOwnerForm.value.adminDetails;
		let fdata = new FormData();
		console.log('val', val)
		// this.storeOwnerForm.value.adminDetails.setValue({ _id: null })
		// fdata.append("adminDetails[_id]", val._id);
		// fdata.append("adminDetails[adminId]", val.adminId);
		// fdata.append("adminDetails[adminName]", val.adminName);
		// fdata.append("adminDetails[emailId]", val.emailId);
		// fdata.append("adminDetails[mobileNumber]", val.mobileNumber);
		// fdata.append("adminDetails[status]", val.status);
		// fdata.append("adminDetails[address]", val.address);
		// fdata.append("adminDetails[emiratesId]", val.emiratesId);
		// fdata.append("adminDetails[emiratesExpireDate]", val.emiratesExpireDate);
		// fdata.append("stage", "admin Details");
		// fdata.append("_id", id);
		const value = {
			adminDetails: this.storeOwnerForm.value.adminDetails, "stage": "admin Details", "_id": id
		};
		fdata.append("adminEmiratesDoc", val.adminEmiratesDoc);
		value.adminDetails.adminEmiratesDoc="";
		fdata.append('data', this.encryption.encodeJsonObjectToHex(value))
		let reqhead = this.encryption.createHeader();
		const key = this.encryption.generateKey(reqhead.key)
		this.createAcnt.updateMerchant(fdata, reqhead.headers).subscribe(async res => {
			const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
			const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
			if (res.success === true) {
				this.merchantData = decryptedData;
				this.isupdateAdmin = !this.isupdateAdmin;
				this.getDetails();
				this.selectedAdmin = {}
				this.storeOwnerForm.get('adminDetails')?.reset();
				this.note_Servce.showSuccess(`200 - 'Admin updated successfully'`, '')
			} else {
				this.note_Servce.showError(`${res.message}`, '')
			}
		})
	}
	backtoAdminList() {
		this.isupdateAdmin = false;
		this.isAddAdmin = false;
		this.storeOwnerForm.get('adminDetails')?.reset();
		this.selectedAdmin = {}
	}
	createManager() {
		this.selectedMngr = {}
		let id = this.merchantData._id;
		let val = this.storeOwnerForm.value.storeManagerDetails
		delete val._id;
		let fdata = new FormData();
		console.log('val', val)
		// this.storeOwnerForm.value.adminDetails.setValue({ _id: null })
		// fdata.append("storeManagerDetails[_id]",val._id);
		// fdata.append("storeManagerDetails[managerId]",val.managerId);
		// fdata.append("storeManagerDetails[managerName]", val.managerName);
		// fdata.append("storeManagerDetails[emailId]", val.emailId);
		// fdata.append("storeManagerDetails[mobileNumber]", val.mobileNumber);
		// fdata.append("storeManagerDetails[status]", val.status);
		// fdata.append("storeManagerDetails[address]", val.address);
		// fdata.append("storeManagerDetails[emiratesId]", val.emiratesId);
		// fdata.append("storeManagerDetails[emiratesExpireDate]", val.emiratesExpireDate);
		// fdata.append("mngrEmiratesDocument", val.mngrEmiratesDocument);
		// fdata.append("stage", "manager details");
		// fdata.append("_id", id);
		const value = {
			storeManagerDetails: val, "stage": "manager details",
			"_id": id
		};
		value.storeManagerDetails.status = "Active";
		fdata.append("mngrEmiratesDocument", val.mngrEmiratesDocument);
		value.storeManagerDetails.mngrEmiratesDocument="";
		fdata.append('data', this.encryption.encodeJsonObjectToHex(value))
		let reqhead = this.encryption.createHeader();
		const key = this.encryption.generateKey(reqhead.key)
		this.createAcnt.updateMerchant(fdata, reqhead.headers).subscribe(async res => {
			const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
			const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
			if (res.success === true) {
				this.isStoreMngr = !this.isStoreMngr
				this.merchantData = decryptedData;
				this.storeOwnerForm.get('storeManagerDetails')?.reset();
				this.getDetails();
				this.note_Servce.showSuccess(`200 - 'Manager Created successfully'`, '')
			} else {
				this.note_Servce.showError(`${res.message}`, '')
			}
		})
	}
	onUpdateMngrAction(managerId: any) {
		this.storeMngrList.map((mngr: any) => {
			if (mngr.managerId == managerId) {
				console.log(mngr);
				this.isupdateMngr = !this.isupdateMngr;
				this.selectedMngr = mngr;
				this.storeOwnerForm.get('storeManagerDetails')?.setValue(this.selectedMngr)
			}
		})
	}
	updateMngr() {
		let id = this.merchantData._id;
		let val = this.storeOwnerForm.value.storeManagerDetails;
		// val._id = this.selectedMngr._id;
		// console.log(val);
		let fdata = new FormData();
		console.log('val', val)
		// this.storeOwnerForm.value.adminDetails.setValue({ _id: null })
		// fdata.append("storeManagerDetails[_id]", val._id);
		// fdata.append("storeManagerDetails[managerId]", val.managerId);
		// fdata.append("storeManagerDetails[managerName]", val.managerName);
		// fdata.append("storeManagerDetails[emailId]", val.emailId);
		// fdata.append("storeManagerDetails[mobileNumber]", val.mobileNumber);
		// fdata.append("storeManagerDetails[status]", val.status);
		// fdata.append("storeManagerDetails[address]", val.address);
		// fdata.append("storeManagerDetails[emiratesId]", val.emiratesId);
		// fdata.append("storeManagerDetails[emiratesExpireDate]", val.emiratesExpireDate);
		// fdata.append("stage", "manager details");
		// fdata.append("_id", id);
		const value = {
			storeManagerDetails: val, "stage": "manager details",
			"_id": id
		};
		fdata.append("mngrEmiratesDocument", val.mngrEmiratesDocument);
		value.storeManagerDetails.mngrEmiratesDocument="";
		fdata.append('data', this.encryption.encodeJsonObjectToHex(value))
		let reqhead = this.encryption.createHeader();
		const key = this.encryption.generateKey(reqhead.key)
		this.createAcnt.updateMerchant(fdata, reqhead.headers).subscribe(async res => {
			const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
			const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
			if (res.success === true) {
				this.merchantData = decryptedData;
				this.isupdateMngr = !this.isupdateMngr;
				this.getDetails();
				this.selectedMngr = {}
				this.storeOwnerForm.get('storeManagerDetails')?.reset();
				this.note_Servce.showSuccess(`200 - 'Manager Updated successfully'`, '')
			} else {
				this.note_Servce.showError(`${res.message}`, '')
			}
		})
	}
	backtoMngrList() {
		this.isupdateMngr = false;
		this.isStoreMngr = false;
		this.storeOwnerForm.get('storeManagerDetails')?.reset();
		this.selectedMngr = {}
	}
	createStore() {
		this.selectedStore = {}
		let id = this.merchantData._id;
		let val = this.storeOwnerForm.value.addressDetails
		delete val._id;
		console.log('store', this.storeOwnerForm.value.addressDetails)
		const value = {
			storeDetails: val, "stage": "store details",
			"_id": id
		};
		let req = { data: this.encryption.encodeJsonObjectToHex(value) }
		let reqhead = this.encryption.createHeader();
		const key = this.encryption.generateKey(reqhead.key)
		this.createAcnt.updateMerchant(req, reqhead.headers).subscribe(async res => {
			const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
			const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
			if (res.success) {
				this.isAddStore = !this.isAddStore;
				this.merchantData = decryptedData;
				this.storeOwnerForm.get('addressDetails')?.reset();
				this.getDetails();
				this.note_Servce.showSuccess(`200 - 'Store Created successfully'`, '')
			} else {
				this.note_Servce.showError(`${res.message}`, '')
			}
		})
	}
	onUpdateStoreAction(storeId: any) {
		this.storeList.map((store: any) => {
			if (store.storeId == storeId) {
				console.log(store);
				this.selectedStore = store;
				this.storeOwnerForm.get('addressDetails')?.setValue(this.selectedStore)
				this.isupdateStore = !this.isupdateStore;
			}
		})
	}
	updateStore() {
		let id = this.merchantData._id;
		// let val = this.storeOwnerForm.value.addressDetails;
		// val._id = this.selectedStore._id;
		// console.log(val);
		const value = {
			storeDetails: this.storeOwnerForm.value.addressDetails, "stage": "store details",
			"_id": id
		};
		let req = { data: this.encryption.encodeJsonObjectToHex(value) }
		let reqhead = this.encryption.createHeader();
		const key = this.encryption.generateKey(reqhead.key)
		this.createAcnt.updateMerchant(req, reqhead.headers).subscribe(async res => {
			const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
			const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
			if (res.success) {
				this.merchantData = decryptedData;
				this.isupdateStore = !this.isupdateStore;
				this.getDetails();
				this.selectedStore = {}
				this.storeOwnerForm.get('addressDetails')?.reset();
				this.note_Servce.showSuccess(`200 - 'Store updated successfully'`, '')
			} else {
				this.note_Servce.showError(`${res.message}`, '')
			}
		})
	}
	backtoStoreList() {
		this.isupdateStore = false;
		this.isAddStore = false;
		this.storeOwnerForm.get('addressDetails')?.reset();
		this.selectedStore = {}
	}
	businessDetails() {
		let id = this.merchantData._id;
		const value = {
			businessDetails: this.storeOwnerForm.value.businessDetails, "stage": "business details",
			"_id": id
		};
		let req = { data: this.encryption.encodeJsonObjectToHex(value) }
		let reqhead = this.encryption.createHeader();
		const key = this.encryption.generateKey(reqhead.key)
		this.createAcnt.updateMerchant(req, reqhead.headers).subscribe(async res => {
			const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
			const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
			if (res.success) {
				this.merchantData = decryptedData;
				this.getDetails();
				this.note_Servce.showSuccess(`200 - 'Business details added successfully'`, '')
			} else {
				this.note_Servce.showError(`${res.message}`, '')
			}
			// this.merchantData = data.data;
		})
	}
	createStaff() {
		this.selectedStaff = {}
		let id = this.merchantData._id;
		let val = this.storeOwnerForm.value.staffDetails;
		delete val._id;
		const fdata = new FormData();
		// fdata.append("_id", val._id);
		// fdata.append("staffId", val.staffId);
		// fdata.append("staffDetails[emiratesId]", val.emiratesId);
		// fdata.append("staffDetails[firstName]", val.firstName);
		// fdata.append("staffDetails[lastName]", val.lastName);
		// fdata.append("staffDetails[title]", val.title);
		// fdata.append("staffDetails[gender]", val.gender);
		// fdata.append("staffDetails[mobileNumber]", val.mobileNumber);
		// fdata.append("staffDetails[emiratesExpiry]", val.emiratesExpiry);
		// fdata.append("staffDetails[emailId]", val.emailId);
		// fdata.append("staffDetails[bankName]", val.bankName);
		// fdata.append("staffDetails[accountNumber]", val.accountNumber);
		// fdata.append("staffDetails[basicSalary]", val.basicSalary);
		// fdata.append("staffDetails[houseAllowance]", val.houseAllowance);
		// fdata.append("staffDetails[transportAllowance]", val.transportAllowance);
		// fdata.append("staffDetails[bonus]", val.bonus);
		// fdata.append("staffDetails[status]", "Active");
		// fdata.append("stage", "staff details");
		// fdata.append("_id", id);
		const value = {
			staffDetails: val, "stage": "staff details",
			"_id": id
		};
		value.staffDetails.status = "Active";
		// console.log(value, 'vvvvvvvvvv')
		fdata.append("staffEmiratesDocument", val.staffEmiratesDocument);
		value.staffDetails.staffEmiratesDocument="";
		fdata.append('data', this.encryption.encodeJsonObjectToHex(value))
		let reqhead = this.encryption.createHeader();
		const key = this.encryption.generateKey(reqhead.key)
		this.createAcnt.updateMerchant(fdata, reqhead.headers).subscribe(async res => {
			const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
			const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
			if (res.success) {
				this.isAddStaff = !this.isAddStaff;
				this.merchantData = decryptedData;
				this.storeOwnerForm.get('staffDetails')?.reset();
				this.getDetails();
				this.note_Servce.showSuccess(`200 - 'Staff created successfully'`, '')
			} else {
				this.note_Servce.showError(`${res.message}`, '')
			}
		})
	}
	onUpdateStaffAction(staffId: any) {
		this.staffList.map((staff: any) => {
			if (staff.staffId == staffId) {
				console.log(staff);
				this.selectedStaff = staff;
				this.storeOwnerForm.get('staffDetails')?.setValue(this.selectedStaff)
				this.isupdateStaff = !this.isupdateStaff;
			}
		})
	}
	updateStaff() {
		let id = this.merchantData._id;
		let val = this.storeOwnerForm.value.staffDetails;
		console.log('val', this.storeOwnerForm.value.staffDetails)
		const fdata = new FormData();
		// fdata.append("staffDetails[_id]", val._id);
		// fdata.append("staffDetails[staffId]", val.staffId);
		// fdata.append("staffDetails[emiratesId]", val.emiratesId);
		// fdata.append("staffDetails[firstName]", val.firstName);
		// fdata.append("staffDetails[lastName]", val.lastName);
		// fdata.append("staffDetails[title]", val.title);
		// fdata.append("staffDetails[gender]", val.gender);
		// fdata.append("staffDetails[mobileNumber]", val.mobileNumber);
		// fdata.append("staffDetails[emiratesExpiry]", val.emiratesExpiry);
		// fdata.append("staffDetails[emailId]", val.emailId);
		// fdata.append("staffDetails[bankName]", val.bankName);
		// fdata.append("staffDetails[accountNumber]", val.accountNumber);
		// fdata.append("staffDetails[basicSalary]", val.basicSalary);
		// fdata.append("staffDetails[houseAllowance]", val.houseAllowance);
		// fdata.append("staffDetails[transportAllowance]", val.transportAllowance);
		// fdata.append("staffDetails[bonus]", val.bonus);
		// fdata.append("staffDetails[status]", val.status);
		// fdata.append("staffDetails[joiningDate]", val.joiningDate);
		// fdata.append("stage", "staff details");
		// fdata.append("_id", id);
		const value = {
			staffDetails: this.storeOwnerForm.value.staffDetails, "stage": "staff details",
			"_id": id
		};
		fdata.append("staffEmiratesDocument", this.storeOwnerForm.value.staffDetails.get("staffEmiratesDocument").value);
		value.staffDetails.staffEmiratesDocument="";
		fdata.append('data', this.encryption.encodeJsonObjectToHex(value))
		let reqhead = this.encryption.createHeader();
		const key = this.encryption.generateKey(reqhead.key)
		this.createAcnt.updateMerchant(fdata, reqhead.headers).subscribe(async res => {
			const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
			const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
			if (res.success) {
				this.selectedStaff = {}
				this.merchantData = decryptedData;
				this.isupdateStaff = !this.isupdateStaff;
				this.getDetails();
				this.storeOwnerForm.get('staffDetails')?.reset();
				this.merchantAgreementComponent.reset();
				this.note_Servce.showSuccess(`200 - 'Staff updated successfully'`, '')
			} else {
				this.note_Servce.showError(`${res.message}`, '')
			}
		})
	}
	backtoStaffList() {
		this.isupdateStaff = false;
		this.isAddStore = false;
		this.storeOwnerForm.get('staffDetails')?.reset();
		this.selectedStaff = {}
	}
	ongetAgreement() {
		this.isagreement = !this.isagreement;
	}
	MidListDownload() {

	}
}

