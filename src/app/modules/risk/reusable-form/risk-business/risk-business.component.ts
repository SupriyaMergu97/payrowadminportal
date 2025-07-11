import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-risk-business',
  templateUrl: './risk-business.component.html',
  styleUrls: ['./risk-business.component.scss']
})
export class RiskBusinessComponent implements OnInit {

  constructor() { }

  @Input() storeCatData: any;
  
  ngOnInit(): void {
    console.log(this.storeCatData);
  }

}
