import { Component, forwardRef, Input, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

export interface managerFormValues {
  managerId: String
  managerName: String
  emailId: String
  mobileNumber: String
  status: String
  address: String
  emiratesId: String
  emiratesExpireDate: Date
  emiratesDocument: String
}
@Component({
  selector: 'app-store-manager',
  templateUrl: './store-manager.component.html',
  styleUrls: ['./store-manager.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StoreManagerComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => StoreManagerComponent),
      multi: true
    }
  ]
})
export class StoreManagerComponent implements ControlValueAccessor, OnDestroy, Validator {
  managerForm: FormGroup;
  subscriptions: Subscription[] = [];

  isShow: boolean = false;
  @Input() selectedMngr: any
  maxDate: string;
  minExpiryDate: string;
  get value(): managerFormValues {
    return this.managerForm.value;
  }
  set value(value: managerFormValues) {
    this.managerForm.setValue(value);
    this.onChange(value);
    this.onTouched();
  }
  constructor(private fb: FormBuilder) {
    this.managerForm = this.fb.group({
      _id: [''],
      managerId: new FormControl(""),
      managerName: new FormControl("", Validators.required),
      emailId: new FormControl("", Validators.required),
      mobileNumber: new FormControl("", Validators.required),
      status: new FormControl(""),
      address: new FormControl("", Validators.required),
      emiratesId: new FormControl("", [Validators.required, Validators.minLength(15), Validators.maxLength(15)]),
      emiratesExpireDate: new FormControl(""),
      mngrEmiratesDocument: [''],
    })
    this.subscriptions.push(
      this.managerForm.valueChanges.subscribe(value => {
        this.onChange(value);
        this.onTouched();
      })
    )
  }
  ngOnInit(): void {
    const currentDate = new Date();
        const maxDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
        this.maxDate = maxDate.toISOString().split('T')[0]; // Format as y
        this.minExpiryDate = currentDate.toISOString().split('T')[0];
    if (this.managerForm != null || undefined) {
      // this.managerForm.addControl('_id', new FormControl(this.selectedMngr._id));
      this.managerForm.patchValue(this.selectedMngr);
    }
    // this.managerForm.patchValue(this.selectedMngr);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
  writeValue(value: any): void {
    if (value) this.value = value;
    if (value === null) { this.managerForm.reset(); }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  uploadEIfile(event: any) {
    console.log('admin', this.managerForm.value);
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      this.managerForm.get('mngrEmiratesDocument')?.setValue(file);
      // this.managerForm.value.mngrEmiratesDocument = file;
      // this.managerForm.get('mngrEmiratesDocument')?.setValue(file);
    }
  }
  onChange: any = () => { };
  onTouched: any = () => { };
  //  inner form validation to the parent form
  validate(_: FormControl) {
    return this.managerForm.valid ? null : { profile: { valid: false } };
  }
}
