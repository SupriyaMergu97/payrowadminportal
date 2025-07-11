import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import {
    ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder,
    FormGroup, Validators, FormControl, NG_VALIDATORS, Validator
} from '@angular/forms';
import { Subscription } from 'rxjs'
import { CreateAcntService } from 'src/app/services/create-acnt.service';


export interface PersonalFormValues {

}

@Component({
    selector: 'app-personal',
    templateUrl: './personal.component.html',
    styleUrls: ['./personal.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PersonalComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => PersonalComponent),
            multi: true
        }
    ]
})
export class PersonalComponent implements ControlValueAccessor, OnDestroy, OnInit, Validator {
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
    @Input() distData: any;
    @Input() typeofDist: any;
    // typeofDist:any
    passportNum: string;
    eINumber: string;
    personalData: any = {};
    get value(): PersonalFormValues {
        return this.form.value;
    }

    set value(value: PersonalFormValues) {
        this.form.setValue(value);
        this.onChange(value);
        this.onTouched();
    }

    ngOnInit() {
        this.form.patchValue(this.distData)
        // this.typeofDist=this.distData.typeOfDistributor;
        // console.log(this.distData)
    }
    constructor(private fb: FormBuilder, private createAcnt: CreateAcntService) {

        this.form = this.fb.group({
            city: new FormControl("", [Validators.required]),
            addressDetails: new FormControl("", [Validators.required]),
            emiratesDocument: ['', Validators.required],
            emiratesFileName: '',
            passportDocument: ['', Validators.required],
            passportFileName: '',
            country: new FormControl("", Validators.required),
            emiratesId: new FormControl("", [Validators.required]),
            eINumber: new FormControl("", Validators.required),
            eIExpiry: new FormControl("", Validators.required),
            passportNum: new FormControl("", Validators.required),
            passportExpiry: new FormControl("", Validators.required),
            degreeNumber:new FormControl(""),
            degreeExpiry:new FormControl(""),
            degreeDocument:new FormControl(""),
            boBox:new FormControl("",Validators.required),
            // documentsData: [''],
            // EIdocuments:this.fb.group({
            //     documentType: [' emiratesDocument', Validators.required],
            //     documentTitle: [' Emirates Document', Validators.required],
            //     documentExpiry: ['', Validators.required],
            //     documentNumber: ['', Validators.required],
            // }),
            // PassportDoc: this.fb.group({
            //     documentType: [' passportDocument', Validators.required],
            //     documentTitle: [' Passport Document', Validators.required],
            //     documentExpiry: ['', Validators.required],
            //     documentNumber: ['', Validators.required],
            // })
            // status: ['']
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
            this.form.patchValue({ emiratesFileName: event.target.files[0] });
        }
        console.log("#################", this.form);
    }
    uploadPassportfile(event: any) {
        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$", event.target.files)
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.form.patchValue({ passportFileName: event.target.files[0] });
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