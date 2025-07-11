import { Component, OnInit, forwardRef, OnDestroy, Input } from '@angular/core';
import {
    ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder,
    FormGroup, Validators, FormControl, NG_VALIDATORS, Validator
} from '@angular/forms';
import { Subscription } from 'rxjs';
export interface DistBankFormValues {
    bankName: string;
    branchName: string;
    accountNumber: number;
    ibanNumber: number;
    vatNumber: number;
    trn: string
}
@Component({
    selector: 'app-dist-bank-form',
    templateUrl: './distBank-form.component.html',
    styleUrls: ['./distBank-form.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DistBankFormComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => DistBankFormComponent),
            multi: true
        }
    ]
})
export class DistBankFormComponent implements ControlValueAccessor, OnDestroy, Validator {
    bankForm: FormGroup;
    @Input() distData: any = {};
    subscriptions: Subscription[] = [];

    get value(): DistBankFormValues {
        return this.bankForm.value;
    }
    set value(value: DistBankFormValues) {
        this.bankForm.setValue(value);
        this.onChange(value);
        this.onTouched();
    }
    constructor(private fb: FormBuilder) {
        this.bankForm = this.fb.group({
            // bankDetails: {
            bankName: new FormControl("", [Validators.required]),
            accountNumber: new FormControl("", [Validators.required]),
            ibanNumber: new FormControl("", Validators.required),
            branchName: new FormControl("", [Validators.required]),
            vatNumber: new FormControl("", Validators.required),
            trn: new FormControl("", Validators.required),
            // },

        })
        this.subscriptions.push(
            this.bankForm.valueChanges.subscribe(value => {
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
        if (value === null) { this.bankForm.reset(); }
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }


    ngOnInit(): void {
        if (this.distData != null && this.distData) {
            this.bankForm.patchValue(this.distData.bankDetails[0])
        }
    }

    onChange: any = () => { };
    onTouched: any = () => { };

    //  inner form validation to the parent form
    validate(_: FormControl) {
        return this.bankForm.valid ? null : { profile: { valid: false } };
    }

}
