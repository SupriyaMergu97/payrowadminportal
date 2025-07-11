import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import {
  ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder,
  FormGroup, Validators, FormControl, NG_VALIDATORS, Validator
} from '@angular/forms';
import { Subscription } from 'rxjs'
import { CreateAcntService } from 'src/app/services/create-acnt.service';


export interface basicFormValues {

}
@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss'], providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BasicFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => BasicFormComponent),
      multi: true
    }
  ]
})
export class BasicFormComponent implements ControlValueAccessor, OnDestroy, OnInit, Validator {
  basicForm: FormGroup;
  subscriptions: Subscription[] = [];
  profileImg: any;
  isShow: boolean = false;
  fileSelected: File;
  @Input() typeOfCustomer: any;
  @Input() idProof: any;
  maxDate: string;
  minExpiryDate: string;
  get value(): basicFormValues {
    return this.basicForm.value;
  }
  set value(value: basicFormValues) {
    this.basicForm.setValue(value);
    // this.onChange(value);
    // this.onTouched();
  }
  ngOnInit(): void {
    const currentDate = new Date();
    const maxDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
    this.maxDate = maxDate.toISOString().split('T')[0]; // Format as y
    this.minExpiryDate = currentDate.toISOString().split('T')[0];
   }

  constructor(private fb: FormBuilder) {
    this.basicForm = this.fb.group({
      _id: new FormControl(""),
      payRowId: [''],
      salesId: ['', Validators.required],
      typeOfCustomer: [''],
      // entityName:[''],
      firstName: ['', [Validators.required]],
      lastName: [''],
      emailId: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      mobileNumber: ['', Validators.required],
      status: ['', Validators.required],
      city: new FormControl("", [Validators.required]),
      country: new FormControl("", Validators.required),
      addressDetails: new FormControl("", [Validators.required]),
      dateOfBirth: ['', [Validators.required]],
      gender: ['', Validators.required],
      title: [''],
      emiratesDocument: ['', Validators.required],
      emiratesFileName: '',
      passportDocument: ['', Validators.required],
      passportFileName: '',
      emiratesId: new FormControl("", [Validators.required, Validators.minLength(15), Validators.maxLength(15)]),
      eINumber: new FormControl("", Validators.required),
      eIExpiry: new FormControl("", Validators.required),
      passportNum: new FormControl("", [Validators.required, Validators.maxLength(9)]),
      passportExpiry: new FormControl("", Validators.required),
      licenseNumber: new FormControl(""),
      licenseExpiry: new FormControl(""),
      licenseDocument: new FormControl(""),
      ecNumber: new FormControl("",Validators.maxLength(11)),
      ecExpiry: new FormControl(""),
      ecDocument: new FormControl(""),
      boBox: new FormControl("", Validators.required),
      // personalInfo: new FormControl(" "),
      endService: new FormControl(""),

    });
  }
  onFileSelected(event: any) {
    this.profileImg = ""
    console.log("##############################", event.target.files[0])
    const file = <File>event.target.files[0];
    this.basicForm.patchValue({ empImage: file });
    this.basicForm.get('empImage')?.updateValueAndValidity();
    console.log('image', this.basicForm.value.empImage);
    const reader = new FileReader();
    reader.onload = () => {
      this.profileImg = reader.result as string;
    }
    const [fileSelected, rest] = event.target.files[0].name.split(".");
    this.fileSelected = fileSelected;
    reader.readAsDataURL(file)
  }
  uploadEIfile(e:any){}
  submit() { }
  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
  writeValue(value: any): void {
    if (value) this.value = value;
    if (value === null) { this.basicForm.reset(); }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  onChange: any = () => { };
  onTouched: any = () => { };

  //  inner form validation to the parent form
  validate(_: FormControl) {
    return this.basicForm.valid ? null : { profile: { valid: false } };
  }
}

