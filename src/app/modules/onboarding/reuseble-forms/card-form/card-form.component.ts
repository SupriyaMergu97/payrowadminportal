import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import {
  ControlValueAccessor,NG_VALUE_ACCESSOR,FormBuilder,
  FormGroup,Validators,FormControl,NG_VALIDATORS, Validator
} from '@angular/forms';
import {Subscription} from 'rxjs'

export interface CardFormValues {
  bankName: string;
  cardType: string;
  cardNumber: number;
  cardExpiry:string;
  nameOnCard:string;
  ibanNum:number
}
@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.scss'],
  providers:[
    {
        provide: NG_VALUE_ACCESSOR,
        useExisting:forwardRef(()=>CardFormComponent),
        multi:true
    },
    {
        provide: NG_VALIDATORS,
        useExisting:forwardRef(()=>CardFormComponent),
        multi:true
    }
]
})
export class CardFormComponent implements ControlValueAccessor, OnDestroy ,Validator {
    cardform: FormGroup;
    subscriptions: Subscription[]=[];

    get value():CardFormValues{
        return this.cardform.value;
    }
    set value(value: CardFormValues){
        this.cardform.setValue(value);
        this.onChange(value);
        this.onTouched();
    }
    constructor(private fb :FormBuilder) { 
        this.cardform = this.fb.group({
            bankName:new FormControl("",[Validators.required]), 
            cardType: new FormControl("",[Validators.required]),
            cardExpiry: ["",Validators.required],
            cardNumber:["",Validators.required],
            nameOnCard: new FormControl("",[Validators.required]),
            ibanNum: new FormControl("",[Validators.required])
        })
        this.subscriptions.push(
            this.cardform.valueChanges.subscribe(value=>{
                this.onChange(value);
                this.onTouched();
            })
        )
    }

    // ngOnInit(): void {
    // }
    ngOnDestroy(): void {
        this.subscriptions.forEach(s=>s.unsubscribe());
    }
    writeValue(value: any): void {
        if(value) this.value =value;
        if(value === null){this.cardform.reset();}
    }
    registerOnChange(fn: any): void {
        this.onChange =fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched =fn;
    }


    // ngOnInit(): void {
    // }

    onChange: any = () => {};
    onTouched: any = () => {};

    //  inner form validation to the parent form
    validate(_: FormControl) {
        return this.cardform.valid ? null : { profile: { valid: false } };
    }
}
