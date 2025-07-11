import { Component, OnInit } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, IPointRenderEventArgs } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { ComplaintsService } from 'src/app/services/complaints.service';
import { SignatureEncryptionService } from 'src/app/services/signature-encryption.service';
import { BarServiceService } from 'src/services/bar-service.service'
declare var jQuery: any;

@Component({
    selector: 'app-complaints-history',
    templateUrl: './complaints-history.component.html',
    styleUrls: ['./complaints-history.component.scss']
})
export class ComplaintsHistoryComponent implements OnInit {

    toggleButton: boolean = true;
    toggleQuater: boolean = true;
    toggleStatus: boolean = true;
    btnVal: string = "Update";
    Qbtn: string = "Update";
    StatusBtn: string = "Update";
    finalData: any = [];
    finalQuarterData: any = [];
    finalDonutData: any = [];
    months: String[] = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', ' Nov', 'Dec'];
    data1: any = [];
    data2: any = [];
    data3: any = [];
    palette: String[];
    mainData: any = [];
    serviceData: any = [];
    selected: string = "Total Cases";
    currentYear: any;
    years: any = [];
    selStatus: any = "All";
    complaintData: any = [];
    chartData: any = [];

    constructor(private cmp_Srvce: ComplaintsService, private bar_service: BarServiceService,
        private encryption: SignatureEncryptionService) { }

    public donutDataFooter: any = [
        { dounttitle: "Total Cases", svgImg: 'assets/images/credit.png', value: 10000, color: '#6CB49C', target: 1000000000, actual: 750000000, percent: null },
        { dounttitle: "Open Cases", svgImg: 'assets/images/credit.png', value: 1000, color: '#AACC00', target: 1000000000, actual: 700000000, percent: null },
        { dounttitle: "Closed Cases", svgImg: 'assets/images/credit.png', value: 500, color: '#3F88A9', target: 50000000000, actual: 3000000000, percent: null }
    ]
    public chartData1: Array<any> = [{ x: 'Jan', y: 200 }, { x: 'Feb', y: 270 }, { x: 'Mar', y: 380 }, { x: 'Apr', y: 400 }, { x: 'May', y: 350 }, { x: 'Jun', y: 100 }, { x: 'Jul', y: 290 }, { x: 'Aug', y: 310 }, { x: 'Sep', y: 100 }, { x: 'Oct', y: 420 }, { x: 'Nov', y: 160 }, { x: 'Dec', y: 260 }];
    public chartData2: Array<any> = [{ x: 'Jan', y: 200 }, { x: 'Feb', y: 270 }, { x: 'Mar', y: 380 }, { x: 'Apr', y: 400 }, { x: 'May', y: 350 }, { x: 'Jun', y: 100 }, { x: 'Jul', y: 290 }, { x: 'Aug', y: 310 }, { x: 'Sep', y: 100 }, { x: 'Oct', y: 420 }, { x: 'Nov', y: 160 }, { x: 'Dec', y: 260 }]
    public chartData3: Array<any> = [{ x: 'Jan', y: 200 }, { x: 'Feb', y: 270 }, { x: 'Mar', y: 380 }, { x: 'Apr', y: 400 }, { x: 'May', y: 350 }, { x: 'Jun', y: 100 }, { x: 'Jul', y: 290 }, { x: 'Aug', y: 310 }, { x: 'Sep', y: 100 }, { x: 'Oct', y: 420 }, { x: 'Nov', y: 160 }, { x: 'Dec', y: 260 }]
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

