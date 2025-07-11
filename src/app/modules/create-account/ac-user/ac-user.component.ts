import { HttpClient } from "@angular/common/http";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { CreateAcntService } from "src/app/services/create-acnt.service";
import { ServiceCatalogueService } from "src/app/services/service-catalogue.service";
import { AddressFormComponent } from "../reuseble-forms/address-form/address-form.component";
import { BankFormComponent } from "../reuseble-forms/bank-form/bank-form.component";
import { CardFormComponent } from "../reuseble-forms/card-form/card-form.component";
import { LicenceFormComponent } from "../reuseble-forms/licence-form/licence-form.component";
import { PersonalComponent } from "../reuseble-forms/personal/personal.component";
import { StaffFormComponent } from "../reuseble-forms/staff-form/staff-form.component";
import { BarServiceService } from "src/services/bar-service.service";
import { MerchantAgreementComponent } from "../reuseble-forms/merchant-agreement/merchant-agreement.component";
import { NotificationService } from "src/app/core/services/notification.service";
import { AngularCsv } from "angular7-csv/dist/Angular-csv";
import { SignatureEncryptionService } from "src/app/services/signature-encryption.service";
import { GatewayService } from "src/app/services/gateway.service";
export interface merchantdata {}
@Component({
  selector: "app-ac-user",
  templateUrl: "./ac-user.component.html",
  styleUrls: ["./ac-user.component.scss"],
})
export class AcUserComponent implements OnInit {
  @ViewChild(PersonalComponent) PersonalComponent: PersonalComponent;
  @ViewChild(CardFormComponent) CardFormComponent: CardFormComponent;
  @ViewChild(BankFormComponent) BankFormComponent: BankFormComponent;
  @ViewChild(AddressFormComponent) AddressFormComponent: AddressFormComponent;
  @ViewChild(LicenceFormComponent) LicenceFormComponent: LicenceFormComponent;
  @ViewChild(StaffFormComponent) StaffFormComponent: StaffFormComponent;
  @ViewChild(MerchantAgreementComponent)
  merchantAgreementComponent: MerchantAgreementComponent;
  itemsPerPage = 9; // Items per page
  currentPridPage = 1;
  currentMidPage = 1;
  currentTidPage = 1;
  isAddPrid: boolean = false;
  isDisableInput: any;
  tidFormData: any;
  typeOfCustomer: any;
  idProof: any;
  isShow: boolean = false;
  isMid: boolean = false;
  isTid: boolean = false;
  isMngr: boolean = false;
  isService: boolean = false;
  isAddMid: boolean = false;
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
  // isDisable: boolean = false;
  selectedCatName: any;
  selectedCat: any = "Select Service";
  merchantData: any;
  merServices: any = [];
  mngrdata: any;
  pridList: any = [];
  payrowId: any;
  salesId: any;
  distributorId: any;
  mid: any;
  pridData: any;
  // showEdit:any;
  midList: any = [];
  tidList: any = [];
  branchMngrList: any = [];
  services: any = [];
  adminList: any = [];
  selectedAdmin: any;
  selectedMngr: any;
  selectedStore: any;
  selectedStaff: any;
  storeMngrList: any = [];
  showDialog: boolean = false;
  dialogData: any = {};
  storeList: any = [
    // { "storeId": "STO100", "storeName": "Dominos", "adminName": "Supriya", "mngrID": "ADM100", "emailId": "supriya@gmail.com", "mobileNumber": "9876345098", "address": "Hyd", "emiratesId": "83719109", "status": "Active" },
    // { "storeId": "STO101", "storeName": "KFC", "adminName": "Khaja", "mngrID": "ADM100", "emailId": "khaja@gmail.com", "mobileNumber": "9876345098", "address": "Hyd", "emiratesId": "83719109", "status": "Active" }
  ];
  categoryList: any = [
    // { "Name": "Ministry of Economy", "catId": "600000003" },
    // { "Name": "Smart government services fee", "catId": "600000004" },
    // { "Name": "Police Department", "catId": "600000006" }
  ];
  tempData: any;
  csvData: any = [];
  public csvOptions: any = {};
  isEdit: boolean = false;
  isCreate: boolean = false;

  storeOwnerForm!: FormGroup;
  terminalIdForm!: FormGroup;
  mServiceForm: FormGroup;
  basicsForm!: FormGroup;
  branchManagerForm!: FormGroup;
  deliveryPOSForm!: FormGroup;
  staffPOSForm!: FormGroup;
  selectedFile: File | null = null;
  idForm: any;
  totalData: any;
  basic_step = false;
  selectedUser: any;
  userExist: boolean = false;
  // selectedCatName: any = '';
  selectedCats: any = [];
  cats: any = [];
  catItems: any = [];
  title: string;
  merchntObj: any = {};
  personal_step = false;
  address_step = false;
  busiType_step = false;
  card_step = false;
  license_step = false;
  business_step = false;
  staff_step = false;
  terms_step = false;
  education_step = false;
  step = 1;
  hr_Tag: boolean = false;
  isNbq: boolean = false;
  isNI: boolean = false;
  isAbudhabi: boolean = false;
  isMashreq: boolean = false;
  isOwner: boolean = false;
  isForm: boolean = false;
  isUser: boolean = false;
  isDevice: boolean = false;
  isMIDActive: boolean = false;
  isChecked: boolean = false;
  selected: any = "Select Bank";

  dropdownList: any = [];
  selectedItems: any = [];
  commercial: boolean = false;
  staffList: any = [];
  // merchantData: any = [];
  sData: any = [];
  emId: any;
  // storeList: any[] = []
  isStaff: boolean = false;
  price: any;
  personalChild: any = [];
  staffListA: any = [];
  merchantId: any = [];
  merchantType: any;
  requiredField: boolean = false;
  onCheckdData: any = [];
  managerId: any = "Select Manager";

  bankList: any = ["Mid Request Form", "OnBoarding Form", "Wps Form"];
  businesstypes: any = [];
  searchText: any;
  // [{ id: '61af6a88f568ecbd18117d4f', name: 'Home Supply WareHouse Stores' },
  // { id: '622904d5d18faf96e8fc0d70', name: 'Office & Commercial Furniture' },
  // { id: '', name: 'Travel Agencies, & Tour Operators' },
  // { id: '', name: 'Motor Vehicle Supplies & New Parts' },
  // { id: '', name: 'Jewelry Store' },
  // { id: '', name: 'Hardware Store' },
  // { id: '', name: 'Commercial Footwear' },
  // { id: '', name: 'Stationary Office Supplies & Printing' }]
  merchantList: any = [];
  @ViewChild("myNameElem") myNameElem: ElementRef;
  isPersonal: boolean = false;
  isBusiness: boolean = false;
  selectedacnt: string = "Select Account";
  errorMessage: String;
  captureData: any;
  exGrpId: any;
  prsnlAD: any;
  srvcData: any = [];

