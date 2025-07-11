import { Component, Input, OnInit } from '@angular/core';
import { MdrService } from 'src/services/mdr.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateAcntService } from 'src/app/services/create-acnt.service';

@Component({
  selector: 'app-risk-transaction',
  templateUrl: './risk-transaction.component.html',
  styleUrls: ['./risk-transaction.component.scss']
})
export class RiskTransactionComponent implements OnInit {
  @Input() mid: any = []
  public rowData: any = [];
  mdrForm: FormGroup;
  cards: FormArray;
  selected: any;
  finalData: any;
  midData:any=[];
  govt: any
  government: any = [{ name: "Government", maxAmntPerTrans: "Unlimited", maxTransPerDay: "Unlimited", maxAmntPerDay: "Unlimited",fabRate:"0.87" }];
  category: any = [
    { name: "StartUp", maxAmntPerTrans: "500", maxTransPerDay: "250", maxAmntPerDay: "125000",fabRate:"0.9" },
    { name: "SMB", maxAmntPerTrans: "5000", maxTransPerDay: "2500", maxAmntPerDay: "12500000",fabRate:"1.5" },
    { name: "Enterprise", maxAmntPerTrans: "10000", maxTransPerDay: "5000", maxAmntPerDay: "50000000",fabRate:"1.3" }
  ]

  constructor(private mdr_service: MdrService, private fb: FormBuilder, private createAcnt: CreateAcntService) { }
  createCards(): FormGroup {
    return this.fb.group({
      cardtype: "",
      toamt: "",
      chrgtype: "",
      rakrate: "",
      newrate: "",
      gst: "",
      other: "",

    })
  }
  ngOnInit(): void {
    this.mdrForm = this.fb.group({
      marchentId: new FormControl("", Validators.required),
      marchentName: new FormControl("", Validators.required),
      oneTimeCharge: new FormControl("365", Validators.required),
      annualTurnover: new FormControl("", Validators.required),
      chargePerDay: new FormControl("1", Validators.required),
      contractStartDate: new FormControl(new Date(), Validators.required),
      contractEndDate: new FormControl("", Validators.required),
      settlementAcntNum: new FormControl("", Validators.required),
      customerCategory: new FormControl("", Validators.required),
      maxAmntperTrans: new FormControl("", Validators.required),
      maxTransPerDay: new FormControl("", Validators.required),
      maxAmntPerDay: new FormControl("", Validators.required),
      vatCharges: new FormControl("5", Validators.required),
      distributor: new FormControl("", Validators.required),
      onusRate: new FormControl("", Validators.required),
      payRowRate: new FormControl("0.3", Validators.required),
      fabRate: new FormControl("0.9", Validators.required),
      invoice: this.fb.group({
        cardType: [''],
        totAmnt: [''],
        currency: [''],
        fabRate: [''],
        payRowRate: [''],
        finalSettlement: ['']
      }),
      // cardsVc: this.fb.array([this.createCards()]),
      // cardsVd: this.fb.array([this.createCards()]),
      // cardsMc: this.fb.array([this.createCards()]),
      // cardsMd: this.fb.array([this.createCards()])
    })
    this.rowData;
    this.mdrData();
    this.selected = "StartUp"
    this.getData(this.selected)
    this.createAcnt.getMerchantById(this.mid).subscribe(data => {
      this.midData=data.data
      console.log(this.midData)
    })
    // this.createAcnt.getMerchantById(this.mid).subscribe(data => {
    //   if(data){
    //     console.log(data)
    //   }
    //  })
  }

  ngOnChanges() {
    console.log(this.mid, 'mid')
  }

  async mdrData() {
    await this.mdr_service.getMdr()
      .subscribe((data: any) => {
        this.rowData = data
      })
  }
  addTableRow(cardtype: any) {
    if (cardtype === "VC") {
      this.cards = this.mdrForm.get('cardsVc') as FormArray;
      this.cards.push(this.createCards());
    } else if (cardtype === "VD") {
      this.cards = this.mdrForm.get('cardsVd') as FormArray;
      this.cards.push(this.createCards());
    } else if (cardtype === "MC") {
      this.cards = this.mdrForm.get('cardsMc') as FormArray;
      this.cards.push(this.createCards());
    } else {
      this.cards = this.mdrForm.get('cardsMd') as FormArray;
      this.cards.push(this.createCards());
    }
  }

  delTableRow(cardtype: any, index: any) {
    const cardsArray: any = cardtype === "VC" ? this.mdrForm.controls.cardsVc as FormArray :
      cardtype === "VD" ? this.mdrForm.controls.cardsVd as FormArray :
        cardtype === "MC" ? this.mdrForm.controls.cardsMc as FormArray :
          this.mdrForm.controls.cardsMd as FormArray;
    cardsArray.removeAt(index);
  }
  get f() {
    return this.mdrForm.controls;
  }
  onSelectCat(event: any) {
    this.selected = event.target.value;
    this.getData(this.selected)
  }
  onSelectGovt(event: any) {
    this.govt = event.target.value;
    this.getGovt(this.govt)
  }
  postTransactionRates() {
    const value = this.mdrForm.value
    console.log(value,'value')
    this.createAcnt.transationRate(value).subscribe(data => {
      if (data) {
        console.log(data)
      }
      else {
        console.log('failed')
      }
    })
  }
  getMerchantDetails() {
  }
  async getData(selected: any) {
    this.finalData = [];
    console.log(selected)
    await this.category.map((mData: any) => {
      console.log(mData)
      if (selected === mData.name) {
        // mData.data.map((fData: any) => {
        // fData.percent = Math.round(fData.actual / fData.target * 100);
        // const tempVal = 100 - fData.percent;
        // fData.doNut = `${fData.percent} ${tempVal}`
        this.finalData.push(mData);
        console.log(this.finalData)
        // })
      }
    })
    // this.loadScripts()
    // this.finalData = this.finalData.slice(0,12);
  };
  async getGovt(govt: any) {
    this.finalData = [];
    console.log(govt)
    if (govt === "Yes") {
      this.government.map((gData: any) => {
        this.finalData.push(gData)
        this.mdrForm.value.customerCategory === "Government"
        console.log(this.finalData)
      })
    }
    else {
      this.getData(this.selected)
    }
  }
}
