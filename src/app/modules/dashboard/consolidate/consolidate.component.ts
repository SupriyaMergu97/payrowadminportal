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
import { HomeService } from 'src/app/services/home.service';
import { SignatureEncryptionService } from 'src/app/services/signature-encryption.service';

declare var jQuery: any;
@Component({
    selector: 'app-consolidate',
    templateUrl: './consolidate.component.html',
    styleUrls: ['./consolidate.component.scss']
})
export class ConsolidateComponent implements OnInit {

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
    selectedYear: any
    consolidatedData: any = []
    palette: String[];
    distributorId: any = 7123897
    years: any = []
    months: any = [
        { "month": "Jan", "id": 1 }, { "month": "Feb", "id": 2 }, { "month": "Mar", "id": 3 }, { "month": "Apr", "id": 4 },
        { "month": "May", "id": 5 }, { "month": "Jun", "id": 6 }, { "month": "Jul", "id": 7 }, { "month": "Aug", "id": 8 },
        { "month": "Sep", "id": 9 }, { "month": "Oct", "id": 10 }, { "month": "Nov", "id": 11 }, { "month": "Dec", "id": 12 },
    ]
    public csvOptions: any = {};

    consolidatedReports: String[] = ["TAP TO PAY", "CASH INVOICE", "TOTAL CREDIT", "TOTAL SEQUENCE", "TOTAL VAT", "PSP REVENUE"]
    allChartData: any = []
    chooseOpt: any = ["PDF", "CSV"]
    public chartData4: Array<any> =
        [{ x: 'Jan', y: 200 }, { x: 'Feb', y: 270 }, { x: 'Mar', y: 380 }, { x: 'Apr', y: 400 }, { x: 'May', y: 350 }, { x: 'Jun', y: 100 }, { x: 'Jul', y: 290 }, { x: 'Aug', y: 310 }, { x: 'Sep', y: 100 }, { x: 'Oct', y: 420 }, { x: 'Nov', y: 160 }, { x: 'Dec', y: 260 }];
    public chartData2: Array<any> = []
    public chartData3: Array<any> = []
    public chartData1: Array<any> = []
    //Initializing Primary X Axis

    data1: any;
    mainData: any[];
    data2: any;
    data3: any;

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
        labelFormat: '{value}'
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
    chartData5: any;
    isLoading: boolean=true;
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

    constructor(
        private app: AppManagerService, private bar_Service: BarServiceService, private home: HomeService,
        private admin: AdminAPIService, private opc_service: OpCenterService, private encryption: SignatureEncryptionService,
    ) {
        this.app.ShowReportDate = 'true';
    }
    value: any = Document
    currentYear: any
    ngOnInit(): void {
        this.loadScripts();

        this.currentYear = new Date().getFullYear();
        for (let i = 2021; i <= this.currentYear + 1; i++) {
            this.years.push({ year: i })
        }
        this.getSrviceData(this.currentYear)
        console.log(this.years, 'year')
        // if(this.donutData && this.donutData.length>0){
        //     this.donutData.map((x:any)=>{

        //         x.percent = Math.round(x.actual / x.target * 100);
        //         this.finalData.push(x);
        //     });
        // }
        // selectedYear=
        this.selected = new Date().toLocaleDateString('en', { month: 'short' });
        console.log(this.selected)
        // this.getConsolidateData();
        this.getConsolidateData(this.currentYear)
        // this.getConsolidatedData(this.selected)
        // this.getAllChartData(this.selected)
        // this.getData()
        this.palette = ["#929E89", "#AFCBBD", "#82A1A4", "#6DB0B6"];
        // this.onSelectItem()
        // this.prYAxis['maximum'] = 100
        // this.prYAxis['labelFormat'] = '${value}' + "k";
    }

