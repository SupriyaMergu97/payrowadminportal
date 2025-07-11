import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss']
})
export class DonutChartComponent implements OnInit {
    @Input() dataDonut:any;
    @Input() donutDataFooter:any;
    @Input() donutDataComplaints:any;
    @Input() setProp:boolean;
    @Output() targetEvent = new EventEmitter<string>();
    finalData:any=[];
    complaintsData:any=[];
    pointColorMapping: 'color'
    annotations:[{
        content:'<div style="border: 1px solid black;background-color:#f5f5f5; padding: 5px 5px 5px 5px">13.5</div>',
        region: 'Series',
        coordinateUnits: 'Point',
        x: 'Jan',
        y: 13
    }]
    finalDataFooter: any=[];
    constructor() { }

    ngOnInit(): void {
        this.donutChartsData();
        console.log("########################",this.dataDonut);
    }

    donutChartsData(){
        if(this.dataDonut && this.dataDonut.length>0){
            this.dataDonut.map((x:any)=>{
       
                x.percent = Math.round(x.actual / x.target * 100);
                this.finalData.push(x);
            })
        }
        if(this.donutDataFooter && this.donutDataFooter.length>0){
            this.donutDataFooter.map((x:any)=>{
       
                x.percent = Math.round(x.actual / x.target * 100);
                this.finalDataFooter.push(x);
            })
        }
        if(this.donutDataComplaints && this.donutDataComplaints.length>0){
            this.donutDataComplaints.map((x:any)=>{
       
                x.percent = Math.round(x.actual / x.target * 100);
                this.complaintsData.push(x);
            })
        }
    }
    // update(row:any){
    //     this.finalData.map((data:any)=>{
    //         if(row.id === data.id){
    //             data.target = parseInt(row.target);
    //             data.percent = Math.round(data.actual / data.target * 100);
    //         }
    //     })
    
    // }
    onTargetChange () {
        this.targetEvent.emit(this.dataDonut)
        //this.nameEvent.emit(this.userName);
    }

}
