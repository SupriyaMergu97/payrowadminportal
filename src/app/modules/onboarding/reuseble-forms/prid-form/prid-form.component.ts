import { Component, forwardRef, Input, OnDestroy, OnInit } from "@angular/core";
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  NG_VALIDATORS,
  Validator,
} from "@angular/forms";
import { Subscription } from "rxjs";
import { NotificationService } from "src/app/core/services/notification.service";
import { CreateAcntService } from "src/app/services/create-acnt.service";
import { SalesPersonService } from "src/app/services/sales-person.service";
import { DatePipe } from "@angular/common";
import { SignatureEncryptionService } from "src/app/services/signature-encryption.service";

export interface PridFormValues {}
@Component({
  selector: "app-prid-form",
  templateUrl: "./prid-form.component.html",
  styleUrls: ["./prid-form.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PridFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PridFormComponent),
      multi: true,
    },
  ],
})
export class PridFormComponent
  implements ControlValueAccessor, OnDestroy, OnInit, Validator
{
  pridForm: FormGroup;
  subscriptions: Subscription[] = [];
  profileImg: any;
  isShow: boolean = false;
  fileSelected: File;
  salesList: any = [];
  distributorId: any;
  maxDate: string;
  minExpiryDate: string;
  @Input() pridData: any = [];
  @Input() typeOfCustomer: any;
  @Input() idProof: any;
  defaultDate: string;
  get value(): PridFormValues {
    return this.pridForm.value;
  }
  set value(value: PridFormValues) {
    this.pridForm.setValue(value);
    // this.onChange(value);
    // this.onTouched();
  }
  ngOnInit(): void {
    const currentDate = new Date();
    const maxDate = new Date(
      currentDate.getFullYear() - 18,
      currentDate.getMonth(),
      currentDate.getDate(),
    );
    this.maxDate = maxDate.toISOString().split("T")[0]; // Format as yyyy-mm-dd
    this.minExpiryDate = currentDate.toISOString().split("T")[0];
    this.defaultDate = this.datePipe.transform(
      currentDate,
      "dd-MM-yyyy",
      "en-US",
    )!;
    // this.pridForm.reset();
    this.getSalesList();
    this.pridForm.patchValue(this.pridData[0]);
    this.pridForm.patchValue({ typeOfCustomer: this.typeOfCustomer });
    console.log(this.pridData, this.typeOfCustomer, this.idProof, "customer");
    if (this.idProof !== "") {
      this.pridForm.patchValue({ payRowId: null });
      this.pridForm.patchValue({ _id: null });
      if (this.typeOfCustomer == "Government") {
        this.pridForm.patchValue({ degreeNumber: this.idProof });
      } else {
        this.pridForm.patchValue({ emiratesId: this.idProof });
      }
    } else {
      this.profileImg = this.pridData[0].documents.profileImg;
      // this.profileImg = this.pridData[0].documents.profileImg;
    }
    // if(this.pridData.length>0){
    // }
  }

  constructor(
    private fb: FormBuilder,
    private createAcnt: CreateAcntService,
    private noteService: NotificationService,
    private sales_serv: SalesPersonService,
    private datePipe: DatePipe,
    private encryption: SignatureEncryptionService,
  ) {
    this.pridForm = this.fb.group({
      _id: [""],
      payRowId: [""],
      salesId: ["", Validators.required],
      typeOfCustomer: new FormControl(""),
      profileImg: [""],
      firstName: ["", [Validators.required]],
      lastName: [""],
      emailId: [
        "",
        [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"),
        ],
      ],
      mobileNumber: ["", Validators.required],
      status: ["", Validators.required],
      city: new FormControl("", [Validators.required]),
      country: new FormControl("", Validators.required),
      addressDetails: new FormControl("", [Validators.required]),
      dateOfBirth: [""],
      gender: [""],
      title: [""],
      emiratesDocument: [""],
      passportDocument: [""],
      emiratesId: new FormControl("", [
        Validators.minLength(15),
        Validators.maxLength(15),
      ]),
      emiratesExpiry: new FormControl(""),
      passportNum: new FormControl("", [Validators.maxLength(9)]),
      passportExpiry: new FormControl(""),
      degreeNumber: new FormControl(""),
      degreeExpiry: new FormControl(""),
      degreeDocument: new FormControl(""),
      boBox: new FormControl("", Validators.required),
    });
  }
  onFileSelected(event: any) {
    this.profileImg = "";
    console.log(
      "##############################",
      event.target.files[0]?.name || "No file selected",
    );
    const file = <File>event.target.files[0];
    this.pridForm.patchValue({ profileImg: file });
    this.pridForm.get("profileImg")?.updateValueAndValidity();
    console.log("image", this.pridForm.value.profileImg);
    const reader = new FileReader();
    reader.onload = () => {
      this.profileImg = reader.result as string;
    };
    const [fileSelected, rest] = event.target.files[0].name.split(".");
    this.fileSelected = fileSelected;
    reader.readAsDataURL(file);
  }

  uploadEIfile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.pridForm.get("emiratesDocument")?.setValue(file);
    }
    console.log("#################", this.pridForm);
  }
  uploadPassportfile(event: any) {
    console.log(
      "$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$",
      event.target.files.length,
      "files selected",
    );
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.pridForm.get("passportDocument")?.setValue(file);
    }
  }
  uploadDegreefile(event: any) {
    console.log(
      "$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$",
      event.target.files.length,
      "files selected",
    );
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.pridForm.get("degreeDocument")?.setValue(file);
    }
  }
  getSalesList() {
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key);
    this.sales_serv.getAllSales(reqhead.headers).subscribe(async (res) => {
      if (res.success === true) {
        const encryptedData = res.data; // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(
          this.encryption.decodeData(encryptedData, await key),
        );
        this.salesList = decryptedData;
        console.log(this.salesList);
      }
    });
  }
  onSelectSales(e: any) {
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key);
    this.sales_serv
      .getSalesbyID(e.target.value, reqhead.headers)
      .subscribe(async (res) => {
        if (res.success === true) {
          const encryptedData = res.data; // Assuming encrypted data comes under 'data'
          const decryptedData = JSON.parse(
            this.encryption.decodeData(encryptedData, await key),
          );
          this.distributorId = decryptedData[0].distributorId;
        }
      });
  }
  submit() {
    console.log(this.typeOfCustomer);
    // this.pridForm.patchValue({typeOfCustomer:this.typeOfCustomer})
    // this.pridForm.value.status = "Active";
    const value = this.pridForm.value;
    const fdata = new FormData();
    // fdata.append("payRowId", value.payRowId);
    // fdata.append("salesId", value.salesId);
    // fdata.append("typeOfCustomer", this.typeOfCustomer);
    // fdata.append("firstName", value.firstName);
    // fdata.append("emailId", value.emailId);
    // fdata.append("mobileNumber", value.mobileNumber);
    // fdata.append("status", "Active");
    // fdata.append("city", value.city);
    // fdata.append("country", value.country);
    // fdata.append("addressDetails", value.addressDetails);
    // fdata.append("boBox", value.boBox);
    // fdata.append("distributorId", this.distributorId);
    // if (this.typeOfCustomer == 'Government') {
    //   fdata.append("degreeNumber", value.degreeNumber);
    //   fdata.append("degreeExpiry", value.degreeExpiry);
    //   fdata.append("degreeDocument", value.degreeDocument);
    // }
    // else {
    //   fdata.append("lastName", value.lastName);
    //   fdata.append("dateOfBirth", value.dateOfBirth);
    //   fdata.append("gender", value.gender);
    //   fdata.append("title", value.title);
    //   fdata.append("emiratesDocument", value.emiratesDocument);
    //   fdata.append("passportDocument", value.passportDocument);
    //   fdata.append("emiratesId", value.emiratesId);
    //   fdata.append("emiratesExpiry", value.emiratesExpiry);
    //   fdata.append("passportNum", value.passportNum);
    //   fdata.append("passportExpiry", value.passportExpiry);
    // }

    fdata.append("profileImg", value.profileImg);
    if (this.typeOfCustomer == "Government") {
      fdata.append("degreeDocument", value.degreeDocument);
    } else {
      fdata.append("passportDocument", value.passportDocument);
      fdata.append("emiratesDocument", value.emiratesDocument);
    }
    console.log(fdata, "form value");
    value.degreeDocument = "";
    value.emiratesDocument = "";
    value.passportDocument = "";
    value.profileImg = "";
    fdata.append("data", this.encryption.encodeJsonObjectToHex(value));
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key);
    this.createAcnt
      .createPayrowId(fdata, reqhead.headers)
      .subscribe(async (data) => {
        if (data.success == true) {
          const encryptedData = data.data; // Assuming encrypted data comes under 'data'
          const decryptedData = JSON.parse(
            this.encryption.decodeData(encryptedData, await key),
          );
          this.noteService.showSuccess(`200 : ${data.message}`, "");
        } else {
          this.noteService.showError(`${data.message}`, "");
        }
      });
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
  writeValue(value: any): void {
    if (value) this.value = value;
    if (value === null) {
      this.pridForm.reset();
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  onChange: any = () => {};
  onTouched: any = () => {};

  //  inner form validation to the parent form
  validate(_: FormControl) {
    return this.pridForm.valid ? null : { profile: { valid: false } };
  }
}
