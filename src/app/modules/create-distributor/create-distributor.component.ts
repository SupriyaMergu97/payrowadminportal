import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppManagerService } from 'src/app/core/services/app-manager.service';
import { DistributorService } from 'src/app/services/distributor.service';
import { CustomValidators } from '../create-account/custom-validators';
// import { AddressFormComponent } from '../../shared/address-form/address-form.component';
// import { BankFormComponent } from '../../shared/bank-form/bank-form.component';
// import { BusinessFormComponent } from '../../shared/business-form/business-form.component';
// import { CardFormComponent } from '../../shared/card-form/card-form.component';
// import { LicenceFormComponent } from '../../shared/licence-form/licence-form.component';
// import { PersonalComponent } from '../../shared/personal/personal.component';
// import { StaffFormComponent } from '../../shared/staff-form/staff-form.component';
// import { PersonalComponent } from '../../shared/personal/personal.component';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/core/services/notification.service';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
import { SignatureEncryptionService } from 'src/app/services/signature-encryption.service';


@Component({
  selector: 'app-create-distributor',
  templateUrl: './create-distributor.component.html',
  styleUrls: ['./create-distributor.component.scss']
})
export class CreateDistributorComponent implements OnInit {
  // @ViewChild(PersonalComponent) PersonalComponent: PersonalComponent;
  // @ViewChild(CardFormComponent) CardFormComponent: CardFormComponent;
  // @ViewChild(BankFormComponent) BankFormComponent: BankFormComponent;
  // @ViewChild(AddressFormComponent) AddressFormComponent: AddressFormComponent;
  // @ViewChild(LicenceFormComponent) LicenceFormComponent: LicenceFormComponent;
  // @ViewChild(BusinessFormComponent) BusinessFormComponent: BusinessFormComponent;
  // @ViewChild(StaffFormComponent) StaffFormComponent: StaffFormComponent;

  searchText: any;
  accountForm!: FormGroup;
  basicForm: FormGroup;
  typeofDist: any;
  mngrList: any = [];
  selectedDistData: any = []
  isAdmin: boolean = false;
  isUpdateDist: boolean = false;
  isupdateAdmin: boolean = false
  adminData: any;
  adminList: any;
  bankData: any;
  csvData: any = [];
  profileImg: any;
  fileSelected: File;
  isAgreement: boolean = false;
  public csvOptions: any = {};

  // adminList: any = [
  // { adminId: "ADM100", "adminName": "Supriya", emailId: "supriya@gmail.com", mobileNumber: "9876345098", address: "Hyd", emiratesId: "83719109", status: "Active" },
  // { adminId: "ADM101", "adminName": "Khaja", emailId: "khaja@gmail.com", mobileNumber: "9876345098", address: "Hyd", emiratesId: "83719109", status: "Active" }
  // ];



  acntManagerForm: FormGroup
  // forms!: FormGroup;
  personalDetails!: FormGroup;
  adminDetails!: FormGroup;
  addressDetails!: FormGroup;
  staffDetails!: FormGroup
  cardDetails!: FormGroup;
  bankDetails !: FormGroup;
  businessDetails!: FormGroup;
  basic_step = false;
  personal_step = false;
  address_step = false;
  bank_step = false;
  card_step = false;
  license_step = false;
  staff_step = false;
  education_step = false;
  step = 1;
  hr_Tag: boolean = false;
  isShow: boolean = false;
  isForm: boolean = false
  isAcntMngr: boolean = false;
  distData: any;
  salesPersons: any = [];
  showDialog: boolean = false;
  dialogData: any = {}
  @ViewChild("myNameElem") myNameElem: ElementRef;

  distributorData: any = []
  acntMngrData: any = [
    { id: "712380", name: "supriya", emailId: "supriyamergu@gmail.com", activationDate: "12-01-2023", address: "Hyd", mobileNumber: 9712987012, status: "Active" },
    { id: "192732", name: "Khajavali", emailId: "Khajavali@gmail.com", activationDate: "09-03-2023", address: "Mumbai", mobileNumber: 8347265236, status: "Active" },
    { id: "975290", name: "srihari", emailId: "srihari@gmail.com", activationDate: "04-05-2023", address: "Pune", mobileNumber: 9236495290, status: "In-Active" }
  ]

