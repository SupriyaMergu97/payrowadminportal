import { Component, OnInit, forwardRef, OnDestroy, Input } from '@angular/core';
import {
    ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder,
    FormGroup, Validators, FormControl, NG_VALIDATORS, Validator
} from '@angular/forms';
import { Subscription } from 'rxjs';
// import { LicenseFormValues } from 'src/app/modules/create-account/reuseble-forms/licence-form/licence-form.component';
import { CreateAcntService } from 'src/app/services/create-acnt.service';

export interface DistLicenseFormValues {
}

@Component({
    selector: 'app-dist-licence-form',
    templateUrl: './distLicence-form.component.html',
    styleUrls: ['./distLicence-form.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DistLicenceFormComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => DistLicenceFormComponent),
            multi: true
        }
    ]
})
export class DistLicenceFormComponent implements ControlValueAccessor, OnDestroy, Validator {
    licenceForm: FormGroup;
    licenceDoc: FormGroup;
    EcDoc: FormGroup;
    @Input() distData: any={};
    subscriptions: Subscription[] = [];
    maxDate: string;
    minExpiryDate: string;

    get value(): DistLicenseFormValues {
        return this.licenceForm.value;
    }
    set value(value: DistLicenseFormValues) {
        this.licenceForm.setValue(value);
        this.onChange(value);
        this.onTouched();
    }

    ngOnInit(): void {
        const currentDate = new Date();
        const maxDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
        this.maxDate = maxDate.toISOString().split('T')[0]; // Format as y
        this.minExpiryDate = currentDate.toISOString().split('T')[0];
        // console.log(this.distData.licenseDetails,'llllllll')
        if (this.distData != null) {
            this.licenceForm.patchValue(this.distData.licenseDetails)
        }
    }

    constructor(private fb: FormBuilder, private createAcnt: CreateAcntService) {
        this.licenceForm = this.fb.group({
            nameOnLicense: [''],
            licenseDocument: [''],
            natureOfBusiness: '',
            companyName: new FormControl("", [Validators.required]),
            companyShortName: [''],
            ecDocument: [''],
            ecExpiry: [''],
            licenseNumber: new FormControl("", Validators.required),
            licenseExpiry: new FormControl("", Validators.required),
            ecNumber: new FormControl("", [Validators.required,Validators.maxLength(11)]),
            companyLogo: new FormControl("")
        })
        this.subscriptions.push(
            this.licenceForm.valueChanges.subscribe(value => {
                this.onChange(value);
                this.onTouched();
            })
        )
    }
    uploadLicencefile(event: any) {
        if (event.target.files.length > 0) {
            let file = event.target.files[0];
            this.licenceForm.get('licenseDocument')?.setValue(file);
        }
    }
    uploadEcfile(event: any) {
        if (event.target.files.length > 0) {
            let file = event.target.files[0];
            this.licenceForm.get('ecDocument')?.setValue(file);
        }
    }
    uploadLogo(event: any) {
        if (event.target.files.length > 0) {
            let file = event.target.files[0];
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
