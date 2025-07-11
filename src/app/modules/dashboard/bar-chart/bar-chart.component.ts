import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Browser } from '@syncfusion/ej2-base';
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class BarChartComponent implements OnInit,OnChanges {
  @Input() data: Object={};
  @Input() primaryYAxis: Object = {};
  @Input() primaryXAxis: Object={};
  @Input() marker?:string;
  @Input() tooltip?:string;
  @Input() name?:string;
  // @Input() data1?:Object=[];
  @Input() dataSource?:any=[];
  data1:Object={};
  data2:Object={};
  data3:Object={};
  months: String[] = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct',' Nov', 'Dec'];
  palette: String[];
  
  constructor() { }

  ngOnInit(): void {

    // this.data1 = this.months.map(item => {
    //   let num  = this.randomIntFromInterval(50, 600);
    //   return {x: item, y: num}
    // });
  
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$",this.dataSource);
    this.palette = ["#72AC47", "#406326", "#204406"];
    if(this.dataSource && this.dataSource.length >0){
      this.data1= this.dataSource[0].map((item:any)=>{
        return {x: item.x, y: item.y}
      })
      this.data2= this.dataSource[1].map((item:any)=>{
        return {x: item.x, y: item.y}
      })
      this.data3= this.dataSource[2].map((item:any)=>{
        return {x: item.x, y: item.y}
      })
    }

  }

  ngOnChanges(){}

  public randomIntFromInterval(min: any, max: any): any { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
  public radius: Object = { bottomLeft: 0, bottomRight: 0, topLeft: 5, topRight: 5 }
  public title: string = '';
  // public tooltip: Object = {
  //     enable: true
  // };
  public chartArea: Object = {
    border: {
        width: 0
    }
  };
  public legend: Object = {
    visible: false
  }
  public width: string = Browser.isDevice ? '100%' : '98%';
    //Initializing Primary X Axis
  // public primaryXAxis: Object = {
  //   majorGridLines: { width: 0 },
  //   minorGridLines: { width: 0 },
  //   majorTickLines: { width: 0 },
  //   minorTickLines: { width: 0 },
  //   interval: 1,
  //   lineStyle: { width: 0 },
  //   labelIntersectAction: 'Rotate45',
  //   valueType: 'Category'
  // };
  // public primaryYAxis: Object = {
  //   lineStyle: { width: 0 },
  //   majorTickLines: { width: 0 },
  //   majorGridLines: { width: 1 },
  //   minorGridLines: { width: 1 },
  //   minorTickLines: { width: 0 },
  //   labelFormat: '${value} M'
  // };

}
