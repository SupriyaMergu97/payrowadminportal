import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { AppManagerService } from 'src/app/core/services/app-manager.service';
import { NotificationService } from 'src/app/core/services/notification.service';
declare var jQuery: any;
import { CreateAcntService } from 'src/app/services/create-acnt.service';
import { GatewayService } from 'src/app/services/gateway.service';
import { ServiceCatalogueService } from 'src/app/services/service-catalogue.service';
import { SignatureEncryptionService } from 'src/app/services/signature-encryption.service';
import { BarServiceService } from 'src/services/bar-service.service';

@Component({
  selector: 'app-pg-list',
  templateUrl: './pg-list.component.html',
  styleUrls: ['./pg-list.component.scss']
})
export class PgListComponent implements OnInit {
  mServiceForm!: FormGroup;
  feeForm!: FormGroup;
  isAddServ: boolean = false;
  isStaff: boolean = false;
  merchantList: any = [];
  catalogue: any;
  mainMerchantId: any = '';
  categories: any;
  totServices: any;
  serviceList: any;
  merServices: any;
  govtServices: any;
  enterpriseServices: any;
  isFee: boolean = false;
  isEdit: boolean = false;
  isCreate: boolean = false;
  taxes: any = [];
  allFees: any = [];
  servFees: any = [];
  userType: any = '';
  tempData: any = [];
  serviceID: any = '';
  constructor(private createAcnt: CreateAcntService,
    private bar_srv: BarServiceService,
    private srvc_Cat: ServiceCatalogueService, private note_Servce: NotificationService,
    private gatewayServ: GatewayService, private fb: FormBuilder, private encryption: SignatureEncryptionService) { }

