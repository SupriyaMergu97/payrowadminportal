import { Component, OnInit } from '@angular/core';
import { AppManagerService } from 'src/app/core/services/app-manager.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { CreateAcntService } from 'src/app/services/create-acnt.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceCatalogueService } from 'src/app/services/service-catalogue.service';
import { GatewayService } from 'src/app/services/gateway.service';
import { SignatureEncryptionService } from 'src/app/services/signature-encryption.service';

declare var jQuery: any;

@Component({
  selector: 'app-pg-mid-allocation',
  templateUrl: './pg-mid-allocation.component.html',
  styleUrls: ['./pg-mid-allocation.component.scss']
})
export class PgMidAllocationComponent implements OnInit {
  pgConfigForm: FormGroup
  merchantData: any;
  merchantList: any = []
  midPerData: any;
  isTrack: any;
  selItem: boolean = false
  isForm: boolean = false;
  searchText: any;
  getID: any;
  mid: any
  taxes: any
  gatewayConfigList: any
  gatewayConfig: any
  isUpdate: boolean = false
  isCreate: boolean = false
  // isAllocated: boolean = false;
  // isDone:boolean=false;
  searchId: any;
  prcharge: any;
  bankcharge: any;
  othercharge: any;
  digitalcharge: any;
  charitycharge: any;
  formObject: any;
  constructor(private app: AppManagerService, private createAcnt: CreateAcntService,
    private srvc_Cat: ServiceCatalogueService, private encryption: SignatureEncryptionService,
    private note_service: NotificationService, private fb: FormBuilder,
    private gateway_serv: GatewayService) {
    this.app.ShowReportDate = 'true';

  }
  ngOnInit(): void {
    this.getMerchantConfig()
    // this.getMerchantsList()
    this.loadScripts();
    this.getTaxes()
    this.pgConfigForm = this.fb.group({
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
  close() { }
  getMerchantsList() {
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.gateway_serv.getpgUsersDetails(reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.merchantList = decryptedData;
        this.merchantList.map((mData: any) => {
          mData.config = false;
          this.gatewayConfigList.map((data: any) => {
            if (data.mainMerchantId === mData.merchantId) {
              console.log(data.mainMerchantId, mData.merchantId)
              mData.config = true
            }
            // else {
            //   mData.config = false
            // }
          })
        })
      }
      console.log(this.merchantList)
    })
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
  getMerbyId(id: any) {
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.gateway_serv.getpgMerbyId(id, reqhead.headers).subscribe(async (res) => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.merchantData = decryptedData[0]
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
      merchantId: this.getID, _id: this.merchantData._id, status: "Active", stage: "MID Allocation"
    }
    // let id = mData._id
    // console.log(id, value, '13')
    let req = { data: this.encryption.encodeJsonObjectToHex(value) }
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.gateway_serv.updatepgUser(req, reqhead.headers).subscribe(async (res) => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        console.log(decryptedData)
        this.note_service.showSuccess(`${200}`, 'Merchant ID Allocated Successfully')
        this.getMerchantsList();
      } else {
        this.note_service.showError(`${res.status} : ${res.error.message}`, '')
      }
    })
    // AllocateMID() {
    //   // this.selItem = !this.selItem
    //   var mData: any;
    //   console.log(this.midPerData)
    //   this.midPerData.map((mdata: any) => {
    //     mData = mdata
    //   })
    //   const value = {
    //     bankMID: this.getID, status: {
    //       status: "Ongoing",
    //       stage: "merchant Allocation"
    //     },
    //   }
    //   let id = mData._id
    //   console.log(id, value, '13')
    //   this.createAcnt.updateMerchantPersonal(value, id).subscribe((data) => {
    //     console.log(data)
    //     if (data.success === true) {
    //       this.note_service.showSuccess(`${200}`, 'Merchant ID Allocated Successfully')
    //     } else {
    //       this.note_service.showError(`${data.status} : ${data.error.message}`, '')
    //     }
    //   })

    //   // if (data) {
    //   //   let merchant = data.data
    //   //   let obj: any = {};
    //   //   console.log(data, 'dadt')
    //   //   obj.merchantId = merchant.bankMID,
    //   //     obj.merchantName = merchant.firstName,
    //   //     obj.merchantAddress = merchant.addressDetails,
    //   //     // merchantCategoryCode= merchant.,
    //   //     obj.mobileNo = merchant.storeDetails[0].mobileNumber,
    //   //     obj.bankName = merchant.bankDetails[0].bankName,
    //   //     obj.branchName = merchant.bankDetails[0].branchName,
    //   //     obj.accountNumber = merchant.bankDetails[0].accountNumber,
    //   //     // maxAmountPerTransaction= merchant.,
    //   //     // maxTransactionPerDay= merchant.,
    //   //     // maxAmountPerDay= merchant.,
    //   //     obj.terminalInfo = []
    //   //     const value=obj
    //   //     this.youCloud.registerMerchant(value).subscribe((data)=>{
    //   //       if(data){
    //   //         console.log(data)
    //   //       }
    //   //     })
    //   //     console.log(obj,'obj')
    //   // }
    // }
  }

