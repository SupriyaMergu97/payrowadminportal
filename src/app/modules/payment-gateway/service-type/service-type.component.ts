import { Component, OnInit } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, IPointRenderEventArgs } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { BarServiceService } from 'src/services/bar-service.service';


declare var jQuery: any;

@Component({
    selector: 'app-service-type',
    templateUrl: './service-type.component.html',
    styleUrls: ['./service-type.component.scss']
})
export class ServiceTypeComponent implements OnInit {
    toggleButton: boolean = true;
    toggleQuater: boolean = true;
    toggleStatus: boolean = true;
    btnVal: string = "Update";
    Qbtn: string = "Update";
    StatusBtn: string = "Update";
    finalData: any = [];
    finalQuarterData: any = [];
    finalDonutchart: any = [];
    months: String[] = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', ' Nov', 'Dec'];
    data1: any = [];
    data2: any = [];
    data3: any = [];
    data4: any = [];
    palette: String[];
    mainData: any = [];
    serviceData: any = [];
    selected: string = "Govt";

    constructor(private bar_service: BarServiceService) { }

    public donutDataPaymentGWay: any = [
        { dounttitle: "Govt", svgImg: 'assets/images/credit.png', value: 2000, color: '#95D67B', target: 200000000, actual: 160000000, percent: null },
        { dounttitle: "EnterPrise", svgImg: 'assets/images/credit.png', value: 10000, color: '#6CB49C', target: 100000000, actual: 75000000, percent: null },
        { dounttitle: "SMB", svgImg: 'assets/images/credit.png', value: 1000, color: '#AACC00', target: 1000000000, actual: 700000000, percent: null },
        { dounttitle: "Cross Border", svgImg: 'assets/images/credit.png', value: 500, color: '#3F88A9', target: 5000000000, actual: 3000000000, percent: null }
    ]
    public chartData1: Array<any> = [{ x: 'Jan', y: 200 }, { x: 'Feb', y: 270 }, { x: 'Mar', y: 380 }, { x: 'Apr', y: 400 }, { x: 'May', y: 350 }, { x: 'Jun', y: 100 }, { x: 'Jul', y: 290 }, { x: 'Aug', y: 310 }, { x: 'Sep', y: 100 }, { x: 'Oct', y: 420 }, { x: 'Nov', y: 160 }, { x: 'Dec', y: 260 }];
    public chartData2: Array<any> = [{ x: 'Jan', y: 200 }, { x: 'Feb', y: 270 }, { x: 'Mar', y: 380 }, { x: 'Apr', y: 400 }, { x: 'May', y: 350 }, { x: 'Jun', y: 100 }, { x: 'Jul', y: 290 }, { x: 'Aug', y: 310 }, { x: 'Sep', y: 100 }, { x: 'Oct', y: 420 }, { x: 'Nov', y: 160 }, { x: 'Dec', y: 260 }]
    public chartData3: Array<any> = [{ x: 'Jan', y: 200 }, { x: 'Feb', y: 270 }, { x: 'Mar', y: 380 }, { x: 'Apr', y: 400 }, { x: 'May', y: 350 }, { x: 'Jun', y: 100 }, { x: 'Jul', y: 290 }, { x: 'Aug', y: 310 }, { x: 'Sep', y: 100 }, { x: 'Oct', y: 420 }, { x: 'Nov', y: 160 }, { x: 'Dec', y: 260 }]
    public chartData4: Array<any> = [{ x: 'Jan', y: 200 }, { x: 'Feb', y: 270 }, { x: 'Mar', y: 380 }, { x: 'Apr', y: 400 }, { x: 'May', y: 350 }, { x: 'Jun', y: 100 }, { x: 'Jul', y: 290 }, { x: 'Aug', y: 310 }, { x: 'Sep', y: 100 }, { x: 'Oct', y: 420 }, { x: 'Nov', y: 160 }, { x: 'Dec', y: 260 }]

