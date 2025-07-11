import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-risk-license',
  templateUrl: './risk-license.component.html',
  styleUrls: ['./risk-license.component.scss']
})
export class RiskLicenseComponent implements OnInit {

  constructor() { }


  @Input() storeCatData: any;


  ngOnInit(): void {
  }

}
