import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import {
    ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder,
    FormGroup, Validators, FormControl, NG_VALIDATORS, Validator
} from '@angular/forms';
import { Subscription } from 'rxjs'
import { CreateAcntService } from 'src/app/services/create-acnt.service';


export interface DistPersonalFormValues {

}

@Component({
    selector: 'app-dist-personal',
    templateUrl: './distPersonal.component.html',
    styleUrls: ['./distPersonal.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DistPersonalComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => DistPersonalComponent),
            multi: true
        }
    ]
})
export class DistPersonalComponent implements ControlValueAccessor, OnDestroy, OnInit, Validator {
    // private value = '';

    // update(value: string) {
    //     this.value = value;
    // }

    // getValue() {
    //     return this.value;
    // }
    form: FormGroup;
    EIdocuments: FormGroup;
    PassportDoc: FormGroup;
    subscriptions: Subscription[] = [];
    parentData: any = [];
    @Input() distData: any={};
    @Input() typeofDist: any;
    // typeofDist:any
    passportNum: string;
    eINumber: string;
    personalData: any = {};
    maxDate: string;
    minExpiryDate: string;
    get value(): DistPersonalFormValues {
        return this.form.value;
    }

    set value(value: DistPersonalFormValues) {
        this.form.setValue(value);
        this.onChange(value);
        this.onTouched();
    }

    ngOnInit() {
        const currentDate = new Date();
        const maxDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
        this.maxDate = maxDate.toISOString().split('T')[0]; // Format as y
        this.minExpiryDate = currentDate.toISOString().split('T')[0];
        this.form.patchValue(this.distData);
        // this.typeofDist=this.distData.typeOfDistributor;
        console.log(this.typeofDist,this.distData);
    }
    constructor(private fb: FormBuilder, private createAcnt: CreateAcntService) {

        this.form = this.fb.group({
            city: new FormControl("", [Validators.required]),
            addressDetails: new FormControl("", [Validators.required]),
            emiratesDocument: ['', Validators.required],
            passportDocument: ['', Validators.required],
            country: new FormControl("", Validators.required),
            emiratesId: new FormControl("", [Validators.required, Validators.minLength(15), Validators.maxLength(15)]),
            emiratesExpiry: new FormControl("", Validators.required),
            passportNum: new FormControl("", [Validators.required, Validators.maxLength(9)]),
            passportExpiry: new FormControl("", Validators.required),
            degreeNumber:new FormControl(""),
            degreeExpiry:new FormControl(""),
            degreeDocument:new FormControl(""),
            boBox:new FormControl("",Validators.required),
        })
        this.subscriptions.push(
            this.form.valueChanges.subscribe(value => {
                this.onChange(value);
                this.onTouched();
            })
        )

    }

    uploadEIfile(event: any) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.form.get('emiratesDocument')?.setValue(file);
        }
        console.log("#################", this.form);
    }
    uploadPassportfile(event: any) {
        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$", event.target.files)
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.form.get('passportDocument')?.setValue(file);
        }
    }
    uploadDegreefile(event: any) {
        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$", event.target.files)
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.form.get('degreeDocument')?.setValue(file);
        }
    }
    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
    writeValue(value: any): void {
        if (value) this.value = value;
        if (value === null) { this.form.reset(); }
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }


    // ngOnInit(): void {
    // }

    onChange: any = () => { };
    onTouched: any = () => { };

    //  inner form validation to the parent form
    validate(_: FormControl) {
        return this.form.valid ? null : { profile: { valid: false } };
    }

}