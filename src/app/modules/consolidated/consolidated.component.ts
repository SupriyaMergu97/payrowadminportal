import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppManagerService } from 'src/app/core/services/app-manager.service';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
import { BarServiceService } from 'src/services/bar-service.service';
import { AdminAPIService } from 'src/app/services/admin-api.service';
import { HttpParams } from '@angular/common/http';
import { Browser } from '@syncfusion/ej2-base';
import {
    ILoadedEventArgs,
    ChartComponent,
    ChartTheme,
    IPointRenderEventArgs,
    ITooltipRenderEventArgs,
} from '@syncfusion/ej2-angular-charts';
import { OpCenterService } from 'src/app/services/op-center.service';

declare var jQuery: any;

@Component({
    selector: 'app-consolidated',
    templateUrl: './consolidated.component.html',
    styleUrls: ['./consolidated.component.scss']
})
export class ConsolidatedComponent implements OnInit {
    @ViewChild('pdfTable', { static: false }) pdfTable: ElementRef;
    finalData: any = [];
    report_title: string;
    public month: any;
    public csvData: any = [];
    public allDonutData: any = [];
    public choose: string = 'CSV';
    donutDFinal: any = [];
    uniqueData: any = []
    selected: any
    selectedOpt: any
    consolidatedData: any = []
    palette: String[];
    distributorId: any = 7123897
    months: any = [
        { "month": "Jan", "id": 1 }, { "month": "Feb", "id": 2 }, { "month": "Mar", "id": 3 }, { "month": "Apr", "id": 4 },
        { "month": "May", "id": 5 }, { "month": "Jun", "id": 6 }, { "month": "Jul", "id": 7 }, { "month": "Aug", "id": 8 },
        { "month": "Sep", "id": 9 }, { "month": "Oct", "id": 10 }, { "month": "Nov", "id": 11 }, { "month": "Dec", "id": 12 },
    ]
    public csvOptions: any = {};

    consolidatedReports: String[] = ["TAP TO PAY", "CASH INVOICE", "TOTAL CREDIT", "TOTAL SEQUENCE", "TOTAL VAT", "PSP REVENUE"]
    allChartData: any = []
    chooseOpt: any = ["PDF", "CSV"]
    public chartData1: Array<any> = []
    // [{ x: 'Jan', y: 20 }, { x: 'Feb', y: 27 }, { x: 'Mar', y: 38 }, { x: 'Apr', y: 40 }, { x: 'May', y: 35 }, { x: 'Jun', y: 10 }, { x: 'Jul', y: 29 }, { x: 'Aug', y: 31 }, { x: 'Sep', y: 10 }, { x: 'Oct', y: 42 }, { x: 'Nov', y: 16 }, { x: 'Dec', y: 26 }];
//Initializing Primary X Axis
public primaryXAxis: Object = {
    valueType: 'Category',
    labelIntersectAction: 'Rotate45',
    majorGridLines: { width: 0 },
    minorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
};

//Initializing Primary Y Axis
public primaryYAxis: Object = {
    title: 'GDP (%) per Annum',
    rangePadding: 'None',
    interval: 20,
    majorTickLines: { width: 0 },
    majorGridLines: { width: 1, color:'lightgray', dashArray:4 },
    // gridLines: {borderDash: [4, 1]},
    minorGridLines: { width: 1 },
    minorTickLines: { width: 0 },
    lineStyle: {
        width: 0
    }
};
public tooltip: Object = {
    enable: true,
    format: '${point.x} : <b>${point.y} (${point.percentage}%)</b>'
};
public chartArea: Object = {
    border: {
        width: 0
    }
};


 // custom code start
public width: string = Browser.isDevice ? '100%' : '94%';

public load(args: ILoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
};
    public prXAxis: Object = {
        majorGridLines: { width: 0 },
        minorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
        interval: 1,
        maximum: 32,
        lineStyle: { width: 0 },
        // valueType: 'Category',
    };
    //Initializing Primary Y Axis
    public prYAxis: any = {
        lineStyle: { width: 0 },
        minimum: 0,
        maximum: 10000,
        interval: 5,
        rangePadding: 'None',
        majorTickLines: { width: 0 },
        majorGridLines: { width: 1 },
        minorGridLines: { width: 0 },
        minorTickLines: { width: 0 },

    };
    public radius: Object = { bottomLeft: 0, bottomRight: 0, topLeft: 5, topRight: 5 }
    public marker: Object = { dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }
    public title: string = '';
    // public tooltip: Object = {
    //     enable: true
    // };
    public legend: Object = {
        visible: false
    }
    // public chartArea: Object = {
    //     border: {
    //         width: 0
    //     }
    // };
    // public width: string = Browser.isDevice ? '100%' : '98%';    // custom code start
    // public load(args: ILoadedEventArgs): void {
    //     let selectedTheme: string = location.hash.split('/')[1];
    //     selectedTheme = selectedTheme ? selectedTheme : 'Material';
    //     args.chart.theme = <ChartTheme>(
    //         (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(
    //             /-dark/i,
    //             'Dark'
    //         )
    //     );
    // }
    constructor(
        private app: AppManagerService, private bar_Service: BarServiceService,
        private admin: AdminAPIService, private opc_service: OpCenterService
    ) {
        this.app.ShowReportDate = 'true';
    }
    value: any = Document

