import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { AppManagerService } from 'src/app/core/services/app-manager.service';
declare var jQuery: any;
import { CreateAcntService } from 'src/app/services/create-acnt.service';
import { ServiceCatalogueService } from 'src/app/services/service-catalogue.service';
import { BarServiceService } from 'src/services/bar-service.service';

@Component({
  selector: 'app-acnt-status',
  templateUrl: './acnt-status.component.html',
  styleUrls: ['./acnt-status.component.scss']
})
export class AcntStatusComponent implements OnInit {
  mServiceForm!: FormGroup;
  isMerchant: boolean = true
  isStaff: boolean = false
  merchantList: any = []
  staffList: any = []
  selected: any
  active: boolean = false
  deActive: boolean = false
  statusArray: any = ["Active", "Deactive"];
  services: any
  catalogue: any
  merchantId: any
  categories: any
  totServices: any
  serviceList: any
  merServices: any
  govtServices: any
  enterpriseServices: any
  staffListA: any = []
  // [
  //   { tid: '87328322', mobileNumber: '8921398212', storeId: '12345', imeiNo: '293729310', joiningDate: '04-05-2022' },
  //   { tid: '92846372', mobileNumber: '9293872192', storeId: '12345', imeiNo: '247129819', joiningDate: '04-05-2022' },
  //   { tid: '10238190', mobileNumber: '7798217981', storeId: '12345', imeiNo: '982399279', joiningDate: '04-05-2022' },
  //   { tid: '21387191', mobileNumber: '8163871821', storeId: '12345', imeiNo: '247293293', joiningDate: '04-05-2022' },
  //   { tid: '29329382', mobileNumber: '7635983764', storeId: '12345', imeiNo: '294729202', joiningDate: '04-05-2022' },
  // ]
  // items: any = [
  //   { merchantId: "MID123", serviceId: "SID12345", serviceName: "License administrative cancellation fee", unitPrice: "100", sequence: "5", desc: "", avarage: "110" },
  //   { merchantId: "MID124", serviceId: "SID12323", serviceName: "Consumer Protection Complaint", unitPrice: "200", sequence: "9", desc: "", avarage: "180" },
  //   { merchantId: "MID125", serviceId: "SID12312", serviceName: "Percentage of the capital", unitPrice: "150", sequence: "20", desc: "", avarage: "160" },
  // ]
  constructor(private createAcnt: CreateAcntService,
    private bar_srv: BarServiceService,
    private srvc_Cat: ServiceCatalogueService) { }

  ngOnInit(): void {
    this.getMerchantsList()
    this.getMerchantServices()
    this.getCategory()
    this.loadScripts()
    this.getServices()
    this.mServiceForm = new FormGroup({
      merchantId: new FormControl('', [Validators.required]),
      serviceId: new FormControl('', [Validators.required])
    })
  }
  merchant() {
    this.isMerchant = !this.isMerchant
  }
  getTidList(id: any) {
    this.staffListA = []
    this.merchantId = []
    this.createAcnt.getMerchantById(id).subscribe(data => {
      data.data.map((mData: any) => {
        this.merchantId.push({ mid: mData.bankMID })
        mData.terminalsInfo.map((tidData: any) => {
          let tids = {
            tidInfo: tidData, mid: data.data.bankMID, activationDate: "pending", address: data.data.addressDetails,
            emailId: data.data.emailId, firstName: data.data.firstName, tid: "pending"
          }
          this.staffListA.push(tids)
        })
        this.isMerchant = !this.isMerchant
      })
    })
  }
  staff() {
    this.isStaff = !this.isStaff
  }
  getMerchantsList() {

    this.createAcnt.getMerchants().subscribe(data => {
      this.merchantList = data.data;
      console.log(this.merchantList)
      this.merchantList.map((d: any) => {
        console.log(d.bankMID)
        if (d.bankMID != undefined) {
          d.catalogue = "Enterprise Catalogue"
          console.log(d.catalogue)
        }
        else {
          d.catalogue = "SMB Catalogue"
        }
        d.selected = this.statusArray;
        d.activationDate = d.status.status === 'Deactive' ? "Ongoing" : new Date(d.activationDate).toDateString();
      })
    })
  }

  details(id: any, cat: any) {
    this.services = []
    console.log(id)
    this.merchantId = id
    this.serviceList = []
    this.catalogue = cat
    this.isStaff = !this.isStaff
    if (cat === "SMB Catalogue") {
      this.categories.map((data: any) => {
        if (data.serviceName === "COSMETIC STORES") {
          data.serviceItems.map((item: any) => {
            item.serviceCode = data.serviceCode
            this.services.push(item)
          })
        }
      })
    }
    if (cat === "Enterprise Catalogue") {
      this.totServices.map((sData: any) => {
        if (sData.serviceType === "Enterprise Catalogue") {
          this.serviceList.push(sData)
        }
        this.merServices.map((data: any) => {
          if (data.merchantId === id) {
            if (data.serviceId === sData.serviceId) {
              this.services.push(sData)
              this.serviceList.pop(sData)
            }
          }
        })
      })
    }
    console.log(this.services)
  }
  getServices() {
    this.totServices = []
    this.srvc_Cat.getService().subscribe(res => {
      this.totServices = res.data
      console.log(this.totServices)
    })
  }

  getMerchantServices() {
    this.srvc_Cat.getMerchntServices().subscribe(res => {
      this.merServices = res.data
    })
  }
  getCategory() {
    this.categories = []
    // this.srvc_Cat.getCategory().subscribe(res => {
    //   this.categories = res.data
    //   console.log(this.categories)
    // })
  }
  onMerchantService() {
    this.mServiceForm.value.merchantId = this.merchantId
    const data = this.mServiceForm.value
    console.log(data)
    this.srvc_Cat.crtMrchntServices(data).subscribe(res => {
      if (res.success = "true")
      this.getMerchantServices()
        alert("Service Assigned Succesfully!!");
      // this.onSelEntity(data.merchantId)
      this.mServiceForm.reset();
    })
  }
  onSelectOption(event: any) {
    this.selected = event.target.value;
    this.openModel(this.selected)
  }
  openModel(option: any) {
    // this.selected = event.target.value;
    if (option == "Active") {
      this.active = !this.active
    } else {
      // this.deActivateMerchant()
      this.deActive = !this.deActive
    }
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
  close() {
    this.active = false
    this.deActive = false
  }
  private loadScripts(): void {
    (function ($) {
      "use strict";

      $('#side_menu_bar > ul > li.nav-item > a').removeClass("active");
      $('#side_menu_bar > ul > li.nav-item > a#li_acnt_status').addClass("active");


    })(jQuery);
  }
}
