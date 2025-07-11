import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Browser } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-bar-charts',
  templateUrl: './bar-charts.component.html',
  styleUrls: ['./bar-charts.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class BarChartsComponent implements OnInit {
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
    data4:Object={};
    months: String[] = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct',' Nov', 'Dec'];
    palette: String[];
    constructor() { }

    ngOnInit(): void {
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
          this.data4= this.dataSource[3].map((item:any)=>{
            return {x: item.x, y: item.y}
          })
        }
    }

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

}