    ngOnInit(): void {


        // if(this.donutData && this.donutData.length>0){
        //     this.donutData.map((x:any)=>{

        //         x.percent = Math.round(x.actual / x.target * 100);
        //         this.finalData.push(x);
        //     });
        // }
        //this.loadScripts();
        this.selected = new Date().toLocaleDateString('en', { month: 'short' });
        console.log(this.selected)
        // this.getConsolidateData();
        this.getConsolidatedData(this.selected)
        this.getAllChartData(this.selected)
        // this.getData()
        this.palette = ["#72AC47", "#406326", "#204406"];
        // this.onSelectItem()
        // this.prYAxis['maximum'] = 100
        // this.prYAxis['labelFormat'] = '${value}' + "k";
    }

    private loadScripts(): void {

        (function ($) {
            "use strict";
            $('.knob').knob();

            $('#side_menu_bar > ul > li.nav-item > a').removeClass("active");
            $('#side_menu_bar > ul > li.nav-item > a#li_consolidated').addClass("active");

            var randomData = function () {
                return [{
                    key: "01",
                    value: Math.floor(100 * Math.random() + 20)
                }, {
                    key: "02",
                    value: Math.floor(100 * Math.random() + 20)
                }, {
                    key: "03",
                    value: Math.floor(100 * Math.random() + 20)
                }, {
                    key: "04",
                    value: Math.floor(100 * Math.random() + 20)
                }, {
                    key: "05",
                    value: Math.floor(100 * Math.random() + 20)
                }, {
                    key: "06",
                    value: Math.floor(100 * Math.random() + 20)
                }, {
                    key: "07",
                    value: Math.floor(100 * Math.random() + 20)
                }, {
                    key: "08",
                    value: Math.floor(100 * Math.random() + 20)
                }, {
                    key: "09",
                    value: Math.floor(100 * Math.random() + 20)
                }, {
                    key: "10",
                    value: Math.floor(100 * Math.random() + 20)
                }, {
                    key: "11",
                    value: Math.floor(100 * Math.random() + 20)
                }, {
                    key: "12",
                    value: Math.floor(100 * Math.random() + 20)
                }, {
                    key: "13",
                    value: Math.floor(100 * Math.random() + 20)
                }, {
                    key: "14",
                    value: Math.floor(100 * Math.random() + 20)
                }, {
                    key: "15",
                    value: Math.floor(100 * Math.random() + 20)
                }, {
                    key: "16",
                    value: Math.floor(100 * Math.random() + 20)
                }, {
                    key: "17",
                    value: Math.floor(100 * Math.random() + 20)
                }, {
                    key: "18",
                    value: Math.floor(100 * Math.random() + 20)
                }, {
                    key: "19",
                    value: Math.floor(100 * Math.random() + 20)
                }, {
                    key: "20",
                    value: Math.floor(100 * Math.random() + 20)
                }, {
                    key: "21",
                    value: Math.floor(100 * Math.random() + 20)
                }, {
                    key: "22",
                    value: Math.floor(100 * Math.random() + 20)
                }, {
                    key: "23",
                    value: Math.floor(100 * Math.random() + 20)
                }, {
                    key: "24",
                    value: Math.floor(100 * Math.random() + 20)
                }, {
                    key: "25",
                    value: Math.floor(100 * Math.random() + 20)
                }, {
                    key: "26",
                    value: Math.floor(100 * Math.random() + 20)
                }, {
                    key: "27",
                    value: Math.floor(100 * Math.random() + 20)
                }, {
                    key: "28",
                    value: Math.floor(100 * Math.random() + 20)
                }, {
                    key: "29",
                    value: Math.floor(100 * Math.random() + 20)
                }, {
                    key: "30",
                    value: Math.floor(100 * Math.random() + 20)
                },

                ]
            }

            $("#bar-graph").simpleBarGraph({
                data: randomData(),
                rowsCount: 8,
                height: "150px",
                rowCaptionsWidth: "20px",
                barsColor: "#72AC47"
            })

        })(jQuery);
    }
    ngAfterViewInit(): void {
        this.loadScripts();
    }

