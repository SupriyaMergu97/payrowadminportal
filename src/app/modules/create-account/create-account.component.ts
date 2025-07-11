import { AppManagerService } from 'src/app/core/services/app-manager.service';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, ValidationErrors } from '@angular/forms';
// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
// import { PersonalComponent } from './reuseble-forms/personal/personal.component';
// import { CardFormComponent } from './reuseble-forms/card-form/card-form.component';
// import { BankFormComponent } from './reuseble-forms/bank-form/bank-form.component';
// import { AddressFormComponent } from './reuseble-forms/address-form/address-form.component';
// import { LicenceFormComponent } from './reuseble-forms/licence-form/licence-form.component';
// import { StaffFormComponent } from './reuseble-forms/staff-form/staff-form.component';
import { CustomValidators } from './custom-validators';
// import { BusinessFormComponent } from './reuseble-forms/business-form/business-form.component';
declare var jQuery: any;
import { HttpClient } from '@angular/common/http';
import { DistributorService } from 'src/app/services/distributor.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SignatureEncryptionService } from 'src/app/services/signature-encryption.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  // @ViewChild(PersonalComponent) PersonalComponent: PersonalComponent;
  // @ViewChild(CardFormComponent) CardFormComponent: CardFormComponent;
  // @ViewChild(BankFormComponent) BankFormComponent: BankFormComponent;
  // @ViewChild(AddressFormComponent) AddressFormComponent: AddressFormComponent;
  // @ViewChild(LicenceFormComponent) LicenceFormComponent: LicenceFormComponent;
  // @ViewChild(BusinessFormComponent) BusinessFormComponent: BusinessFormComponent;
  // @ViewChild(StaffFormComponent) StaffFormComponent: StaffFormComponent;


  accountForm!: FormGroup;
  basicForm: FormGroup
  // forms!: FormGroup;
  personalDetails!: FormGroup;
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
  distData: any
  salesPersons: any = []
  @ViewChild("myNameElem") myNameElem: ElementRef;

  distributorData: any = [];
  selectedacnt: any;
  isPersonal: boolean;
  isBusiness: boolean;
  constructor(
    private app: AppManagerService, private fb: FormBuilder, private http: HttpClient,
    private distributor: DistributorService, private note_Servce: NotificationService, private encryption: SignatureEncryptionService,
  ) {
    this.app.ShowReportDate = 'true';
  }

  ngOnInit(): void {
    this.loadScripts();
    this.getDistributors()

    this.accountForm = this.fb.group({
      basic: this.fb.group({
        title: new FormControl('', Validators.required),
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', Validators.required),
        gender: new FormControl('', Validators.required),
        dateOfBirth: new FormControl('', Validators.required),
        emailId: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
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
      cardDetails: new FormControl(""),
      bankDetails: new FormControl(""),
      addressDetails: new FormControl(""),
      licenseDetails: new FormControl(""),
      businessDetails: new FormControl(""),
      staffDetails: new FormControl("")
    }
      //  CustomValidators.passwordMatchValidator('password','cnfPassword')
    )
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

  checkPassword(PW: string, cnfPW: string) {
    return (group: FormGroup) => {
      if (group.controls[PW].value !== group.controls[cnfPW].value) {
        group.controls[cnfPW].setErrors({ checkPassword: true });
      } else { group.controls[cnfPW].setErrors(null); }

    }
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
      $('#side_menu_bar > ul > li.nav-item > a#li_create_account').addClass("active");
    })(jQuery);
  }
  // get basic() { return this.basicDetails.controls}
  // get personal() { return this.personalDetails.controls; }
  // get card() { return this.cardDetails.controls; }
  // get address() { return this.addressDetails.controls; }
  // get bank() { return this.bankDetails.controls }
  add() {
    this.isShow = !this.isShow
    // console.log('Submit', this.accountForm.value);
    // const datas = this.http.post('http://localhost:3000/api/createDistributor/create', this.accountForm.value).subscribe(async data => {
    //   console.log(data);

    // });

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
  addOwner() {
    let value = this.accountForm.value.basic
    let req = { data: this.encryption.encodeJsonObjectToHex(value) }
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.distributor.createDistributorBasic(req, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.note_Servce.showSuccess(`200 - ${res.message}`, '')
        this.distData = decryptedData
      } else {
        this.note_Servce.showError(`${res.message}`, '')
        this.distData = this.distData
      }
    })
    // this.note_Servce.showError(500,'error')
  }
  getDistributors() {
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.distributor.getAllDistributors(reqhead.headers).subscribe(async res => {
      const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
      const decryptedData = this.encryption.decodeData(encryptedData, await key);
      this.distributorData = decryptedData;
    })
  }
  updatePersonalInfo() {
    // let id = this.distData._id
    let id = "62d10c815d0493b5d98c190c"
    let value = this.accountForm.value.personalDetails;
    let req = { data: this.encryption.encodeJsonObjectToHex(value) }
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.distributor.updateDistributor(req, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        console.log(decryptedData)
        this.note_Servce.showSuccess(`200 - ${res.message}`, '')
        this.distData = [...this.distData, decryptedData]
      } else {
        this.note_Servce.showError(`${res.message}`, '')
        this.distData = this.distData
      }
    })
  }
  updateBankInfo() {
    let id = this.distData._id
    // let id = "62b4981cc01212351c548a77"
    let value = { stage: "bankDetails", bankDetails: this.accountForm.value.bankDetails }
    let req = { data: this.encryption.encodeJsonObjectToHex(value) }
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.distributor.updateDistributor(req, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        console.log(decryptedData)
        this.note_Servce.showSuccess(`200 - ${res.message}`, '')
        this.distData = [...this.distData, decryptedData]
      } else {
        this.note_Servce.showError(`${res.message}`, '')
        this.distData = this.distData
      }
    })
  }
  updateStoreInfo() {
    let id = this.distData._id
    // let id = "62b4981cc01212351c548a77"
    let value = { stage: "storeDetails", storeDetails: this.accountForm.value.addressDetails }
    let req = { data: this.encryption.encodeJsonObjectToHex(value) }
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.distributor.updateDistributor(req, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        console.log(decryptedData)
        this.note_Servce.showSuccess(`200 - ${res.message}`, '')
        this.distData = [...this.distData, decryptedData]
      } else {
        this.note_Servce.showError(`${res.message}`, '')
        this.distData = this.distData
      }
      //  this.distData = [...this.distData, data]
    })
  }
  updateLicenceInfo() {
    let id = this.distData._id
    // let id = "62b4981cc01212351c548a77"
    let value = this.accountForm.value.licenseDetails
    let req = { data: this.encryption.encodeJsonObjectToHex(value) }
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.distributor.updateDistributor(req, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        console.log(decryptedData)
        this.note_Servce.showSuccess(`200 - ${res.message}`, '')
        this.distData = [...this.distData, decryptedData]
      } else {
        this.note_Servce.showError(`${res.message}`, '')
        this.distData = this.distData
      }
      //  this.distData = [...this.distData, data]
    })
  }
  updateBusinessInfo() {
    let id = this.distData._id
    // let id = "62b4981cc01212351c548a77"
    let value = { stage: "businessDetails", businessDetails: this.accountForm.value.businessDetails }
    let req = { data: this.encryption.encodeJsonObjectToHex(value) }
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.distributor.updateDistributor(req, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        console.log(decryptedData)
        this.note_Servce.showSuccess(`200 - ${res.message}`, '')
        this.distData = [...this.distData, decryptedData]
      } else {
        this.note_Servce.showError(`${res.message}`, '')
        this.distData = this.distData
      }
      // this.distData = [...this.distData, data]
    })
  }
  updateStaffInfo() {
    let id = this.distData._id
    // let id = "62b4981cc01212351c548a77"
    let value = { "salesPersons": this.accountForm.value.staffDetails }
    let req = { data: this.encryption.encodeJsonObjectToHex(value) }
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.distributor.addSalesPerson(req, id, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.note_Servce.showSuccess(`200 - ${res.message}`, '')
        this.salesPersons = decryptedData;
        this.distData = [...this.distData, decryptedData]
        this.distData.salesPersons.map((data: any) => {
          this.salesPersons.push(data)
        })
      } else {
        this.note_Servce.showError(`${res.message}`, '')
      }
    })
  }
  get f() {
    return this.accountForm.controls;
  }

  onSubmit() {
    console.log('Submit', this.accountForm.value);
  }
}
