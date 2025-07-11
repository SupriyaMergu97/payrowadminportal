import { Component, OnInit, forwardRef, OnDestroy, Input } from '@angular/core';
import {
    ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder,
    FormGroup, Validators, FormControl, NG_VALIDATORS, Validator
} from '@angular/forms';
import { Subscription } from 'rxjs'
export interface DistBusinessFormValues {
    yearsInBusiness: string;
    annualTurnOver: String;
    noOfEmployees: String;
    noOfOutlets: String;
    domain: String
    status: any
}
@Component({
    selector: 'app-dist-business-form',
    templateUrl: './distBusiness-form.component.html',
    styleUrls: ['./distBusiness-form.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DistBusinessFormComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => DistBusinessFormComponent),
            multi: true
        }
    ]
})
export class DistBusinessFormComponent implements ControlValueAccessor, OnDestroy, Validator {
    businessForm: FormGroup;
    @Input() distData: any={};
    subscriptions: Subscription[] = [];
    get value(): DistBusinessFormValues {
        return this.businessForm.value;
    }
    set value(value: DistBusinessFormValues) {
        this.businessForm.setValue(value);
        this.onChange(value);
        this.onTouched();
    }
    constructor(private fb: FormBuilder) {
        this.businessForm = this.fb.group({
            yearsInBusiness: new FormControl("", [Validators.required]),
            annualTurnOver: new FormControl("", [Validators.required]),
            noOfEmployees: new FormControl("", [Validators.required]),
            noOfOutlets: new FormControl("", Validators.required),
            domain: new FormControl('', Validators.required)
        })
        this.subscriptions.push(
            this.businessForm.valueChanges.subscribe(value => {
                this.onChange(value);
                this.onTouched();
            })
        )
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
    writeValue(value: any): void {
        if (value) this.value = value;
        if (value === null) { this.businessForm.reset(); }
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }


    ngOnInit(): void {
        if (this.distData != null) {
            this.businessForm.patchValue(this.distData.businessDetails);
        }
    }

    onChange: any = () => { };
    onTouched: any = () => { };

    //  inner form validation to the parent form
    validate(_: FormControl) {
        return this.businessForm.valid ? null : { profile: { valid: false } };
    }

}