    chartData() {

    }
    onSelectItem(event: any) {
        this.chartData1 = [];
        this.selectedOpt = event.target.value;
        this.allChartData.map((cData: any) => {
            if (this.selectedOpt === cData.type) {
                cData.data.map((data: any) => {
                    this.chartData1.push(data)
                })
            }
        })
    }
    getAllChartData(month: any) {
        this.allChartData = []
        let distributorId: any = 7123897
        let taptoPay: any = []
        let cashInvoice: any = []
        let totalCredit: any = []
        let pspRevenue: any = []
        let totalvat: any = []
        let totSeq: any = []
        this.months.map((mData: any) => {
            if (month === mData.month) {
                // let params = new HttpParams();
                // params = params.append('id', mData.id)
                // params = params.append("distributorId", distributorId);
                // const value = 1
                // this.admin.getConsDailyByDid(distributorId,mData.id).subscribe(data => {
                for (let i = 1; i <= 31; i++) {
                    let x: any = 0
                    if (i === 10) {
                        x = i
                        taptoPay.push({ x: i, y: 30 })
                        cashInvoice.push({ x: i, y: 40 })
                        totalCredit.push({ x: i, y: 70 })
                        totSeq.push({ x: i, y: 5 })
                        totalvat.push({ x: i, y: (70 * 5) / 100 })
                        pspRevenue.push({ x: i, y: (70 * 1.8) / 100 })
                    }
                    else if (i === 6) {
                        x = i
                        taptoPay.push({ x: i, y: 40 })
                        cashInvoice.push({ x: i, y: 50 })
                        totalCredit.push({ x: i, y: 90 })
                        totSeq.push({ x: i, y: 5 })
                        totalvat.push({ x: i, y: (90 * 5) / 100 })
                        pspRevenue.push({ x: i, y: (90 * 1.8) / 100 })
                    }
                    // data.data.map((mData: any) => {
                    //     if (i === mData._id.day) {
                    //         x = i
                    //         taptoPay.push({ x: mData._id.day, y: mData.tapValue }),
                    //             cashInvoice.push({ x: mData._id.day, y: mData.cashValue })
                    //         totalCredit.push({ x: mData._id.day, y: mData.CREDIT })
                    //         totSeq.push({ x: mData._id.day, y: mData.count })
                    //         totalvat.push({ x: mData._id.day, y: (mData.CREDIT * 5) / 100 })
                    //         pspRevenue.push({ x: mData._id.day, y: (mData.CREDIT * 1.8) / 100 })
                    //     }
                    // })
                    // if (x === 0) {
                    else {
                        taptoPay.push({ x: i, y: 0 }),
                            cashInvoice.push({ x: i, y: 0 })
                        totalCredit.push({ x: i, y: 0 })
                        totSeq.push({ x: i, y: 0 })
                        totalvat.push({ x: i, y: 0 })
                        pspRevenue.push({ x: i, y: 0 })
                    }
                    this.prYAxis['maximum'] = 80
                    this.prYAxis['labelFormat'] = '${value}' + "k";
                }
                // })
            }
        })
        this.allChartData.push({ type: "TAP TO PAY", data: taptoPay },
            { type: "CASH INVOICE", data: cashInvoice },
            { type: "TOTAL CREDIT", data: totalCredit },
            { type: "TOTAL SEQUENCE", data: totSeq },
            { type: "TOTAL VAT", data: totalvat },
            { type: "PSP REVENUE", data: pspRevenue }
        )
        this.getData()
    }
    getData() {
        this.chartData1 = []
        this.selectedOpt = this.allChartData[0].type
        if (this.selectedOpt === this.allChartData[0].type) {
            // this.allChartData[0].data.map((data:any)=>{
            // this.chartData1.push(data)
            this.chartData1 = this.allChartData[0].data
            // })
        }
    }
    pdfData: any = []
    downloadCSV(title: any) {
        this.csvData = [];
        let Obj: any = {};
        if (this.finalData) {
            this.finalData.map((csv: any) => {
                if (title === csv.type) {
                    Obj.type = csv.type;
                    Obj.target = csv.target;
                    Obj.actual = csv.actual;
                    Obj.percent = csv.percent;
                    this.csvData.push(Obj);
                }
            })
        }
        if (this.choose === "CSV") {
            const options = {
                title: '', fieldSeparator: ',', quoteStrings: '"', decimalseparator: '.', showLabels: true, showTitle: true, useBom: true,
                headers: ['Type', 'Target', 'Actual', 'Percent']
            };
            this.csvOptions = options;
            this.report_title = title;

            new AngularCsv(this.csvData, this.report_title, this.csvOptions);
        }
    }
    pdfFlag: boolean = false;
    downloadPDF(title: any) {
        this.pdfFlag = true;
        this.pdfData = [];
        let Obj: any = {};
        if (this.finalData) {
            this.finalData.map((csv: any) => {
                if (title === csv.type) {
                    Obj.type = csv.type;
                    Obj.target = csv.target;
                    Obj.actual = csv.actual;
                    Obj.percent = csv.percent;
                    this.pdfData.push(Obj);
                }
            })
        }
    }