  dropdownSettings = {};
  selectCategory: any = [];
  shareHolderData: any[] = [];
  incomeSouceData: any[] = [];
  goodasData: any[] = [];
  ShareHolderForm: FormGroup;
  incomeSourceForm: FormGroup;
  userType: string;
  posUsersData: any[] = [];
  mainMer: boolean = false;
  posUserForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private createAcnt: CreateAcntService,
    private smbservc: BarServiceService,
    private note_Servce: NotificationService,
    private srvc_Cat: ServiceCatalogueService,
    private encryption: SignatureEncryptionService,
    private gatewayServ: GatewayService,
  ) {
    this.ShareHolderForm = this.fb.group({
      name: ["", Validators.required],
      sharesPer: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      nationality: ["", Validators.required],
      address: ["", Validators.required],
      mobileNumber: ["", Validators.required],
    });
    this.incomeSourceForm = this.fb.group({
      country: ["", Validators.required],
      activityDet: ["", Validators.required],
      incomeSource: ["", [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.getCategories();

    this.dropdownSettings = {
      singleSelection: false,
      idField: "item_id",
      textField: "item_text",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 1,
      allowSearchFilter: true,
    };
    // this.getMerchantsList();
    // this.getMerchants();
    this.getPrids();
    this.loadScripts();
    this.mServiceForm = new FormGroup({
      merchantId: new FormControl("", [Validators.required]),
      serviceId: new FormControl("", [Validators.required]),
    });
    this.posUserForm = this.fb.group({
      username: new FormControl("", Validators.required),
      PasswordHash: new FormControl("", Validators.required),
      posMerchantId: new FormControl("", Validators.required),
    });
    this.basicsForm = this.fb.group({
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      gender: new FormControl("", Validators.required),
      title: new FormControl("", Validators.required),
      //   merchantType: new FormControl('', Validators.required),
      emailId: [
        "",
        [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"),
        ],
      ],
      mobileNumber: new FormControl("", Validators.required),
      globalUserRole: "store owner",
      mSalesPersonId: new FormControl("", Validators.required),
      groupId: new FormControl(""),
      distributorId: new FormControl("did268167", Validators.required),
      merchantPIN: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("[0-9]{4}"),
        ]),
      ],
      confirmPIN: ["", Validators.required],
      dateOfBirth: new FormControl("", [Validators.required]),
      status: {
        status: new FormControl(""),
        stage: new FormControl(""),
      },
    });

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
      selectedBank: new FormControl(""),
    });
    this.terminalIdForm = this.fb.group({
      terminalId: [""],
      managerId: [""],
      payRowId: [""],
      mainMerchantId: [""],
      file: [""],
    });
    // this.terminalIdForm.valueChanges.subscribe(values => {
    // 	if (!this.ignoreChange) {
    // 		this.ignoreChange = true;
    // 		if (values.termainalId) {
    // 			console.log('data1')
    // 			this.terminalIdForm.get('file')?.disable();
    // 		} else if (values.file) {
    // 			console.log('data2')
    // 			this.terminalIdForm.get('terminalId')?.disable();
    // 			this.terminalIdForm.get('managerId')?.disable();
    // 		} else {
    // 			this.terminalIdForm.get('terminalId')?.enable();
    // 			this.terminalIdForm.get('managerId')?.enable();
    // 			this.terminalIdForm.get('file')?.enable();
    // 		}
    // 	}
    // });
    this.branchManagerForm = this.fb.group({
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", Validators.required),
      emiratesId: new FormControl("", [Validators.required]),
      mobileNumber: new FormControl("", [Validators.required]),
      staffRole: new FormControl("", Validators.required),
      emailId: new FormControl("", Validators.required),
      storeId: new FormControl("", [Validators.required]),
      gender: new FormControl("", Validators.required),
      title: new FormControl("", Validators.required),
      ReportingUserId: new FormControl("", Validators.required),
      salesPersonId: new FormControl(""),
      eIDoc: this.fb.group({
        documentType: new FormControl("emiratesDocument"),
        documentTitle: new FormControl("Emirates Document"),
        documentExpiry: new FormControl("", Validators.required),
        // documentNumber: new FormControl("",Validators.required)
      }),
      passportDoc: this.fb.group({
        documentType: new FormControl("passportDocument"),
        documentTitle: new FormControl("Passport Document"),
        documentExpiry: new FormControl("", Validators.required),
        documentNumber: new FormControl("", Validators.required),
      }),
      visaDoc: this.fb.group({
        documentType: new FormControl("visaDocument"),
        documentTitle: new FormControl("Visa Document"),
        documentExpiry: new FormControl("", Validators.required),
        documentNumber: new FormControl("", Validators.required),
      }),
      emiratesDocument: new FormControl("", [Validators.required]),
      passportDocument: new FormControl("", [Validators.required]),
      visaDocument: new FormControl("", [Validators.required]),
      staffPIN: new FormControl("", [Validators.required]),
      confirmPIN: new FormControl("", [Validators.required]),
    });
  }

  private loadScripts(): void {
    (function ($) {
      "use strict";
      $("#side_menu_bar > ul > li.nav-item > a").removeClass("active");
      $("#side_menu_bar > ul > li.nav-item > a#li_create_account").addClass(
        "active",
      );
    })(jQuery);
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
  //new code
  onAddPridAction() {
    this.pridData = [];
    this.isAddPrid = !this.isAddPrid;
  }
  onEditPridAcrion(id: any) {
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key);
    this.createAcnt.getPridbyId(id, reqhead.headers).subscribe(async (res) => {
      if (res.success === true) {
        const encryptedData = res.data; // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(
          this.encryption.decodeData(encryptedData, await key),
        );
        this.pridData = decryptedData;
        this.typeOfCustomer = this.pridData[0].typeOfCustomer;
        this.isAddPrid = !this.isAddPrid;
      }
    });
  }
  backToPrIdList() {
    this.isAddPrid = !this.isAddPrid;
    this.typeOfCustomer = "";
    this.idProof = "";
    this.getPrids();
  }
  onSelMerchantType(e: any) {
    this.typeOfCustomer = e.target.value;
    console.log(this.typeOfCustomer);
  }
  onMidDetails() {
    this.isMid = !this.isMid;
  }
  onTidList() {
    this.isTid = !this.isTid;
  }
  onMngrList() {
    this.isMngr = !this.isMngr;
  }
  onServList(mid: any) {
    this.isService = !this.isService;
    this.mid = mid;
    this.merchantList.map((m: any) => {
      if (m.mainMerchantId == mid) {
        this.merchantData = m;
      }
    });
    this.getServicesbyMid(mid);
  }
  backtoMid() {
    this.isService = !this.isService;
  }
  onCreateMidAction() {
    this.isAddMid = !this.isAddMid;
    this.merchantData = [];
    // this.storeOwnerForm.reset();
  }
  backtoMidList() {
    this.isAddMid = !this.isAddMid;
    this.getMidbyPrid(this.payrowId);
  }
  onEditMidAction(id: any) {
    this.merchantData = [];
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key);
    this.createAcnt.getMerbyid(id, reqhead.headers).subscribe(async (res) => {
      if (res.success === true) {
        const encryptedData = res.data; // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(
          this.encryption.decodeData(encryptedData, await key),
        );
        this.merchantData = decryptedData[0];
        console.log(this.merchantData);
        this.getDetails();
        this.isAddMid = !this.isAddMid;
      }
    });
  }
  onCreateMngrAction() {
    this.isAddMngr = !this.isAddMngr;
  }
  onCreateStoreMngr() {
    this.isStoreMngr = !this.isStoreMngr;
  }
  onAddStoreAction() {
    this.isAddStore = !this.isAddStore;
  }
  onAddAdmin() {
    this.isAddAdmin = !this.isAddAdmin;
  }
  OnSelMngr(e: any) {
    this.managerId = e.target.value;
  }
  ongetAgreement() {
    this.isagreement = true;
  }
  onUpdateStoreMngr(id: any) {
    this.adminList.map((d: any) => {
      if (d.adminId == id) {
        this.mngrdata = d;
      }
    });
  }
  onCreateStore() {
    this.isAddStore = !this.isAddStore;
  }
  onUpdateStore(id: any) {}
  onAddStaff() {
    this.isAddStaff = !this.isAddStaff;
  }
  getPrids() {
    this.pridList = [];
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key);
    this.createAcnt.getPrid(reqhead.headers).subscribe(async (response) => {
      if (response.success === true) {
        const encryptedData = response.data; // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(
          this.encryption.decodeData(encryptedData, await key),
        );

        let reqheadtrans = this.encryption.createHeader();
        const keytrans = this.encryption.generateKey(reqheadtrans.key);

        this.createAcnt
          .getTransValuebyPrid(reqheadtrans.headers)
          .subscribe(async (tData) => {
            if (tData.success === true) {
              const encryptedDatatrans = tData.data; // Assuming encrypted data comes under 'data'
              const decryptedDatatrans = JSON.parse(
                this.encryption.decodeData(encryptedDatatrans, await keytrans),
              );
              decryptedData.map((d: any) => {
                d.transValue = 0;
                decryptedDatatrans.map((t: any) => {
                  console.log(t._id, d.payRowId);
                  if (t._id == d.payRowId) {
                    d.transValue = t.transValue;
                  }
                });
                console.log(d);
                this.pridList.push(d);
              });
            }
          });
      }
      // this.pridList = data.data;
    });
  }
  getPagePrid(): any[] {
    const startIndex = (this.currentPridPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.pridList.slice(startIndex, endIndex);
  }
  getPageMid(): any[] {
    const startIndex = (this.currentMidPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.merchantList.slice(startIndex, endIndex);
  }
  getPageTid(): any[] {
    const startIndex = (this.currentTidPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.tidList.slice(startIndex, endIndex);
  }
  // Method to handle page change
  onPridPageChange(page: number) {
    this.currentPridPage = page;
  }
  onMidPageChange(page: number) {
    this.currentMidPage = page;
  }
  onTidPageChange(page: number) {
    this.currentTidPage = page;
  }

  merMastersList(mid: any) {
    this.posUsersData = [];
    this.mid = mid;
    this.userType = "";
    this.mainMer = true;
    this.userType = "PosUser";
    console.log("main", this.mid);
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key);
    this.gatewayServ
      .getposUserbyID(this.mid, reqhead.headers)
      .subscribe(async (res) => {
        if (res.success === true) {
          const encryptedData = res.data; // Assuming encrypted data comes under 'data'
          const decryptedData = JSON.parse(
            this.encryption.decodeData(encryptedData, await key),
          );
          this.posUsersData = decryptedData;
        }
      });
  }
  getposUserByID(id: any) {
    this.tempData = [];
    this.isEdit = false;
    this.isCreate = false;
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key);
    this.gatewayServ
      .getposUserbyID(id, reqhead.headers)
      .subscribe(async (res) => {
        if (res.success === true) {
          const encryptedData = res.data; // Assuming encrypted data comes under 'data'
          const decryptedData = JSON.parse(
            this.encryption.decodeData(encryptedData, await key),
          );
          console.log("res", decryptedData);
          this.tempData = decryptedData;
          this.posUserForm.patchValue(decryptedData[0]);
          this.posUserForm.disable();
        }
      });
  }
  resetForm() {
    this.isEdit = false;
    this.isCreate = true;
    this.posUserForm.enable();
    this.posUserForm.reset();
    this.posUserForm.patchValue({ posMerchantId: this.mid });
  }
  edit() {
    this.isEdit = true;
    this.posUserForm.enable();
  }
  createPosUser() {
    const value = this.posUserForm.value;
    let req = { data: this.encryption.encodeJsonObjectToHex(value) };
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key);
    this.gatewayServ
      .createposUser(req, reqhead.headers)
      .subscribe(async (res) => {
        if (res.success === true) {
          const encryptedData = res.data; // Assuming encrypted data comes under 'data'
          const decryptedData = JSON.parse(
            this.encryption.decodeData(encryptedData, await key),
          );
          this.merMastersList(this.mid);
          this.note_Servce.showSuccess(`200 - ${res.message}`, "");
        } else {
          this.note_Servce.showError(`${res.message}`, "");
        }
        // console.log('master', decryptedData);
      });
  }
  updateUser() {
    const value = this.posUserForm.value;
    console.log(value);
    let req = { data: this.encryption.encodeJsonObjectToHex(value) };
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key);
    this.gatewayServ
      .updateposUserByID(req, this.tempData[0]._id, reqhead.headers)
      .subscribe(async (res) => {
        if (res.success === true) {
          const encryptedData = res.data; // Assuming encrypted data comes under 'data'
          const decryptedData = JSON.parse(
            this.encryption.decodeData(encryptedData, await key),
          );
          this.merMastersList(this.mid);
          this.note_Servce.showSuccess(`200 - ${res.message}`, "");
        } else {
          this.note_Servce.showError(`${res.message}`, "");
        }
      });
  }
  back() {
    this.mainMer = false;
    this.mid = "";
  }

  createMerchant() {
    // this.storeOwnerForm.value.licenseDetails._id = null
    let value = this.storeOwnerForm.value.licenseDetails;
    let fdata = new FormData();
    if (this.merchantData != null) {
      value._id = this.merchantData._id;
      // fdata.append("_id", this.merchantData._id);
      // fdata.append("status", "Active");
    } else {
      value.status = "Ongoing";
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
    console.log(this.payrowId, this.distributorId, this.salesId);

    fdata.append("companyLogo", value.companyLogo);
    fdata.append("ecDocument", value.ecDocument);
    fdata.append("licenseDocument", value.licenseDocument);
    value.companyLogo = "";
    value.ecDocument = "";
    value.licenseDocument = "";
    fdata.append("data", this.encryption.encodeJsonObjectToHex(value));
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key);
    this.createAcnt
      .createMerchant(fdata, reqhead.headers)
      .subscribe(async (res) => {
        if (res.success === true) {
          const encryptedData = res.data; // Assuming encrypted data comes under 'data'
          const decryptedData = JSON.parse(
            this.encryption.decodeData(encryptedData, await key),
          );
          this.merchantData = decryptedData;
          // console.log(data.data);
          this.note_Servce.showSuccess(`200 - ${res.message}`, "");
        } else {
          this.note_Servce.showError(`${res.message}`, "");
        }
        this.getDetails();
      });
  }

  // getMerchants() {
  // 	this.createAcnt.getAllMerchants().subscribe(data => {
  // 		this.merchantList = data.data;
  // 	})
  // }
  getMidbyPrid(prid: any) {
    let tData: any;
    this.merchantList = [];
    this.pridData = [];
    this.payrowId = prid;
    this.isMid = !this.isMid;

    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key);
    this.createAcnt
      .getPridbyId(prid, reqhead.headers)
      .subscribe(async (res) => {
        if (res.success === true) {
          const encryptedData = res.data; // Assuming encrypted data comes under 'data'
          const decryptedData = JSON.parse(
            this.encryption.decodeData(encryptedData, await key),
          );
          this.pridData = decryptedData[0];
          this.typeOfCustomer = this.pridData.typeOfCustomer;
          this.salesId = this.pridData.salesId;
          this.distributorId = this.pridData.distributorId;
          console.log(this.salesId, this.distributorId);
        }
      });
    let reqheadmid = this.encryption.createHeader();
    const keymid = this.encryption.generateKey(reqheadmid.key);
    this.createAcnt
      .getMerchantsbyPrid(prid, reqheadmid.headers)
      .subscribe(async (res) => {
        if (res.success === true) {
          const encryptedDatamid = res.data; // Assuming encrypted data comes under 'data'
          const decryptedDatamid = JSON.parse(
            this.encryption.decodeData(encryptedDatamid, await keymid),
          );

          let reqheadtrans = this.encryption.createHeader();
          const keytrans = this.encryption.generateKey(reqheadtrans.key);

          this.createAcnt
            .getTransValuebyMid(reqheadtrans.headers)
            .subscribe(async (tData) => {
              if (tData.success === true) {
                const encryptedDatatrans = tData.data; // Assuming encrypted data comes under 'data'
                const decryptedDatatrans = JSON.parse(
                  this.encryption.decodeData(
                    encryptedDatatrans,
                    await keytrans,
                  ),
                );
                console.log(tData);
                // tData = tData.data;
                // console.log(tData, 'tData');
                decryptedDatamid.map((mer: any) => {
                  mer.transvalue = 0;
                  if (
                    !mer.mainMerchantId ||
                    mer.mainMerchantId == "" ||
                    mer.mainMerchantId == null
                  ) {
                    mer.disable = true;
                    this.merchantList.push(mer);
                  } else {
                    Promise.all([
                      decryptedDatatrans.map((t: any) => {
                        if (t._id == mer.mainMerchantId) {
                          mer.transvalue = t.transValue;
                        }
                      }),
                    ]).then(() => {
                      mer.disable = false;
                      this.merchantList.push(mer);
                    });
                  }
                  // data.data.map((t:any)=>{
                  // 	if(){}
                  // })
                });
              }
            });
        }
        // this.merchantData = this.merchantList[0]
        console.log(this.merchantList, "mmmmmmmmmmmm");
        // this.merchantList = data.data;
        // this.merchantData = this.merchantList[1];
        this.getCategories();
        // this.getDetails();
        // this.getDetails();
        console.log(this.pridData);
      });
  }

  updateBankDetails() {
    let id = this.merchantData._id;
    const value = {
      bankDetails: this.storeOwnerForm.value.bankDetails,
      stage: "bank details",
      _id: id,
    };
    let req = { data: this.encryption.encodeJsonObjectToHex(value) };
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key);
    this.createAcnt
      .updateMerchant(req, reqhead.headers)
      .subscribe(async (res) => {
        if (res.success === true) {
          const encryptedData = res.data; // Assuming encrypted data comes under 'data'
          const decryptedData = JSON.parse(
            this.encryption.decodeData(encryptedData, await key),
          );
          // console.log(data.data);
          this.merchantData = decryptedData;
          this.getDetails();
          this.note_Servce.showSuccess(
            `200 - 'Bank Details added successfully'`,
            "",
          );
        } else {
          this.note_Servce.showError(`${res.message}`, "");
        }
      });
  }
  createAdmin() {
    this.selectedAdmin = {};
    let id = this.merchantData._id;
    console.log(this.storeOwnerForm.value.adminDetails, "adminvalue");
    let val = this.storeOwnerForm.value.adminDetails;
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
      adminDetails: val,
      stage: "admin Details",
      _id: id,
    };
    value.adminDetails.status = "Active";
    fdata.append("adminEmiratesDoc", val.adminEmiratesDoc);
    value.adminDetails.adminEmiratesDoc = "";
    fdata.append("data", this.encryption.encodeJsonObjectToHex(value));
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key);
    this.createAcnt
      .updateMerchant(fdata, reqhead.headers)
      .subscribe(async (res) => {
        if (res.success === true) {
          const encryptedData = res.data; // Assuming encrypted data comes under 'data'
          const decryptedData = JSON.parse(
            this.encryption.decodeData(encryptedData, await key),
          );
          console.log("2836198", decryptedData);
          this.isAddAdmin = !this.isAddAdmin;
          this.merchantData = decryptedData;
          this.getDetails();
          this.storeOwnerForm.get("adminDetails")?.reset();
          this.note_Servce.showSuccess(
            `200 - 'Admin Created successfully'`,
            "",
          );
        } else {
          this.note_Servce.showError(`${res.message}`, "");
        }
      });
  }
  onUpdateAdminAction(adminId: any) {
    this.adminList.map((admn: any) => {
      if (admn.adminId == adminId) {
        console.log(admn);
        this.isupdateAdmin = !this.isupdateAdmin;
        this.selectedAdmin = admn;
        this.storeOwnerForm.get("adminDetails")?.setValue(this.selectedAdmin);
      }
    });
  }
  updateAdmin() {
    let id = this.merchantData._id;
    let val = this.storeOwnerForm.value.adminDetails;
    let fdata = new FormData();
    console.log("val", val);
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
      adminDetails: this.storeOwnerForm.value.adminDetails,
      stage: "admin Details",
      _id: id,
    };
    value.adminDetails.adminEmiratesDoc = "";
    fdata.append("adminEmiratesDoc", val.adminEmiratesDoc);
    fdata.append("data", this.encryption.encodeJsonObjectToHex(value));
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key);
    this.createAcnt
      .updateMerchant(fdata, reqhead.headers)
      .subscribe(async (res) => {
        if (res.success === true) {
          const encryptedData = res.data; // Assuming encrypted data comes under 'data'
          const decryptedData = JSON.parse(
            this.encryption.decodeData(encryptedData, await key),
          );
          this.merchantData = decryptedData;
          this.isupdateAdmin = !this.isupdateAdmin;
          this.getDetails();
          this.selectedAdmin = {};
          this.storeOwnerForm.get("adminDetails")?.reset();
          this.note_Servce.showSuccess(
            `200 - 'Admin updated successfully'`,
            "",
          );
        } else {
          this.note_Servce.showError(`${res.message}`, "");
        }
      });
  }
  backtoAdminList() {
    this.isupdateAdmin = false;
    this.isAddAdmin = false;
    this.storeOwnerForm.get("adminDetails")?.reset();
    this.selectedAdmin = {};
  }
  createManager() {
    this.selectedMngr = {};
    let id = this.merchantData._id;
    let val = this.storeOwnerForm.value.storeManagerDetails;
    delete val._id;
    let fdata = new FormData();
    console.log("val", val);
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
      storeManagerDetails: val,
      stage: "manager details",
      _id: id,
    };
    value.storeManagerDetails.status = "Active";
    fdata.append("mngrEmiratesDocument", val.mngrEmiratesDocument);
    value.storeManagerDetails.mngrEmiratesDocument = "";
    fdata.append("data", this.encryption.encodeJsonObjectToHex(value));
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key);
    this.createAcnt
      .updateMerchant(fdata, reqhead.headers)
      .subscribe(async (res) => {
        if (res.success === true) {
          const encryptedData = res.data; // Assuming encrypted data comes under 'data'
          const decryptedData = JSON.parse(
            this.encryption.decodeData(encryptedData, await key),
          );
          this.isStoreMngr = !this.isStoreMngr;
          this.merchantData = decryptedData;
          this.storeOwnerForm.get("storeManagerDetails")?.reset();
          this.getDetails();
          this.note_Servce.showSuccess(
            `200 - 'Manager Created successfully'`,
            "",
          );
        } else {
          this.note_Servce.showError(`${res.message}`, "");
        }
      });
  }
  onUpdateMngrAction(managerId: any) {
    this.storeMngrList.map((mngr: any) => {
      if (mngr.managerId == managerId) {
        console.log(mngr);
        this.isupdateMngr = !this.isupdateMngr;
        this.selectedMngr = mngr;
        this.storeOwnerForm
          .get("storeManagerDetails")
          ?.setValue(this.selectedMngr);
      }
    });
  }
  updateMngr() {
    let id = this.merchantData._id;
    let val = this.storeOwnerForm.value.storeManagerDetails;
    // val._id = this.selectedMngr._id;
    // console.log(val);
    let fdata = new FormData();
    console.log("val", val);
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
      storeManagerDetails: val,
      stage: "manager details",
      _id: id,
    };
    fdata.append("mngrEmiratesDocument", val.mngrEmiratesDocument);
    value.storeManagerDetails.mngrEmiratesDocument = "";
    fdata.append("data", this.encryption.encodeJsonObjectToHex(value));
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key);
    this.createAcnt
      .updateMerchant(fdata, reqhead.headers)
      .subscribe(async (res) => {
        if (res.success === true) {
          const encryptedData = res.data; // Assuming encrypted data comes under 'data'
          const decryptedData = JSON.parse(
            this.encryption.decodeData(encryptedData, await key),
          );
          this.merchantData = decryptedData;
          this.isupdateMngr = !this.isupdateMngr;
          this.getDetails();
          this.selectedMngr = {};
          this.storeOwnerForm.get("storeManagerDetails")?.reset();
          this.note_Servce.showSuccess(
            `200 - 'Manager Updated successfully'`,
            "",
          );
        } else {
          this.note_Servce.showError(`${res.message}`, "");
        }
      });
  }
  backtoMngrList() {
    this.isupdateMngr = false;
    this.isStoreMngr = false;
    this.storeOwnerForm.get("storeManagerDetails")?.reset();
    this.selectedMngr = {};
  }
  createStore() {
    this.selectedStore = {};
    let id = this.merchantData._id;
    let val = this.storeOwnerForm.value.addressDetails;
    delete val._id;
    console.log("store", this.storeOwnerForm.value.addressDetails);
    const value = {
      storeDetails: val,
      stage: "store details",
      _id: id,
    };
    let req = { data: this.encryption.encodeJsonObjectToHex(value) };
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key);
    this.createAcnt
      .updateMerchant(req, reqhead.headers)
      .subscribe(async (res) => {
        if (res.success === true) {
          const encryptedData = res.data; // Assuming encrypted data comes under 'data'
          const decryptedData = JSON.parse(
            this.encryption.decodeData(encryptedData, await key),
          );
          this.isAddStore = !this.isAddStore;
          this.merchantData = decryptedData;
          this.storeOwnerForm.get("addressDetails")?.reset();
          this.getDetails();
          this.note_Servce.showSuccess(
            `200 - 'Store Created successfully'`,
            "",
          );
        } else {
          this.note_Servce.showError(`${res.message}`, "");
        }
      });
  }
  onUpdateStoreAction(storeId: any) {
    this.storeList.map((store: any) => {
      if (store.storeId == storeId) {
        console.log(store);
        this.selectedStore = store;
        this.storeOwnerForm.get("addressDetails")?.setValue(this.selectedStore);
        this.isupdateStore = !this.isupdateStore;
      }
    });
  }
  updateStore() {
    let id = this.merchantData._id;
    // let val = this.storeOwnerForm.value.addressDetails;
    // val._id = this.selectedStore._id;
    // console.log(val);
    const value = {
      storeDetails: this.storeOwnerForm.value.addressDetails,
      stage: "store details",
      _id: id,
    };
    let req = { data: this.encryption.encodeJsonObjectToHex(value) };
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key);
    this.createAcnt
      .updateMerchant(req, reqhead.headers)
      .subscribe(async (res) => {
        if (res.success === true) {
          const encryptedData = res.data; // Assuming encrypted data comes under 'data'
          const decryptedData = JSON.parse(
            this.encryption.decodeData(encryptedData, await key),
          );
          this.merchantData = decryptedData;
          this.isupdateStore = !this.isupdateStore;
          this.getDetails();
          this.selectedStore = {};
          this.storeOwnerForm.get("addressDetails")?.reset();
          this.note_Servce.showSuccess(
            `200 - 'Store updated successfully'`,
            "",
          );
        } else {
          this.note_Servce.showError(`${res.message}`, "");
        }
      });
  }
  backtoStoreList() {
    this.isupdateStore = false;
    this.isAddStore = false;
    this.storeOwnerForm.get("addressDetails")?.reset();
    this.selectedStore = {};
  }
  businessDetails() {
    let id = this.merchantData._id;
    const value = {
      businessDetails: this.storeOwnerForm.value.businessDetails,
      stage: "business details",
      _id: id,
    };
    let req = { data: this.encryption.encodeJsonObjectToHex(value) };
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key);
    this.createAcnt
      .updateMerchant(req, reqhead.headers)
      .subscribe(async (res) => {
        if (res.success === true) {
          const encryptedData = res.data; // Assuming encrypted data comes under 'data'
          const decryptedData = JSON.parse(
            this.encryption.decodeData(encryptedData, await key),
          );
          this.merchantData = decryptedData;
          this.getDetails();
          this.note_Servce.showSuccess(
            `200 - 'Business details added successfully'`,
            "",
          );
        } else {
          this.note_Servce.showError(`${res.message}`, "");
        }
        // this.merchantData = data.data;
      });
  }
  createStaff() {
    this.selectedStaff = {};
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
      staffDetails: val,
      stage: "staff details",
      _id: id,
    };
    value.staffDetails.status = "Active";
    // console.log(value, 'vvvvvvvvvv')
    fdata.append("staffEmiratesDocument", val.staffEmiratesDocument);
    value.staffDetails.staffEmiratesDocument = "";
    fdata.append("data", this.encryption.encodeJsonObjectToHex(value));
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key);
    this.createAcnt
      .updateMerchant(fdata, reqhead.headers)
      .subscribe(async (res) => {
        if (res.success === true) {
          const encryptedData = res.data; // Assuming encrypted data comes under 'data'
          const decryptedData = JSON.parse(
            this.encryption.decodeData(encryptedData, await key),
          );
          this.isAddStaff = !this.isAddStaff;
          this.merchantData = decryptedData;
          this.storeOwnerForm.get("staffDetails")?.reset();
          this.getDetails();
          this.note_Servce.showSuccess(
            `200 - 'Staff created successfully'`,
            "",
          );
        } else {
          this.note_Servce.showError(`${res.message}`, "");
        }
      });
  }
  onUpdateStaffAction(staffId: any) {
    this.staffList.map((staff: any) => {
      if (staff.staffId == staffId) {
        console.log(staff);
        this.selectedStaff = staff;
        this.storeOwnerForm.get("staffDetails")?.setValue(this.selectedStaff);
        this.isupdateStaff = !this.isupdateStaff;
      }
    });
  }
  updateStaff() {
    let id = this.merchantData._id;
    let val = this.storeOwnerForm.value.staffDetails;
    console.log("val", this.storeOwnerForm.value.staffDetails);
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
      staffDetails: this.storeOwnerForm.value.staffDetails,
      stage: "staff details",
      _id: id,
    };
    fdata.append(
      "staffEmiratesDocument",
      this.storeOwnerForm.value.staffDetails.get("staffEmiratesDocument").value,
    );
    value.staffDetails.staffEmiratesDocument = "";
    fdata.append("data", this.encryption.encodeJsonObjectToHex(value));
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key);
    this.createAcnt
      .updateMerchant(fdata, reqhead.headers)
      .subscribe(async (res) => {
        if (res.success === true) {
          const encryptedData = res.data; // Assuming encrypted data comes under 'data'
          const decryptedData = JSON.parse(
            this.encryption.decodeData(encryptedData, await key),
          );
          this.selectedStaff = {};
          this.merchantData = decryptedData;
          this.isupdateStaff = !this.isupdateStaff;
          this.getDetails();
          this.storeOwnerForm.get("staffDetails")?.reset();
          this.merchantAgreementComponent.reset();
          this.note_Servce.showSuccess(
            `200 - 'Staff updated successfully'`,
            "",
          );
        } else {
          this.note_Servce.showError(`${res.message}`, "");
        }
      });
  }
  backtoStaffList() {
    this.isupdateStaff = false;
    this.isAddStore = false;
    this.storeOwnerForm.get("staffDetails")?.reset();
    this.selectedStaff = {};
  }
  getDetails() {
    this.adminList = this.merchantData.adminDetails;
    this.storeMngrList = this.merchantData.storeManagerDetails;
    this.storeList = this.merchantData.storeDetails;
    this.staffList = this.merchantData.staffDetails;

    // console.log(this.basicsForm.value);
    console.log(this.storeOwnerForm.value, "formValue");
  }
  getTidbyMidList(mid: any) {
    this.mid = mid;
    this.isTid = true;
    this.tidList = [];
    this.merchantList.map((m: any) => {
      if (m.mainMerchantId == mid) {
        this.merchantData = m;
        this.storeMngrList = m.storeManagerDetails;
      }
    });
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key);
    this.createAcnt.getTidList(mid, reqhead.headers).subscribe(async (res) => {
      if (res.success) {
        const encryptedData = res.data; // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(
          this.encryption.decodeData(encryptedData, await key),
        );
        let reqheadtrans = this.encryption.createHeader();
        const keytrans = this.encryption.generateKey(reqheadtrans.key);

        this.createAcnt
          .getTransValuebyTid(reqheadtrans.headers)
          .subscribe(async (tData) => {
            if (tData.success === true) {
              const encryptedDatatrans = tData.data; // Assuming encrypted data comes under 'data'
              const decryptedDatatrans = JSON.parse(
                this.encryption.decodeData(encryptedDatatrans, await keytrans),
              );
              decryptedData.map((d: any) => {
                d.transValue = 0;
                decryptedDatatrans.map((t: any) => {
                  console.log(t._id, d.terminalId);
                  if (t._id == d.terminalId) {
                    d.transValue = t.transValue;
                  }
                });
                // console.log(d)
                this.tidList.push(d);
              });
            }
          });
        // this.tidList = data.data;
      }
    });
  }
  createTid() {
    if (this.isDisableInput == "text") {
      this.terminalIdForm.value.payRowId = this.payrowId;
      this.terminalIdForm.value.mainMerchantId = this.mid;
      const value = this.terminalIdForm.value;
      let req = { data: this.encryption.encodeJsonObjectToHex(value) };
      let reqhead = this.encryption.createHeader();
      const key = this.encryption.generateKey(reqhead.key);
      this.createAcnt
        .createTerminalId(req, reqhead.headers)
        .subscribe(async (res) => {
          if (res.success === true) {
            const encryptedData = res.data; // Assuming encrypted data comes under 'data'
            const decryptedData = JSON.parse(
              this.encryption.decodeData(encryptedData, await key),
            );
            this.getTidbyMidList(this.mid);
            // this.tidList = data.data;
            this.note_Servce.showSuccess(`200 - ${res.message}`, "");
          } else {
            this.note_Servce.showError(`${res.message}`, "");
          }
        });
    } else {
      console.log("test2");
      let reqhead = this.encryption.createHeader();
      const key = this.encryption.generateKey(reqhead.key);
      this.createAcnt
        .createTidbyFile(this.tidFormData, reqhead.headers)
        .subscribe(async (res) => {
          if (res.success === true) {
            const encryptedData = res.data; // Assuming encrypted data comes under 'data'
            const decryptedData = JSON.parse(
              this.encryption.decodeData(encryptedData, await key),
            );
            this.getTidbyMidList(this.mid);
            // this.tidList = data.data;
            this.note_Servce.showSuccess(`200 - ${res.message}`, "");
          } else {
            this.note_Servce.showError(`${res.error.message}`, "");
          }
        });
    }
  }
  onInputChange(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    console.log(inputValue);
    if (!inputValue || inputValue == null) {
      this.isDisableInput = "file";
      this.terminalIdForm.get("file")?.enable();
    } else {
      this.isDisableInput = "text";
      this.terminalIdForm.get("file")?.disable();
    }
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    console.log(this.selectedFile);
    if (this.selectedFile) {
      this.tidFormData = new FormData();
      this.tidFormData.append("excelFile", this.selectedFile);
      this.isDisableInput = "file";
      this.terminalIdForm.get("terminalId")?.disable();
      this.terminalIdForm.get("managerId")?.disable();
    } else {
      this.isDisableInput = "text";
      this.terminalIdForm.get("terminalId")?.enable();
      this.terminalIdForm.get("managerId")?.enable();
    }
  }
  getCategories() {
    let tmp: any = [];
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key);
    this.srvc_Cat.getCategories(reqhead.headers).subscribe(async (res) => {
      if (res.success) {
        const encryptedData = res.data; // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(
          this.encryption.decodeData(encryptedData, await key),
        );
        let number = 1;
        for (let i = 0; i < decryptedData.length; i++) {
          // if (data.data[i].catalogueType === 'Non-Government Catalogue') {
          tmp.push({
            item_id: i + 1,
            item_text: decryptedData[i].categoryName,
            catId: decryptedData[i].categoryId,
          });
          // }
        }
        this.categoryList = tmp;
        console.log(this.categoryList);
      } else {
      }
    });
  }
  getServbyCat(catId: any) {
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key);
    this.srvc_Cat
      .getServByCat(catId, reqhead.headers)
      .subscribe(async (res) => {
        if ((res.success = true)) {
          const encryptedData = res.data; // Assuming encrypted data comes under 'data'
          const decryptedData = JSON.parse(
            this.encryption.decodeData(encryptedData, await key),
          );
          decryptedData.map((d: any) => {
            let isMatched = false;
            Promise.all(
              this.merServices.map((m: any) => {
                if (m.serviceId === d.serviceId) {
                  isMatched = true;
                  d.isChecked = true;
                  d.unitPrice = 0;
                  this.services.push(d);
                }
              }),
            ).then(() => {
              if (isMatched === false) {
                d.unitPrice = 0;
                this.services.push(d);
              }
            });
          });
        }
      });
    console.log(this.services);
  }
  oneditClick(serviceId: any) {
    this.services.map((d: any) => {
      if (serviceId == d.serviceId) {
        d.showEdit = true;
        this.price = d.unitPrice;
      }
    });
  }
  oneditPrice(serviceId: any) {
    this.services.map((s: any) => {
      if (s.serviceId === serviceId) {
        s.showEdit = false;
        s.unitPrice = this.price;
        // this.price = 0;
      }
    });
  }
  addServtoMerchant() {
    this.onCheckdData.map((serv: any) => {
      // serv.mainMerchantId == this.mid;
      let req = { data: this.encryption.encodeJsonObjectToHex(serv) };
      let reqhead = this.encryption.createHeader();
      const key = this.encryption.generateKey(reqhead.key);
      this.createAcnt
        .addServtoMerchant(req, reqhead.headers)
        .subscribe(async (res) => {
          if (res.success == true) {
            const encryptedData = res.data; // Assuming encrypted data comes under 'data'
            const decryptedData = JSON.parse(
              this.encryption.decodeData(encryptedData, await key),
            );
            console.log("res");
            this.note_Servce.showSuccess(`200 - ${res.message}`, "");
          } else {
            this.note_Servce.showError(`${res.message}`, "");
          }
        });
    });
    this.getServicesbyMid(this.mid);
  }
  getServicesbyMid(mid: any) {
    this.mid = mid;
    this.merServices = [];
    this.userType = "";
    this.userType = "MerServices";
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key);
    this.createAcnt.getMerItems(reqhead.headers).subscribe(async (res) => {
      if (res.success == true) {
        const encryptedData = res.data; // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(
          this.encryption.decodeData(encryptedData, await key),
        );
        decryptedData.map((d: any) => {
          if (d.mainMerchantId == mid) {
            this.merServices.push(d);
          }
        });
      }
    });
  }
  getServDetails(id: any) {
    this.tempData = [];
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key);
    this.gatewayServ
      .getServofPosMerbyId(id, reqhead.headers)
      .subscribe(async (res) => {
        if (res.success === true) {
          const encryptedData = res.data; // Assuming encrypted data comes under 'data'
          const decryptedData = JSON.parse(
            this.encryption.decodeData(encryptedData, await key),
          );
          this.tempData = decryptedData;
        }
      });
  }
  delUser() {
    if (this.userType === "PosUser") {
      let reqhead = this.encryption.createHeader();
      const key = this.encryption.generateKey(reqhead.key);
      this.gatewayServ
        .delposUserbyID(this.tempData[0]._id, reqhead.headers)
        .subscribe(async (res) => {
          if (res.success === true) {
            this.merMastersList(this.mid);
            const encryptedData = res.data; // Assuming encrypted data comes under 'data'
            const decryptedData = JSON.parse(
              this.encryption.decodeData(encryptedData, await key),
            );
            this.note_Servce.showSuccess(`200 - ${res.message}`, "");
          } else {
            this.note_Servce.showError(`${res.message}`, "");
          }
        });
    }
    if (this.userType === "MerServices") {
      let reqhead = this.encryption.createHeader();
      this.gatewayServ
        .removeServFrmPosMer(this.tempData[0]._id, reqhead.headers)
        .subscribe(async (res) => {
          if (res.success === true) {
            this.getServicesbyMid(this.mid);
            this.note_Servce.showSuccess(`200 - ${res.message}`, "");
          } else {
            this.note_Servce.showError(`${res.message}`, "");
          }
        });
    }
  }
  // delUser() {
  // 	let reqhead = this.encryption.createHeader();
  // 	this.gatewayServ.removeServFrmPosMer(this.tempData[0]._id, reqhead.headers).subscribe(async res => {
  // 		if (res.success === true) {
  // 			this.getServicesbyMid(this.mid);
  // 			this.note_Servce.showSuccess(`200 - ${res.message}`, '')
  // 		} else {
  // 			this.note_Servce.showError(`${res.message}`, '')
  // 		}
  // 	})
  // }

  onSelectCat(item: any) {
    // this.services=[]
    const selectedOption = this.categoryList.find(
      (option: { item_id: any }) => option.item_id === item.item_id,
    );
    console.log(item, selectedOption, this.merchantData.bankDetails, "item");
    this.selectCategory = [];
    // this.onCheckdData = [];
    this.selectedCatName = item.item_text;
    this.selectedCat = selectedOption.catId;
    // this.getBusiTypes(this.selectedCat)
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key);
    this.srvc_Cat
      .getServByCat(this.selectedCat, reqhead.headers)
      .subscribe(async (res) => {
        let bankMerchantId: string;
        if (res.success == true) {
          const encryptedData = res.data; // Assuming encrypted data comes under 'data'
          const decryptedData = JSON.parse(
            this.encryption.decodeData(encryptedData, await key),
          );
          if (
            this.merchantData.bankDetails.length <= 0 ||
            this.merchantData.bankDetails.bankServiceId == null ||
            undefined
          ) {
            bankMerchantId = "";
          } else {
            bankMerchantId = this.merchantData.bankDetails.bankServiceId;
          }
          decryptedData.map((d: any) => {
            let isMatched = false;
            d["priceType"] = "AED";
            d["bankServiceId"] = bankMerchantId;
            d["merchantId"] = this.mid;
            d["mainMerchantId"] = this.mid;
            d["categoryName"] = this.selectedCatName;
            // d['isChecked'] = false;
            Promise.all(
              this.merServices.map((m: any) => {
                console.log(m.serviceId, d.serviceId, "match");
                if (m.serviceId === d.serviceId) {
                  isMatched = true;
                  d.isExist = true;
                  d.isChecked = true;
                  d.unitPrice = 0;
                  // console.log(d);
                  this.services.push(d);
                  // this.onCheckdData.push(d)
                }
              }),
            ).then(() => {
              if (isMatched === false) {
                d.unitPrice = 0;
                d.isChecked = false;
                this.services.push(d);
              }
            });
            // this.services.push(d);
            console.log(this.services, this.onCheckdData, "seee");
          });
          //   this.services = res.data;
        }
      });
  }
  onSelService(id: any) {
    console.log(id);
    let isMatched = false;
    this.services.map((s: any) => {
      if (s.serviceId === id) {
        console.log(s);
        if (this.onCheckdData.length > 0) {
          Promise.all(
            this.onCheckdData.map((d: any) => {
              console.log(d.serviceId, id, d.isChecked);
              if (d.serviceId === id && d.isChecked === true) {
                isMatched = true;
                this.onCheckdData = this.onCheckdData.filter(
                  (item: any) => item !== d,
                );
                // break;
                console.log(this.onCheckdData, "check1");
              }
            }),
          ).then(() => {
            if (isMatched === false) {
              console.log("1");
              s.isChecked = true;
              delete s._id;
              console.log("2=");
              this.onCheckdData.push(s);
              console.log("3");
              console.log(this.onCheckdData, "check2");
            }
          });
        } else {
          console.log("1");
          s.isChecked = true;
          delete s._id;
          console.log("2");
          this.onCheckdData.push(s);
          console.log("3");
          console.log(this.onCheckdData, "check2");
        }
        // this.services.delete(s)
      }
    });
  }
  onDeSelectAll(items: any) {
    console.log(items, "onDeSelectAll");
    this.services = [];
  }
  onSelectAll(items: any) {
    console.log("onSelectAll", items);
    this.services = [];
    // let allServices=[];
    items.map((item: any) => {
      const selectedOption = this.categoryList.find(
        (option: { item_id: any }) => option.item_id === item.item_id,
      );
      console.log(items, selectedOption, this.merchantData.bankDetails, "item");
      this.selectedCatName = item.item_text;
      this.selectedCat = selectedOption.catId;
      let reqhead = this.encryption.createHeader();
      const key = this.encryption.generateKey(reqhead.key);
      this.srvc_Cat
        .getServByCat(this.selectedCat, reqhead.headers)
        .subscribe(async (res) => {
          let bankMerchantId: string;
          if (res.success == true) {
            const encryptedData = res.data; // Assuming encrypted data comes under 'data'
            const decryptedData = JSON.parse(
              this.encryption.decodeData(encryptedData, await key),
            );
            if (
              this.merchantData.bankDetails.length <= 0 ||
              this.merchantData.bankDetails.bankServiceId == null ||
              undefined
            ) {
              bankMerchantId = "";
            } else {
              bankMerchantId = this.merchantData.bankDetails.bankServiceId;
            }
            decryptedData.map((d: any) => {
              let isMatched = false;
              d["priceType"] = "AED";
              d["bankServiceId"] = bankMerchantId;
              d["merchantId"] = this.mid;
              d["mainMerchantId"] = this.mid;
              d["categoryName"] = this.selectedCatName;
              // d['isChecked'] = false;
              Promise.all(
                this.merServices.map((m: any) => {
                  console.log(m.serviceId, d.serviceId, "match");
                  if (m.serviceId === d.serviceId) {
                    isMatched = true;
                    d.isExist = true;
                    d.isChecked = true;
                    d.unitPrice = 0;
                    // console.log(d);
                    this.services.push(d);
                    // this.onCheckdData.push(d)
                  }
                }),
              ).then(() => {
                if (isMatched === false) {
                  d.unitPrice = 0;
                  d.isChecked = false;
                  this.services.push(d);
                }
              });
              // this.services.push(d);
              console.log(this.services, this.onCheckdData, "seee");
            });
            //   this.services = res.data;
          }
        });
    });
  }
  pridListDownload() {
    console.log("report", this.pridList);
    this.csvData = [];
    if (this.pridList) {
      this.pridList.map((csv: any) => {
        let Obj: any = {};
        Obj["PayRow ID"] = csv.payRowId;
        Obj["Name"] = csv.firstName;
        Obj["Transaction Value"] = csv.transValue;
        Obj["Activation Date"] = csv.createdDate;
        Obj["Status"] = csv.status;
        this.csvData = [...this.csvData, Obj];
      });
    }
    const options = {
      title: "",
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalseparator: ".",
      showLabels: true,
      showTitle: true,
      headers: [
        "PayRow ID",
        "Name",
        "Transaction Value",
        "Activation Date",
        "Status",
      ],
    };
    this.csvOptions = options;
    new AngularCsv(this.csvData, "PayRow ID List", this.csvOptions);
  }
  MidListDownload() {
    console.log("report", this.merchantList);
    this.csvData = [];
    if (this.merchantList) {
      this.merchantList.map((csv: any) => {
        let Obj: any = {};
        Obj["Merchant ID"] = csv.mainMerchantId;
        Obj["Transaction Value"] = csv.transvalue;
        Obj["License Number"] = csv.licenseDetails.licenseNumber;
        Obj["Company Name"] = csv.licenseDetails.companyName;
        Obj["Activation Date"] = csv.joiningDate;
        Obj["Status"] = csv.status;
        this.csvData = [...this.csvData, Obj];
      });
    }
    const options = {
      title: "",
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalseparator: ".",
      showLabels: true,
      showTitle: true,
      headers: [
        "Merchant ID",
        "Transaction Value",
        "License Number",
        "Company Name",
        ,
        "Activation Date",
        "Status",
      ],
    };
    this.csvOptions = options;
    new AngularCsv(this.csvData, "Merchant List", this.csvOptions);
  }
  tidListDownload() {
    console.log("report", this.tidList);
    this.csvData = [];
    if (this.tidList) {
      this.tidList.map((csv: any) => {
        let Obj: any = {};
        Obj["Terminal ID"] = csv.terminalId;
        Obj["Manager ID"] = csv.managerId;
        Obj["Email ID"] = csv.emailId;
        Obj["Mobile Number"] = csv.mobileNumber;
        Obj["Transaction Value"] = csv.transValue;
        Obj["Activation Date"] = csv.createdDate;
        Obj["Status"] = csv.status;
        this.csvData = [...this.csvData, Obj];
      });
    }
    const options = {
      title: "",
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalseparator: ".",
      showLabels: true,
      showTitle: true,
      headers: [
        "Terminal Id",
        "Manager Id",
        "Email ID",
        "Mobile Number",
        "Transaction Value",
        "Activation Date",
        "Status",
      ],
    };
    this.csvOptions = options;
    new AngularCsv(this.csvData, "Terminal ID List", this.csvOptions);
  }
  openDialog(id: any): void {
    this.showDialog = true;
    this.dialogData = {};
    this.pridList.map((d: any) => {
      console.log(d.payRowId, id);
      if (d.payRowId == id) {
        // this.dialogData=d;
        this.dialogData = {
          header1: "Contact Details",
          subHeader11: "Email",
          content11: d.emailId ?? "",
          subHeader12: "Contact Number",
          content12: d.mobileNumber ?? "",
          subHeader13: "PayRow ID",
          content13: d.payRowId ?? "",
          header2: "Other Details",
          subHeader21: "Distributor ID",
          content21: d.distributorId ?? "",
          subHeader22: "Sales ID",
          content22: d.salesId ?? "",
          subHeader23: "Customer Type",
          content23: d.typeOfCustomer ?? "",
          header3: "",
          subHeader31: "",
          content31: "",
          subHeader32: "",
          content32: "",
        };
        // this.empForm.patchValue(d);
        // this.profileImg = `https://payrowdev.uaenorth.cloudapp.azure.com/adminbackend/distributor/download/${d.empImageId}`;
        // console.log(d.path, this.profileImg, 'image');
      }
    });
    console.log(this.dialogData);
  }
  openDialogMid(id: any): void {
    this.showDialog = true;
    this.dialogData = {};
    this.merchantList.map((d: any) => {
      if (d._id == id) {
        // this.dialogData=d;
        this.dialogData = {
          header1: "Merchant Details",
          subHeader11: "Main Merchant ID",
          content11:
            d.mainMerchantId !== undefined && d.mainMerchantId !== null
              ? d.mainMerchantId
              : "",
          subHeader12: "PayRow ID",
          content12:
            d.payRowId !== undefined && d.payRowId !== null ? d.payRowId : "",
          subHeader13: "",
          content13: "",
          header2: "Admin Details",
          subHeader21: "Admin ID",
          content21:
            d.adminDetails.length > 0 && d.adminDetails[0].adminId !== null
              ? d.adminDetails[0].adminId
              : "",
          subHeader22: "Admin Name",
          content22:
            d.adminDetails.length > 0 && d.adminDetails[0].adminName !== null
              ? d.adminDetails[0].adminName
              : "",
          subHeader23: "Admin Contact",
          content23:
            d.adminDetails.length > 0 && d.adminDetails[0].mobileNumber !== null
              ? d.adminDetails[0].mobileNumber
              : "",
          header3: "License Details",
          subHeader31: "License Number",
          content31:
            d.licenseDetails.licenseNumber !== undefined &&
            d.licenseDetails.licenseNumber !== null
              ? d.licenseDetails.licenseNumber
              : "",
          subHeader32: "Company Name",
          content32:
            d.licenseDetails.companyName !== undefined &&
            d.licenseDetails.companyName !== null
              ? d.licenseDetails.companyName
              : "",
        };
        // this.empForm.patchValue(d);
        // this.profileImg = `https://payrowdev.uaenorth.cloudapp.azure.com/adminbackend/distributor/download/${d.empImageId}`;
        // console.log(d.path, this.profileImg, 'image');
      }
    });
  }
  closeDialog(): void {
    this.showDialog = false;
  }
  // getPridbyid(prid:any){
  // 	this.createAcnt.getPridbyId(prid).subscribe(res=>{
  // 		this.pridData=res.data[0]
  // 	})
  // }

  //old code
  onSelMerchant(e: any) {
    this.merchantType = e.target.value;
  }
  onSelectBank(event: any) {
    // this.selected = this.storeOwnerForm.value.selectedBank;
    this.selected = event.target.value;
    this.isAbudhabi = false;
    this.isNI = false;
    this.isNbq = false;
    this.isMashreq = false;
    if (this.selected === "Wps Form") {
      this.isNbq = !this.isNbq;
    } else if (this.selected === "Mid Request Form") {
      this.isMashreq = !this.isMashreq;
    } else if (this.selected === "OnBoarding Form") {
      this.isNI = !this.isNI;
    } else {
      this.isAbudhabi = !this.isAbudhabi;
    }
  }
  onSelectAcnt(event: any) {
    this.selectedacnt = event.target.value;
    this.isBusiness = false;
    if (this.selectedacnt === "Business") {
      this.isBusiness = !this.isBusiness;
      // this.isPersonal = !this.isPersonal
    } else {
    }
  }

  getMerchantByID(id: any) {
    this.createAcnt.getMerchantById(id).subscribe((data) => {
      this.merchantData.push(data.data);
      this.router.navigate(["/risk"]);
    });
  }

  // serviceId: "",
  // serviceName: "",
  // shortServiceName: "",
  // categoryId: "",
  // categoryName: "",
  // serviceNameArabic: "",
  // unitPrice: "",
  // merchantId: "",
  // currency: "",
  // taxCode: "",
  // mainMerchantId: "",
  // bankServiceId: "",
  // englishDescription: "",
  // arabicDescription: "",
  // priceType: "",
  // taxApplicable: "",

  getId() {}
  addOwner() {
    this.isOwner = !this.isOwner;
  }
  // getMerchantsList() {
  // 	this.createAcnt.getMerchants().subscribe(data => {
  // 		this.merchantList = data.data;
  // 	})
  // }
  public number: number = 1;
  // getBusiTypes(serch: any) {
  // 	this.businesstypes = [];
  // 	// this.srvcData =[];
  // 	if (serch === 'SMB') {
  // 		this.srvc_Cat.getCategory().subscribe(data => {
  // 			this.businesstypes = data.data.map((itemData: any) => {
  // 				return { x: itemData.serviceName, y: itemData.serviceCode, z: itemData.serviceItems, id: this.number++ }
  // 			});
  // 		})
  // 	} else if (serch === 'Enterprise' || serch === 'Govt') {
  // 		this.srvc_Cat.getService().subscribe((data) => {
  // 			this.srvcData = data.data;
  // 			this.srvcData.map((s: any) => {
  // 				s.Selected = false;
  // 			})
  // 		})
  // 	}
  // }

  posDetailsFunc(id: any) {
    this.router.navigate(["/risk"], { queryParams: { id } });
  }
  addStore() {
    this.storeOwnerForm.value.addressDetails.storeAddress.addressTitle =
      "Default";
    this.storeOwnerForm.value.addressDetails.storeAddress.longitude = "123.23";
    const value = {
      storeDetails: this.storeOwnerForm.value.addressDetails,
      status: { status: "Ongoing", stage: "address details" },
    };
    let id = this.sData._id;
    this.createAcnt.updateMerchantPersonal(value, id).subscribe((data) => {
      if (data.success) {
        this.storeList = data.data.storeDetails;
        this.AddressFormComponent.addressForm.reset();

        this.note_Servce.showSuccess(`200 - ${data.message}`, "");
      } else {
        this.storeList = [];
        this.storeList.length = 0;
        this.note_Servce.showError(`${data.message}`, "");
      }
    });
  }
  addStaff() {
    this.storeOwnerForm.value.staffDetails.bankDetails = [
      this.storeOwnerForm.value.staffDetails.bankDetails,
    ];
    const value = {
      staffInfo: this.storeOwnerForm.value.staffDetails,
      status: { status: "Ongoing", stage: "staff details" },
    };

    let id = this.sData._id;
    this.createAcnt.updateMerchantPersonal(value, id).subscribe((data) => {
      if (data) {
        this.staffList = data.data.staffInfo;
        this.StaffFormComponent.staffForm.reset();
      }
    });
  }

  createOwner() {}
  onCreateTidAction() {
    this.terminalIdForm.reset();
    this.terminalIdForm.enable();
    // this.isOwner = !this.isOwner
    // this.userExist = false;
    // this.isUser=!this.isUser
  }
  staff() {
    this.isStaff = !this.isStaff;
    this.isMIDActive = !this.isMIDActive;
  }
  // back() {
  //   this.isUser = !this.isUser
  // }
  device() {
    this.isDevice = !this.isDevice;
    this.isMIDActive = !this.isMIDActive;
  }

  close() {}
  goBack() {
    this.isMIDActive = !this.isMIDActive;
  }
  service() {
    this.isService = !this.isService;
  }
  form() {
    this.isForm = !this.isForm;
  }
  servDetails() {
    this.isService = !this.isService;
  }
  onMerchantService() {}
  onChangeStatus(e: any, data: any) {
    const Obj = {
      status: e.target.value,
    };
    this.createAcnt.deActivateMerchant(data.bankMID, Obj).subscribe((data) => {
      if (data.succces === true) {
        alert("Status Updated Sucessfully");
      } else {
        alert("something went wrong");
      }
    });
  }
  details() {
    let id = "PRMID58";
    this.staffList = [];
    this.createAcnt.getMerchantById(id).subscribe((data) => {
      data.data.map((mData: any) => {
        mData.staffInfo.map((staffData: any) => {
          this.staffList.push(staffData);
        });
        this.isMIDActive = !this.isMIDActive;
        this.isStaff = !this.isStaff;
      });
    });
  }
  goUser(user: any, Id: any) {
    this.personalChild = [];
    this.userExist = true;
    this.isOwner = true;
    this.personalChild.push(user, Id);
    localStorage.setItem("key", JSON.stringify(this.personalChild));
    if (user === "existingUser" && Id !== undefined) {
      this.createAcnt.checkUserByEmId(Id).subscribe((data: any) => {
        this.basicsForm.patchValue(data.data);
        this.basicsForm.patchValue({ merchantPIN: "", confirmPIN: "" });
        console.log(this.basicsForm.value);
        // this.storeOwnerForm.value.personalDetails.patchValue(data.data)
        if (data.success) {
          this.captureData = data.data;
          this.title = this.captureData.title;
          this.captureData.dateOfBirth =
            this.captureData.dateOfBirth.split("T")[0];
          this.personalChild = this.captureData.documentsData;
          this.prsnlAD = {
            address: this.captureData.addressDetails,
            city: this.captureData.city,
            country: this.captureData.country,
            docs: this.captureData.documentsData,
          };
        }
      });
    }
  }

  getMidList(id: any) {
    this.staffListA = [];
    this.merchantId = [];
    this.createAcnt.getMerchantById(id).subscribe(
      (data) => {
        data.data.map((mData: any) => {
          this.merchantId.push({ mid: mData.bankMID });
          mData.terminalsInfo.map((tidData: any) => {
            let tids = {
              tidInfo: tidData,
              mid: data.data.bankMID,
              activationDate: "pending",
              address: data.data.addressDetails,
              emailId: data.data.emailId,
              firstName: data.data.firstName,
              tid: "pending",
            };
            this.staffListA.push(tids);
          });
          this.isMIDActive = !this.isMIDActive;
        });
      },
      (err) => {
        console.error(
          "Error fetching MID data:",
          err?.message || err?.error?.message || err,
        );
        this.isMIDActive = !this.isMIDActive;
      },
    );
  }

  getTidList(id: any) {
    this.staffListA = [];
    this.merchantId = [];
    this.createAcnt.getMerchantById(id).subscribe(
      (data) => {
        data.data.map((mData: any) => {
          this.merchantId.push({ mid: mData.bankMID });
          mData.terminalsInfo.map((tidData: any) => {
            let tids = {
              tidInfo: tidData,
              mid: data.data.bankMID,
              activationDate: "pending",
              address: data.data.addressDetails,
              emailId: data.data.emailId,
              firstName: data.data.firstName,
              tid: "pending",
            };
            this.staffListA.push(tids);
          });
          this.isDevice = !this.isDevice;
          this.isMIDActive = !this.isMIDActive;
        });
      },
      (err) => {
        console.error(
          "Error fetching TID list:",
          err?.message || err?.error?.message || err,
        );
        this.isDevice = !this.isDevice;
        this.isMIDActive = !this.isMIDActive;
        let result = [
          {
            _id: "631f213d2cf7a9c7c70831b2",
            firstName: "PayNet",
            lastName: "User",
            groupId: "grpId140850",
            gender: "Male",
            title: "Mrs",
            emailId: "ghanim@criticalriver.com",
            mobileNumber: 971508448968,
            dateOfBirth: "1997-04-02T00:00:00.000Z",
            globalUserRole: "store owner",
            merchantPIN: 1234,
            status: {
              status: "Active",
              stage: "merchant Allocation",
            },
            distributorId: "did414463",
            authCode: [],
            documentsData: [
              {
                documentType: "licenseDocument",
                documentTitle: "License Document",
                documentNumber: "1212121212",
                documentPath:
                  "payrowusers\\631f213d2cf7a9c7c70831b2\\bank1-1662984817056.jpg",
                createdDate: "2022-09-12T12:05:10.601Z",
                _id: "631f22712cf7a9c7c70831cb",
              },
              {
                documentType: "ecCopy",
                documentTitle: "EC Document",
                documentNumber: "1212121345",
                createdDate: "2022-09-12T12:05:10.601Z",
                _id: "631f22712cf7a9c7c70831cc",
              },
              {
                documentType: "emiratesDocument",
                documentTitle: "Emirates Document",
                documentNumber: "111111111111123",
                documentPath:
                  "payrowusers\\631f213d2cf7a9c7c70831b2\\auth_img2-1662984675422.png",
                createdDate: "2022-09-12T12:05:10.601Z",
                _id: "631f21e32cf7a9c7c70831b7",
              },
              {
                documentType: "passportDocument",
                documentTitle: "Passport Document",
                documentNumber: "111111111111222",
                documentPath:
                  "payrowusers\\631f213d2cf7a9c7c70831b2\\aim-1662984675434.png",
                createdDate: "2022-09-12T12:05:10.601Z",
                _id: "631f21e32cf7a9c7c70831b8",
              },
            ],
            bankDetails: [
              {
                bankName: "HDFC",
                accountNumber: "12345678",
                ibanNumber: "1111111123",
                branchName: "Hyderabad",
                vatNumber: "12121231",
                _id: "631f22052cf7a9c7c70831bc",
              },
            ],
            cardDetails: [],
            merchantItems: [
              {
                _id: "631f233d2cf7a9c7c70831f9",
              },
            ],
            staffInfo: [
              {
                storeId: "PRSID32",
                userId: "PRTID47",
                staffRole: "Store Manager",
                staffStatus: "Active",
                emiratesId: "121212345678901",
                firstName: "supriya",
                lastName: "M",
                gender: "Female",
                title: "Mrs.",
                emailId: "Suppu@gmail.com",
                staffPIN: 1234,
                staffReportingUserId: "PRMID58",
                salesPersonId: "123",
                mobileNumber: "9490781716",
                salaryDetails: {
                  basicSalary: 5000,
                  houseAllowance: 5000,
                  transportAllowance: 5000,
                  bonus: 5000,
                },
                documentsData: [
                  {
                    documentType: "emiratesDocument",
                    documentTitle: "Emirates Document",
                    documentPath: "payrowusers\\avatar4-1663061620013.png",
                    createdDate: "2022-09-12T12:05:10.601Z",
                    _id: "63204e742cf7a9c7c708322e",
                  },
                  {
                    documentType: "passportDocument",
                    documentTitle: "Passport Document",
                    documentNumber: "99999999",
                    documentPath: "payrowusers\\addr-1663061620011.svg",
                    createdDate: "2022-09-12T12:05:10.601Z",
                    _id: "63204e742cf7a9c7c708322f",
                  },
                  {
                    documentType: "visaDocument",
                    documentTitle: "Visa Document",
                    documentNumber: "99999999",
                    documentPath: "payrowusers\\aadhar-1663061620008.png",
                    createdDate: "2022-09-12T12:05:10.601Z",
                    _id: "63204e742cf7a9c7c7083230",
                  },
                ],
                joiningDate: "2022-09-12T12:05:10.601Z",
                bankDetails: [
                  {
                    bankName: "Axis",
                    accountNumber: "29731903",
                    _id: "631f22c42cf7a9c7c70831e0",
                  },
                ],
                _id: "631f22c42cf7a9c7c70831df",
              },
              {
                storeId: "PRSID32",
                userId: "PRTID48",
                staffRole: "Staff POS",
                staffStatus: "Active",
                emiratesId: "767676767645321",
                firstName: "Ravi",
                lastName: "M",
                gender: "Male",
                title: "Mr.",
                emailId: "Suppu@gmail.com",
                staffPIN: 1234,
                staffReportingUserId: "PRTID47",
                salesPersonId: "sId012936",
                mobileNumber: "9490781716",
                salaryDetails: {
                  basicSalary: 6000,
                  houseAllowance: 7000,
                  transportAllowance: 7000,
                  bonus: 7000,
                },
                documentsData: [
                  {
                    documentType: "emiratesDocument",
                    documentTitle: "Emirates Document",
                    documentPath: "payrowusers\\avatar4-1663061891279.png",
                    createdDate: "2022-09-12T12:05:10.601Z",
                    _id: "63204f832cf7a9c7c7083256",
                  },
                  {
                    documentType: "passportDocument",
                    documentTitle: "Passport Document",
                    documentNumber: "99999999",
                    documentPath: "payrowusers\\addr-1663061891277.svg",
                    createdDate: "2022-09-12T12:05:10.601Z",
                    _id: "63204f832cf7a9c7c7083257",
                  },
                  {
                    documentType: "visaDocument",
                    documentTitle: "Visa Document",
                    documentNumber: "99999999",
                    documentPath: "payrowusers\\aadhar-1663061891274.png",
                    createdDate: "2022-09-12T12:05:10.601Z",
                    _id: "63204f832cf7a9c7c7083258",
                  },
                ],
                joiningDate: "2022-09-12T12:05:10.601Z",
                bankDetails: [
                  {
                    bankName: "HDFC",
                    accountNumber: "28716391",
                    _id: "631f23022cf7a9c7c70831ed",
                  },
                ],
                _id: "631f23022cf7a9c7c70831ec",
              },
              {
                storeId: "PRSID32",
                userId: "PRTID49",
                staffRole: "Delivery POS",
                staffStatus: "Active",
                emiratesId: "111111111111129",
                firstName: "Aravind",
                lastName: "M",
                gender: "Male",
                title: "Mr.",
                emailId: "Suppu@gmail.com",
                staffPIN: 1234,
                staffReportingUserId: "PRTID47",
                salesPersonId: "sId012936",
                mobileNumber: "9490781716",
                salaryDetails: {
                  basicSalary: 13213,
                  houseAllowance: 234234,
                  transportAllowance: 3434,
                  bonus: 323,
                },
                documentsData: [
                  {
                    documentType: "emiratesDocument",
                    documentTitle: "Emirates Document",
                    documentPath: "payrowusers\\avatar4-1663062319183.png",
                    createdDate: "2022-09-12T12:05:10.601Z",
                    _id: "6320512f2cf7a9c7c70832a1",
                  },
                  {
                    documentType: "passportDocument",
                    documentTitle: "Passport Document",
                    documentNumber: "99999999",
                    documentPath: "payrowusers\\addr-1663062319181.svg",
                    createdDate: "2022-09-12T12:05:10.601Z",
                    _id: "6320512f2cf7a9c7c70832a2",
                  },
                  {
                    documentType: "visaDocument",
                    documentTitle: "Visa Document",
                    documentNumber: "99999999",
                    documentPath: "payrowusers\\aadhar-1663062319177.png",
                    createdDate: "2022-09-12T12:05:10.601Z",
                    _id: "6320512f2cf7a9c7c70832a3",
                  },
                ],
                joiningDate: "2022-09-12T12:05:10.601Z",
                bankDetails: [
                  {
                    bankName: "HDFC",
                    accountNumber: "23232323",
                    _id: "632050f62cf7a9c7c7083272",
                  },
                ],
                _id: "632050f62cf7a9c7c7083271",
              },
            ],
            storeDetails: [
              {
                storeId: "PRSID32",
                storeAddress: {
                  addressTitle: "Default",
                  completeAddress: "Hyd",
                  latitude: "Hyd",
                  longitude: "123.23",
                },
                mobileNumber: "+919490781716",
                website: "paynet.com",
                brachAccountDetails: {
                  name: "Supriya Mergu",
                  bankName: "hdfc",
                  accNumber: "47658759",
                  ibanNumber: "8776796",
                },
                _id: "631f22342cf7a9c7c70831c2",
                storeItems: [],
              },
            ],
            terminalsInfo: [
              {
                deviceIMEINumber: "269dbda1b25a245c",
                termainalId: "072837",
                pin: 2211,
                status: "Active",
                reqEncrypt:
                  "AtLRmCcqo2jwANlcl3TgFrp/VPDRaI1G+xgrKmSvjxbr5C/VrTHBpZsdJaPpxViAzf4rpAzHKV5kP02hPJ6dJQ==",
                createdDate: "2022-11-25T09:53:05.196Z",
                loginAttempts: 0,
                lastLoginAttempt: "2023-05-16T19:20:17.655Z",
                authCode: {
                  attempts: 2,
                },
                _id: "6380908afe807bc6263e19da",
              },
              {
                deviceIMEINumber: null,
                termainalId: "637070",
                status: "Ongoing",
                createdDate: "2022-09-12T06:30:39.521Z",
                loginAttempts: 1,
                lastLoginAttempt: "2023-03-28T10:01:54.932Z",
                _id: "64229a500a3a865390ffa2cd",
              },
              {
                termainalId: "121202",
                createdDate: "2023-01-04T05:24:28.766Z",
                _id: "63b50ebf71674ac34b25125e",
              },
              {
                termainalId: "072388",
                createdDate: "2023-03-14T13:25:35.696Z",
                _id: "64115e98ee6e3177d56f41ec",
              },
            ],
            createdAt: "2022-09-12T12:08:29.528Z",
            updatedAt: "2023-06-19T09:57:43.154Z",
            payRowId: "PRMID58",
            __v: 0,
            addressDetails: "Hyderabad",
            city: "Dubai",
            country: "U.A.E",
            emiratesId: 111111111111123,
            businessDetails: {
              yearsInBusiness: "10",
              annualTurnOver: "2000000",
              noOfEmployees: "300",
              noOfOutlets: "12",
              businessType: "Grocery Store",
              companyName: "reliance Fresh",
              companyShortName: "fresh",
            },
            bankMID: "121212121212123",
            mSalesPersonId: "sId012936",
            trn: 1002,
            adminDetails: {
              adminName: "Ghanim",
              adminEmail: "ghanim@criticalriver.com",
              adminMobileNumber: 971508448968,
            },
            paybylinkid: "PCFC202201",
          },
        ];
        result.forEach((mData: any) => {
          mData.terminalsInfo.map((tidData: any) => {
            let tids = {
              tidInfo: tidData,
              mid: mData.bankMID,
              activationDate: "pending",
              address: mData.addressDetails,
              emailId: mData.emailId,
              firstName: mData.firstName,
              tid: "pending",
            };
            this.staffListA.push(tids);
          });
        });
        console.log(this.staffListA);
      },
    );
  }
  sendAuthentication(merchantId: any) {
    this.createAcnt.sendAuthCode(merchantId).subscribe((data) => {
      if (data) {
        // this.isTrack = !this.isTrack;
      }
    });
  }
  subTabs(id: any) {
    this.step = 1;
  }
  next() {
    if (this.selectedUser === "existingUser") {
      this.basicsForm.value.groupId = this.exGrpId;
    }
    if (this.step == 1) {
      // this.basicsForm.patchValue({ status: { status: 'Ongoing', stage: 'create account' } })
      // const value = this.basicsForm.value;
      // this.createAcnt.createMerchantBasic(value).subscribe((data) => {
      // 	if (data) {
      // 		this.sData = data.data
      this.basic_step = true;
      this.step++;
      // 	}
      // })
    } else if (this.step == 2) {
      // let id = this.sData._id;
      // let data = this.storeOwnerForm.value.personalDetails;
      // let documentsData: any = [
      // 	{
      // 		documentType: "emiratesDocument",
      // 		documentTitle: "Emirates Document",
      // 		documentExpiry: data.eIExpiry,
      // 		documentNumber: data.eINumber
      // 	},
      // 	{
      // 		documentType: "passportDocument",
      // 		documentTitle: "Passport Document",
      // 		documentExpiry: data.passportExpiry,
      // 		documentNumber: data.passportNum
      // 	}
      // ]
      // const fdata = new FormData();
      // fdata.append("city", data.city)
      // fdata.append("addressDetails", data.addressDetails)
      // fdata.append("country", data.country)
      // fdata.append("emiratesId", data.eINumber)
      // fdata.append("documentsData", JSON.stringify(documentsData))
      // fdata.append("status[status]", "Ongoing")
      // fdata.append("status[stage]", "personal details")
      // fdata.append("emiratesDocument", data.emiratesFileName)
      // fdata.append("passportDocument", data.passportFileName)
      // const value = fdata;
      // this.createAcnt.updateMerchantPersonal(value, id).subscribe((data) => {
      // 	if (data) {
      this.personal_step = true;
      this.step++;
      // 	}
      // })
    } else if (this.step == 3) {
      // let id = this.sData._id;
      // let BankDetailsList = { bankDetails: [this.storeOwnerForm.value.bankDetails], status: { status: 'Ongoing', stage: 'bank details' } }
      // const value = BankDetailsList;
      // this.createAcnt.updateMerchantPersonal(value, id).subscribe((data) => {
      // 	if (data) {
      this.card_step = true;
      this.step++;
      // 	}
      // })
    } else if (this.step == 4) {
      this.address_step = true;
      this.step++;
    } else if (this.step == 5) {
      // let id = this.sData._id;
      // let data = this.storeOwnerForm.value.licenseDetails
      // const fdata = new FormData();
      // let documentsData: any = [
      // 	{
      // 		documentType: "licenseDocument",
      // 		documentTitle: "License Document",
      // 		documentExpiry: data.licenceExpiry,
      // 		documentNumber: data.licenceNum
      // 	},
      // 	{
      // 		documentType: "ecCopy",
      // 		documentTitle: "EC Document",
      // 		documentNumber: data.eCNumber
      // 	}
      // ]
      // fdata.append("companyName", data.companyName)
      // fdata.append("documentsData", JSON.stringify(documentsData))
      // fdata.append("licenseDocument", data.licenseDocument)
      // fdata.append("ecCopy", data.ecCopy)
      // fdata.append("status[status]", " Active")
      // fdata.append("status[stage]", " license details")
      // const value = fdata;
      // this.createAcnt.updateMerchantPersonal(value, id).subscribe((data) => {
      // 	if (data) {
      this.license_step = true;
      this.step++;
      // 	}
      // })
    } else if (this.step == 6) {
      // let id = this.sData._id;
      // const value = { businessDetails: this.storeOwnerForm.value.businessDetails, status: { status: 'Ongoing', stage: 'business details' } }
      // this.createAcnt.updateMerchantPersonal(value, id).subscribe((data) => {
      // 	if (data) {
      this.business_step = true;
      this.step++;
      // 	}
      // })
    } else if (this.step == 7) {
      this.staff_step = true;
      this.step++;
      // }
    } else if (this.step == 8) {
      // let value: any;

      // let id = this.sData._id
      // if (this.selectedCat === "SMB") {
      // 	this.onCheckdData.map((o: any) => {
      // 		this.cats.map((c: any) => {
      // 			if (o.serviceName === c.categoryName) {
      // 				let Obj: any = {}
      // 				Obj.serviceId = o.serviceId;
      // 				Obj.serviceName = o.itemName
      // 				c.categoryItems = [...c.categoryItems, Obj];
      // 			}
      // 		})
      // 	})

      // 	value = { merchantType: this.selectedCat, merchantItems: this.cats, status: { status: 'Ongoing', stage: 'item details' } }
      // } else if (this.selectedCat === "Enterprise" || this.selectedCat === "Govt") {
      // 	this.onCheckdData.map((o: any) => {
      // 		this.cats.map((c: any) => {
      // 			let Obj: any = {}
      // 			Obj.serviceId = o.serviceId;
      // 			Obj.serviceName = o.serviceName
      // 			c.categoryItems.push(Obj);

      // 		})

      // 	})
      // 	value = { merchantType: this.selectedCat, merchantItems: this.cats, status: { status: 'Ongoing', stage: 'item details' } }

      // }

      // this.createAcnt.updateMerchantPersonal(value, id).subscribe((data) => {
      // 	if (data) {
      this.busiType_step = true;
      this.step++;
      // 		this.totalData = data.data;
      // 	}
      // })
    } else if (this.step == 9) {
      // let id = this.sData._id
      // this.idForm = this.sData._id
      this.terms_step = true;
      this.step++;
      // this.sData = [];
    }
  }
  previous() {
    this.step--;
    if (this.step == 1) {
      this.basic_step = false;
    } else if (this.step == 2) {
      this.personal_step = false;
    } else if (this.step == 3) {
      this.card_step = false;
    } else if (this.step == 4) {
      this.address_step = false;
    } else if (this.step == 5) {
      this.license_step = false;
    } else if (this.step == 6) {
      this.business_step = false;
    } else if (this.step == 7) {
      this.staff_step = false;
    } else if (this.step == 8) {
      this.busiType_step = false;
    } else if (this.step == 9) {
      this.terms_step = false;
    }
  }

  uploadEmiratesfile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.branchManagerForm.get("emiratesDocument")?.setValue(file);
    }
  }
  uploadPassportfile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.branchManagerForm.get("passportDocument")?.setValue(file);
    }
  }
  uploadVisafile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.branchManagerForm.get("visaDocument")?.setValue(file);
    }
  }
  deviceUpdate(id: any) {
    this.createAcnt.updateDevice(id).subscribe((data) => {});
  }
  addTID() {
    let data = this.branchManagerForm.value;
    let documentsData: any = [data.eIDoc, data.passportDoc, data.visaDoc];
    // const fdata = new FormData();
    // fdata.append("firstName", data.firstName)
    // fdata.append("lastName", data.lastName)
    // fdata.append("emiratesId", data.emiratesId)
    // fdata.append("staffRole", data.staffRole)
    // fdata.append("mobileNumber", data.mobileNumber)
    // fdata.append("emailId", data.emailId)
    // fdata.append("storeId", data.storeId)
    // fdata.append("gender", data.gender)
    // fdata.append("title", data.title)
    // fdata.append("staffReportingUserId", data.ReportingUserId)
    // fdata.append("salesPersonId", data.salesPersonId)
    // fdata.append("staffPIN", data.staffPIN)
    // fdata.append('confirmPIN', data.confirmPIN)
    // fdata.append("documentsData[]", documentsData)
    // fdata.append("documentsData[0].documentType", "emiratesDocument")
    // fdata.append("documentsData[0].documentTitle", "Emirates Document")
    // fdata.append("documentsData[0].documentExpiry", data.eIDoc.documentExpiry)
    // fdata.append("documentsData[1].documentType", "passportDocument")
    // fdata.append("documentsData[1].documentTitle", "Passport Document")
    // fdata.append("documentsData[1].documentExpiry", data.passportDoc.documentExpiry)
    // fdata.append("documentsData[1].documentNumber", data.passportDoc.documentNumber)
    // fdata.append("documentsData[2].documentType", "visaDocument")
    // fdata.append("documentsData[2].documentTitle", "Visa Document")
    // fdata.append("documentsData[2].documentExpiry", data.visaDoc.documentExpiry)
    // fdata.append("documentsData[2].documentNumber", data.visaDoc.documentNumber)
    // fdata.append("emiratesDocument", data.emiratesDocument)
    // fdata.append("passportDocument", data.passportDocument)
    // fdata.append("visaDocument", data.visaDocument)
    // const value = fdata;
    // this.createAcnt.createTID(value).subscribe((data) => {
    //   if (data) {
    //     console.log(data)
    //   }
    // })
  }

  checkExisting(e: any) {
    this.selectedUser = e.target.value;
  }
  onChecked(e: any, id: String) {
    if (e.target.checked) {
      this.selectedCat.push(id);
    } else {
      this.selectedCat = this.selectedCat.filter((m: any) => m != id);
    }
  }
  get f() {
    return (
      this.storeOwnerForm.controls,
      this.branchManagerForm.controls,
      this.deliveryPOSForm.controls,
      this.staffPOSForm.controls
    );
  }
  onOwnerSubmit() {
    this.storeOwnerForm.reset();
    this.sData = [];
    this.step = 1;
  }
  onManagerSubmit() {
    this.branchManagerForm.reset();
  }
  onDeliveryPosSubmit() {
    this.deliveryPOSForm.reset();
  }
  onStaffPosSubmit() {
    this.staffPOSForm.reset();
  }
  BacktoList() {
    this.isOwner = !this.isOwner;
  }

  //multiselect Functionalities

  // onItemSelect(item: any) {
  // 	this.srvc_Cat.getCategory().subscribe(data => {
  // 		data.data.map((iData: any) => {
  // 			this.selectCategory.map((mData: any) => {
  // 				if (iData.serviceName === mData.x && iData.serviceItems.length > 0) {
  // 					for (let i in iData.serviceItems) {
  // 						iData.serviceItems[i].serviceId = iData.serviceCode;
  // 						iData.serviceItems[i].serviceName = iData.serviceName;
  // 						this.srvcData.push(iData.serviceItems[i]);
  // 					}
  // 				}
  // 			})
  // 		})

  // 		this.srvcData = this.srvcData.reduce((a: any, b: any) => {
  // 			if (a.filter((i: any) => i.itemName == b.itemName).length == 0)
  // 				a.push(b)

  // 			return a
  // 		}, [])
  // 		this.srvcData.map((s: any) => {
  // 			if (!s.Selected)
  // 				s.Selected = false;
  // 		})
  // 	})
  // 	this.setClass()
  // }
  onItemDeSelect(unselected: any) {
    this.setClass();
    let nwArry: any = [];
    this.selectCategory.map((sel: any) => {
      //nwArry = this.srvcData.filter((item:any) => {return item.serviceName !== sel.x})
      this.srvcData.map((m: any) => {
        if (m.serviceName === sel.x) nwArry.push(m);
      });
    });
    this.srvcData = nwArry;
    if (this.selectCategory.length === 0) this.srvcData = [];
  }
  setStatus() {
    this.selectCategory.length > 0
      ? (this.requiredField = true)
      : (this.requiredField = false);
  }
  setClass() {
    this.setStatus();
    if (this.selectCategory.length > 0) {
      return "validField";
    } else {
      return "invalidField";
    }
  }

  oncheckSrvc(e: any) {
    this.merchntObj["merchantType"] = this.selectedCat;
    if (this.selectedCat === "SMB") {
      if (e.Selected === false) {
        e.Selected = true;
        const Obj: any = {};
        Obj["catId"] = e.serviceId;
        Obj["categoryName"] = e.serviceName;
        Obj["categoryItems"] = [];
        this.cats.push(Obj);

        this.onCheckdData = [...this.onCheckdData, e];
        this.cats = [
          ...this.cats
            .reduce((map: any, obj: any) => map.set(obj.catId, obj), new Map())
            .values(),
        ];
      } else {
        this.onCheckdData = this.onCheckdData.filter(
          (i: any) => i.itemName !== e.itemName,
        );
      }
    } else {
      if (this.cats.length === 0) {
        const Obj: any = {};
        Obj.categoryItems = [];
        this.cats.push(Obj);
      }
      this.onCheckdData = [...this.onCheckdData, e];
    }
    console.log(this.onCheckdData, "checkdata");
  }
}