  ngOnInit(): void {
    // this.getMerchantServices()
    this.getMerchantsList();
    this.getCategory();
    this.getTaxes();
    this.loadScripts();
    // this.getServices();
    this.getAllFees();
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
  merService() {
    this.isAddServ = !this.isAddServ;
    this.mServiceForm.reset();
    this.isEdit = false;
    this.isCreate = true;
    this.mServiceForm.enable();
    this.mServiceForm.patchValue({ mainMerchantId: this.mainMerchantId });
  }
  staff() {
    this.mainMerchantId = '';
    // this.getServices()
    this.isStaff = !this.isStaff;
  }
  addFee(id: any) {
    this.isFee = !this.isFee
    this.feeForm.reset()
    this.isEdit = false;
    this.isCreate = true;
    this.feeForm.enable();
    this.feeForm.patchValue({ merchantId: this.mainMerchantId, serviceId: id });
  }
  back() {
    this.isFee = !this.isFee;
  }
  getMerchantsList() {
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key);
    this.gatewayServ.getpgUsersDetails(reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.merchantList = decryptedData;
      }
    })
  }
  getTaxes() {
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.srvc_Cat.getTaxCodes(reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.taxes = decryptedData;
        console.log(decryptedData)
      }
    })
  }

  getCategory() {
    //get smb catagories with services
    this.categories = []
    // this.srvc_Cat.getCategory().subscribe(async res => {
    //   this.categories = res.data
    // })
  }

  getMerchantServices(mid: any, cat: any) {
    this.catalogue = cat;
    this.merServices = [];
    this.mainMerchantId = mid
    this.isStaff = true;
    this.userType = 'Services'
    //new
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key);
    this.gatewayServ.getServofPGMerbyId(mid, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        decryptedData.map((data: any) => {
          data.fee = false
          if (this.allFees.length !== 0) {
            this.allFees.map((fee: any) => {
              console.log(fee)
              if (data.serviceId === fee.serviceId) {
                console.log(data.serviceId, fee.serviceId)
                data.fee = true;
              }
            })
            this.merServices.push(data);
            console.log(this.merServices);
          }
          else {
            data.fee = false
            this.merServices.push(data);
          }
        })
      }
    })
  }
  delete() {
    if (this.userType === "Services") {
      let reqhead = this.encryption.createHeader();
      const key = this.encryption.generateKey(reqhead.key);
      this.gatewayServ.removeServFrmPGMer(this.tempData[0]._id, reqhead.headers).subscribe(async res => {
        if (res.success === true) {
          const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
          const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
          this.getMerchantServices(this.mainMerchantId, this.catalogue);
          this.note_Servce.showSuccess(`200 - ${res.message}`, '')
        } else {
          this.note_Servce.showError(`${res.message}`, '')
        }
      })
    }
    if (this.userType === "fee") {
      let reqhead = this.encryption.createHeader();
      const key = this.encryption.generateKey(reqhead.key);
      this.gatewayServ.removeFee(this.tempData[0]._id, reqhead.headers).subscribe(async res => {
        if (res.success === true) {
          const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
          const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
          this.getAllFees();
          this.getMerchantServices(this.mainMerchantId, this.catalogue)
          this.note_Servce.showSuccess(`200 - ${res.message}`, '')
          this.isFee = !this.isFee
        } else {
          this.note_Servce.showError(`${res.message}`, '')
        }
      })
    }
  }
  update() {
    if (this.userType === "Services") {
      const value = this.mServiceForm.value;
      console.log(value);
      let req = { data: this.encryption.encodeJsonObjectToHex(value) }
      let reqhead = this.encryption.createHeader();
      const key = this.encryption.generateKey(reqhead.key)
      this.gatewayServ.updateServFrmPGMer(req, this.tempData[0]._id, reqhead.headers).subscribe(async res => {
        if (res.success === true) {
          const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
          const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
          this.getAllFees();
          this.getMerchantServices(this.mainMerchantId, this.catalogue);
          this.note_Servce.showSuccess(`200 - ${res.message}`, '')
          this.isAddServ = !this.isAddServ
        } else {
          this.note_Servce.showError(`${res.message}`, '')
        }
      })
    }
    if (this.userType === "fee") {
      const value = this.feeForm.value;
      console.log(value)
      let req = { data: this.encryption.encodeJsonObjectToHex(value) }
      let reqhead = this.encryption.createHeader();
      const key = this.encryption.generateKey(reqhead.key)
      this.gatewayServ.updateFee(req, this.tempData[0]._id, reqhead.headers).subscribe(async res => {
        if (res.success === true) {
          const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
          const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
          this.getAllFees();
          this.getMerchantServices(this.mainMerchantId, this.catalogue)
          this.note_Servce.showSuccess(`200 - ${res.message}`, '')
          this.isFee = !this.isFee
        } else {
          this.note_Servce.showError(`${res.message}`, '')
        }
      })
    }
  }
  edit() {
    this.isEdit = true;
    this.mServiceForm.enable();
    this.feeForm.enable();
  }
  addService() {
    // this.mServiceForm.value.mainMerchantId = this.mainMerchantId;
    const value = this.mServiceForm.value;
    // console.log(this.mainMerchantId)
    let req = { data: this.encryption.encodeJsonObjectToHex(value) }
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.gatewayServ.addServToPGMer(req, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.isAddServ = !this.isAddServ;
        this.getMerchantServices(this.mainMerchantId, this.catalogue);
        this.mServiceForm.reset();
        this.note_Servce.showSuccess(`200 - ${res.message}`, '')
      } else {
        this.note_Servce.showError(`${res.message}`, '')
      }
    })
  }

  addFeeDetails() {
    const value = this.feeForm.value;
    let req = { data: this.encryption.encodeJsonObjectToHex(value) }
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.gatewayServ.createFee(req, reqhead.headers).subscribe(async res => {

      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.note_Servce.showSuccess(`200 - ${res.message}`, '')
        this.feeForm.reset()
        this.isFee = !this.isFee
      } else {
        this.note_Servce.showError(`${res.message}`, '')
      }
      // console.log("res", decryptedData);

    })
  }
  getAllFees() {
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.gatewayServ.getFee(reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));

        if (decryptedData == null) this.allFees = [];
        else this.allFees = decryptedData;
      }
    })
  }
  getFeeDetails(id: any) {
    this.userType = 'fee'
    this.isEdit = false;
    this.isCreate = false;
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.gatewayServ.getFeebyId(id, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.feeForm.patchValue(decryptedData[0]);
        this.isFee = !this.isFee;
        this.feeForm.disable();
        this.tempData = decryptedData
      }
    })
  }
  getServDetails(id: any) {
    this.isEdit = false;
    this.isCreate = false;
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.gatewayServ.getServofPGMerbyId(id, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.isAddServ = !this.isAddServ;
        this.mServiceForm.patchValue(decryptedData[0]);
        this.mServiceForm.disable();
        this.tempData = decryptedData
      }
    })
  }
  removeServiceFormMer(id: any) {
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.gatewayServ.removeServFrmPGMer(id, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        console.log(decryptedData);
      }
      this.getMerchantServices(this.mainMerchantId, this.catalogue)
    })
  }


  onChangeStatus(e: any, data: any) {
    const Obj = {
      "status": e.target.value
    }
    this.createAcnt.deActivateMerchant(data.bankMID, Obj).subscribe(data => {
      if (data.succces === true) {
        alert("Status Updated Sucessfully");
      }
      else {
        alert("something went wrong");
      }
    })
  }
  private loadScripts(): void {
    (function ($) {
      "use strict";

      $('#side_menu_bar > ul > li.nav-item > a').removeClass("active");
      $('#side_menu_bar > ul > li.nav-item > a#li_acnt_status').addClass("active");


    })(jQuery);
  }
}