    private loadScripts(): void {

        (($) => {
            'use strict';
            $('.knob').knob();

            $('#side_menu_bar > ul > li.nav-item > a').removeClass('active');
            $('#side_menu_bar > ul > li.nav-item > a#li_dashboard').addClass(
                'active'
            );
        })(jQuery);
        // $("#bar-graph").simpleBarGraph({
        //     data: randomData(),
        //     rowsCount: 8,
        //     height: "150px",
        //     rowCaptionsWidth: "20px",
        //     barsColor: "#72AC47"
        // })
    }
    ngAfterViewInit(): void {
        this.loadScripts();
    }

    async getSrviceData(year: any) {
        // this.finalData = [];
        let value = { year: year, did: null }
        let req = { data: this.encryption.encodeJsonObjectToHex(value) }
        let reqhead = this.encryption.createHeader();
        const key = this.encryption.generateKey(reqhead.key)
        this.home.consolidateChart(req, reqhead.headers).subscribe(async res => {
            if (res.success === true) {
                const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
                const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
                console.log(decryptedData)
                if (decryptedData) {
                    decryptedData.map((p: any) => {
                        if (p.type == "Cash") { this.chartData1 = p.data }
                        else if (p.type == "Paybylink") { this.chartData2 = p.data }
                        else if (p.type == "generateQR") { this.chartData3 = p.data }
                        else if (p.type == "Card") { this.chartData4 = p.data }
                        else if (p.type == "ECOMMERCE") { this.chartData5 = p.data }
                    })
                }
                if (res) {
                    this.isLoading = false;
                }
            }
        })
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
        this.currentYear = event.target.value;
        this.getConsolidateData(this.currentYear)
        this.getSrviceData(this.currentYear)
        // this.getAllChartData(this.selected)
    }
    onSelectReport(e: any) {
        this.choose = e.target.value;
    }

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

    async getConsolidateData(year: any) {
        this.consolidatedData = [];
        let value = { year: year, did: null }
        //Total credit
        let req = { data: this.encryption.encodeJsonObjectToHex(value) }
        let reqhead = this.encryption.createHeader();
        const key = this.encryption.generateKey(reqhead.key)
        this.home.getAllProductValues(req, reqhead.headers).subscribe(async res => {
            if (res.success === true) {
                console.log(res.data)

                const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
                const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
                console.log(decryptedData)
                if (decryptedData) {
                    decryptedData.map((d: any) => {
                        d.color = "#60CBAB"
                        if (d.type == "Total Revenue") { this.consolidatedData.push(d) }
                        else if (d.type == "PSP Revenue") { this.consolidatedData.push(d) }
                        else if (d.type == "No.of MID") { this.consolidatedData.push(d) }
                        else if (d.type == "NO.of TID") { this.consolidatedData.push(d) }
                        else if (d.type == "Tap to Pay") { this.consolidatedData.push(d) }
                        else if (d.type == "Cash Invoice") { this.consolidatedData.push(d) }
                        else if (d.type == "Pay by Link") { this.consolidatedData.push(d) }
                        else if (d.type == "Pay by QRCode") { this.consolidatedData.push(d) }
                        else if (d.type == "Total Sequence") { this.consolidatedData.push(d) }
                        else if (d.type == "Total Items") { this.consolidatedData.push(d) }
                        else if (d.type == "Total Downloads") { this.consolidatedData.push(d) }
                        else if (d.type == "ECOMMERCE") { this.consolidatedData.push({ type: "Payment Gateway", actual: d.actual, target: d.target, percent: d.percent }) }
                    })
                    console.log(this.consolidatedData)
                    this.consolidatedData.map((d: any) => {
                        const tempVal = 100 - d.percent;
                        d.doNut = `${d.percent} ${tempVal}`
                        d.svgImg = "assets/images/credit.png"
                    })
                    // this.consolidatedData.push({ type: "TOTAL REVENUE", actual: data.actual, target: data.target, color: "#6CB49C" })
                    // //Total Vat
                    // this.consolidatedData.push({ type: "TOTAL VAT", actual: vatActual, target: data.target, color: "#AACC00" })
                    // //Total Revenue
                    // this.consolidatedData.push({ type: "PSP REVENUE", actual: pspRevActual, target: data.target, color: "#6E82DB" })
                }
            }
        })

    }





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
