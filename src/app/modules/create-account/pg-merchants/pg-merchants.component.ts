import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppManagerService } from 'src/app/core/services/app-manager.service';
import { Router } from '@angular/router';
import { CreateAcntService } from 'src/app/services/create-acnt.service';
import { CustomValidators } from '../custom-validators';
import { BankFormComponent } from '../reuseble-forms/bank-form/bank-form.component';
import { LicenceFormComponent } from '../reuseble-forms/licence-form/licence-form.component';
import { PersonalComponent } from '../reuseble-forms/personal/personal.component';
import { GatewayService } from 'src/app/services/gateway.service';
import { ServiceCatalogueService } from 'src/app/services/service-catalogue.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { SalesPersonService } from 'src/app/services/sales-person.service';
import { SignatureEncryptionService } from 'src/app/services/signature-encryption.service';


declare var jQuery: any;
interface ICountry {
  id: number;
  name: string;
  y: string,
  isDisabled?: boolean;
}
@Component({
  selector: 'app-pg-merchants',
  templateUrl: './pg-merchants.component.html',
  styleUrls: ['./pg-merchants.component.scss']
})
export class PgMerchantsComponent implements OnInit {
  @ViewChild(PersonalComponent) PersonalComponent: PersonalComponent;
  @ViewChild(BankFormComponent) BankFormComponent: BankFormComponent;
  @ViewChild(LicenceFormComponent) LicenceFormComponent: LicenceFormComponent;

  pgMerchantsForm!: FormGroup;
  gatewayUserForm!: FormGroup;
  subMerchantForm!: FormGroup
  basicForm!: FormGroup;
  merMasterForm!: FormGroup;
  selectedCatName: any;
  services: any = []
  mid: any
  categoryList: any = [];
  selectedCatList: any = [];
  selectedServList: any = [];
  price: any;
  payRowId: any;
  licenseNumber: any;
  posMidData: any;
  idForm: any; //need to clarify
  totalData: any
  cats: any = [];
  merchntObj: any = {};
  basic_step = false;
  personal_step = false;
  busiType_step = false;
  card_step = false;
  license_step = false;
  business_step = false;
  terms_step = false;
  education_step = false;
  step = 1;
  mainMer: boolean = false;
  isUser: boolean = false;
  isChecked: boolean = false;
  selectedCat: any = []
  selectedSer: any = "Select Service"
  dropdownList: any = [];
  selectedItems: any = []
  merchantData: any;
  sData: any = []
  merchantType: any;
  requiredField: boolean = false;
  onCheckdData: any = [];
  gatewayUsers: any = []
  gatewayuserData: any = [];
  subMerchantList: any = []
  subMerData: any = []
  subMer: boolean = false
  bankList: any = ['Mid Request Form', 'OnBoarding Form', 'Wps Form'];
  businesstypes: any = [];
  merchantList: any = [];
  userType: any = '';
  isEdit: boolean = false;
  isCreate: boolean = false;
  mainMerchantId: any = '';
  tempData: any = [];
  @ViewChild("myNameElem") myNameElem: ElementRef;
  errorMessage: String;
  displayLocationDeletePopup: boolean = false;
  srvcData: any = [];
  selectCategory: any = [];
  public number: number = 1;
  isServ: boolean = false;
  isAddServ: boolean = false;
  isFee: boolean = false;
  feeForm: FormGroup;
  mServiceForm: FormGroup;
  isItem: boolean = false;
  showDialog: boolean = false;
  dialogData: any = {}
  itemsPerPage: any = 9;
  currentMidPage: any = 1;
  currentSubMidPage: any = 1;
  currentServPage: any = 1;
  currentCatPage: any = 1;
  isUpdateMid: boolean = false;
  profileImg: any;
  fileSelected: File;
  distributorId: any;
  salesList: any = [];
  searchText: any;
  merServices: any = [
    // { x: 'All Services', id: 1 },
    // { x: 'License administrative cancellation fee', id: 2 },
    // { x: 'Ministry of Economy fee', id: 3 },
    // { x: 'Consumer Protection Complaint', id: 4 }
  ]
  ItemsList: any = [
    { "serviceCode": "100001", "itemId": "100", "itemName": "Civil company contract", "unitPrice": "200", "avarage": "220" },
    { "serviceCode": "100001", "itemId": "101", "itemName": "Percentage of the capital", "unitPrice": "1200", "avarage": "1000" },
    { "serviceCode": "100002", "itemId": "102", "itemName": "Partner fee", "unitPrice": "600", "avarage": "500" },
    { "serviceCode": "100003", "itemId": "103", "itemName": "Arabic trade name fee", "unitPrice": "3000", "avarage": "3000" }
  ]
  name = "Angular";
  cities: Array<ICountry> = [];
  selectedItemsList: any = [];
  dropdownSettings = {};
  isAdmin: boolean = false;
  isupdateAdmin: boolean = false;
  adminList: any = [];
  bankData: any = {}
  adminData: any;
  pridList: any[];
  // dropdownSettings2: IDropdownSettings = {};
  constructor(private app: AppManagerService, private fb: FormBuilder,
    private createAcnt: CreateAcntService, private gatewayServ: GatewayService, private sales_serv: SalesPersonService,
    private srvc_cats: ServiceCatalogueService, private note_Servce: NotificationService, private encryption: SignatureEncryptionService) {
    this.app.ShowReportDate = 'true';

  }

