import { Component, OnInit } from '@angular/core';
import { MdrService } from 'src/services/mdr.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-risk-transaction',
  templateUrl: './risk-transaction.component.html',
  styleUrls: ['./risk-transaction.component.scss']
})
export class RiskTransactionComponent implements OnInit {
  public rowData: any = []; 
  mdrForm : FormGroup;
 

  constructor(private mdr_service:MdrService,private fb:FormBuilder) { }
  createCards(): FormGroup{
    return this.fb.group({
      cardtype:"",
      toamt:"",
      chrgtype:"",
      rakrate:"",
      newrate:"",
      gst:"",
      other:"",

    })
  }
  ngOnInit(): void {
    this.mdrForm = this.fb.group({
      marchentId:new FormControl(""),
      marchentName:new FormControl(""),
      otc:new FormControl(""),
      mdrType:new FormControl(""),
      monthCharges:new FormControl(""),
      chStartDate:new FormControl(""),
      chEndDate:new FormControl(""),
      cardsVc:this.fb.array([ this.createCards()]),
      cardsVd:this.fb.array([ this.createCards()]),
      cardsMc:this.fb.array([ this.createCards()]),
      cardsMd:this.fb.array([ this.createCards()])
    })
    this.rowData;
    this.mdrData();

  }

  async mdrData(){
    await this.mdr_service.getMdr()
    .subscribe((data:any)=>{
    this.rowData= data
    })
  }
}