  dataConditions(value: any) {
    if (value.bankChargesType === 'PERCENTAGE') {
      this.formObject.bankChargesValue = value.bankChargesPercent;
    } else if (value.bankChargesType === 'FIXED') {
      this.formObject.bankChargesValue = value.bankChargesFixed;
    } else if (value.bankChargesType === 'PERCENTAGE+FIXED') {
      this.formObject.bankChargesValue = `${value.bankChargesPercent}+ ${value.bankChargesFixed}`;
    } else {
      this.formObject.bankChargesValue = `${value.bankChargesPercent}+ ${value.bankChargesFixed}+${value.bankChargesMinAmnt}`;
    }
    if (value.otherChargesType === 'PERCENTAGE') {
      this.formObject.otherChargesValue = value.otherChargesPercent;
    } else if (value.otherChargesType === 'FIXED') {
      this.formObject.otherChargesValue = value.otherChargesFixed;
    } else if (value.otherChargesType === 'PERCENTAGE+FIXED') {
      this.formObject.otherChargesValue = `${value.otherChargesPercent}+ ${value.otherChargesFixed}`;
    } else {
      this.formObject.otherChargesValue = `${value.otherChargesPercent}+ ${value.otherChargesFixed}+${value.otherChargesMinAmnt}`;
    }
    if (value.payrowChargesType === 'PERCENTAGE') {
      this.formObject.payrowChargesValue = value.payrowChargesPercent;
    } else if (value.payrowChargesType === 'FIXED') {
      this.formObject.payrowChargesValue = value.payrowChargesFixed;
    } else if (value.payrowChargesType === 'PERCENTAGE+FIXED') {
      this.formObject.payrowChargesValue = `${value.payrowChargesPercent}+ ${value.payrowChargesFixed}`;
    } else {
      this.formObject.payrowChargesValue = `${value.payrowChargesPercent}+ ${value.payrowChargesFixed}+${value.payrowChargesMinAmnt}`;
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
    this.formObject = this.pgConfigForm.value;
    this.dataConditions(this.formObject)
    // this.formObject.mainMerchantId = this.formObject.payrowMerchantId;
    console.log(this.formObject, 'vvvvvvv');
    delete this.formObject._id;
    // const val = this.dataConditions(value)
    // console.log(val);
    let req = { data: this.encryption.encodeJsonObjectToHex(this.formObject) }
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.gateway_serv.createMerchantConfig(req, reqhead.headers).subscribe(async res => {
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
    this.formObject = this.pgConfigForm.value;
    this.dataConditions(this.formObject);
    // this.formObject.mainMerchantId = this.formObject.payrowMerchantId;
    console.log(this.formObject, 'vvvvvvv');
    let req = { data: this.encryption.encodeJsonObjectToHex(this.formObject) }
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.gateway_serv.updateDetailsbyId(req, this.pgConfigForm.value._id, reqhead.headers).subscribe(async res => {
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
  pRChargeType(e: any) {
    this.prcharge = e.target.value;
    this.pgConfigForm.patchValue({ payrowChargesType: this.prcharge });
  }
  bankChargeType(e: any) {
    this.bankcharge = e.target.value;
    this.pgConfigForm.patchValue({ bankChargesType: this.bankcharge });
  }
  otherChargeType(e: any) {
    this.othercharge = e.target.value;
    this.pgConfigForm.patchValue({ otherChargesType: this.othercharge });
  }
  digitalChargeType(e: any) {
    this.digitalcharge = e.target.value;
    this.pgConfigForm.patchValue({ payrowDigitialFeeType: this.digitalcharge });
  }
  charityChargeType(e: any) {
    this.charitycharge = e.target.value;
    this.pgConfigForm.patchValue({ charityFeeType: this.charitycharge });
  }
  getMerchantConfig() {
    this.gatewayConfigList = []
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.gateway_serv.getConfigDetails(reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.gatewayConfigList = decryptedData
        console.log(decryptedData)
      }
      this.getMerchantsList()
    })
  }
  userDetailsFunc(id: any) {
    this.isTrack = !this.isTrack;
    this.midPerData = [];
    this.merchantList.map((sData: any) => {
      // console.log(sData, 'sss')
      if (id === sData._id) {
        this.isTrack = id;
        this.midPerData.push(sData);
        console.log(this.midPerData, 'ss')
        // this.selectStoreCat = sData.data[0].cat;
      }
    });

    if (this.midPerData.length === 0) {
      alert(`${id} Does Not Exist`)
    };
    this.searchId = "";
    //console.log("###########################",this.storeCatData[0].data[0].cat);
  };
  backToList() {
    this.isTrack = !this.isTrack;
    this.selItem = false
    this.getMerchantsList()
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
  back() {
    this.isForm = !this.isForm;
    this.isUpdate = false
    this.isCreate = false
    this.pgConfigForm.reset()
    this.getMerchantConfig()
  }
  // create() {
  //   this.isForm = !this.isForm
  //   this.isCreate = !this.isCreate
  // }
  configForm(id: any, config: any) {
    if (config === true) {
      // this.merchantData = [];
      let reqhead = this.encryption.createHeader();
      const key = this.encryption.generateKey(reqhead.key)
      this.gateway_serv.gatewayConfigById(id, reqhead.headers).subscribe(async res => {
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
          this.pgConfigForm.patchValue(this.formObject)
          this.isForm = !this.isForm;
          this.isUpdate = false;
          this.isCreate = false;
          this.pgConfigForm.disable()
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
      //       this.pgConfigForm.patchValue(this.merchantData[0])
      //       this.isForm = !this.isForm;
      //       this.pgConfigForm.disable()
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
      this.isUpdate = false
      this.pgConfigForm.reset();
      this.pgConfigForm.enable();
      this.pgConfigForm.patchValue({ mainMerchantId: id })
    }
  }
  edit() {
    this.pgConfigForm.enable()
    this.isUpdate = true
  }
  update() {
    const value = this.pgConfigForm.value
    console.log(value)
    let req = { data: this.encryption.encodeJsonObjectToHex(value) }
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.gateway_serv.updateDetailsbyId(req, this.gatewayConfig[0]._id, reqhead.headers).subscribe(async res => {
      const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
      const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
      if (res.success === true) {
        this.note_service.showSuccess(`${200}`, 'Merchant config details updated Successfully')
        this.isUpdate = !this.isUpdate
        this.pgConfigForm.disable
      } else {
        this.note_service.showError(`${res.status} : ${res.error.message}`, '')
      }
    })
  }

  showForm(id: any) {
    this.mid = id;

    // this.midPerData
    // this.createAcnt.getMerchantById(id).subscribe(data => {
    //   if (data) {
    //     // data.data.map((mdata:any)=>{
    //       this.midPerData = data.data
    //       console.log(this.midPerData, 'daaa')
    //     // })
    this.isForm = !this.isForm;
    //   }
    // })
  }
}

