import { Component, OnInit, forwardRef, Input, OnDestroy } from '@angular/core';
import {
  ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder,
  FormGroup, Validators, FormControl, NG_VALIDATORS, Validator
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { CreateAcntService } from 'src/app/services/create-acnt.service';

export interface adminFormValues {
  adminId: String,
  adminName: String,
  emailId: String,
  mobileNumber: Number,
  address: String,
  emiratesId: String,
  status: String,
}

@Component({
  selector: 'app-admin-details',
  templateUrl: './admin-details.component.html',
  styleUrls: ['./admin-details.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AdminDetailsComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AdminDetailsComponent),
      multi: true
    }
  ]
})
export class AdminDetailsComponent implements ControlValueAccessor, OnDestroy, Validator {
  adminForm: FormGroup
  subscriptions: Subscription[] = [];
  adminList: any = [];
  @Input() adminData: any
  isCreate: boolean = false;
  isShow: boolean = false;
  maxDate: string;
  minExpiryDate: string;
  get value(): adminFormValues {
    return this.adminForm.value;
  }
  set value(value: adminFormValues) {
    this.adminForm.setValue(value);
    this.onChange(value);
    this.onTouched();
  }
  constructor(private fb: FormBuilder) {
    this.adminForm = this.fb.group({
      _id: [''],
      adminId: new FormControl("", Validators.required),
      adminName: new FormControl("", Validators.required),
      emailId: new FormControl("", Validators.required),
      mobileNumber: new FormControl("", Validators.required),
      status: new FormControl("", Validators.required),
      address: new FormControl("", Validators.required),
      emiratesId: new FormControl("", [Validators.required, Validators.minLength(15), Validators.maxLength(15)]),
      emiratesExpiry: new FormControl(""),
      adminEmiratesDoc: new FormControl(""),
    })
    this.subscriptions.push(
      this.adminForm.valueChanges.subscribe(value => {
        this.onChange(value);
        this.onTouched();
      })
    )
  }

  // onUpdateAction(id: any) {
  //   this.adminList.map((d: any) => {
  //     if (d.adminId == id) {
  //       this.isCreate = !this.isCreate;
  //       this.adminForm.patchValue(d);
  //       this.isShow = true;
  //     }
  //   })
  // }

  uploadEIfile(event: any) {
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      this.adminForm.get('adminEmiratesDoc')?.setValue(file);
    }
  }
  onCreateAdmin() {
    this.isCreate = !this.isCreate;
    this.isShow = false
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
  writeValue(value: any): void {
    if (value) this.value = value;
    if (value === null) { this.adminForm.reset(); }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }


  ngOnInit(): void {
    const currentDate = new Date();
    const maxDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
    this.maxDate = maxDate.toISOString().split('T')[0]; // Format as y
    this.minExpiryDate = currentDate.toISOString().split('T')[0];
    console.log(this.adminData, 'addddmin')
    this.adminForm.patchValue(this.adminData)
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  //  inner form validation to the parent form
  validate(_: FormControl) {
    return this.adminForm.valid ? null : { profile: { valid: false } };
  }

}