  ngOnInit(): void {
    this.getCategories();
    this.getSalesList();
    this.getPridList();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
    this.loadScripts();
    this.getAllMerMasterList();
    this.getMerchantsList();
    this.getSubMerchants();
    this.gatewayUserForm = this.fb.group({
      username: new FormControl('', Validators.required),
      PasswordHash: new FormControl('', Validators.required),
      gatewayMerchantId: new FormControl('', Validators.required),
    })
    this.subMerchantForm = this.fb.group({
      merchantId: new FormControl('', Validators.required),
      mainMerchantId: new FormControl('', Validators.required),
      merchantName: new FormControl('', Validators.required),
      merchantNameArabic: new FormControl('', Validators.required),
      marchantAddress: new FormControl('', Validators.required),
      merchantCountry: new FormControl('', Validators.required),
      merchantEmail: new FormControl('', Validators.required),
      merchantContactNumber: new FormControl('', Validators.required),
    })
    this.merMasterForm = this.fb.group({
      basic: this.fb.group({
        profileImg: [''],
        merchantId: new FormControl(''),
        merchantName: new FormControl('', [Validators.required]),
        merchantNameArabic: new FormControl('', [Validators.required]),
        marchantAddress: new FormControl('', Validators.required),
        merchantCountry: new FormControl('', Validators.required),
        merchantEmail: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
        merchantContactNumber: new FormControl('', Validators.required),
        salesId: new FormControl('', Validators.required),
        payRowId: new FormControl('', Validators.required),
        distributorId: new FormControl('', Validators.required),
        payrowFees: new FormControl('', Validators.required),
        bankFees: new FormControl('', Validators.required),
        merchantPostBackUrl: new FormControl('', Validators.required),
        status: ['', Validators.required],
        // governamentEntity: new FormControl('', Validators.required),
        globalUserRole: ('store owner'),
      }),
      personalDetails: new FormControl(""),
      adminDetails: new FormControl(""),
      bankDetails: new FormControl(""),
      licenseDetails: new FormControl(""),
      businessDetails: new FormControl(""),
    }
      //  CustomValidators.passwordMatchValidator('password','cnfPassword')
    )
    this.basicForm = this.fb.group({
      merchantId: new FormControl('', [Validators.required]),
      merchantName: new FormControl('', [Validators.required]),
      merchantNameArabic: new FormControl('', [Validators.required]),
      marchantAddress: new FormControl('', Validators.required),
      merchantCountry: new FormControl('', Validators.required),
      merchantEmail: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      merchantContactNumber: new FormControl('', Validators.required),
      // globalUserRole: ('store owner'),
      salesId: new FormControl('', Validators.required),
      groupId: new FormControl('', Validators.required),
      distributorId: new FormControl('', Validators.required),
      payrowFees: new FormControl('', Validators.required),
      bankFees: new FormControl('', Validators.required),
      // governamentEntity: new FormControl('', Validators.required),
      merchantPostBackUrl: new FormControl('', Validators.required),
      status: {
        status: new FormControl(""),
        stage: new FormControl("")
      },
    })
    this.pgMerchantsForm = this.fb.group({
      personalDetails: new FormControl(""),
      bankDetails: new FormControl(""),
      licenseDetails: new FormControl(""),
      businessDetails: new FormControl(""),
    }),
      this.mServiceForm = this.fb.group({
        merchantId: new FormControl('', [Validators.required]),
        serviceId: new FormControl('', [Validators.required]),
        serviceName: new FormControl(''),
        serviceNameArabic: new FormControl(''),
        unitPrice: new FormControl(''),
        currency: new FormControl(''),
        taxCode: new FormControl(''),
        mainMerchantId: new FormControl(''),
        bankServiceId: new FormControl(''),
        englishDescription: new FormControl(''),
        arabicDescription: new FormControl(''),
        priceType: new FormControl(''),
        taxApplicable: new FormControl('')
      })
    this.feeForm = this.fb.group({
      feeId: new FormControl('', Validators.required),
      serviceId: new FormControl('', Validators.required),
      merchantId: new FormControl('', Validators.required),
      chargeType: new FormControl('', Validators.required),
      chargeValue: new FormControl('', Validators.required),
      chargeName: new FormControl('', Validators.required),
      chargeArabicName: new FormControl('', Validators.required),
      taxCode: new FormControl('', Validators.required),
      bankServiceId: new FormControl('', Validators.required),
      englishDescription: new FormControl('', Validators.required),
      arabicDescription: new FormControl('', Validators.required),
      taxApplicable: new FormControl('', Validators.required)
    })

  }
  private loadScripts(): void {
    (function ($) {
      "use strict";
      $('#side_menu_bar > ul > li.nav-item > a').removeClass("active");
      $('#side_menu_bar > ul > li.nav-item > a#li_create_account').addClass("active");
    })(jQuery);
  }


