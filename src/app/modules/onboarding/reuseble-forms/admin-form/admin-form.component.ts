import { Component, forwardRef, Input, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

export interface adminFormValues {
  adminName: String,
  emailId: String,
  mobileNumber: Number,
  address: String,
  emiratesId: String,
  emiratesExpireDate: Date,
  emiratesDocument: String
}
@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AdminFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AdminFormComponent),
      multi: true
    }
  ]
})
export class AdminFormComponent implements ControlValueAccessor, OnDestroy, Validator {
  adminForm: FormGroup;
  subscriptions: Subscription[] = [];
  selectedFile: File | null = null;
  isShow: boolean = false;
  @Input() selectedAdmin: any
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
      adminId: new FormControl(""),
      adminName: new FormControl("", Validators.required),
      emailId: new FormControl("", Validators.required),
      mobileNumber: new FormControl("", Validators.required),
      status: new FormControl(""),
      address: new FormControl("", Validators.required),
      emiratesId: new FormControl("", [Validators.required, Validators.minLength(15), Validators.maxLength(15)]),
      emiratesExpireDate: new FormControl(""),
      adminEmiratesDoc: [''],
    })
    this.subscriptions.push(
      this.adminForm.valueChanges.subscribe(value => {
        this.onChange(value);
        this.onTouched();
      })
    )
  }
  ngOnInit(): void {
    // if(this.selectedAdmin)
    const currentDate = new Date();
    const maxDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
    this.maxDate = maxDate.toISOString().split('T')[0]; // Format as y
    this.minExpiryDate = currentDate.toISOString().split('T')[0];
    if (this.selectedAdmin != null || undefined) {
      console.log(this.selectedAdmin, 'addddmin')
      // this.adminForm.addControl('_id', new FormControl(this.selectedAdmin._id));
      this.adminForm.patchValue(this.selectedAdmin);
    }
    // this.adminForm.patchValue(this.selectedAdmin)
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
  writeValue(value: any): void {
    // if (value) this.value = value;
    // if (value === null) { this.adminForm.reset(); }
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
    return this.adminForm.valid ? null : { profile: { valid: false } };
  }
  uploadEIfileOne(event: any) {
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      // console.log(file,'file')
      console.log('admin', this.adminForm.value);
      // this.adminForm.value.adminEmiratesDoc = file;
      this.adminForm.get('adminEmiratesDoc')?.setValue(file);
      console.log('admin', this.adminForm.value);

    }
  }
}
