import { Component, OnInit, forwardRef, OnDestroy, Input } from '@angular/core';
import {
    ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder,
    FormGroup, Validators, FormControl, NG_VALIDATORS, Validator, FormArray
} from '@angular/forms';
import { Subscription } from 'rxjs'
import { CreateAcntService } from 'src/app/services/create-acnt.service';
export interface AddressFormValues {
    storeAddress: any;
    mobileNumber: String,
    storeId: String,
    storeManagerId: String,
    storeName: String,
    storeManagerName: String,
    // addressTitle: String;
    // completeAddress: string;
    // latitude: string;
    // longitude: String;
    // faxNumber: number;
    // website: string;
    // brachAccountDetails: any;
    // name: String;
    // bankName: String;
    // accNumber: String;
    // ibanNumber: String;
}
@Component({
    selector: 'app-address-form',
    templateUrl: './address-form.component.html',
    styleUrls: ['./address-form.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AddressFormComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => AddressFormComponent),
            multi: true
        }
    ]
})
export class AddressFormComponent implements ControlValueAccessor, OnDestroy, Validator {
    addressForm: FormGroup;
    // storeForm: FormGroup;
    isAdd: boolean = false;
    isForm: boolean = false;
    @Input() storeMngrList: any
    @Input() selectedStore: any
    adminList: any = [];
    storeData: any = []
    // storedata: any = []
    storeDetailsdata: any = []
    subscriptions: Subscription[] = [];
    get value(): AddressFormValues {
        let value = this.addressForm.value
        this.addressForm.reset();
        return value;
    }
    // get storeDetails() {
    //     return this.addressForm.controls['storeDetails'] as FormArray
    // }
    set value(value: AddressFormValues) {
        this.addressForm.setValue(value);
        this.onChange(value);
        this.onTouched();
    }

    constructor(private fb: FormBuilder, private createAcnt: CreateAcntService) {
        this.addressForm = this.fb.group({
            // _id: [''],
            mobileNumber: ["", Validators.required],
            storeId: [''],
            storeAddress: [''],
            storeManagerId: [""],
            storeName: ["", [Validators.required]],
            storeManagerName: ['']
            //  fb.group({
            //     addressTitle: ["", Validators.required],
            //     completeAddress: ["", Validators.required],
            //     latitude: ["", Validators.required],
            //     longitude: ["", Validators.required]
            // }),
            // brachAccountDetails: fb.group({
            //     name: ["", Validators.required],
            //     bankName: ["", Validators.required],
            //     accNumber: ["", Validators.required],
            //     ibanNumber: ["", Validators.required],

            // }),
        })
        // if (this.selectedStore) {
        //     console.log('aaaa')
        //     this.addressForm.patchValue(this.selectedStore);
        //     console.log(this.addressForm.value,'aaaa')
        // }
        // debugger;
        this.subscriptions.push(
            this.addressForm.valueChanges.subscribe(value => {
                this.onChange(value);
                this.onTouched();
            })
        )
    }
    ngOnInit() {
        console.log(this.storeMngrList, this.selectedStore);
        // this.addressForm
        if (this.selectedStore != null || this.selectedStore != undefined) {
            this.addressForm.addControl('_id', new FormControl(this.selectedStore._id));
            this.addressForm.patchValue(this.selectedStore);
            console.log(this.addressForm.value, 'adresform')
        }
        else{
            this.addressForm.reset()
        }
    }
    onAdd() {
        this.isForm = !this.isForm;
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
    writeValue(value: any): void {
        if (value) this.value = value;
        if (value === null) { this.addressForm.reset(); }
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    addAcnt() {
        this.isAdd = !this.isAdd
    }
    // ngOnInit(): void {
    // }

    onChange: any = () => { };
    onTouched: any = () => { };

    //  inner form validation to the parent form
    validate(_: FormControl) {
        return this.addressForm.valid ? null : { profile: { valid: false } };
    }

}
