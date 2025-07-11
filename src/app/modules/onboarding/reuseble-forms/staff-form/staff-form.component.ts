import { Component, OnInit, forwardRef, OnDestroy, Input } from '@angular/core';
import {
    ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder,
    FormGroup, Validators, FormControl, NG_VALIDATORS, Validator, FormArray
} from '@angular/forms';
import { Subscription } from 'rxjs'
import { CreateAcntService } from 'src/app/services/create-acnt.service';


export interface StaffFormValues {
    staffId: String
    emiratesId: String
    firstName: String
    lastName: String
    title: String
    gender: String
    mobileNumber: String
    emiratesExpiry: Date
    staffEmiratesDocument: String
    emailId: String
    bankName: String
    accountNumber: String
    basicSalary: String
    houseAllowance: String
    transportAllowance: String
    bonus: String
    status: String
    joiningDate: Date
}
@Component({
    selector: 'app-staff-form',
    templateUrl: './staff-form.component.html',
    styleUrls: ['./staff-form.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => StaffFormComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => StaffFormComponent),
            multi: true
        }
    ]
})
export class StaffFormComponent implements ControlValueAccessor, OnDestroy, Validator {

    staffForm: FormGroup;
    addStaffForm: FormGroup;
    isForm: boolean = false;
    staffDetails: any = []
    subscriptions: Subscription[] = [];
    @Input() selectedStaff: any
    maxDate: string;
    minExpiryDate: string;

    get value(): StaffFormValues {
        return this.staffForm.value;
    }
    // get staff(): FormArray {
    //     return this.staffForm.get('staff') as FormArray
    // }
    set value(value: StaffFormValues) {
        this.staffForm.setValue(value);
        this.onChange(value);
        this.onTouched();
    }
    constructor(private fb: FormBuilder, private createAcnt: CreateAcntService) {

        this.staffForm = this.fb.group({
            _id: [''],
            staffId: [''],
            emiratesId: new FormControl("", [Validators.required, Validators.minLength(15), Validators.maxLength(15)]),
            firstName: new FormControl("", [Validators.required]),
            lastName: new FormControl("", [Validators.required]),
            title: new FormControl("", [Validators.required]),
            gender: new FormControl("", [Validators.required]),
            mobileNumber: new FormControl("", [Validators.required]),
            emiratesExpiry: new FormControl(""),
            staffEmiratesDocument: [''],
            emailId: [''],
            bankName: new FormControl("", [Validators.required]),
            accountNumber: new FormControl("", [Validators.required]),
            basicSalary: [''],
            houseAllowance: [''],
            transportAllowance: [''],
            bonus: [''],
            status: [''],
            joiningDate: ['']
        })


        this.subscriptions.push(
            this.staffForm.valueChanges.subscribe(value => {
                this.onChange(value);
                this.onTouched();
            })
        )
    }
    onAdd() {
        this.isForm = !this.isForm;
    }
    ngOnInit(): void {
        const currentDate = new Date();
        const maxDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
        this.maxDate = maxDate.toISOString().split('T')[0]; // Format as y
        this.minExpiryDate = currentDate.toISOString().split('T')[0];
        this.staffForm.addControl('_id', new FormControl(this.selectedStaff._id));
        this.staffForm.patchValue(this.selectedStaff);
        // this.staffForm.patchValue(this.selectedStaff);
    }
    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
    writeValue(value: any): void {
        // if (value) this.value = value;
        // if (value === null) { this.staffForm.reset(); }
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    uploadEIfile(event: any) {
        console.log('admin', this.staffForm.value);
        if (event.target.files.length > 0) {
            let file = event.target.files[0];
            this.staffForm.get('staffEmiratesDocument')?.setValue(file);
            // this.managerForm.get('mngrEmiratesDocument')?.setValue(file);
        }
    }
    get staffs() {
        return this.staffForm.controls["stores"] as FormArray;
    }
    onChange: any = () => { };
    onTouched: any = () => { };

    //  inner form validation to the parent form
    validate(_: FormControl) {
        return this.staffForm.valid ? null : { profile: { valid: false } };
    }

}
