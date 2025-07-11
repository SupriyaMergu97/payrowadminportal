import { Component, OnInit, forwardRef, OnDestroy, Input } from '@angular/core';
import {
    ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder,
    FormGroup, Validators, FormControl, NG_VALIDATORS, Validator
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { CreateAcntService } from 'src/app/services/create-acnt.service';

export interface LicenseFormValues {
}

@Component({
    selector: 'app-licence-form',
    templateUrl: './licence-form.component.html',
    styleUrls: ['./licence-form.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => LicenceFormComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => LicenceFormComponent),
            multi: true
        }
    ]
})
export class LicenceFormComponent implements ControlValueAccessor, OnDestroy, Validator {
    licenceForm: FormGroup;
    licenceDoc: FormGroup;
    EcDoc: FormGroup
    @Input() merchantData: any
    subscriptions: Subscription[] = [];
    maxDate: string;
    minExpiryDate: string;

    get value(): LicenseFormValues {
        return this.licenceForm.value;
    }
    set value(value: LicenseFormValues) {
        this.licenceForm.setValue(value);
        this.onChange(value);
        this.onTouched();
    }
    constructor(private fb: FormBuilder, private createAcnt: CreateAcntService) {
        this.licenceForm = this.fb.group({
            _id: [''],
            licenseDocument: [''],
            companyName: new FormControl("", [Validators.required]),
            companyShortName: new FormControl("", [Validators.required]),
            companyLogo: [''],
            nameOnReceipt: new FormControl(""),
            ecDocument: new FormControl(""),
            licenseNumber: new FormControl("", [Validators.required, Validators.maxLength(9)]),
            licenseExpiry: new FormControl("", Validators.required),
            ecNumber: new FormControl("", [Validators.required,Validators.maxLength(11)]),
            ecExpiry: [''],
            natureOfBusiness: ['']
        })
        this.subscriptions.push(
            this.licenceForm.valueChanges.subscribe(value => {
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
        console.log(this.merchantData);
        // this.licenceForm.reset();
        if (this.merchantData != null) {
            this.licenceForm.patchValue(this.merchantData.licenseDetails)
        }
    }
    uploadLicencefile(event: any) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.licenceForm.get('licenseDocument')?.setValue(file);
        }
    }
    uploadEcfile(event: any) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.licenceForm.get('ecDocument')?.setValue(file);
        }
    }
    uploadLogofile(event: any) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.licenceForm.get('companyLogo')?.setValue(file);
        }
    }
    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
    writeValue(value: any): void {
        if (value) this.value = value;
        if (value === null) { this.licenceForm.reset(); }
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
        return this.licenceForm.valid ? null : { profile: { valid: false } };
    }
}