  onDropDownClose() {
    console.log('dropdown closed');
  }
  getAllMerMasterList() {
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.gatewayServ.getGatewayUser(reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.gatewayUsers = decryptedData
      }
    })
  }
  merMastersList(mid: any) {
    this.gatewayuserData = [];
    this.mainMerchantId = mid;
    this.userType = '';
    this.mainMer = true;
    this.userType = 'Gatewayuser';
    console.log('main', this.mainMerchantId)
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.gatewayServ.getGatewayUserbyID(this.mainMerchantId, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.gatewayuserData = decryptedData;
      }
    })
  }
  getPridList() {
    this.pridList = [];
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.createAcnt.getPrid(reqhead.headers).subscribe(async response => {
      if (response.success = true) {
        const encryptedData = response.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.pridList = decryptedData;
      }
    })
  }
  getPosDetbyLicense(id: any) {
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.gatewayServ.getPosMIDbyLicense(id, reqhead.headers).subscribe(async res => {
      if (res.success = true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.posMidData = decryptedData;
      }
    })
  }
  getSalesList() {
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.sales_serv.getAllSales(reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.salesList = decryptedData;
        console.log(this.salesList)
      }
    })
  }
  onSelectSales(e: any) {
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.sales_serv.getSalesbyID(e.target.value, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.distributorId = decryptedData[0].distributorId;
      }
    })
  }
  onupdateAction(did: any) {
    this.merchantData;
    this.isUpdateMid = true;
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.gatewayServ.getpgMerbyId(did, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        if (decryptedData[0].documents && decryptedData[0].documents.profileImg) {
          this.profileImg = decryptedData[0].documents.profileImg
        }
        this.merchantData = decryptedData[0];
        this.merchantData.bankDetails = this.merchantData.bankDetails[0]
        // this.typeofDist = data.data[0].typeOfDistributor;
        this.adminList = this.merchantData.adminDetails;
        // this.bankData=this.merchantData.bankDetails[0]
        this.merMasterForm.get('basic')?.patchValue(this.merchantData);
        // }
        this.merMasterForm.value.basic = this.merchantData;
        this.isUser = !this.isUser
        console.log(this.merchantData, this.merMasterForm.value.basic, 'dddaaaattaa')
      }
    })
  }
  onProfileSelected(event: any) {
    this.profileImg = ""
    console.log("##############################", event.target.files[0])
    const file = <File>event.target.files[0];
    const nestgroup = this.merMasterForm.get('basic')
    if (nestgroup) {
      nestgroup.patchValue({ profileImg: file })
      console.log('image', nestgroup.value.profileImg);
    }
    // this.accountForm.value.basic.patchValue({ profileImg: file });
    // this.accountForm.get('profileImg')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.profileImg = reader.result as string;
    }
    const [fileSelected, rest] = event.target.files[0].name.split(".");
    this.fileSelected = fileSelected;
    reader.readAsDataURL(file)
  }
  addOwner() {

    this.merMasterForm.value.basic.status = "Active";
    let value = this.merMasterForm.value.basic;
    const formData = new FormData();
    // formData.append("merchantId", value.merchantId);
    // formData.append("merchantName", value.merchantName);
    // formData.append("merchantNameArabic", value.merchantNameArabic);
    // formData.append("marchantAddress", value.marchantAddress);
    // formData.append("merchantCountry", value.merchantCountry);
    // formData.append("merchantEmail", value.merchantEmail);
    // formData.append("merchantContactNumber", value.merchantContactNumber);
    // formData.append("salesId", value.salesId);
    // formData.append("payRowId", value.payRowId);
    // formData.append("distributorId", this.distributorId);
    // formData.append("payrowFees", value.payrowFees);
    // formData.append("bankFees", value.bankFees);
    // formData.append("merchantPostBackUrl", value.merchantPostBackUrl);
    // formData.append('status', 'Active')
    // formData.append('_id', this.distData._id)
    formData.append("profileImg", value.profileImg);
    value.distributorId = this.distributorId;
    value.profileImg = "";
    formData.append('data', this.encryption.encodeJsonObjectToHex(value))
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.gatewayServ.createpgUser(formData, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        console.log(decryptedData);
        this.merchantData = decryptedData;
        this.note_Servce.showSuccess(`200 - ${res.message}`, '')
      } else {
        this.note_Servce.showError(`${res.message}`, '')
      }
      console.log(this.merchantData)
    })
    // this.note_Servce.showError(500,'error')
  }
  updateBasic() {
    let id = this.merchantData._id
    // let id = "62d10c815d0493b5d98c190c"
    let value = this.merMasterForm.value.basic;
    const formData = new FormData();
    console.log(value)
    // formData.append("profileImg", value.profileImg);
    // formData.append("merchantId", value.merchantId);
    // formData.append("merchantName", value.merchantName);
    // formData.append("merchantNameArabic", value.merchantNameArabic);
    // formData.append("marchantAddress", value.marchantAddress);
    // formData.append("merchantCountry", value.merchantCountry);
    // formData.append("merchantEmail", value.merchantEmail);
    // formData.append("merchantContactNumber", value.merchantContactNumber);
    // formData.append("salesId", value.salesId);
    // formData.append("payRowId", value.payRowId);
    // formData.append("distributorId", value.distributorId);
    // formData.append("payrowFees", value.payrowFees);
    // formData.append("bankFees", value.bankFees);
    // formData.append("merchantPostBackUrl", value.merchantPostBackUrl);
    // formData.append('status', 'Active')
    // formData.append('_id', this.merchantData._id)
    console.log(value, 'vaaal')
    value.status = "Active"
    value._id = this.merchantData._id;
    formData.append("profileImg", value.profileImg);
    value.profileImg = "";
    formData.append('data', this.encryption.encodeJsonObjectToHex(value))
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.gatewayServ.updatepgUser(formData, reqhead.headers).subscribe(async res => {
      if (res.success = true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        console.log(decryptedData)
        this.note_Servce.showSuccess(`200 - ${res.message}`, '')
        this.merchantData = decryptedData;
      } else {
        this.note_Servce.showError(`${res.message}`, '')
      }
    })
  }
  updatePersonalInfo() {
    let data = this.merMasterForm.value.personalDetails;
    let fdata = new FormData();
    data._id = this.merchantData._id
    // fdata.append("city", data.city);
    // fdata.append("addressDetails", data.addressDetails);
    // fdata.append("country", data.country);
    // fdata.append("boBox", data.boBox);
    // fdata.append("_id", this.merchantData._id);
    // // if (this.merchantData.typeOfDistributor == "Government") {
    // //   fdata.append("degreeNumber", data.degreeNumber);
    // //   fdata.append("degreeExpiry", data.degreeExpiry);
    // //   fdata.append("degreeDocument", data.degreeDocument);
    // // }
    // // else {
    // fdata.append("emiratesId", data.emiratesId);
    // fdata.append("emiratesExpiry", data.eIExpiry);
    // fdata.append("passportNum", data.passportNum);
    // fdata.append("passportExpiry", data.passportExpiry);
    // }
    // console.log(fdata, 'vaaal')
    fdata.append("emiratesDocument", data.emiratesDocument);
    fdata.append("passportDocument", data.passportDocument);
    data.emiratesDocument = "";
    data.passportDocument = "";
    fdata.append('data', this.encryption.encodeJsonObjectToHex(data))
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.gatewayServ.updatepgUser(fdata, reqhead.headers).subscribe(async res => {
      if (res.success = true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        console.log(decryptedData)
        this.note_Servce.showSuccess(`200 - ${res.message}`, '')
        this.merchantData = decryptedData;
      } else {
        this.note_Servce.showError(`${res.message}`, '')
      }
    })
  }
  onCreateAdmin() {
    this.isAdmin = true;
    this.isupdateAdmin = false;
    // this.isAgreement = false;
  }
  backtoAdminList() {
    this.isAdmin = false;
    this.isupdateAdmin = false;
  }
  createAdmin() {
    this.isAdmin = false;
    let value = { stage: "adminDetails", _id: this.merchantData._id, adminDetails: this.merMasterForm.value.adminDetails }
    value.adminDetails.status = "Active";
    let data = this.merMasterForm.value.adminDetails;
    let fdata = new FormData();
    // fdata.append("adminDetails[adminId]", data.adminId);
    // fdata.append("adminDetails[adminName]", data.adminName);
    // fdata.append("adminDetails[emailId]", data.emailId);
    // fdata.append("adminDetails[mobileNumber]", data.mobileNumber);
    // fdata.append("adminDetails[status]", "Active");
    // fdata.append("adminDetails[address]", data.address);
    // fdata.append("adminDetails[emiratesId]", data.emiratesId);
    // fdata.append("adminDetails[emiratesExpiry]", data.emiratesExpiry);
    // fdata.append("_id", this.merchantData._id);
    // fdata.append("stage", "adminDetails");
    delete value.adminDetails._id;
    fdata.append("adminEmiratesDoc", data.adminEmiratesDoc);
    value.adminDetails.adminEmiratesDoc = "";
    fdata.append('data', this.encryption.encodeJsonObjectToHex(value))
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.gatewayServ.updatepgUser(fdata, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.note_Servce.showSuccess(`200 - ${res.message}`, '')
        console.log(decryptedData, 'aaaaaaaaaa')
        this.merchantData = decryptedData;
        this.adminList = this.merchantData.adminDetails;
      } else {
        this.note_Servce.showError(`${res.message}`, '')
        this.merchantData = this.merchantData;
      }
      // this.distData = [...this.distData, data];
      console.log(this.adminList, 'adddmin')
    })
  }
  onUpdateAdmin(id: any) {
    // this.isAdmin = !this.isAdmin;
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.gatewayServ.getAdminByID(id, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.adminData = decryptedData[0].adminDetails;
        console.log(this.adminData)
        this.isupdateAdmin = !this.isupdateAdmin;
      }
    })
  }
  updateAdminInfo() {
    let id = this.merchantData._id
    // let id = "62b4981cc01212351c548a77"
    let value = { stage: "adminDetails", _id: this.merchantData._id, adminDetails: this.merMasterForm.value.adminDetails }
    let data = this.merMasterForm.value.adminDetails;
    let fdata = new FormData();
    // fdata.append("adminDetails[adminId]", data.adminId);
    // fdata.append("adminDetails[_id]", data._id);
    // fdata.append("adminDetails[adminName]", data.adminName);
    // fdata.append("adminDetails[emailId]", data.emailId);
    // fdata.append("adminDetails[mobileNumber]", data.mobileNumber);
    // fdata.append("adminDetails[status]", data.status);
    // fdata.append("adminDetails[address]", data.address);
    // fdata.append("adminDetails[emiratesId]", data.emiratesId);
    // fdata.append("adminDetails[emiratesExpiry]", data.emiratesExpiry);
    // fdata.append("_id", this.merchantData._id);
    // fdata.append("stage", "adminDetails");

    fdata.append("adminEmiratesDoc", data.adminEmiratesDoc);
    value.adminDetails.adminEmiratesDoc = "";
    fdata.append('data', this.encryption.encodeJsonObjectToHex(value))
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.gatewayServ.updatepgUser(fdata, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.note_Servce.showSuccess(`200 - ${res.message}`, '')
        this.merchantData = decryptedData;
      } else {
        this.note_Servce.showError(`${res.message}`, '');
        this.merchantData = this.merchantData;
      }
    })
  }
  updateBankInfo() {
    let id = this.merchantData._id
    // let id = "62b4981cc01212351c548a77"
    let value = { stage: "bankDetails", _id: this.merchantData._id, bankDetails: this.merMasterForm.value.bankDetails }
    let req = { data: this.encryption.encodeJsonObjectToHex(value) }
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.gatewayServ.updatepgUser(req, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.note_Servce.showSuccess(`200 - ${res.message}`, '')
        this.merchantData = decryptedData;
      } else {
        this.note_Servce.showError(`${res.message}`, '');
        this.merchantData = this.merchantData;
      }
    })
  }
  updateLicenceInfo() {
    // let id = this.distData._id
    // let id = "62b4981cc01212351c548a77"
    // value._id=this.distData._id;
    let value = { stage: "licenseDetails", _id: this.merchantData._id, licenseDetails: this.merMasterForm.value.licenseDetails }

    let data = this.merMasterForm.value.licenseDetails;
    // console.log(this.accountForm.value.licenseDetails,data.get('companyName')?.value)
    let fdata = new FormData();
    // fdata.append("_id", this.merchantData._id);
    // fdata.append("licenseDetails[companyName]", data.companyName);
    // fdata.append("licenseDetails[companyShortName]", data.companyShortName);
    // fdata.append("licenseDetails[natureOfBusiness]", data.natureOfBusiness);
    // fdata.append("licenseDetails[nameOnLicense]", data.nameOnLicense);
    // fdata.append("licenseDetails[ecNumber]", data.ecNumber);
    // fdata.append("licenseDetails[ecExpiry]", data.ecExpiry);
    // fdata.append("licenseDetails[licenseNumber]", data.licenseNumber);
    // fdata.append("licenseDetails[licenseExpiry]", data.licenseExpiry);
    // fdata.append("stage", "licenseDetails");

    fdata.append("licenseDocument", data.licenseDocument);
    fdata.append("ecDocument", data.ecDocument);
    fdata.append("companyLogo", data.companyLogo);
    value.licenseDetails.companyLogo = "";
    value.licenseDetails.ecDocument = "";
    value.licenseDetails.licenseDocument = "";
    fdata.append('data', this.encryption.encodeJsonObjectToHex(value))
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.gatewayServ.updatepgUser(fdata, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.note_Servce.showSuccess(`200 - ${res.message}`, '')
        this.merchantData = decryptedData;
      } else {
        this.note_Servce.showError(`${res.message}`, '');
        this.merchantData = this.merchantData;
      }
    })
    // let value = { stage: "licenseDetails", _id: this.distData._id, licenseDetails: this.accountForm.value.licenseDetails };
    // this.distributor.updateDistributor(value).subscribe(data => {
    //   if (data.success = 200) {
    //     this.note_Servce.showSuccess(`200 - ${data.message}`, '')
    //     this.distData = data.data;
    //   } else {
    //     this.note_Servce.showError(`${data.message}`, '')
    //   } this.distData = [...this.distData, data]
    // })
  }
  updateBusinessInfo() {
    let id = this.merchantData._id
    // let id = "62b4981cc01212351c548a77"
    let value = { stage: "businessDetails", _id: this.merchantData._id, businessDetails: this.merMasterForm.value.businessDetails }
    let req = { data: this.encryption.encodeJsonObjectToHex(value) }
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.gatewayServ.updatepgUser(req, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.note_Servce.showSuccess(`200 - ${res.message}`, '')
        this.merchantData = decryptedData;
      } else {
        this.note_Servce.showError(`${res.message}`, '');
        this.merchantData = this.merchantData;
      }
    })
  }




  createGatewayMer() {
    const value = this.gatewayUserForm.value
    let req = { data: this.encryption.encodeJsonObjectToHex(value) }
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.gatewayServ.creategatewayUser(req, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.merMastersList(this.mainMerchantId);
        this.note_Servce.showSuccess(`200 - ${res.message}`, '');
      } else {
        this.note_Servce.showError(`${res.message}`, '')
      }
      // console.log('master', decryptedData);
    })
  }
  getPGUserByID(id: any) {
    this.tempData = []
    this.isEdit = false;
    this.isCreate = false;
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.gatewayServ.getGatewayUserbyID(id, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        console.log('res', decryptedData);
        this.tempData = decryptedData
        this.gatewayUserForm.patchValue(decryptedData[0]);
        this.gatewayUserForm.disable();
      }
    })
  }
  delUser() {
    if (this.userType === "Gatewayuser") {
      let reqhead = this.encryption.createHeader();
      const key = this.encryption.generateKey(reqhead.key)
      this.gatewayServ.delGatewayUserbyID(this.tempData[0]._id, reqhead.headers).subscribe(async res => {
        if (res.success === true) {
          const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
          const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
          this.merMastersList(this.mainMerchantId);
          this.note_Servce.showSuccess(`200 - ${res.message}`, '')
        } else {
          this.note_Servce.showError(`${res.message}`, '')
        }
      })
    }
    if (this.userType === "Submerchant") {
      let reqhead = this.encryption.createHeader();
      const key = this.encryption.generateKey(reqhead.key)
      this.gatewayServ.delSubMerchant(this.tempData[0]._id, reqhead.headers).subscribe(async res => {
        if (res.success === true) {
          const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
          const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
          this.subMerchant(this.mainMerchantId);
          this.note_Servce.showSuccess(`200 - ${res.message}`, '')
        } else {
          this.note_Servce.showError(`${res.message}`, '')
        }
      })
    }
    if (this.userType === "MerServices") {
      let reqhead = this.encryption.createHeader();
      const key = this.encryption.generateKey(reqhead.key)
      this.gatewayServ.removeServFrmPGMer(this.tempData[0]._id, reqhead.headers).subscribe(async res => {
        // const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        // const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        if (res.success === true) {
          this.getMerchantServices(this.mid);
          this.note_Servce.showSuccess(`200 - ${res.message}`, '')
        } else {
          this.note_Servce.showError(`${res.message}`, '')
        }
      })
    }

  }
  updateUser() {
    if (this.userType === "Gatewayuser") {
      const value = this.gatewayUserForm.value;
      console.log(value);
      let req = { data: this.encryption.encodeJsonObjectToHex(value) }
      let reqhead = this.encryption.createHeader();
      const key = this.encryption.generateKey(reqhead.key)
      this.gatewayServ.updateGatewayUserByID(req, this.tempData[0]._id, reqhead.headers).subscribe(async res => {
        if (res.success === true) {
          const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
          const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
          this.merMastersList(this.mainMerchantId);
          this.note_Servce.showSuccess(`200 - ${res.message}`, '');
        } else {
          this.note_Servce.showError(`${res.message}`, '');
        }
      })
    }
    if (this.userType === "Submerchant") {
      const value = this.subMerchantForm.value;
      console.log(value)
      let req = { data: this.encryption.encodeJsonObjectToHex(value) }
      let reqhead = this.encryption.createHeader();
      const key = this.encryption.generateKey(reqhead.key)
      this.gatewayServ.updateSubMerchantByID(req, this.tempData[0]._id, reqhead.headers).subscribe(async res => {
        if (res.success === true) {
          const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
          const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
          this.subMerchant(this.mainMerchantId);
          this.note_Servce.showSuccess(`200 - ${res.message}`, '')
        } else {
          this.note_Servce.showError(`${res.message}`, '')
        }
      })
    }
  }
  edit() {
    this.isEdit = true;
    this.gatewayUserForm.enable();
    this.subMerchantForm.enable();
  }
  resetForm() {
    this.isEdit = false;
    this.isCreate = true;
    this.gatewayUserForm.enable();
    this.gatewayUserForm.reset();
    this.gatewayUserForm.patchValue({ gatewayMerchantId: this.mainMerchantId });
    this.subMerchantForm.enable();
    this.subMerchantForm.reset();
    this.subMerchantForm.patchValue({ mainMerchantId: this.mainMerchantId });
  }
  addUser() {
    this.isUser = !this.isUser;
    this.merMasterForm.reset();
    this.profileImg = "";
  }

  getSubMerchants() {
    this.subMerchantList = []
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.gatewayServ.getSubMerchant(reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.subMerchantList = decryptedData;
      }
    })
  }
  getSubMerchantsByID(id: any) {
    this.tempData = [];
    this.isEdit = false;
    this.isCreate = false;
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.gatewayServ.getSubMerchantbyID(id, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.tempData = decryptedData
        this.subMerchantForm.patchValue(decryptedData[0]);
        this.subMerchantForm.disable();
      }
    })
  }
  createsubMerchant() {
    const value = this.subMerchantForm.value;
    let req = { data: this.encryption.encodeJsonObjectToHex(value) }
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.gatewayServ.createSubMerchant(req, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        console.log(decryptedData);
        this.note_Servce.showSuccess(`200 - ${res.message}`, '')
        this.subMerchant(this.mainMerchantId);
      } else {
        this.note_Servce.showError(`${res.message}`, '')
      }
    })
  }
  subMerchant(mid: any) {
    this.subMerData = [];
    this.mainMerchantId = mid;
    this.userType = ''
    this.subMer = true;
    this.userType = 'Submerchant';
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.gatewayServ.getSubMerchantbyID(this.mainMerchantId, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.subMerData = decryptedData
      }
    })
  }
  getMerchantServices(id: any) {
    this.merchantData = {}
    this.userType = ''
    this.mid = id;
    this.userType = 'MerServices';
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.gatewayServ.getpgMerbyId(id, reqhead.headers).subscribe(async res => {
      if (res.success == true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.merchantData = decryptedData[0];
      }
    })
    let reqheadpg = this.encryption.createHeader();
    const keypg = this.encryption.generateKey(reqheadpg.key)
    this.gatewayServ.getServofPGMer(id, reqheadpg.headers).subscribe(async (res) => {
      if (res.success === true) {
        const encryptedDatapg = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedDatapg = JSON.parse(this.encryption.decodeData(encryptedDatapg, await keypg));
        this.selectedServList = decryptedDatapg;
        console.log(decryptedDatapg)
      }
    })
    this.getServicesbyMid(id);
    this.isItem = !this.isItem
  }
  back() {
    this.subMer = false;
    this.mainMer = false;
    this.mainMerchantId = ''
  }
  getMerchantsList() {
    this.merchantList = []
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.gatewayServ.getpgUsersDetails(reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.merchantList = decryptedData;
      }
    })
  }
  oneditClick(serviceId: any) {
    this.services.map((d: any) => {
      if (serviceId == d.serviceId) {
        d.showEdit = true;
        this.price = d.unitPrice;
      }
    })
  }
  oneditPrice(serviceId: any) {
    this.services.map((s: any) => {
      if (s.serviceId === serviceId) {
        s.showEdit = false;
        s.unitPrice = this.price;
        // this.price = 0;
      }
    })
  }

  backToMer() {
    this.isItem = !this.isItem
  }
  merService(id: any) {
    this.tempData = [];
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.gatewayServ.getServofPGMerbyId(id, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.tempData = decryptedData;
        this.mServiceForm.patchValue(decryptedData[0])
      }
      this.isAddServ = !this.isAddServ;
      this.isItem = !this.isItem;
    })
  }
  getServDetails(id: any) {
    this.tempData = [];
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.gatewayServ.getServofPGMerbyId(id, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.tempData = decryptedData;
      }
    })
  }
  backtoServiceList() {
    this.isAddServ = !this.isAddServ;
    this.isItem = !this.isItem;
  }
  fee() {
    this.isFee = !this.isFee
  }
  itemDetails(id: any) {
    this.selectedCatList.map((d: any) => {
      if (d.categoryId == id) {
        this.selectedServList = d.serviceItems;
      }
    })
    this.isItem = !this.isItem;
  }
  onMidPageChange(page: number) {
    this.currentMidPage = page;
  }
  getPageMid(): any[] {
    const startIndex = (this.currentMidPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.merchantList.slice(startIndex, endIndex);
  }
  onSubMidPageChange(page: number) {
    this.currentSubMidPage = page;
  }
  getSubMidPage(): any[] {
    const startIndex = (this.currentSubMidPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.subMerData.slice(startIndex, endIndex);
  }
  onServPageChange(page: number) {
    this.currentServPage = page;
  }
  getPageServ(): any[] {
    const startIndex = (this.currentServPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.selectedServList.slice(startIndex, endIndex);
  }
  onCatPageChange(page: number) {
    this.currentCatPage = page;
  }
  getPageCat(): any[] {
    console.log(this.selectedCatList)
    if (this.selectedCatList.length > 0) {
      const startIndex = (this.currentCatPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.selectedCatList.slice(startIndex, endIndex);
    }
    else {
      return [];
    }
  }
  openDialogMid(id: any): void {
    this.showDialog = true;
    this.dialogData = {}
    this.merchantList.map((d: any) => {
      if (d._id == id) {
        // this.dialogData=d;
        this.dialogData = {
          header1: "Contact Details",
          subHeader11: "Email",
          content11: d.merchantEmail ?? "",
          subHeader12: "Contact Number",
          content12: d.merchantContactNumber ?? "",
          subHeader13: "",
          content13: "",
          header2: "Merchant Details",
          subHeader21: "Merchant ID",
          content21: d.merchantId ?? "",
          subHeader22: "Merchant Name",
          content22: d.merchantName ?? "",
          subHeader23: "",
          content23: "",
          header3: "",
          subHeader31: "",
          content31: "",
          subHeader32: "",
          content32: "",
        }
        // this.empForm.patchValue(d);
        // this.profileImg = `https://payrowdev.uaenorth.cloudapp.azure.com/adminbackend/distributor/download/${d.empImageId}`;
        // console.log(d.path, this.profileImg, 'image');
      }
    })
  }
  openDialogSubMid(id: any): void {
    this.showDialog = true;
    this.dialogData = {}
    this.subMerData.map((d: any) => {
      if (d._id == id) {
        // this.dialogData=d;
        this.dialogData = {
          header1: "Contact Details",
          subHeader11: "Email",
          content11: d.merchantEmail ?? "",
          subHeader12: "Contact Number",
          content12: d.merchantContactNumber ?? "",
          subHeader13: "Main Merchant ID",
          content13: d.mainMerchantId ?? "",
          header2: "Merchant Details",
          subHeader21: "Merchant ID",
          content21: d.merchantId ?? "",
          subHeader22: "Merchant Name",
          content22: d.merchantName ?? "",
          subHeader23: "",
          content23: "",
          header3: "",
          subHeader31: "",
          content31: "",
          subHeader32: "",
          content32: "",
        }
        // this.empForm.patchValue(d);
        // this.profileImg = `https://payrowdev.uaenorth.cloudapp.azure.com/adminbackend/distributor/download/${d.empImageId}`;
        // console.log(d.path, this.profileImg, 'image');
      }
    })
  }
  closeDialog(): void {
    this.showDialog = false;
  }
  addFeeDetails() { }
  // back() {
  //   this.isUser = !this.isUser
  // }
  getCategories() {
    let tmp: any = [];
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.srvc_cats.getCategories(reqhead.headers).subscribe(async res => {
      if (res.success) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        let number = 1;
        for (let i = 0; i < decryptedData.length; i++) {
          // if (data.data[i].catalogueType === 'Government Catalogue') {
          tmp.push({ item_id: i + 1, item_text: decryptedData[i].categoryName, catId: decryptedData[i].categoryId });
          // }
        }
        this.categoryList = tmp;
        console.log(this.categoryList)
      } else {
      }
    })
  }
  addServtoMerchant() {
    this.onCheckdData.map((serv: any) => {
      // serv.mainMerchantId == this.mid;
      let req = { data: this.encryption.encodeJsonObjectToHex(serv) }
      let reqhead = this.encryption.createHeader();
      const key = this.encryption.generateKey(reqhead.key)
      this.gatewayServ.addServToPGMer(req, reqhead.headers).subscribe(async res => {
        this.getMerchantServices(this.mid);
        if (res.success === true) {
          const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
          const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
          console.log('res');
          this.note_Servce.showSuccess(`200 - ${res.message}`, '')
        } else {
          this.note_Servce.showError(`${res.message}`, '')
        }
      })
    })
  }
  getServicesbyMid(mid: any) {
    console.log(mid)
    this.merServices = [];
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.gatewayServ.getServofPGMer(mid, reqhead.headers).subscribe(async res => {
      if (res.success == true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        decryptedData.map((d: any) => {
          if (d.mainMerchantId == mid) {
            this.merServices.push(d);
          }
        })
      }
    })
  }
  onDeSelectAll(items: any) {
    console.log(items, 'onDeSelectAll');
    this.services = []
  }
  onSelectAll(items: any) {
    console.log('onSelectAll', items);
    this.services = [];
    // let allServices=[];
    items.map((item: any) => {
      const selectedOption = this.categoryList.find((option: { item_id: any; }) => option.item_id === item.item_id);
      console.log(items, selectedOption, this.merchantData.bankDetails, 'item')
      this.selectedCatName = item.item_text;
      this.selectedCat = selectedOption.catId;
      let reqhead = this.encryption.createHeader();
      const key = this.encryption.generateKey(reqhead.key)
      this.srvc_cats.getServByCat(this.selectedCat, reqhead.headers).subscribe(async res => {
        let bankMerchantId: string;
        if (res.success == true) {
          const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
          const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
          if (this.merchantData.bankDetails.length <= 0 || this.merchantData.bankDetails.bankServiceId == null || undefined) {
            bankMerchantId = ""
          }
          else { bankMerchantId = this.merchantData.bankDetails.bankServiceId }
          decryptedData.map((d: any) => {
            let isMatched = false;
            d['priceType'] = 'AED';
            d['bankServiceId'] = bankMerchantId;
            d['merchantId'] = this.mid;
            d['mainMerchantId'] = this.mid;
            d['categoryName'] = this.selectedCatName;
            // d['isChecked'] = false;
            Promise.all(this.merServices.map((m: any) => {
              console.log(m.serviceId, d.serviceId, 'match')
              if (m.serviceId === d.serviceId) {
                isMatched = true;
                d.isExist = true;
                d.isChecked = true;
                d.unitPrice = 0;
                // console.log(d);
                this.services.push(d)
                // this.onCheckdData.push(d)
              }
            })).then(() => {
              if (isMatched === false) {
                d.unitPrice = 0;
                d.isChecked = false
                this.services.push(d);
              }
            })
            // this.services.push(d);
            console.log(this.services, this.onCheckdData, 'seee')
          })
          //   this.services = res.data;
        }
      })
    })
  }
  onSelectCat(item: any) {
    // this.services=[]
    const selectedOption = this.categoryList.find((option: { item_id: any; }) => option.item_id === item.item_id);
    console.log(item, selectedOption, this.merchantData.bankDetails, 'item')
    this.selectCategory = [];
    // this.onCheckdData = [];
    this.selectedCatName = item.item_text;
    this.selectedCat = selectedOption.catId;

    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.srvc_cats.getServByCat(this.selectedCat, reqhead.headers).subscribe(async res => {
      let bankMerchantId: string;
      if (res.success == true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        if (this.merchantData.bankDetails.length <= 0 || this.merchantData.bankDetails[0].bankServiceId == null || undefined) {
          bankMerchantId = ""
        }
        else { bankMerchantId = this.merchantData.bankDetails[0].bankServiceId }
        decryptedData.map((d: any) => {
          let isMatched = false;
          d['priceType'] = 'AED';
          d['bankServiceId'] = bankMerchantId;
          d['merchantId'] = this.mid;
          d['mainMerchantId'] = this.mid;
          d['categoryName'] = this.selectedCatName;
          // d['isChecked'] = false;
          Promise.all(this.merServices.map((m: any) => {
            console.log(m.serviceId, d.serviceId, 'match')
            if (m.serviceId === d.serviceId) {
              isMatched = true;
              d.isExist = true;
              d.isChecked = true;
              d.unitPrice = 0;
              // console.log(d);
              this.services.push(d)
              // this.onCheckdData.push(d)
            }
          })).then(() => {
            if (isMatched === false) {
              d.unitPrice = 0;
              d.isChecked = false
              this.services.push(d);
            }
          })
          // this.services.push(d);
          console.log(this.services, this.onCheckdData, 'seee')
        })
        //   this.services = res.data;
      }
    })
    // this.commercial = true
  }
  onItemDeSelect(item: any) {
    console.log(item)
    const selectedOption = this.categoryList.find((option: { item_id: any; }) => option.item_id === item.item_id);
    this.services = this.services.filter((item: { categoryId: any; }) => item.categoryId !== selectedOption.catId);
    console.log(this.services)
  }
  onSelService(id: any) {
    console.log(id);
    let isMatched = false;
    this.services.map((s: any) => {
      if (s.serviceId === id) {
        console.log(s)
        if (this.onCheckdData.length > 0) {
          Promise.all(this.onCheckdData.map((d: any) => {
            console.log(d.serviceId, id, d.isChecked)
            if (d.serviceId === id && d.isChecked === true) {
              isMatched = true;
              this.onCheckdData = this.onCheckdData.filter((item: any) => item !== d);
              // break;
              console.log(this.onCheckdData, 'check1')
            }
          })).then(() => {
            if (isMatched === false) {
              console.log('1')
              s.isChecked = true;
              delete s._id;
              console.log('2=')
              this.onCheckdData.push(s);
              console.log('3')
              console.log(this.onCheckdData, 'check2')
            }
          })
        }
        else {
          console.log('1')
          s.isChecked = true;
          delete s._id;
          console.log('2')
          this.onCheckdData.push(s);
          console.log('3')
          console.log(this.onCheckdData, 'check2')
        }
        // this.services.delete(s)
      }
    })
  }







  subTabs(id: any) {
    this.step = 1;
  }

  previous() {
    this.step--
    if (this.step == 1) {
      this.basic_step = false;
    } else if (this.step == 2) {
      this.personal_step = false;
    } else if (this.step == 3) {
      this.card_step = false;
    } else if (this.step == 4) {
      this.license_step = false;

    } else if (this.step == 5) {
      this.business_step = false;
    } else if (this.step == 6) {
      this.busiType_step = false;
    }
    else if (this.step == 7) {
      this.terms_step = false;
    }
  }

  onChecked(e: any, id: String) {
    if (e.target.checked) {
      this.selectedCat.push(id);
    }
    else {
      this.selectedCat = this.selectedCat.filter((m: any) => m != id)
    }
  }
  get f() {
    return (this.pgMerchantsForm.controls);
  }
  onOwnerSubmit() {
    this.pgMerchantsForm.reset();
    this.sData = [];
    this.step = 1
  }

  // BacktoList() {
  //   this.isOwner = !this.isOwner;
  // }

  //multiselect Functionalities

  // onItemSelectt(item: any) {
  //   // this.srvcData=[];
  //   // this.srvcData.filter((e:any)=>{
  //   // 	return e.Selected === true;
  //   // })
  //   this.srvc_cats.getCategory().subscribe(data => {
  //     data.data.map((iData: any) => {
  //       this.selectCategory.map((mData: any) => {
  //         if (iData.serviceName === mData.x && iData.serviceItems.length > 0) {
  //           for (let i in iData.serviceItems) {
  //             iData.serviceItems[i].serviceId = iData.serviceCode;
  //             iData.serviceItems[i].serviceName = iData.serviceName;
  //             this.srvcData.push(iData.serviceItems[i]);
  //           }
  //         }
  //       })
  //     })

  //     this.srvcData = this.srvcData.reduce((a: any, b: any) => {
  //       if (a.filter((i: any) => i.itemName == b.itemName).length == 0)
  //         a.push(b)

  //       return a
  //     }, [])
  //     this.srvcData.map((s: any) => {
  //       if (!s.Selected)
  //         s.Selected = false;
  //     })
  //   })
  //   this.setClass()
  // }

  setStatus() {
    (this.selectCategory.length > 0) ? this.requiredField = true : this.requiredField = false;
  }
  setClass() {
    this.setStatus();
    if (this.selectCategory.length > 0) { return 'validField' }
    else { return 'invalidField' }
  }

  oncheckSrvc(e: any) {
    this.merchntObj["merchantType"] = this.selectedSer;
    if (this.selectedSer === "SMB") {
      if (e.Selected === false) {
        e.Selected = true;
        const Obj: any = {}
        Obj['catId'] = e.serviceId;
        Obj['categoryName'] = e.serviceName;
        Obj['categoryItems'] = [];
        this.cats.push(Obj);

        this.onCheckdData = [...this.onCheckdData, e];
        this.cats = [...this.cats.reduce((map: any, obj: any) => map.set(obj.catId, obj), new Map()).values()];
      } else {
        this.onCheckdData = this.onCheckdData.filter((i: any) => i.itemName !== e.itemName);
      }

    } else {
      if (this.cats.length === 0) {
        const Obj: any = {}
        Obj.categoryItems = [];
        this.cats.push(Obj);
      }
      this.onCheckdData = [...this.onCheckdData, e];
    }
  }
}
