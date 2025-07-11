import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChildActivationStart } from '@angular/router';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
import { AppManagerService } from 'src/app/core/services/app-manager.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { CatalogueService } from 'src/app/services/catalogue.service';
import { GatewayService } from 'src/app/services/gateway.service';
import { ServiceCatalogueService } from 'src/app/services/service-catalogue.service';
import { SignatureEncryptionService } from 'src/app/services/signature-encryption.service';
import { BarServiceService } from 'src/services/bar-service.service';
declare var jQuery: any;

@Component({
  selector: 'app-service-catalogue',
  templateUrl: './service-catalogue.component.html',
  styleUrls: ['./service-catalogue.component.scss']
})
export class ServiceCatalogueComponent implements OnInit {
  itemsPerPage = 9; // Items per page
  currentServPage = 1;
  currentCatPage = 1;
  serviceForm!: FormGroup;
  categoryForm: FormGroup;
  objId: any = '';
  // serviceList: any = [];
  categories: any = [];
  taxes: any = [];
  sortedCatList: any = [];
  sortedServList: any = [];
  selectedCategory: any = 'All categories'
  selectedCatalogue: any = "All Catalogues"
  isShow: boolean = false;
  isAddService: boolean = false
  isItems: boolean = false
  selectedCatID: any
  isDisable: boolean = true
  public formData: any = {};
  public type = 'create';
  public dataMasterId: any;
  public csvOptions: any = {};
  report_title: string;
  searchText: any;
  statuses: any = ["Active", "In-Active"]
  catalogues: any = ["Non-Government Catalogue", "Government Catalogue"]
  servImage: any;
  fileSelected: File;
  services: any = [];
  rate: String;
  taxDetails: any;
  servType: any;
  govtServices: any = [];
  enterpriseServ: any = [];
  tempData = [];
  isLoading:boolean=true;
  isLoadingServ:boolean=true;
  constructor(
    private app: AppManagerService,
    private catalogueService: CatalogueService,
    private fb: FormBuilder,
    private bar_srv: BarServiceService,
    private srvc_Cat: ServiceCatalogueService,
    private note_service: NotificationService,
    private gatewayServ: GatewayService,
    private encryption: SignatureEncryptionService
  ) {
    this.app.ShowReportDate = 'true';
  }


  csvData: any = [];


  ngOnInit(): void {
    this.getCategories();


    console.log(this.selectedCatalogue, 'iqy i')
    // this.getGovtServices();
    // this.getEnterpriseServ();
    // this.getCategory();
    this.getTaxes();
    // this.getStaticData();
    this.serviceForm = new FormGroup({
      _id: new FormControl(''),
      catalogueType: new FormControl('', [Validators.required]),
      serviceId: new FormControl(''),
      serviceName: new FormControl('', [Validators.required]),
      serviceNameArabic: new FormControl(''),
      shortServiceName: new FormControl(''),
      serviceType: new FormControl(''),
      // unitPrice: new FormControl('', [Validators.required]),
      currency: new FormControl('AED', [Validators.required]),
      taxCode: new FormControl('1234', [Validators.required]),
      englishDescription: new FormControl('', [Validators.required]),
      arabicDescription: new FormControl(''),
      priceType: new FormControl('', [Validators.required]),
      categoryId: new FormControl(''),
      taxApplicable: new FormControl(true, [Validators.required]),
      status: new FormControl(''),
      serviceImage: new FormControl(''),
      serviceImageName: new FormControl('')
    })
    this.categoryForm = new FormGroup({
      _id: new FormControl(''),
      categoryId: new FormControl(''),
      categoryName: new FormControl('', Validators.required),
      catalogueType: new FormControl('', Validators.required),
      status: new FormControl('')
    })
    // this.itemForm = new FormGroup({
    //   serviceCode: new FormControl('', Validators.required),
    //   serviceItems: this.fb.group({
    //     itemName: new FormControl('', Validators.required),
    //     itemDescription: new FormControl('', Validators.required)
    //   })
    // })
    this.loadScripts();
  }

