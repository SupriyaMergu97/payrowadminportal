import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-risk-card',
  templateUrl: './risk-card.component.html',
  styleUrls: ['./risk-card.component.scss']
})
export class RiskCardComponent implements OnInit {

  constructor() { }

  @Input() storeCatData: any;


  ngOnInit(): void {
  }

}