  selectedacnt: any;
  isPersonal: boolean;
  isBusiness: boolean;
  itemsPerPage: any = 9;
  currentDistPage: any = 1;
  maxDate: string;
  constructor(
    private app: AppManagerService, private fb: FormBuilder, private http: HttpClient,
    private distributor: DistributorService, private note_Servce: NotificationService, private encryption: SignatureEncryptionService,
  ) {
    this.app.ShowReportDate = 'true';
  }

  ngOnInit(): void {
    this.loadScripts();
    this.getDistributors()
    const currentDate = new Date();
    const maxDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
    this.maxDate = maxDate.toISOString().split('T')[0]; // Format as yyyy-mm-dd
    // this.minExpiryDate = currentDate.toISOString().split('T')[0]; 
    this.accountForm = this.fb.group({
      basic: this.fb.group({
        regionalManagerID: ['', Validators.required],
        typeOfDistributor: [''],
        title: ['', Validators.required],
        // entityName:[''],
        profileImg: [''],
        firstName: ['', [Validators.required]],
        lastName: [''],
        gender: ['', Validators.required],
        dateOfBirth: ['', [Validators.required]],
        emailId: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
        mobileNumber: ['', Validators.required],
        status: ['', Validators.required],
        password: ['', Validators.compose([
          Validators.required,
          Validators.minLength(8),
          CustomValidators.patternValidator(/\d/, { hasNumber: true }),
          CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
          CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
          CustomValidators.patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { hasSpecialCharacters: true }),
        ])],
        cnfPassword: ['', Validators.compose([Validators.required])],
      }),
      personalDetails: new FormControl(""),
      adminDetails: new FormControl(""),
      cardDetails: new FormControl(""),
      bankDetails: new FormControl(""),
      addressDetails: new FormControl(""),
      licenseDetails: new FormControl(""),
      businessDetails: new FormControl(""),
      staffDetails: new FormControl("")
    }
      //  CustomValidators.passwordMatchValidator('password','cnfPassword')
    )
    this.acntManagerForm = this.fb.group({
      name: ['', Validators.required],
      emailId: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      address: ['', Validators.required]
    })

    // this.accountForm = this.fb.group({
    // })
    // , { validator: this.checkPassword("password", "cnfPassword") }
    // this.forms = this.fb.group({
    // })
    //fetch async API data

    // const datas = this.http.get('http://localhost:3000/api/createDistributor/getDistributor').subscribe(async data => {
    //   console.log(data);
    //   this.distributorData = data;
    // });