    public quarterData: any = [
        { id: 1, quarterTitle: 'Q1' },
        { id: 2, quarterTitle: 'Q2' },
        { id: 3, quarterTitle: 'Q3' },
        { id: 4, quarterTitle: 'Q4' },
    ];
    public yearlyData: any = [
        { id: 1, target: 11000000, actual: 11000000, percentage: 2 }, { id: 2, target: 15000000, actual: 11000, percentage: 4 }, { id: 3, target: 12000000, actual: 14000, percentage: 3 },
        { id: 4, target: 14000000, actual: 100000, percentage: 2 }, { id: 5, target: 14000000, actual: 38000, percentage: 5 }, { id: 6, target: 11000000, actual: 1100000, percentage: 2 },
        { id: 7, target: 11000000, actual: 180000, percentage: 4 }, { id: 8, target: 11000000, actual: 170900, percentage: 2 }, { id: 9, target: 14000000, actual: 149090, percentage: 4 },
        { id: 10, target: 11000000, actual: 340000, percentage: 2 }, { id: 11, target: 3600000, actual: 90888, percentage: 2 }, { id: 12, target: 28000000, actual: 120987, percentage: 2 },
    ]

    // public serviceStore: any = []
    public servData:any=[
        {
            "category": "Govt",
            "data": [
                {
                    "id": 1,
                    "month": "Jan",
                    "actual": 210,
                    "target": 260
                },
                {
                    "id": 2,
                    "month": "Feb",
                    "actual": 410,
                    "target": 500
                },
                {
                    "id": 3,
                    "month": "Mar",
                    "actual": 260,
                    "target": 300
                },
                {
                    "id": 4,
                    "month": "Apr",
                    "actual": 100,
                    "target": 230
                },
                {
                    "id": 5,
                    "month": "May",
                    "actual": 210,
                    "target": 260
                },
                {
                    "id": 6,
                    "month": "Jun",
                    "actual": 170,
                    "target": 320
                },
                {
                    "id": 7,
                    "month": "Jul",
                    "actual": 310,
                    "target": 400
                },
                {
                    "id": 8,
                    "month": "Aug",
                    "actual": 120,
                    "target": 250
                },
                {
                    "id": 9,
                    "month": "Sept",
                    "actual": 280,
                    "target": 330
                },
                {
                    "id": 10,
                    "month": "Oct",
                    "actual": 250,
                    "target": 280
                },
                {
                    "id": 11,
                    "month": "Nov",
                    "actual": 230,
                    "target": 260
                },
                {
                    "id": 12,
                    "month": "Dec",
                    "actual": 270,
                    "target": 290
                }
            ]
        },
        {
            "category": "Enterprise",
            "data": [
                {
                    "id": 1,
                    "month": "Jan",
                    "actual": 200,
                    "target": 370
                },
                {
                    "id": 2,
                    "month": "Feb",
                    "actual": 210,
                    "target": 300
                },
                {
                    "id": 3,
                    "month": "Mar",
                    "actual": 160,
                    "target": 270
                },
                {
                    "id": 4,
                    "month": "Apr",
                    "actual": 220,
                    "target": 270
                },
                {
                    "id": 5,
                    "month": "May",
                    "actual": 260,
                    "target": 270
                },
                {
                    "id": 6,
                    "month": "Jun",
                    "actual": 180,
                    "target": 270
                },
                {
                    "id": 7,
                    "month": "Jul",
                    "actual": 360,
                    "target": 420
                },
                {
                    "id": 8,
                    "month": "Aug",
                    "actual": 120,
                    "target": 270
                },
                {
                    "id": 9,
                    "month": "Sept",
                    "actual": 201,
                    "target": 270
                },
                {
                    "id": 10,
                    "month": "Oct",
                    "actual": 210,
                    "target": 270
                },
                {
                    "id": 11,
                    "month": "Nov",
                    "actual": 190,
                    "target": 270
                },
                {
                    "id": 12,
                    "month": "Dec",
                    "actual": 300,
                    "target": 350
                }
            ]
        },
        {
            "category": "SMB",
            "data": [
                {
                    "id": 1,
                    "month": "Jan",
                    "actual": 270,
                    "target": 300
                },
                {
                    "id": 2,
                    "month": "Feb",
                    "actual": 370,
                    "target": 500
                },
                {
                    "id": 3,
                    "month": "Mar",
                    "actual": 180,
                    "target": 300
                },
                {
                    "id": 4,
                    "month": "Apr",
                    "actual": 220,
                    "target": 230
                },
                {
                    "id": 5,
                    "month": "May",
                    "actual": 80,
                    "target": 260
                },
                {
                    "id": 6,
                    "month": "Jun",
                    "actual": 180,
                    "target": 320
                },
                {
                    "id": 7,
                    "month": "Jul",
                    "actual": 270,
                    "target": 400
                },
                {
                    "id": 8,
                    "month": "Aug",
                    "actual": 250,
                    "target": 250
                },
                {
                    "id": 9,
                    "month": "Sept",
                    "actual": 240,
                    "target": 330
                },
                {
                    "id": 10,
                    "month": "Oct",
                    "actual": 230,
                    "target": 280
                },
                {
                    "id": 11,
                    "month": "Nov",
                    "actual": 220,
                    "target": 260
                },
                {
                    "id": 12,
                    "month": "Dec",
                    "actual": 210,
                    "target": 290
                }
            ]
        },
        {
            "category": "Cross Border",
            "data": [
                {
                    "id": 1,
                    "month": "Jan",
                    "actual": 200,
                    "target": 370
                },
                {
                    "id": 2,
                    "month": "Feb",
                    "actual": 210,
                    "target": 300
                },
                {
                    "id": 3,
                    "month": "Mar",
                    "actual": 160,
                    "target": 270
                },
                {
                    "id": 4,
                    "month": "Apr",
                    "actual": 220,
                    "target": 270
                },
                {
                    "id": 5,
                    "month": "May",
                    "actual": 260,
                    "target": 270
                },
                {
                    "id": 6,
                    "month": "Jun",
                    "actual": 180,
                    "target": 270
                },
                {
                    "id": 7,
                    "month": "Jul",
                    "actual": 360,
                    "target": 420
                },
                {
                    "id": 8,
                    "month": "Aug",
                    "actual": 120,
                    "target": 270
                },
                {
                    "id": 9,
                    "month": "Sept",
                    "actual": 201,
                    "target": 270
                },
                {
                    "id": 10,
                    "month": "Oct",
                    "actual": 210,
                    "target": 270
                },
                {
                    "id": 11,
                    "month": "Nov",
                    "actual": 190,
                    "target": 270
                },
                {
                    "id": 12,
                    "month": "Dec",
                    "actual": 300,
                    "target": 350
                }
            ]
        }
    ]

