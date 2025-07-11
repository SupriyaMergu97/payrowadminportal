import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppManagerService } from 'src/app/core/services/app-manager.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { CreateAcntService } from 'src/app/services/create-acnt.service';
import { GatewayService } from 'src/app/services/gateway.service';
import { ServiceCatalogueService } from 'src/app/services/service-catalogue.service';
import { SignatureEncryptionService } from 'src/app/services/signature-encryption.service';
declare var jQuery: any;

@Component({
  selector: 'app-mid-allocation',
  templateUrl: './mid-allocation.component.html',
  styleUrls: ['./mid-allocation.component.scss']
})
// li_midAllocation
export class MidAllocationComponent implements OnInit {
  itemsPerPage = 9; // Items per page
  currentPage = 1;
  midData: any = [];
  merchantList: any = [];
  taxes: any = [];
  gatewayConfigList: any = [];
  posConfigForm: FormGroup
  merchantData: any;
  isTrack: any;
  selItem: boolean = false
  isForm: boolean = false;
  isCreate: boolean = false;
  isUpdate: boolean = false;
  searchText: any;
  prcharge: any;
  bankcharge: any;
  othercharge: any;
  digitalcharge: any;
  charitycharge: any;
  formObject: any = {};
  // isForm:boolean=false;
  getID: any;
  mid: any
  selectMngr: any = "Select Manager"
  // isAllocated: boolean = false;
  // isDone:boolean=false;
  searchId: any;
  constructor(private app: AppManagerService, private createAcnt: CreateAcntService, private gateway_serv: GatewayService,
    private note_service: NotificationService, private fb: FormBuilder, private srvc_Cat: ServiceCatalogueService,
    private encryption: SignatureEncryptionService) {
    this.app.ShowReportDate = 'true';
  }
  ngOnInit(): void {
    this.getMerchantConfig();
    // this.getMerchantsList();
    this.loadScripts();
    this.getTaxes()
    this.posConfigForm = this.fb.group({
      _id: [''],
      mainMerchantId: new FormControl('', Validators.required),
      subMerchantId: new FormControl(''),
      bankMerchantId: new FormControl('', Validators.required),
      payrowMerchantId: new FormControl('', Validators.required),
      bankUsername: new FormControl('', Validators.required),
      bankPassword: new FormControl('', Validators.required),
      payrowChargesType: new FormControl('', Validators.required),
      payrowChargesValue: new FormControl('', Validators.required),
      payrowChargesPercent: new FormControl('', Validators.required),
      payrowChargesFixed: new FormControl('', Validators.required),
      payrowChargesMinAmnt: new FormControl('', Validators.required),
      payrowServiceId: new FormControl('', Validators.required),
      payrowServiceTaxCode: new FormControl('', Validators.required),
      bankServiceId: new FormControl('', Validators.required),
      bankChargesType: new FormControl('', Validators.required),
      bankChargesValue: new FormControl('', Validators.required),
      bankChargesPercent: new FormControl('', Validators.required),
      bankChargesFixed: new FormControl('', Validators.required),
      bankChargesMinAmnt: new FormControl('', Validators.required),
      payrowTRN: new FormControl('', Validators.required),
      bankTRN: new FormControl('', Validators.required),
      bankServiceTaxCode: new FormControl('', Validators.required),
      otherChargesType: new FormControl('', Validators.required),
      otherChargesValue: new FormControl('', Validators.required),
      otherChargesPercent: new FormControl('', Validators.required),
      otherChargesFixed: new FormControl('', Validators.required),
      otherChargesMinAmnt: new FormControl('', Validators.required),
      otherChargesBankServiceId: new FormControl('', Validators.required),
      otherChargesBankMerchantId: new FormControl('', Validators.required),
      otherChargesTaxCode: new FormControl('', Validators.required),
      otherChargesTRN: new FormControl('', Validators.required),
      fullUrl: new FormControl('', Validators.required),
      payrowDigitialFeeType: new FormControl('', Validators.required),
      payrowDigitialFeeBankServiceId: new FormControl('', Validators.required),
      payrowDigitialFeeBankMerchantId: new FormControl('', Validators.required),
      payrowDigitialFeeValue: new FormControl('', Validators.required),
      payrowDigitialFeePercent: new FormControl('', Validators.required),
      payrowDigitialFeeFixed: new FormControl('', Validators.required),
      payrowDigitialFeeMinAmnt: new FormControl('', Validators.required),
      payrowDigitialFeeTaxCode: new FormControl('', Validators.required),
      payrowDigitialFeeTRN: new FormControl('', Validators.required),
      charityFeeType: new FormControl('', Validators.required),
      charityFeeBankServiceId: new FormControl('', Validators.required),
      charityFeeBankMerchantId: new FormControl('', Validators.required),
      charityFeeValue: new FormControl('', Validators.required),
      charityFeePercent: new FormControl('', Validators.required),
      charityFeeFixed: new FormControl('', Validators.required),
      charityFeeMinAmnt: new FormControl('', Validators.required),
      charityFeeTaxCode: new FormControl('', Validators.required),
      charityFeeTRN: new FormControl('', Validators.required),
    })
  }
  getMerchantsList() {
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.createAcnt.getAllMerchants(reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.merchantList = decryptedData;
        this.merchantList.map((mData: any) => {
          this.gatewayConfigList.map((data: any) => {
            console.log(data.mainMerchantId, mData.mainMerchantId);
            if (mData.mainMerchantId === data.mainMerchantId) {
              mData['config'] = true;
            }
          })
        })
        console.log(this.merchantList)
      }
    })
  }
  getCurrentPageData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.merchantList.slice(startIndex, endIndex);
  }

  // Method to handle page change
  onPageChange(page: number) {
    this.currentPage = page;
  }
  private loadScripts(): void {
    (function ($) {
      'use strict';

      $('#side_menu_bar > ul > li.nav-item > a').removeClass('active');
      $('#side_menu_bar > ul > li.nav-item > a#li_midAllocation').addClass(
        'active'
      );
    })(jQuery);
  }
  midProcess(sno: any) {
    this.isTrack = !this.isTrack;
  }
  close() {

  }
  getMerchantConfig() {
    this.gatewayConfigList = [];
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.gateway_serv.getPosConfigDetails(reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.gatewayConfigList = decryptedData;
        console.log(decryptedData)
      }
    })
    this.getMerchantsList();
  }
  getTaxes() {
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.gateway_serv.getTaxes(reqhead.headers).subscribe(async res => {
      if (res.success === true) {
      const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
      const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
      this.taxes = decryptedData;
      console.log(decryptedData)
      }
    })
  }
  getMerbyId(id: any) {
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.createAcnt.getMerbyid(id, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
      const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
      const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
      this.merchantData = decryptedData[0]
      }
    })
  }
  cancel() {
    this.isForm = !this.isForm;
    this.isUpdate = false;
    this.isCreate = false;
    this.posConfigForm.enable();
    this.formObject = [];
  }
  edit() {
    this.posConfigForm.enable()
    this.isUpdate = true;
  }
  dataConditions(value: any) {
    if (value.bankChargesType === 'PERCENTAGE') {
      this.formObject.bankChargesValue = value.bankChargesPercent;
    } else if (value.bankChargesType === 'FIXED') {
      this.formObject.bankChargesValue = value.bankChargesFixed;
    } else if (value.bankChargesType === 'PERCENTAGE+FIXED') {
      this.formObject.bankChargesValue = `${value.bankChargesPercent}+${value.bankChargesFixed}`;
    } else {
      this.formObject.bankChargesValue = `${value.bankChargesPercent}+${value.bankChargesFixed}+${value.bankChargesMinAmnt}`;
    }
    if (value.otherChargesType === 'PERCENTAGE') {
      this.formObject.otherChargesValue = value.otherChargesPercent;
    } else if (value.otherChargesType === 'FIXED') {
      this.formObject.otherChargesValue = value.otherChargesFixed;
    } else if (value.otherChargesType === 'PERCENTAGE+FIXED') {
      this.formObject.otherChargesValue = `${value.otherChargesPercent}+${value.otherChargesFixed}`;
    } else {
      this.formObject.otherChargesValue = `${value.otherChargesPercent}+${value.otherChargesFixed}+${value.otherChargesMinAmnt}`;
    }
    if (value.payrowChargesType === 'PERCENTAGE') {
      this.formObject.payrowChargesValue = value.payrowChargesPercent;
    } else if (value.payrowChargesType === 'FIXED') {
      this.formObject.payrowChargesValue = value.payrowChargesFixed;
    } else if (value.payrowChargesType === 'PERCENTAGE+FIXED') {
      this.formObject.payrowChargesValue = `${value.payrowChargesPercent}+${value.payrowChargesFixed}`;
    } else {
      this.formObject.payrowChargesValue = `${value.payrowChargesPercent}+${value.payrowChargesFixed}+${value.payrowChargesMinAmnt}`;
    }
    if (value.payrowDigitialFeeType === 'PERCENTAGE') {
      this.formObject.payrowDigitialFeeValue = value.payrowDigitialFeePercent;
    } else if (value.payrowDigitialFeeType === 'FIXED') {
      this.formObject.payrowDigitialFeeValue = value.payrowDigitialFeeFixed;
    } else if (value.payrowDigitialFeeType === 'PERCENTAGE+FIXED') {
      this.formObject.payrowDigitialFeeValue = `${value.payrowDigitialFeePercent}+${value.payrowDigitialFeeFixed}`;
    } else {
      this.formObject.payrowDigitialFeeValue = `${value.payrowDigitialFeePercent}+${value.payrowDigitialFeeFixed}+${value.payrowDigitialFeeMinAmnt}`;
    }
    if (value.charityFeeType === 'PERCENTAGE') {
      this.formObject.charityFeeValue = value.charityFeePercent;
    } else if (value.charityFeeType === 'FIXED') {
      this.formObject.charityFeeValue = value.charityFeeFixed;
    } else if (value.charityFeeType === 'PERCENTAGE+FIXED') {
      this.formObject.charityFeeValue = `${value.charityFeePercent}+${value.charityFeeFixed}`;
    } else {
      this.formObject.charityFeeValue = `${value.charityFeePercent}+${value.charityFeeFixed}+${value.charityFeeMinAmnt}`;
    }
  }
  addMerchantConfig() {
    this.formObject = this.posConfigForm.value;
    this.dataConditions(this.formObject)
    // this.formObject.mainMerchantId = this.formObject.payrowMerchantId;
    console.log(this.formObject, 'vvvvvvv');
    delete this.formObject._id;
    // const val = this.dataConditions(value)
    // console.log(val);
    let req = { data: this.encryption.encodeJsonObjectToHex(this.formObject) }
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.gateway_serv.createPosMerchantConfig(req, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        console.log(decryptedData, 'dasada')
        this.isForm = !this.isForm;
        this.isCreate != this.isCreate;
        this.getMerchantConfig()
      }
    })
  }
  updateConfigbyId() {
    this.formObject = this.posConfigForm.value;
    this.dataConditions(this.formObject);
    // this.formObject.mainMerchantId = this.formObject.payrowMerchantId;
    console.log(this.formObject, 'vvvvvvv');
    let req = { data: this.encryption.encodeJsonObjectToHex(this.formObject) }
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.gateway_serv.updatePosConfigbyId(req, this.posConfigForm.value._id, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        console.log(decryptedData, 'dasada')
        this.isForm = !this.isForm;
        this.isUpdate != this.isUpdate;
        this.getMerchantConfig()
      }
    })
  }
  AllocateMID() {
    // this.selItem = !this.selItem
    // let mData: any;
    // console.log(this.merchantData)
    // this.merchantData.map((mdata: any) => {
    //   mData = mdata
    // })
    const value = {
      mainMerchantId: this.getID, _id: this.merchantData._id, status: "Active", stage: "MID Allocation"
    }
    // let id = mData._id
    // console.log(id, value, '13')
    let req = { data: this.encryption.encodeJsonObjectToHex(value) }
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.createAcnt.updateMerchant(req, reqhead.headers).subscribe(async (res) => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.note_service.showSuccess(`${200}`, 'Merchant ID Allocated Successfully')
        this.getMerchantsList();
      } else {
        this.note_service.showError(`${res.status} : ${res.error.message}`, '')
      }
    })
    // if (data) {
    //   let merchant = data.data
    //   let obj: any = {};
    //   console.log(data, 'dadt')
    //   obj.merchantId = merchant.bankMID,
    //     obj.merchantName = merchant.firstName,
    //     obj.merchantAddress = merchant.addressDetails,
    //     // merchantCategoryCode= merchant.,
    //     obj.mobileNo = merchant.storeDetails[0].mobileNumber,
    //     obj.bankName = merchant.bankDetails[0].bankName,
    //     obj.branchName = merchant.bankDetails[0].branchName,
    //     obj.accountNumber = merchant.bankDetails[0].accountNumber,
    //     // maxAmountPerTransaction= merchant.,
    //     // maxTransactionPerDay= merchant.,
    //     // maxAmountPerDay= merchant.,
    //     obj.terminalInfo = []
    //     const value=obj
    //     this.youCloud.registerMerchant(value).subscribe((data)=>{
    //       if(data){
    //         console.log(data)
    //       }
    //     })
    //     console.log(obj,'obj')
    // }
  }
  pRChargeType(e: any) {
    this.prcharge = e.target.value;
    this.posConfigForm.patchValue({ payrowChargesType: this.prcharge });
  }
  bankChargeType(e: any) {
    this.bankcharge = e.target.value;
    this.posConfigForm.patchValue({ bankChargesType: this.bankcharge });
  }
  otherChargeType(e: any) {
    this.othercharge = e.target.value;
    this.posConfigForm.patchValue({ otherChargesType: this.othercharge });
  }
  digitalChargeType(e: any) {
    this.digitalcharge = e.target.value;
    this.posConfigForm.patchValue({ payrowDigitialFeeType: this.digitalcharge });
  }
  charityChargeType(e: any) {
    this.charitycharge = e.target.value;
    this.posConfigForm.patchValue({ charityFeeType: this.charitycharge });
  }
  userDetailsFunc(id: any) {
    this.isTrack = !this.isTrack;
    this.merchantData = [];
    this.merchantList.map((sData: any) => {
      // console.log(sData, 'sss')
      if (id === sData._id) {
        this.isTrack = id;
        this.merchantData.push(sData);
        console.log(this.merchantData, 'ss')
        // this.selectStoreCat = sData.data[0].cat;
      }
    });

    if (this.merchantData.length === 0) {
      alert(`${id} Does Not Exist`)
    };
    this.searchId = "";
    //console.log("###########################",this.storeCatData[0].data[0].cat);
  };
  backToList() {
    this.isTrack = !this.isTrack;
    this.getMerchantsList()
  }
  OnSelMngr(e: any) {
    this.selectMngr = e.target.value
  }
  configForm(mid: any, config: any) {
    console.log(mid, config)
    if (config === true) {
      this.merchantData = [];
      let reqhead = this.encryption.createHeader();
      const key = this.encryption.generateKey(reqhead.key)
      this.gateway_serv.posConfigById(mid, reqhead.headers).subscribe(async res => {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        console.log(decryptedData[0], decryptedData[0].bankChargesValue)
        this.formObject = decryptedData[0];
        this.prcharge = this.formObject.payrowChargesType;
        this.bankcharge = this.formObject.bankChargesType;
        this.othercharge = this.formObject.otherChargesType;
        if (this.formObject.bankChargesType === 'PERCENTAGE') {
          this.formObject.bankChargesPercent = this.formObject.bankChargesValue;
        } else if (this.formObject.bankChargesType === 'FIXED') {
          this.formObject.bankChargesFixed = this.formObject.bankChargesValue;
        } else if (this.formObject.bankChargesType === 'PERCENTAGE+FIXED') {
          let valuesArray = this.formObject.bankChargesValue.split("+");
          console.log(valuesArray)
          this.formObject.bankChargesPercent = valuesArray[0];
          this.formObject.bankChargesFixed = valuesArray[1];
        } else {
          let valuesArray = this.formObject.bankChargesValue.split("+");
          this.formObject.bankChargesPercent = valuesArray[0];
          this.formObject.bankChargesFixed = valuesArray[1];
          this.formObject.bankChargesMinAmnt = valuesArray[2];
        }
        if (this.formObject.otherChargesType === 'PERCENTAGE') {
          this.formObject.otherChargesPercent = this.formObject.otherChargesValue;
        } else if (this.formObject.otherChargesType === 'FIXED') {
          this.formObject.otherChargesFixed = this.formObject.otherChargesValue;
        } else if (this.formObject.otherChargesType === 'PERCENTAGE+FIXED') {
          let valuesArray = this.formObject.otherChargesValue.split("+");
          this.formObject.otherChargesPercent = valuesArray[0];
          this.formObject.otherChargesFixed = valuesArray[1];
        } else {
          let valuesArray = this.formObject.otherChargesValue.split("+");
          this.formObject.otherChargesPercent = valuesArray[0];
          this.formObject.otherChargesFixed = valuesArray[1];
          this.formObject.otherChargesMinAmnt = valuesArray[2];
        }
        if (this.formObject.payrowChargesType === 'PERCENTAGE') {
          this.formObject.payrowChargesPercent = this.formObject.payrowChargesValue;
        } else if (this.formObject.payrowChargesType === 'FIXED') {
          this.formObject.payrowChargesFixed = this.formObject.payrowChargesValue;
        } else if (this.formObject.payrowChargesType === 'PERCENTAGE+FIXED') {
          let valuesArray = this.formObject.payrowChargesValue.split("+");
          this.formObject.payrowChargesPercent = valuesArray[0];
          this.formObject.payrowChargesFixed = valuesArray[1];
        } else {
          let valuesArray = this.formObject.payrowChargesValue.split("+");
          this.formObject.payrowChargesPercent = valuesArray[0];
          this.formObject.payrowChargesFixed = valuesArray[1];
          this.formObject.payrowChargesMinAmnt = valuesArray[2];
        }
        if (this.formObject.payrowDigitialFeeType === 'PERCENTAGE') {
          this.formObject.payrowDigitialFeePercent = this.formObject.payrowDigitialFeeValue;
        } else if (this.formObject.payrowDigitialFeeType === 'FIXED') {
          this.formObject.payrowDigitialFeeFixed = this.formObject.payrowDigitialFeeValue;
        } else if (this.formObject.payrowDigitialFeeType === 'PERCENTAGE+FIXED') {
          let valuesArray = this.formObject.payrowDigitialFeeValue.split("+");
          this.formObject.payrowDigitialFeePercent = valuesArray[0];
          this.formObject.payrowDigitialFeeFixed = valuesArray[1];
        } else {
          let valuesArray = this.formObject.payrowDigitialFeeValue.split("+");
          this.formObject.payrowDigitialFeePercent = valuesArray[0];
          this.formObject.payrowDigitialFeeFixed = valuesArray[1];
          this.formObject.payrowDigitialFeeMinAmnt = valuesArray[2];
        }
        if (this.formObject.charityFeeType === 'PERCENTAGE') {
          this.formObject.charityFeePercent = this.formObject.charityFeeValue;
        } else if (this.formObject.charityFeeType === 'FIXED') {
          this.formObject.charityFeeFixed = this.formObject.charityFeeValue;
        } else if (this.formObject.charityFeeType === 'PERCENTAGE+FIXED') {
          let valuesArray = this.formObject.charityFeeValue.split("+");
          this.formObject.charityFeePercent = valuesArray[0];
          this.formObject.charityFeeFixed = valuesArray[1];
        } else {
          let valuesArray = this.formObject.charityFeeValue.split("+");
          this.formObject.charityFeePercent = valuesArray[0];
          this.formObject.charityFeeFixed = valuesArray[1];
          this.formObject.charityFeeMinAmnt = valuesArray[2];
        }
        // this.merchantData = res.data;
        // this.dataConditions(res.data[0]);
        console.log(this.formObject);
        if (this.formObject) {
          this.posConfigForm.patchValue(this.formObject)
          this.isForm = !this.isForm;
          this.isUpdate = false;
          this.posConfigForm.disable()
        }
      })



      // this.gatewayConfigList.map(async (data: any) => {
      //   if (data.payrowMerchantId === mid) {
      //     console.log(data.bankChargesValue)
      //     this.formObject = data;
      //     this.dataConditions(data);
      //     if (this.formObject) {
      //       console.log(this.formObject);
      //       this.merchantData.push(data)
      //       this.posConfigForm.patchValue(this.merchantData[0])
      //       this.isForm = !this.isForm;
      //       this.posConfigForm.disable()
      //     }

      //   }
      // })
    }
    else {
      this.othercharge = "";
      this.bankcharge = "";
      this.prcharge = "";
      this.digitalcharge = "";
      this.charitycharge = "";
      this.isForm = !this.isForm;
      this.isCreate = !this.isCreate;
      this.posConfigForm.reset();
      this.posConfigForm.patchValue({ mainMerchantId: mid })
    }
    // this.posConfigForm.patchValue({payrowMerchantId:mid})
    // this.isForm = !this.isForm;
    // this.isCreate = !this.isCreate;
    // console.log(this.isCreate)
  }
  back() {
    this.isForm = !this.isForm;
    this.isCreate = false;
    this.isUpdate = false;
    console.log(this.isCreate)
  }
  showForm(id: any) {
    this.mid = id;

    // this.merchantData
    // this.createAcnt.getMerchantById(id).subscribe(data => {
    //   if (data) {
    //     // data.data.map((mdata:any)=>{
    //       this.merchantData = data.data
    //       console.log(this.merchantData, 'daaa')
    //     // })
    this.isForm = !this.isForm;
    //   }
    // })
  }
}