  getTotalPages(): number {
    return Math.ceil(this.sortedCatList.length / this.itemsPerPage);
  }
  onCatPageChange(page: number) {
    this.currentCatPage = page;
  }
  onServPageChange(page: number) {
    this.currentServPage = page;
  }
  getPageCat(): any[] {
    const startIndex = (this.currentCatPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.sortedCatList.slice(startIndex, endIndex);
  }
  getPageServ(): any[] {
    const startIndex = (this.currentServPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.sortedServList.slice(startIndex, endIndex);
  }
  onCreateCat() {
    this.categoryForm.reset();
    this.categoryForm.patchValue({ catalogueType: this.selectedCatalogue, status: "Active" });
    this.isShow = false
  }

  createCategory() {
    const value = this.categoryForm.value;
    console.log("value", value)
    let req = { data: this.encryption.encodeJsonObjectToHex(value) }
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.srvc_Cat.createCategory(req, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.categoryForm.reset();
        this.getCategories();
        this.note_service.showSuccess(`${200}`, 'Category Added Successfully')
      }
      else {
        this.note_service.showError(`${res.status} : ${res.error.message}`, '')
      }
    })
  }
  onUpdateAction(catId: any) {
    this.isShow = true;
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.srvc_Cat.getCatbyID(catId, reqhead.headers).subscribe(async res => {
      this.categoryForm.reset();
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.objId = decryptedData[0]._id;
        console.log(decryptedData, 'daa')
        this.categoryForm.patchValue(decryptedData[0]);
        console.log(this.categoryForm.value, 'vaaaal');
      }
    })
  }
  updateCategory() {
    const value = this.categoryForm.value;
    let req = { data: this.encryption.encodeJsonObjectToHex(value) }
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.srvc_Cat.updateCatById(req, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.getCategories();
      }
    })
  }
  onDelCat() {
    this.categoryForm.value.status = "In-Active";
    const value = this.categoryForm.value;
    let req = { data: this.encryption.encodeJsonObjectToHex(value) }
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.srvc_Cat.updateCatById(req, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.note_service.showSuccess(`${200}`, 'Category Removed Successfully')
        this.categoryForm.reset();
        this.getCategories();
        // this.getServbyCat(this.selectedCatID)
      }
      else {
        this.note_service.showError(`${res.status} : ${res.error.message}`, '')
      }
    })
  }
  getCategories() {
    this.categories = [];
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.srvc_Cat.getCategories(reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.categories = decryptedData;
        this.categoryForm.patchValue({ catalogueType: this.selectedCatalogue });
        this.sortCatalogue(this.selectedCatalogue)
      }
      if(res){
        this.isLoading=false;
      }
    })
  }
  onSelCatalogue(e: any) {
    this.selectedCatalogue = e.target.value;
    if (this.selectedCatalogue === "All Catalogues") {
      this.isDisable = true;
    }
    else { this.isDisable = false }
    this.sortCatalogue(this.selectedCatalogue)
  }
  sortCatalogue(catalogue: any) {
    console.log(catalogue)
    this.sortedCatList = [];
    if (catalogue === "All Catalogues") {
      this.sortedCatList = this.categories;
    }
    else {
      this.categories.map((data: any) => {
        if (data.catalogueType === catalogue) {
          this.sortedCatList.push(data);
        }
      })
    }
  }

  getServbyCat(catId: any) {
    this.sortedServList = []
    this.selectedCatID = catId;

    this.isItems = !this.isItems;
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.srvc_Cat.getServByCat(catId, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.sortedServList = decryptedData
      }
      if(res){
        this.isLoadingServ=false;
      }
    })
  }
  onDEl() {
    alert("Are you sure you want to delete!");
  }
  async createService() {
    this.sortedServList = []
    const value = this.serviceForm.value;
    const formData = new FormData();
    // // Iterate through form values and append them to FormData object
    // formData.append('catalogueType', this.selectedCatalogue);
    // formData.append('serviceId', this.serviceForm.get('serviceId')?.value);
    // formData.append('serviceName', this.serviceForm.get('serviceName')?.value);
    // formData.append('shortServiceName', this.serviceForm.get('shortServiceName')?.value);
    // formData.append('serviceType', this.serviceForm.get('serviceType')?.value);
    // formData.append('currency', this.serviceForm.get('currency')?.value);
    // formData.append('taxCode', this.serviceForm.get('taxCode')?.value);
    // formData.append('englishDescription', this.serviceForm.get('englishDescription')?.value);
    // formData.append('priceType', this.serviceForm.get('priceType')?.value);
    // formData.append('categoryId', this.selectedCatID);
    // formData.append('taxApplicable', this.serviceForm.get('taxApplicable')?.value);
    // formData.append('status', "Active");
    // formData.append('serviceImage', this.serviceForm.get('serviceImage')?.value);
    // formData.append('serviceImageName', this.serviceForm.get('serviceImageName')?.value);
    // console.log(formData,this.serviceForm.value, 'formdata')
    value.categoryId = this.selectedCatID;
    value.status = "Active";
    value.catalogueType = this.selectedCatalogue
    formData.append('serviceImage', this.serviceForm.get('serviceImage')?.value);
    value.serviceImage = "";
    formData.append('data', this.encryption.encodeJsonObjectToHex(value));
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.srvc_Cat.createService(formData, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.note_service.showSuccess(`${200}`, 'Service Added Successfully')
        this.serviceForm.reset();
        this.isAddService = !this.isAddService;
        let reqheadserv = this.encryption.createHeader();
        const keyserv = this.encryption.generateKey(reqheadserv.key)
        this.srvc_Cat.getServByCat(this.selectedCatID, reqheadserv.headers).subscribe(async res => {
          if (res.success === true) {
            const encryptedDataServ = res.data;  // Assuming encrypted data comes under 'data'
            const decryptedDataServ = JSON.parse(this.encryption.decodeData(encryptedDataServ, await keyserv));
            this.sortedServList = decryptedDataServ
          }
        })
        // this.getServbyCat(this.selectedCatID)
      }
      else {
        this.note_service.showError(`${res.error.message}`, '')
      }
    })
  }
  onFileSelected(event: any) {
    this.servImage = ""
    console.log("##############################", event.target.files[0])
    const file = <File>event.target.files[0];
    this.serviceForm.patchValue({ serviceImage: file });
    this.serviceForm.get('serviceImage')?.updateValueAndValidity();
    console.log('image', this.serviceForm.value.serviceImage);
    const reader = new FileReader();
    reader.onload = () => {
      this.servImage = reader.result as string;
    }
    const [fileSelected, rest] = event.target.files[0].name.split(".");
    this.fileSelected = fileSelected;
    reader.readAsDataURL(file)
  }
  onaddServAction() {
    this.serviceForm.reset();
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.srvc_Cat.getCatbyID(this.selectedCatID, reqhead.headers).subscribe(async res => {
      if (res.success = true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.serviceForm.patchValue({ catalogueType: decryptedData[0].catalogueType });
        console.log(decryptedData)
      }
    })
    this.isAddService = !this.isAddService
    this.isShow = false;
  }
  onServUpdateAction(servId: any) {
    this.isAddService = !this.isAddService
    this.isShow = true;
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.srvc_Cat.getServbyId(servId, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.serviceForm.reset();
        console.log(decryptedData, 'daa')
        this.servImage = decryptedData[0].serviceImage;
        this.serviceForm.patchValue(decryptedData[0]);
        console.log(this.serviceForm.value, 'vaaaal');
      }
    })
  }
  updateService() {
    this.sortedServList = [];
    const value = this.serviceForm.value;
    const formData = new FormData();
    // Iterate through form values and append them to FormData object
    // Object.keys(value).forEach(key => {
    //   formData.append(key, value[key]);
    // });
    formData.append('serviceImage', this.serviceForm.get('serviceImage')?.value);
    formData.append('data', this.encryption.encodeJsonObjectToHex(value));
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.srvc_Cat.updateServ(formData, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.note_service.showSuccess(`${200}`, 'Service updated Successfully')
        this.serviceForm.reset();
        this.isAddService = !this.isAddService;
        let reqheadserv = this.encryption.createHeader();
        const keyserv = this.encryption.generateKey(reqheadserv.key)
        this.srvc_Cat.getServByCat(this.selectedCatID, reqheadserv.headers).subscribe(async res => {
          if (res.success === true) {
            const encryptedDataServ = res.data;  // Assuming encrypted data comes under 'data'
            const decryptedDataServ = JSON.parse(this.encryption.decodeData(encryptedDataServ, await keyserv));
            this.sortedServList = decryptedDataServ
          }
        })
        // this.getServbyCat(this.selectedCatID)
      }
      else {
        this.note_service.showError(`${res.status} : ${res.error.message}`, '')
      }
    })
  }

  onDelServ() {
    this.sortedServList = [];
    this.serviceForm.value.status = "In-Active";
    const value = this.serviceForm.value;
    let req = { data: this.encryption.encodeJsonObjectToHex(value) }
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.srvc_Cat.updateServ(req, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.note_service.showSuccess(`${200}`, 'Service Removed Successfully')
        this.serviceForm.reset();
        this.isAddService = !this.isAddService;
        let reqheadserv = this.encryption.createHeader();
        const keyserv = this.encryption.generateKey(reqheadserv.key)
        this.srvc_Cat.getServByCat(this.selectedCatID, reqheadserv.headers).subscribe(async res => {
          if (res.success === true) {
            const encryptedDataServ = res.data;  // Assuming encrypted data comes under 'data'
            const decryptedDataServ = JSON.parse(this.encryption.decodeData(encryptedDataServ, await keyserv));
            this.sortedServList = decryptedDataServ
          }
        })
        // this.getServbyCat(this.selectedCatID)
      }
      else {
        this.note_service.showError(`${res.status} : ${res.error.message}`, '')
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
  taxCodes(e: any) {
    const tCode = e.target.value;
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.srvc_Cat.getTaxDetailsByTaxCode(tCode, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        console.log(decryptedData, 'tax')
        this.taxDetails = decryptedData;
        this.serviceForm.patchValue({ taxCode: decryptedData[0].this.taxDetails[0].taxCode });
        this.rate = this.taxDetails[0].rate;
      }
    })
  }

  back() {
    this.isItems = !this.isItems
  }

  private loadScripts(): void {
    (function ($) {
      "use strict";

      $('#side_menu_bar > ul > li.nav-item > a').removeClass("active");
      $('#side_menu_bar > ul > li.nav-item > a#li_total_items').addClass("active");
    })(jQuery);
  }


  downloadCSV() {
    this.csvData = [];
    let options
    console.log(this.selectedCatalogue, this.selectedCategory, 'cat')
    if (this.sortedServList.length > 0) {
      this.sortedServList.map((csv: any) => {
        console.log(csv, '87688')
        let Obj: any = {};
        if (this.selectedCatalogue === "SMB Catalogue") {
          Obj['categoryName'] = csv.category
          Obj['serviceCode'] = csv.serviceCode
          Obj['serviceName'] = csv.itemName
          Obj['description'] = csv.itemDescription
          this.csvData = [...this.csvData, Obj];
          options = {
            title: '', fieldSeparator: ',', quoteStrings: '"', decimalseparator: '.', showLabels: true, showTitle: true,
            headers: ['CATEGORY NAME', 'SERVICE CODE', 'SERVICE NAME', 'DESCRIPTION']
          };
        }
        else {
          console.log(csv, '86879')
          // Obj['distributorId'] = csv.distributorId
          // Obj['merchantId'] = csv.merchantId
          Obj['serviceCode'] = csv.serviceId
          Obj['serviceName'] = csv.serviceName
          Obj['shortServiceName'] = csv.shortServiceName
          Obj['description'] = csv.englishDescription
          // Obj['avgPrice'] = csv.avg
          Obj['status'] = csv.status

          this.csvData = [...this.csvData, Obj];

          options = {
            title: '', fieldSeparator: ',', quoteStrings: '"', decimalseparator: '.', showLabels: true, showTitle: true,
            headers: ['SERVICE ID', 'SERVICE NAME', 'SHORT SERVICE NAME', 'DESCRIPTION', 'STATUS']
          };
        }
      })
    }

    // const options = {
    //   title: '', fieldSeparator: ',', quoteStrings: '"', decimalseparator: '.', showLabels: true, showTitle: true,
    //   headers: ['no', 'item', 'itemcode', 'description', 'price', 'category']
    // };
    this.csvOptions = options;
    this.report_title = 'Service Catalogue';

    new AngularCsv(this.csvData, this.report_title, this.csvOptions);
    // new AngularCsv(this.csvData, 'service-catalogue', options);
  }
}


