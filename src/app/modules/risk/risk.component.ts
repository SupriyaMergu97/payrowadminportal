import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AppManagerService } from 'src/app/core/services/app-manager.service';
import { BarServiceService } from 'src/services/bar-service.service';
import { MdrService } from 'src/services/mdr.service'
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CreateAcntService } from 'src/app/services/create-acnt.service';
import { AcUserComponent } from '../create-account/ac-user/ac-user.component';
// import { RiskTransactionComponent } from './reusable-form/risk-transaction/risk-transaction.component';
declare var jQuery: any;

@Component({
  selector: 'app-risk',
  templateUrl: './risk.component.html',
  styleUrls: ['./risk.component.scss']
})
export class RiskComponent implements OnInit {
  @ViewChild(AcUserComponent) AcUserComponent: AcUserComponent;

  // @ViewChild(RiskTransactionComponent) RiskTransactionComponent: RiskTransactionComponent;

  step = 1;
  hr_Tag: boolean = false;
  terms_step: boolean = false;

  //check
  public rowData: any = [];
  public newData: any = {};
  mdrForm: FormGroup;
  cards: FormArray;

  storeData: any = [
    { userId: 1, storeId: 101, name: "Aravind", email: "aravind@gmail.com", address: "UAE", joiningDate: "10-21-2021", cust_score: 10 },
    { userId: 2, storeId: 102, name: "Sadhana", email: "Sadhana@gmail.com", address: "India", joiningDate: "10-21-2021", cust_score: 8 },
    { userId: 3, storeId: 103, name: "Sudhakar", email: "Sudhakar@gmail.com", address: "USA", joiningDate: "10-21-2021", cust_score: 9 }
  ];
  storeCatData: any;
  catFData: any = [];
  csvData: any = [];
  selectStore: string;
  selectStoreCat: string;
  nextTab: any;
  searchId: any;
  searchText: any
  csvOptions: any;
  report_title: string;
  csvstore: string;
  headers: any;
  merchantForm: FormGroup
  constructor(
    private fb: FormBuilder, private app: AppManagerService, private mdr_service: MdrService, private http: HttpClient,
    private bar_Service: BarServiceService, private route: ActivatedRoute, private createAcnt: CreateAcntService) {
    this.app.ShowReportDate = 'true';
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      console.log(params, '11')
      // this.storeCatData = []
      let id = params.id
      this.createAcnt.getMerchantById(id).subscribe(data => {
        data.data.map((mData: any) => {
          this.storeCatData=mData
        })
      })
    });
    // console.log(this.storeCatData);
    this.merchantForm = this.fb.group({
      merchantDetails: new FormControl(""),
    })
    this.mdrForm = this.fb.group({
      marchentId: new FormControl(""),
      marchentName: new FormControl(""),
      otc: new FormControl(""),
      mdrType: new FormControl(""),
      monthCharges: new FormControl(""),
      chStartDate: new FormControl(""),
      chEndDate: new FormControl(""),
      cardsVc: this.fb.array([this.createCards()]),
      cardsVd: this.fb.array([this.createCards()]),
      cardsMc: this.fb.array([this.createCards()]),
      cardsMd: this.fb.array([this.createCards()]),
      // transactionDetails: new FormControl("")

    })
    this.rowData;
    this.mdrData();
    // this.getposData();
    this.loadScripts();
    //this.addTableRow();
  }
  // async getposData() {
  //   await this.bar_Service.getPosIdData().then(data => {
  //     this.storeData = data;
  //   });
  //   this.storeData.map((sData: any) => {
  //     sData.data.map((data: any) => {
  //       data.catData.map((fData: any) => {
  //         sData.sTransactionValue = sData.sTransactionValue + fData.transactionValue
  //       })
  //     })
  //   })

  // }

  // onSelectSore(e: any) {
  //   this.storeCatData = [];
  //   this.catFData = [];
  //   this.storeData.map((sData: any) => {
  //     if (e.target.value === sData.storeName) {
  //       this.storeCatData = sData.data;
  //     }
  //   });
  // }

  // onSelectCat(e: any) {
  //   this.catFData = [];
  //   this.storeCatData.map((cData: any) => {
  //     cData.data.map((data: any) => {
  //       if (e.target.value === data['cat']) {
  //         this.catFData = data.catData;
  //       }
  //     });
  //     this.catFData.map((fData: any) => {
  //       fData['storeId'] = cData.storeId;
  //     });
  //   });
  // }

  goBack() {
    this.nextTab = undefined;
  };
  private loadScripts(): void {
    (function ($) {
      "use strict";

      $('#side_menu_bar > ul > li.nav-item > a').removeClass("active");
      $('#side_menu_bar > ul > li.nav-item > a#li_create_account').addClass("active");
    })(jQuery);
  }
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
  onSubmitMdr() {

  }



}