    onSelectMonth(event: any) {
        this.selected = event.target.value;
        this.getConsolidatedData(this.selected)
        this.getAllChartData(this.selected)
    }
    onSelectReport(e: any) {
        this.choose = e.target.value;
    }

    // async getfData(month: any) {
    //     this.finalData = [];
    //     await this.allDonutData.map((mData: any) => {
    //         if (month === mData.month) {
    //             mData.data.map((fData: any) => {
    //                 fData.percent = Math.round(fData.actual / fData.target * 100);
    //                 const tempVal = 100 - fData.percent;
    //                 fData.doNut = `${fData.percent} ${tempVal}`
    //                 this.finalData.push(fData);
    //             })
    //         }
    //     })
    //     // this.loadScripts()
    //     // this.finalData = this.finalData.slice(0,12);
    // }
    async getPerData() {
        this.finalData = []
        this.consolidatedData.map((mData: any) => {
            mData.percent = Math.round(mData.actual / mData.target * 100);
            const tempVal = 100 - mData.percent;
            mData.doNut = `${mData.percent} ${tempVal}`
            mData.svgImg = "assets/images/credit.png"
            this.finalData.push(mData);
        })
    }

    // async getConsolidatedDataByDid(month: any) {
    //     this.consolidatedData = []
    //     let value: any
    //     this.months.map((mData: any) => {
    //         if (month === mData.month) {
    //             //Total credit
    //             this.admin.getConsTotCreditByDid(this.distributorId,mData.id).subscribe(data => {
    //                 if (data) {
    //                     let vatActual = (data.actual * 5) / 100;
    //                     let pspRevActual = (data.actual * 1.8) / 100;
    //                     this.consolidatedData.push({ type: "TOTAL REVENUE", actual: data.actual, target: data.target, color: "#6CB49C" })
    //                     //Total Vat
    //                     this.consolidatedData.push({ type: "TOTAL VAT", actual: vatActual, target: data.target, color: "#AACC00" })
    //                     //Total Revenue
    //                     this.consolidatedData.push({ type: "PSP REVENUE", actual: pspRevActual, target: data.target, color: "#6E82DB" })
    //                 }
    //             })
    //             //Cash Invoice
    //             this.admin.getConsCashByDid(this.distributorId,mData.id).subscribe(data => {
    //                 if (data) {
    //                     this.consolidatedData.push({ type: "CASH INVOICE", actual: data.actual, target: data.target, color: "#71AA46" })
    //                 }
    //             })
    //             //Tap to pay
    //             this.admin.getConsTapByDid(this.distributorId,mData.id).subscribe(data => {
    //                 if (data) {
    //                     this.consolidatedData.push({ type: "TAP TO PAY", actual: data.actual, target: data.target, color: "#3F88A9" })
    //                 }
    //             })
    //             //Total Sequence
    //             this.admin.getConsTotOrderByDid(this.distributorId,mData.id).subscribe(data => {
    //                 if (data) {
    //                     this.consolidatedData.push({ type: "TOTAL SEQUENCE", actual: data.actual, target: data.target, color: "#E20613" })
    //                 }
    //             })
    //             //Total Downloads
    //             this.admin.getConsTotDownByDid(this.distributorId,mData.id).subscribe(data => {
    //                 if (data) {
    //                     this.consolidatedData.push({ type: "TOTAL DOWNLOADS", actual: data.actual, target: data.target, color: "#71AA46" })
    //                     //Miscellaneous
    //                     this.consolidatedData.push({ type: "MISCELLANEOUS", actual: 23732, target: 100000, color: "#6CB49C" })
    //                     //Consolidated Report
    //                     this.consolidatedData.push({ type: "CONSOLIDATE REPORT", actual: 78812, target: 100000, color: "#71AA46" })
    //                     //Subscriber Revenue
    //                     this.consolidatedData.push({ type: "SUBSCRIBER REVENUE", actual: 12183, target: 100000, color: "#F3C331" })
    //                     //WPS Transactions
    //                     this.consolidatedData.push({ type: "WPS TRANSACTION", actual: 68721, target: 100000, color: "#E20613" })
    //                     this.consolidatedData.push({ type: "TOTAL ITEMS", actual: 68721, target: 100000, color: "##6CB49C" })
    //                     this.getPerData()
    //                 }
    //             })
    //         }
    //     })
    // }
    async getConsolidatedData(month: any) {
        this.consolidatedData = []
        let value: any
        this.months.map((mData: any) => {
            if (month === mData.month) {
                //Total credit
                this.admin.getConsTotCredit(mData.id).subscribe(data => {
                    if (data) {
                        let vatActual = (data.actual * 5) / 100;
                        let pspRevActual = (data.actual * 1.8) / 100;
                        //Total credit
                        this.consolidatedData.push({ type: "TOTAL REVENUE", actual: data.actual, target: data.target, color: "#6CB49C" })
                        //Total Vat
                        this.consolidatedData.push({ type: "TOTAL VAT", actual: vatActual, target: data.target, color: "#AACC00" })
                        //Total Revenue
                        this.consolidatedData.push({ type: "PSP REVENUE", actual: pspRevActual, target: data.target, color: "#6E82DB" })
                    }
                })
                //Cash Invoice
                this.admin.getConsCash(mData.id).subscribe(data => {
                    if (data) {
                        this.consolidatedData.push({ type: "CASH INVOICE", actual: data.actual, target: data.target, color: "#71AA46" })
                    }
                })
                //Tap to pay
                this.admin.getConsTap(mData.id).subscribe(data => {
                    if (data) {
                        this.consolidatedData.push({ type: "TAP TO PAY", actual: data.actual, target: data.target, color: "#3F88A9" })
                    }
                })
                //Total Sequence
                this.admin.getConsTotOrder(mData.id).subscribe(data => {
                    if (data) {
                        this.consolidatedData.push({ type: "TOTAL SEQUENCE", actual: data.actual, target: data.target, color: "#E20613" })
                        // this.consolidatedData.push({ type: "TOTAL ITEMS", actual: 20, target: 1000, color: "##6CB49C" })
                        // this.consolidatedData.push({ type: "NO.OF USERS", actual: 30, target:1000, color: "#6CB49C" })
                        // this.consolidatedData.push({ type: "TOTAL DOWNLOADS", actual: 10, target: 100, color: "#71AA46" })
                        // this.consolidatedData.push({ type: "PG REVENUE", actual: 78812, target: 100000, color: "#71AA46" })
                        // this.consolidatedData.push({ type: "SUBSCRIBER REVENUE", actual: 12183, target: 100000, color: "#F3C331" })
                        // this.consolidatedData.push({ type: "WPS TRANSACTION", actual: 68721, target: 100000, color: "#E20613" })
                        // this.getPerData()
                    
                    }
                })
                // No.of users
                this.admin.getUsers(mData.id).subscribe(data => {
                    if (data) {
                        this.consolidatedData.push({ type: "NO.OF USERS", actual: data.data.actual, target: data.data.target, color: "#6CB49C" })
                    }
                })
                // Total Downloads
                this.opc_service.appDownloads().subscribe(res => {
                    if (res) {
                        console.log(res.data.types, '8691')
                        res.data.types.map((dData: any) => {
                            if (mData.month === dData.month) {
                                console.log(res.data.types)
                                this.consolidatedData.push({ type: "TOTAL DOWNLOADS", actual: dData.actual, target: 100, color: "#71AA46" })
                            }
                        })
                    }
                })
                this.admin.gettotItems(mData.id).subscribe(data => {
                    if (data) {
                        //Total Items
                        this.consolidatedData.push({ type: "TOTAL ITEMS", actual: data.data.actual, target: data.data.target, color: "##6CB49C" })
                        //PG Revenue
                        this.consolidatedData.push({ type: "PG REVENUE", actual: 78812, target: 100000, color: "#71AA46" })
                        //Subscriber Revenue
                        this.consolidatedData.push({ type: "SUBSCRIBER REVENUE", actual: 12183, target: 100000, color: "#F3C331" })
                        //WPS Transactions
                        this.consolidatedData.push({ type: "WPS TRANSACTION", actual: 68721, target: 100000, color: "#E20613" })
                        this.getPerData()
                    }
                })
            }
        })
    }
}
