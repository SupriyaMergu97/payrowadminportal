import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AppManagerService } from 'src/app/core/services/app-manager.service';
import { IAxisLabelRenderEventArgs, Chart, AxisModel } from '@syncfusion/ej2-charts';

import {
    ILoadedEventArgs,
    ChartComponent,
    ChartTheme,
    IPointRenderEventArgs,
    ITooltipRenderEventArgs,
} from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { saveComplete } from '@syncfusion/ej2-angular-grids';
import { HttpClient } from '@angular/common/http';
import { HomeService } from 'src/app/services/home.service';
import { SignatureEncryptionService } from 'src/app/services/signature-encryption.service';
declare var jQuery: any;
declare var FusionCharts: any;

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    @ViewChild('chart', { static: true }) chart: ChartComponent;
    maxValue: any;
    isDashboardURL: Boolean = false;
    chartData: any = [];
    // data:any
    // toggleButton: boolean = true;
    data: any = [];
    taptoPayTrans: any = [];
    invoiceTrans: any = [];
    donutData1: any = [];
    toggleButton: boolean = true;
    toggleQuater: boolean = true;
    toggleStatus: boolean = true;
    btnVal: string = "Update";
    Qbtn: string = "Update";
    StatusBtn: string = "Update";
    finalData: any = [];
    finalQuarterData: any = [];
    finalDataFooter: any = [];
    finalDonutData: any = [];
    shortNumber: any;
    donutEvnt: boolean = true;


    d: any = 'assets/images/crUpdate.png';
    public dounttitle1: string = 'SEQUENCE';
    public dounttitle2: string = 'CRUpdate';
    public svgImg1: string = `${this.d}`;
    public color1: string = 'color:#6CB49C';
    public value1: any = 100000;


    public donutDataFooter: any = [
        { dounttitle: "Store Manager", svgImg: 'assets/images/credit.png', value: 10000, color: '#6CB49C', target: 1000000000, actual: 750000000, percent: null },
        { dounttitle: "Delivery POS", svgImg: 'assets/images/credit.png', value: 1000, color: '#AACC00', target: 1000000000, actual: 700000000, percent: null },
        { dounttitle: "Staff POS", svgImg: 'assets/images/credit.png', value: 500, color: '#3F88A9', target: 5000000000, actual: 3000000000, percent: null }
    ]

    public donutData: any = []

    //     {
    //         id: 1,
    //         dounttitle: 'CREDIT',
    //         svgImg: 'assets/images/credit.png',
    //         value: 10000,
    //         color: '#6CB49C',
    //         target: 1000000,
    //         actual: 800000,
    //         percent: null,
    //     },
    //     // {
    //     //     id: 2,
    //     //     dounttitle: 'APP DOWNLOAD',
    //     //     svgImg: 'assets/images/credit.png',
    //     //     value: 1000,
    //     //     color: '#AACC00',
    //     //     target: 1000000,
    //     //     actual: 500000,
    //     //     percent: null,
    //     // },
    //     {
    //         id: 3,
    //         dounttitle: 'CASH',
    //         svgImg: 'assets/images/credit.png',
    //         value: 500,
    //         color: '#3F88A9',
    //         target: 5000000,
    //         actual: 300000,
    //         percent: null,
    //     },
    //     {
    //         id: 4,
    //         dounttitle: 'TAP TO PAY',
    //         svgImg: 'assets/images/credit.png',
    //         value: 500,
    //         color: '#DDD700',
    //         target: 5600000,
    //         actual: 4000000,
    //         percent: null,
    //     },

    // ];
    public quarterData: any = [
        { id: 1, quarterTitle: 'Q1' },
        { id: 2, quarterTitle: 'Q2' },
        { id: 3, quarterTitle: 'Q3' },
        { id: 4, quarterTitle: 'Q4' },
    ];
    public yearlyData: any = []
    //     { id: 1, target: 1100000, actual: 11000, month: 'Jan' }, { id: 2, target: 1500000, actual: 11000, month: 'Feb' }, { id: 3, target: 1200000, actual: 14000, month: 'Mar' },
    //     { id: 4, target: 1400000, actual: 10000, month: 'Apr' }, { id: 5, target: 1400000, actual: 24000, month: 'May' }, { id: 6, target: 1100000, actual: 11000, month: 'Jun' },
    //     { id: 7, target: 1100000, actual: 18000, month: 'Jul' }, { id: 8, target: 1100000, actual: 17090, month: 'Aug' }, { id: 9, target: 1400000, actual: 14909, month: 'Sep' },
    //     { id: 10, target: 1100000, actual: 23000, month: 'Oct' }, { id: 11, target: 3600000, actual: 22000, month: 'Nov' }, { id: 12, target: 2800000, actual: 12098, month: 'Dec' },
    // ]
    months: any = [
        { "month": "Jan", "id": 1 }, { "month": "Feb", "id": 2 }, { "month": "Mar", "id": 3 }, { "month": "Apr", "id": 4 },
        { "month": "May", "id": 5 }, { "month": "Jun", "id": 6 }, { "month": "Jul", "id": 7 }, { "month": "Aug", "id": 8 },
        { "month": "Sep", "id": 9 }, { "month": "Oct", "id": 10 }, { "month": "Nov", "id": 11 }, { "month": "Dec", "id": 12 },
    ]
    //Initializing Primary X Axis
    public prXAxis: Object = {
        majorGridLines: { width: 0 },
        minorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
        interval: 1,
        lineStyle: { width: 0 },
        valueType: 'Category',
    };
    //Initializing Primary Y Axis
    public prYAxis: AxisModel;
    public radius: Object = {
        bottomLeft: 0,
        bottomRight: 0,
        topLeft: 5,
        topRight: 5,
    };
    public marker: Object = {
        dataLabel: {
            visible: true,
            position: 'Top',
            font: { fontWeight: '600', color: '#ffffff' },
        },
    };
    public title: string = '';
    public tooltip: Object = {
        enable: true,
    };
    public legend: Object = {
        visible: false,
    };
    public chartArea: Object = {
        border: {
            width: 0,
        },
    };
    public width: string = Browser.isDevice ? '100%' : '96%';
    palette: string[];
    currentYear: any;
    years: any = [];
    isLoading: boolean = true;
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
    // custom code end

    constructor(private app: AppManagerService, private router: Router, private cdr: ChangeDetectorRef,
        private http: HttpClient, private dashboard: HomeService, private encryption: SignatureEncryptionService) {
        this.app.ShowReportDate = 'true';
    }

    ngOnInit(): void {
        this.palette = ["#929E89"];

        this.currentYear = new Date().getFullYear();
        for (let i = 2021; i <= this.currentYear + 1; i++) {
            this.years.push({ year: i })
        }
        // this.getDashboardData()
        this.dashBoardChart()
        const curUrl = this.router.url;
        console.log(curUrl);
        const URLs = [
            '/dashboard/tap-to-pay',
            '/dashboard/cash-invoice',
            '/dashboard/expenses',
        ];
        console.log(URLs.indexOf(curUrl));

        // if (URLs.indexOf(curUrl) !== -1) {
        //     this.isDashboardURL = true
        //     setTimeout(() => this.externalRouts(), 0)
        // }
        // else {
        //     this.isDashboardURL = false;
        // }

        // this.barChartData();
        this.donutChartsData()
        // if (this.isDashboardURL === true) {
        //     this.prYAxis['maximum'] = 50;
        // } else {
        //     this.prYAxis['maximum'] = 50
        // }

        // this.prYAxis['labelFormat'] = '${value}' + `${this.shortNumber}`;
    }
    private loadjQueryScripts(): void {
        (($) => {
            'use strict';
            $('.knob').knob();

            $('#side_menu_bar > ul > li.nav-item > a').removeClass('active');
            $('#side_menu_bar > ul > li.nav-item > a#li_dashboard').addClass(
                'active'
            );
        })(jQuery);
    }
    barChartData() {
        this.finalData = [];
        this.finalQuarterData = [];
        this.data = [];
        let num = 0
        let max: any;
        if (this.chartData && this.chartData.length > 0) {
            this.chartData.map((x: any) => {
                console.log(this.shortNumberFunc(x.actual))
                const Obj: any = {};
                // x.percent = Math.round(x.actual / x.target * 100);
                if (Math.round(x.actual / x.target * 100) > 100) {
                    x.percent = 100;
                } else {
                    x.percent = Math.round(x.actual / x.target * 100);
                }
                this.finalData.push(x);
                Obj.x = x.month;
                Obj.y = x.actual;
                this.data = [...this.data, Obj];
                if (x.actual > num) {
                    num = x.actual;
                }
                for (let i in this.quarterData) {
                    this.quarterData[i].quarter =
                        this.quarterData[i].quarterTitle === "Q1" ? this.chartData.slice(0, 3) :
                            this.quarterData[i].quarterTitle === "Q2" ? this.chartData.slice(3, 6) :
                                this.quarterData[i].quarterTitle === "Q3" ? this.chartData.slice(6, 9) : this.chartData.slice(9, 12);
                }
            });
        }
        if (this.quarterData && this.quarterData.length > 0) {
            this.quarterData.map((x: any) => {
                x.target = 0;
                x.actual = 0;
                x.quarter.map((q: any) => {
                    x.target = x.target + q.target;
                    x.actual = x.actual + q.actual;
                })
                // console.log(Math.round(x.actual / x.target * 100))
                if (Math.round(x.actual / x.target * 100) > 100) {
                    x.percent = 100;
                } else {
                    x.percent = Math.round(x.actual / x.target * 100);
                }
                const tempVal = 100 - x.percent;
                x.doNut = `${x.percent} ${tempVal}`
                // x.svgImg = "assets/images/credit.png"
                // this.finalData.push(x);
                // else if(Math.round(x.actual / x.target * 100) > 100){}
                this.finalQuarterData.push(x);
            })
        }
        // this.shortNumber = this.shortNumberFunc(max.actual);
        // console.log(this.shortNumber,'short')
        // this.prYAxis['labelFormat'] = '{value}' + `${this.shortNumber}`;
    }
    shortNumberFunc(value: any) {
        if (value === null) return null;
        if (value === 0) return "0";
        var fractionSize = 1;
        var abs = Math.abs(value);
        var rounder = Math.pow(10, fractionSize);
        let num;
        var isNegative = value < 0;
        var key = '';
        var powers = [
            { key: "Q", value: Math.pow(10, 15) },
            { key: "T", value: Math.pow(10, 12) },
            { key: "B", value: Math.pow(10, 9) },
            { key: "M", value: Math.pow(10, 6) },
            { key: "k", value: 1000 }
        ];
        for (let i in powers) {
            var reduced = abs / powers[i].value;
            reduced = Math.round(reduced * rounder) / rounder;
            if (reduced >= 1) {
                abs = reduced;
                key = powers[i].key
                // console.log(powers[i].value)
                num = Math.round(value / powers[i].value)
                break;
            }
        }
        return (isNegative ? '-' : '') + num + key;
    }
    ngAfterViewInit(): void {

        this.loadjQueryScripts();
    }
    // Enable & Disable Target function

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
        this.yearlyData.map((yrData: any) => {
            if (row.id === yrData.id) {
                yrData.target = parseInt(row.target)
            }
        });
        this.donutData.map((donutrow: any) => {
            if (row.id === donutrow) {
                donutrow.target = parseInt(donutrow.target);
            }
        })
    }

    Save(i: any) {
        if (i === 'target') {
            this.finalData = [];
            this.finalQuarterData = [];
            this.barChartData();
            this.toggleButton = true
        }
        if (i === 'current') {
            this.toggleStatus = true;
            //this.donutData=[];
            this.donutChartsData();

        }
    }


    //taptoPay And Cash Invoice ==>temporarily  i have fixed this functionality ,Once Realdata appears we will chnage it
    // externalRouts() {
    //     let max: any;
    //     const curUrl = this.router.url;
    //     this.finalData = [];
    //     this.finalQuarterData = [];
    //     this.data = [];
    //     this.yearlyData.map((yrData: any) => {
    //         yrData.target = yrData.target / 2;
    //         yrData.actual = yrData.actual / 2;
    //         this.taptoPayTrans = [...this.taptoPayTrans, yrData];
    //         this.invoiceTrans = [...this.invoiceTrans, yrData];

    //         const Obj: any = {};
    //         yrData.percent = Math.round(yrData.actual / yrData.target * 100);
    //         this.finalData.push(yrData);
    //         Obj.x = yrData.month;
    //         Obj.y = yrData.actual / 1000;
    //         this.data = [...this.data, Obj];

    //         for (let i in this.quarterData) {
    //             this.quarterData[i].quarter =
    //                 this.quarterData[i].quarterTitle === "Q1" ? this.yearlyData.slice(0, 3) :
    //                     this.quarterData[i].quarterTitle === "Q2" ? this.yearlyData.slice(3, 6) :
    //                         this.quarterData[i].quarterTitle === "Q3" ? this.yearlyData.slice(6, 9) : this.yearlyData.slice(9, 12);
    //         }
    //     });
    //     max = this.yearlyData.reduce(function (prev: any, current: any) {
    //         return (prev.actual > current.actual) ? prev : current
    //     });
    //     this.maxValue = max.actual;
    //     if (this.quarterData && this.quarterData.length > 0) {
    //         this.quarterData.map((x: any) => {
    //             x.target = 0;
    //             x.actual = 0;
    //             x.quarter.map((q: any) => {
    //                 x.target = x.target + q.target;
    //                 x.actual = x.actual + q.actual;
    //             })
    //             x.percent = Math.round(x.actual / x.target * 100);
    //             this.finalQuarterData.push(x);
    //         })
    //     }
    //     this.shortNumber = this.shortNumberFunc(max.actual);
    // }
    donutChartsData() {

        this.finalDonutData = [];
        if (this.donutData && this.donutData.length > 0) {
            this.donutData.map((x: any) => {
                x.percent = Math.round(x.actual / x.target * 100);
                const tempVal = 100 - x.percent;
                x.doNut = `${x.percent} ${tempVal}`
                this.finalDonutData.push(x);
            })
        }
        if (this.donutDataFooter && this.donutDataFooter.length > 0) {
            this.donutDataFooter.map((x: any) => {

                x.percent = Math.round(x.actual / x.target * 100);
                const tempVal = 100 - x.percent;
                x.doNut = `${x.percent} ${tempVal}`
                this.finalDataFooter.push(x);
            })
        }
        (($) => {
            'use strict';
            $('.knob').knob();
        })(jQuery);
    }
    public onChartLoad(args: ILoadedEventArgs): void { }
    dashBoardChart() {
        // let year=new Date().getFullYear()
        let reqhead = this.encryption.createHeader();
        const key = this.encryption.generateKey(reqhead.key)
        this.dashboard.dashboardChart(this.currentYear, reqhead.headers).subscribe(async (res) => {
            if (res.success === true) {
                const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
                const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
                this.chartData = decryptedData;
                console.log(this.chartData, 'chart');
                const maxValue = this.chartData.reduce((max: number, obj: { actual: number; }) => obj.actual > max ? obj.actual : max, -Infinity);
                // this.chartData.map((c:any)=>{
                //     c.actual=this.shortNumberFunc(c.actual)
                // })
                // this.shortNumberFunc(x.actual)
                const labelSuffix = this.shortNumberFunc(maxValue);
                console.log(labelSuffix, 'Math.round')
                // this.prYAxis['labelFormat'] = `${labelSuffix}`;
                this.prYAxis = {
                    // labelFormat: this.getLabelFormat(),
                    minimum: 0,
                    // maximum: `${maxValue}`,
                    lineStyle: { width: 0 },
                    majorTickLines: { width: 0 },
                    majorGridLines: { width: 1 },
                    minorGridLines: { width: 1 },
                    minorTickLines: { width: 0 },
                    // interval: 100,

                };
            }
            if (res) {
                this.isLoading = false;
            }
            // console.log(this.prYAxis.actualInterval)
            this.barChartData()
            // this.prYAxis['labelFormat'] = '${value}' + `${this.shortNumber}`;
        })
    }
    private getLabelFormat(): any {
        return (args: { value: number }) => {
            const value = args.value;
            if (value >= 1000000000) {
                return `${(value / 1000000000).toFixed(1)}B`;
            } else if (value >= 1000000) {
                return `${(value / 1000000).toFixed(1)}M`;
            } else if (value >= 1000) {
                return `${(value / 1000).toFixed(1)}k`;
            } else {
                return value.toString();
            }
        };
    }
    onSelectMonth(event: any) {
        this.currentYear = event.target.value;
        this.dashBoardChart()
        // this.getSrviceData(this.currentYear)
        // this.getAllChartData(this.selected)
    }
}
