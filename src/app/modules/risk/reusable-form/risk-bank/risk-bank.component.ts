import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-risk-bank',
  templateUrl: './risk-bank.component.html',
  styleUrls: ['./risk-bank.component.scss']
})
export class RiskBankComponent implements OnInit {

  constructor() { }

  @Input() storeCatData: any;


  ngOnInit(): void {
  }
ngOnChanges(){
  console.log(this.storeCatData,'sss')
}
}