    // this.http.get('http://localhost:3000/api/dashboard/distributorReport/RISHABH522')
    // .subscribe(async posts => {
    //    console.log("posts");
    // })





  }

  onProfileSelected(event: any) {
    this.profileImg = ""
    console.log("##############################", event.target.files[0])
    const file = <File>event.target.files[0];
    const nestgroup = this.accountForm.get('basic')
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
  onDistPageChange(page: number) {
    this.currentDistPage = page;
  }
  getPageDist(): any[] {
    const startIndex = (this.currentDistPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.distributorData.slice(startIndex, endIndex);
  }
  checkPassword(PW: string, cnfPW: string) {
    return (group: FormGroup) => {
      if (group.controls[PW].value !== group.controls[cnfPW].value) {
        group.controls[cnfPW].setErrors({ checkPassword: true });
      } else { group.controls[cnfPW].setErrors(null); }

    }
  }
  openDialog(id: any): void {
    this.showDialog = true;
    this.dialogData = {}
    this.distributorData.map((d: any) => {
      if (d.distributorId == id) {
        // this.dialogData=d;
        this.dialogData = {
          header1: "Contact Details",
          subHeader11: "Email",
          content11: d.emailId ?? "",
          subHeader12: "Contact Number",
          content12: d.mobileNumber ?? "",
          subHeader13: "Distributor ID",
          content13: d.distributorId ?? "",
          header2: "Admin Details",
          subHeader21: "Admin ID",
          content21: d.adminDetails[0].adminId ?? "",
          subHeader22: "Admin Name",
          content22: d.adminDetails[0].adminName ?? "",
          subHeader23: "Admin Contact",
          content23: d.adminDetails[0].mobileNumber ?? "",
          header3: "License Details",
          subHeader31: "License Number",
          content31: d.licenseDetails.licenseNumber ?? "",
          subHeader32: "Company Name",
          content32: d.licenseDetails.companyName ?? "",
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
  onAgreement() {
    console.log('dataaa')
    this.isAgreement = true;
  }
  onSelTypeofDist(e: any) {
    this.typeofDist = e.target.value;
    // this.accountForm.value.basic.patchValue({regionalManagerID:this.typeofDist})
    console.log(this.accountForm.value.basic, 'ddd')
  }

  getDistributors() {
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.distributor.getAllDistributors(reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        // console.log(data)
        this.distributorData = decryptedData;
        // this.distData = this.distributorData[3];
        console.log('distributorData', this.distributorData);
      }
    })
    let reqheadmngr = this.encryption.createHeader();
    const keymngr = this.encryption.generateKey(reqheadmngr.key)
    this.distributor.getRegMngr(reqheadmngr.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedDatamngr = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedDatamngr = JSON.parse(this.encryption.decodeData(encryptedDatamngr, await keymngr));
        this.mngrList = decryptedDatamngr
        console.log(decryptedDatamngr, 'dddaaaattaa')
      }
    })
  }
  onupdateAction(did: any) {
    this.distData;
    this.isUpdateDist = true;
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.distributor.getDistbyId(did, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        console.log(decryptedData)
        if (decryptedData[0].documents && decryptedData[0].documents.profileImg != null) {
          this.profileImg = decryptedData[0].documents.profileImg
        }
        this.distData = decryptedData[0];
        this.typeofDist = decryptedData[0].typeOfDistributor;
        this.adminList = this.distData.adminDetails;
        this.accountForm.get('basic')?.patchValue(this.distData);
        // }
        this.accountForm.value.basic = this.distData;
        this.isForm = !this.isForm;
        console.log(this.distData, this.accountForm.value.basic, 'dddaaaattaa')
      }
    })
  }
  addOwner() {
    // this.accountForm.value.get('basic.status').patchValue("Active");
    // this.accountForm.value.basic.patchValue({status:"Active"})
    console.log(this.accountForm.value.basic.regionalManagerID)
    this.accountForm.value.basic.typeOfDistributor = this.typeofDist;
    this.accountForm.value.basic.status = "Active";
    let value = this.accountForm.value.basic;
    const formData = new FormData();
    formData.append('profileImg', value.profileImg);
    value.profileImg = "";
    formData.append('data', this.encryption.encodeJsonObjectToHex(value))
    // formData.append('regionalManagerID', value.regionalManagerID)
    // formData.append('typeOfDistributor', this.typeofDist)
    // formData.append('emailId', value.emailId)
    // formData.append('mobileNumber', value.mobileNumber)
    // formData.append('firstName', value.firstName)
    // formData.append('password', value.password)
    // formData.append('status', 'Active')
    // if (this.typeofDist = 'Non-Government') {
    //   formData.append('title', value.title)
    //   formData.append('lastName', value.lastName)
    //   formData.append('gender', value.gender)
    //   formData.append('dateOfBirth', value.dateOfBirth)
    // }
    // formData.append('status', value.status)
    // formData.append('_id', this.distData._id)
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.distributor.createDistributorBasic(formData, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        console.log(decryptedData);
        this.distData = decryptedData;
        this.note_Servce.showSuccess(`200 - ${res.message}`, '')
      } else {
        this.note_Servce.showError(`${res.message}`, '')
      }
      console.log(this.distData)

    })
    // this.note_Servce.showError(500,'error')
  }

  onCreateAdmin() {
    this.isAdmin = true;
    this.isupdateAdmin = false;
    this.isAgreement = false;
  }
  backtoAdminList() {
    this.isAdmin = false;
    this.isupdateAdmin = false;
  }
  createAdmin() {
    this.isAdmin = false;
    let value = { stage: "adminDetails", _id: this.distData._id, adminDetails: this.accountForm.value.adminDetails }
    value.adminDetails.status = "Active";
    let data = this.accountForm.value.adminDetails;
    // fdata.append("adminDetails[adminId]", data.adminId);
    // fdata.append("adminDetails[adminName]", data.adminName);
    // fdata.append("adminDetails[emailId]", data.emailId);
    // fdata.append("adminDetails[mobileNumber]", data.mobileNumber);
    // fdata.append("adminDetails[status]", "Active");
    // fdata.append("adminDetails[address]", data.address);
    // fdata.append("adminDetails[emiratesId]", data.emiratesId);
    // fdata.append("adminDetails[emiratesExpiry]", data.emiratesExpiry);
    // fdata.append("adminEmiratesDoc", data.adminEmiratesDoc);
    // fdata.append("_id", this.distData._id);
    // fdata.append("stage", "adminDetails");
    let fdata = new FormData();
    fdata.append('adminEmiratesDoc', data.adminEmiratesDoc)
    value.adminDetails.adminEmiratesDoc = "";
    fdata.append('data', this.encryption.encodeJsonObjectToHex(value))
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.distributor.updateDistributor(fdata, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.note_Servce.showSuccess(`200 - ${res.message}`, '')
        console.log(decryptedData, 'aaaaaaaaaa')
        this.distData = decryptedData;
        this.adminList = this.distData.adminDetails;
      } else {
        this.note_Servce.showError(`${res.message}`, '')
        this.distData = this.distData;
      }
      // this.distData = [...this.distData, data];
      console.log(this.adminList, 'adddmin')
    })
  }
  onUpdateAdmin(id: any) {
    // this.isAdmin = !this.isAdmin;
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.distributor.getAdminByID(id, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.adminData = decryptedData[0].adminDetails;
        console.log(this.adminData)
        this.isupdateAdmin = !this.isupdateAdmin;
      }
    })
  }
  add() {
    this.isForm = !this.isForm;
    this.isUpdateDist = false;
    this.accountForm.reset();
  }











  getId() {
    console.log("66666666666666666666666666666666", this.myNameElem.nativeElement.value);
  }


  subTabs(id: any) {
    this.step = 1;
  }
  private loadScripts(): void {
    (function ($) {
      "use strict";
      $('#side_menu_bar > ul > li.nav-item > a').removeClass("active");
      $('#side_menu_bar > ul > li.nav-item > a#li_createDist').addClass("active");
    })(jQuery);
  }
  // get basic() { return this.basicDetails.controls}
  // get personal() { return this.personalDetails.controls; }
  // get card() { return this.cardDetails.controls; }
  // get address() { return this.addressDetails.controls; }
  // get bank() { return this.bankDetails.controls }

  acntMnger() {
    this.isAcntMngr = !this.isAcntMngr
  }
  // onSelectAcnt(event: any) {
  //   this.selectedacnt = event.target.value;
  //   // this.selected = this.bankForm.value.selectedBank;
  //   console.log(this.selectedacnt, '87678')
  //   this.isPersonal = false;
  //   this.isBusiness = false;
  //   if (this.selectedacnt === 'Personal') {
  //     this.isPersonal = !this.isPersonal
  //   } else {
  //     this.isBusiness = !this.isBusiness
  //   }
  // }
  updateBasic() {
    let id = this.distData._id
    // let id = "62d10c815d0493b5d98c190c"
    let value = this.accountForm.value.basic;
    const formData = new FormData();
    // formData.append('regionalManagerID', value.regionalManagerID)
    // formData.append('typeOfDistributor', value.typeOfDistributor)
    // formData.append('profileImg', value.profileImg)
    // formData.append('title', value.title)
    // formData.append('firstName', value.firstName)
    // formData.append('lastName', value.lastName)
    // formData.append('gender', value.gender)
    // formData.append('dateOfBirth', value.dateOfBirth)
    // formData.append('emailId', value.emailId)
    // formData.append('mobileNumber', value.mobileNumber)
    // formData.append('status', value.status)
    // formData.append('password', value.password)
    // formData.append('_id', this.distData._id)
    value._id = this.distData._id;
    this.accountForm.value.basic.status = "Active";
    formData.append('profileImg', value.profileImg)
    value.profileImg = "";
    formData.append('data', this.encryption.encodeJsonObjectToHex(value))
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.distributor.updateDistributor(formData, reqhead.headers).subscribe(async res => {
      if (res.success = true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        console.log(decryptedData)
        this.note_Servce.showSuccess(`200 - ${res.message}`, '')
        this.distData = decryptedData;
      } else {
        this.note_Servce.showError(`${res.message}`, '')
      }
    })
  }
  updatePersonalInfo() {
    let id = this.distData._id;
    // let id = "62d10c815d0493b5d98c190c"
    let data = this.accountForm.value.personalDetails;
    // console.log(this.accountForm.value.licenseDetails,data.get('companyName')?.value)
    let fdata = new FormData();
    // fdata.append("city", data.city);
    // fdata.append("addressDetails", data.addressDetails);
    // fdata.append("country", data.country);
    // fdata.append("boBox", data.boBox);
    // fdata.append("_id", this.distData._id);
    if (this.distData.typeOfDistributor == "Government") {
      fdata.append("degreeDocument", data.degreeDocument);
    }
    else {
      fdata.append("passportDocument", data.passportDocument);
      fdata.append('emiratesDocument', data.emiratesDocument)
    }
    let value = this.accountForm.value.personalDetails;
    console.log(fdata, 'vaaal')
    value._id = this.distData._id;
    value.emiratesDocument = "";
    value.degreeDocument = "";
    value.passportDocument = "";
    fdata.append('data', this.encryption.encodeJsonObjectToHex(value))
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.distributor.updateDistributor(fdata, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        console.log(decryptedData)
        this.note_Servce.showSuccess(`200 - ${res.message}`, '')
        this.distData = decryptedData;
      } else {
        this.note_Servce.showError(`${res.message}`, '')
      }
    })
  }
  updateBankInfo() {
    let id = this.distData._id
    // let id = "62b4981cc01212351c548a77"
    let value = { stage: "bankDetails", _id: this.distData._id, bankDetails: this.accountForm.value.bankDetails }
    value._id = this.distData._id;
    let req = { data: this.encryption.encodeJsonObjectToHex(value) }
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.distributor.updateDistributor(req, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.note_Servce.showSuccess(`200 - ${res.message}`, '')
        this.distData = decryptedData;
      } else {
        this.note_Servce.showError(`${res.message}`, '')
        this.distData = this.distData;
      }
    })
  }
  updateAdminInfo() {
    let id = this.distData._id
    // let id = "62b4981cc01212351c548a77"
    let value = { stage: "adminDetails", _id: this.distData._id, adminDetails: this.accountForm.value.adminDetails }
    let data = this.accountForm.value.adminDetails;
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
    // fdata.append("_id", this.distData._id);
    // fdata.append("stage", "adminDetails");
    // value._id = this.distData._id;
    fdata.append("adminEmiratesDoc", data.adminEmiratesDoc);
    value.adminDetails.adminEmiratesDoc = "";
    fdata.append('data', this.encryption.encodeJsonObjectToHex(value))
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.distributor.updateDistributor(fdata, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.note_Servce.showSuccess(`200 - ${res.message}`, '')
        this.distData = decryptedData;
      } else {
        this.note_Servce.showError(`${res.message}`, '');
        this.distData = this.distData;
      }
    })
  }
  updateLicenceInfo() {
    // let id = this.distData._id
    // let id = "62b4981cc01212351c548a77"
    // value._id=this.distData._id;
    let value = { stage: "licenseDetails", _id: this.distData._id, licenseDetails: this.accountForm.value.licenseDetails }
    let data = this.accountForm.value.licenseDetails;
    // console.log(this.accountForm.value.licenseDetails,data.get('companyName')?.value)
    let fdata = new FormData();
    // fdata.append("_id", this.distData._id);
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
    fdata.append("licenseDetails[companyLogo]", data.companyLogo);
    value.licenseDetails.licenseDocument = "";
    value.licenseDetails.ecDocument = "";
    fdata.append('data', this.encryption.encodeJsonObjectToHex(value))
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.distributor.updateDistributor(fdata, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.note_Servce.showSuccess(`200 - ${res.message}`, '')
        this.distData = decryptedData;
      } else {
        this.note_Servce.showError(`${res.message}`, '')
        this.distData = this.distData;
      }
    })
    // let value = { stage: "licenseDetails", _id: this.distData._id, licenseDetails: this.accountForm.value.licenseDetails };
    // this.distributor.updateDistributor(value).subscribe(async data => {
    // if(res.success === true) {
    //     this.note_Servce.showSuccess(res.message}`, '')
    //     this.distData = data.data;
    //   } else {
    //     this.note_Servce.showres.message}`, '')
    //   } this.distData = [...this.distData, data]
    // })
  }
  updateBusinessInfo() {
    let id = this.distData._id
    // let id = "62b4981cc01212351c548a77"
    let value = { stage: "businessDetails", _id: this.distData._id, businessDetails: this.accountForm.value.businessDetails }
    let req = { data: this.encryption.encodeJsonObjectToHex(value) }
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.distributor.updateDistributor(req, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.note_Servce.showSuccess(`200 - ${res.message}`, '')
        this.distData = decryptedData;
      } else {
        this.note_Servce.showError(`${res.message}`, '')
        this.distData = this.distData
      }
    })
  }
  // updateStaffInfo() {
  //   let id = this.distData._id
  //   // let id = "62b4981cc01212351c548a77"
  //   let value = { "salesPersons": this.accountForm.value.staffDetails }
  //   this.distributor.addSalesPerson(value, id).subscribe(async data => {
  //res.success = 200) {
  //       this.note_Servce.showSuccess(res.message}`, '')
  //     } else {
  //       this.note_Servce.showres.message}`, '')
  //     } this.salesPersons = data
  //     this.distData = [...this.distData, data]
  //     this.distData.salesPersons.map((data: any) => {
  //       this.salesPersons.push(data)
  //     })
  //   })
  // }
  reportDownload() {
    console.log("report", this.distributorData)
    this.csvData = [];
    if (this.distributorData) {
      this.distributorData.map((csv: any) => {
        let Obj: any = {};
        Obj['Distributor Id'] = csv.distributorId;
        Obj['Name'] = csv.firstName;
        Obj['Regional Manager Id'] = csv.regionalManagerID;
        Obj['No of Merchants'] = csv.noOfMerchants;
        Obj['Activation Date'] = csv.createdDate
        Obj['Status'] = csv.status
        this.csvData = [...this.csvData, Obj];
      })
    }
    const options = {
      title: '', fieldSeparator: ',', quoteStrings: '"', decimalseparator: '.', showLabels: true, showTitle: true,
      headers: ['Distributor Id', 'Name', 'Regional Manager Id', 'No of Merchants', 'Activation Date', 'Status']
    };
    this.csvOptions = options;
    // this.report_title = 'tap to pay';

    new AngularCsv(this.csvData, 'Distributor List', this.csvOptions);
  }
  getValue(id: any) {
    this.isShow = true;
    this.acntManagerForm.reset();
    this.acntMngrData.map((d: any) => {
      if (d.id === id) { this.acntManagerForm.patchValue(d) }
    })
  }

  delete() { }
  get f() {
    return this.accountForm.controls;
  }
  reset() {
    this.isShow = false;
    this.acntManagerForm.reset()
  }
  onSubmit() {
    console.log('Submit', this.accountForm.value);
  }
}