    ngOnInit(): void {
        this.getServiceData();
        this.targetStore();
        this.donutChartsData();
        this.palette = ["#72AC47", "#406326", "#204406"];
        this.loadjQueryScripts();
    }
    ngAfterViewInit(): void {

        this.loadjQueryScripts();
    }

    public randomIntFromInterval(min: any, max: any): any { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    //Initializing Primary X Axis
    public prXAxis: Object = {
        majorGridLines: { width: 0 },
        minorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
        interval: 1,
        lineStyle: { width: 0 },
        valueType: 'Category'
    };
    //Initializing Primary Y Axis
    public prYAxis: Object = {
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        majorGridLines: { width: 1 },
        minorGridLines: { width: 1 },
        minorTickLines: { width: 0 },
        labelFormat: '${value} M'
    };
    public radius: Object = { bottomLeft: 0, bottomRight: 0, topLeft: 5, topRight: 5 }
    public marker: Object = { dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }
    public title: string = '';
    public tooltip: Object = {
        enable: true
    };
    public legend: Object = {
        visible: false
    }
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '98%';
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(
            (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(
                /-dark/i,
                'Dark'
            )
        );

    }

    private loadjQueryScripts(): void {
        (($) => {
            "use strict";
            $('.knob').knob();

            $('#side_menu_bar > ul > li.nav-item > a').removeClass("active");
            $('#side_menu_bar > ul > li.nav-item > a#li_payment_gateway').addClass("active");
        })(jQuery);
    }

    enable(value: any) {
        switch (value) {
            case 'target':
                this.toggleButton = !this.toggleButton;
                break;
            case 'current':
                this.toggleStatus = !this.toggleStatus;
                break;
            default:
                break;
        }
    }

    update(row: any) {
        this.servData.map((yrData: any) => {
            if (yrData.category === this.selected) {
                yrData.data.map((i: any) => {
                    if (row.id === i.id) {
                        i.target = parseInt(row.target)
                    }
                })
            }
        })
        this.donutDataPaymentGWay.map((donutrow: any) => {
            if (row.id === donutrow) {
                donutrow.target = parseInt(donutrow.target);
            }
        })
        // this.targetStore()
    }
    
    Save(i: any) {
        if (i === 'target') {
            // this.finalData = [];
            this.finalQuarterData = [];
            this.getServiceData();
            this.targetStore();
            this.toggleButton = true
        }
        if (i === 'current') {
            this.toggleStatus = true;
            //this.donutData=[];
            this.donutChartsData();

        }
    }

    async getServiceData() {
        // this.finalBarData = [];
        // this.servData=[];
        // await this.bar_service.getServiceGatewayData().then(data => {
            // this.servData = data;
            this.servData.map((dataSmb: any) => {
                if (dataSmb.category === "Govt") {
                    dataSmb.data.map((smbData: any) => {
                        const Obj: any = {};
                        Obj.x = smbData.month;
                        Obj.y = smbData.actual;
                        this.data1.push(Obj)
                    })
                    this.mainData = [...this.mainData, this.data1];
                }
                if (dataSmb.category === "Enterprise") {
                    dataSmb.data.map((del: any) => {
                        const Obj: any = {};
                        Obj.x = del.month;
                        Obj.y = del.actual;
                        this.data2.push(Obj)
                    })
                    this.mainData = [...this.mainData, this.data2];
                }
                if (dataSmb.category === "SMB") {
                    dataSmb.data.map((staff: any) => {
                        const Obj: any = {};
                        Obj.x = staff.month;
                        Obj.y = staff.actual;
                        this.data3.push(Obj)
                    })
                    this.mainData = [...this.mainData, this.data3];
                }
                if (dataSmb.category === "Cross Border") {
                    dataSmb.data.map((staff: any) => {
                        const Obj: any = {};
                        Obj.x = staff.month;
                        Obj.y = staff.actual;
                        this.data4.push(Obj)
                    })
                    this.mainData = [...this.mainData, this.data4];
                }
            })
        // })
        // this.getSData();
    }

    // async getSData(){
    //     this.servData=[];
    //     await this.bar_service.getServiceGatewayData().then(data => {
    //         this.servData=data;
    //     })
    //     this.targetStore();
    // }

    targetStore() {
        this.finalData = [];
        // this.serviceStore=[];
        // this.bar_service.getServiceGatewayData().then(data => {
        //     this.serviceStore = data;
            this.servData.map(async (mData: any) => {
                if (this.selected === mData.category) {
                    mData.data.map((data: any) => {
                        data.percent = Math.round(data.actual / data.target * 100);
                        this.finalData = [...this.finalData, data];
                    })
                    for (let i in this.quarterData) {
                        this.quarterData[i].quarter =
                            this.quarterData[i].quarterTitle === "Q1" ? mData.data.slice(0, 3) :
                                this.quarterData[i].quarterTitle === "Q2" ? mData.data.slice(3, 6) :
                                    this.quarterData[i].quarterTitle === "Q3" ? mData.data.slice(6, 9) : mData.data.slice(9, 12);
                    }
                }
            });
        // })
        if (this.quarterData && this.quarterData.length > 0) {
            this.quarterData.map((x: any) => {
                x.target = 0;
                x.actual = 0;
                x.quarter.map((q: any) => {
                    x.target = x.target + q.target;
                    x.actual = x.actual + q.actual;
                })
                x.percent = Math.round(x.actual / x.target * 100);
                this.finalQuarterData.push(x);
            })
        }
    }
    onSelectItem() {
        this.targetStore();
    }


    donutChartsData() {
        this.finalDonutchart=[];
        if (this.donutDataPaymentGWay && this.donutDataPaymentGWay.length > 0) {
            this.donutDataPaymentGWay.map((x: any) => {
                x.percent = Math.round(x.actual / x.target * 100);
                const tempVal = 100 - x.percent;
                x.doNut = `${x.percent} ${tempVal}`
                this.finalDonutchart.push(x); 
            })
        }
    }


}