    public complaintsHistory: any = [
        {
            "category": "Total Cases",
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
            "category": "Open Cases",
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
            "category": "Closed Cases",
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
    ]
    ngOnInit(): void {

        this.currentYear = new Date().getFullYear();
        for (let i = 2021; i <= this.currentYear + 1; i++) {
            this.years.push({ year: i })
        }
        this.getComplaintsData();
        this.targetComplaints();
        this.donutChartsData();
        this.palette = ["#929E89"];
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
        labelFormat: '{value} '
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
    isLoading: boolean = true;
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
            $('#side_menu_bar > ul > li.nav-item > a#li_complaints').addClass("active");
        })(jQuery);
        // document.body.classList.add('loading');
       
    }
    onSelectYear(e: any) {
        this.currentYear = e.target.value;
        this.getComplaintsData()
    }
    onSelectStatus(e: any) {
        this.selStatus = e.target.value;
        this.getComplaintsData()
    }
    async getComplaintsData() {
        // this.finalData = [];
        let value = { year: this.currentYear, did: null, status: this.selStatus }
        let req = { data: this.encryption.encodeJsonObjectToHex(value) }
        let reqhead = this.encryption.createHeader();
        const key = this.encryption.generateKey(reqhead.key)
        this.cmp_Srvce.getCompchart(req, reqhead.headers).subscribe(async res => {
            if (res.success = true) {
                const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
                const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
                console.log(decryptedData)
                this.chartData = decryptedData;
                if (this.chartData.length > 0) {
                    // setTimeout(() => {
                        this.isLoading = false;
                        //   this.redirectToCheckout();
                    // }, 200); // Redirect after 2 seconds
                }
                // this.targetStore();

                // this.chartData(this.complaintData)
            }
        })
    }

    targetStore() {
        this.finalData = [];
        this.finalQuarterData = []
        this.chartData.map((data: any) => {
            data.percent = Math.round(data.y / data.target * 100);
            this.finalData = [...this.finalData, data];
            console.log(this.finalData, 'final')
        })
        for (let i in this.quarterData) {
            this.quarterData[i].quarter =
                this.quarterData[i].quarterTitle === "Q1" ? this.chartData.slice(0, 3) :
                    this.quarterData[i].quarterTitle === "Q2" ? this.chartData.slice(3, 6) :
                        this.quarterData[i].quarterTitle === "Q3" ? this.chartData.slice(6, 9) : this.chartData.slice(9, 12);

        }
        console.log(this.quarterData)
        if (this.quarterData && this.quarterData.length > 0) {
            this.quarterData.map((x: any) => {
                x.target = 0;
                x.y = 0;
                x.quarter.map((q: any) => {
                    x.target = x.target + q.target;
                    x.y = x.y + q.y;
                })
                x.percent = Math.round(x.y / x.target * 100);
                this.finalQuarterData.push(x);
            })
        }
        console.log(this.finalQuarterData, 'quaret')
    }

























    enable(value: any) {

        switch (value) {
            case 'target':
                this.toggleButton = !this.toggleButton;
                // this.btnVal = this.btnVal === 'Update'? 'Save' : 'Update';
                break;
            case 'current':
                this.toggleStatus = !this.toggleStatus;
                //this.StatusBtn = this.StatusBtn === 'Update'? 'Save' : 'Update';
                break;
            default:
                break;
        }
    }
    update(row: any) {
        console.log(this.complaintsHistory, 'ser')
        this.complaintsHistory.map((yrData: any) => {
            if (yrData.category === this.selected) {
                yrData.data.map((i: any) => {
                    if (row.id === i.id) {
                        i.target = parseInt(row.target)
                    }
                })
            }
        })
        this.donutDataFooter.map((donutrow: any) => {
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
            this.getCompliantsData();
            this.targetComplaints();
            this.toggleButton = true
        }
        if (i === 'current') {
            this.toggleStatus = true;
            //this.donutData=[];
            this.donutChartsData();

        }
    }


    async getCompliantsData() {
        this.finalData = [];
        await this.complaintsHistory.map((dataSmb: any) => {
            if (dataSmb.category === "Total Cases") {
                dataSmb.data.map((smbData: any) => {
                    const Obj: any = {};
                    Obj.x = smbData.month;
                    Obj.y = smbData.actual;
                    this.data1.push(Obj)
                })
                this.mainData = [...this.mainData, this.data1];
            }
            if (dataSmb.category === "Open Cases") {
                dataSmb.data.map((del: any) => {
                    const Obj: any = {};
                    Obj.x = del.month;
                    Obj.y = del.actual;
                    this.data2.push(Obj)
                })
                this.mainData = [...this.mainData, this.data2];
            }
            if (dataSmb.category === "Closed Cases") {
                dataSmb.data.map((staff: any) => {
                    const Obj: any = {};
                    Obj.x = staff.month;
                    Obj.y = staff.actual;
                    this.data3.push(Obj)
                })
                this.mainData = [...this.mainData, this.data3];
            }
        })
    }
    targetComplaints() {
        this.finalData = [];
        this.complaintsHistory.map(async (mData: any) => {
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
        this.targetComplaints();
    }


    donutChartsData() {
        this.finalDonutData = [];
        if (this.donutDataFooter && this.donutDataFooter.length > 0) {
            this.donutDataFooter.map((x: any) => {
                x.percent = Math.round(x.actual / x.target * 100);
                const tempVal = 100 - x.percent;
                x.doNut = `${x.percent} ${tempVal}`
                this.finalDonutData.push(x);
            })
        }
    }


}
