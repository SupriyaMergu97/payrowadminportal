import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-risk-personal',
  templateUrl: './risk-personal.component.html',
  styleUrls: ['./risk-personal.component.scss']
})
export class RiskPersonalComponent implements OnInit {


  @Input() storeCatData: any;

  constructor() { }

  ngOnInit(): void {

  }

}
