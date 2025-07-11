import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartTheme, ILoadedEventArgs } from '@syncfusion/ej2-angular-charts';
declare var jQuery: any;

@Component({
  selector: 'app-smb',
  templateUrl: './smb.component.html',
  styleUrls: ['./smb.component.scss']
})
export class SmbComponent implements OnInit {

  maxValue: any;
    isGatwayURL: Boolean = false;
    toggleButton: boolean = true;
    toggleQuater: boolean = true;
    toggleStatus: boolean = true;
    btnVal: string = "Update";
    Qbtn: string = "Update";
    StatusBtn: string = "Update";
    finalData: any = [];
    finalQuarterData: any = [];
    finalDonutchart: any = [];
    data: any = [];
    shortNumber: any;
    constructor(private router: Router) { }

    public quarterData: any = [
        { quarterTitle: 'Q1' },
        { quarterTitle: 'Q2' },
        { quarterTitle: 'Q3' },
        { quarterTitle: 'Q4' }
    ];


    public donutDataPaymentGWay: any = [
        { dounttitle: "Govt", svgImg: 'assets/images/credit.png', value: 2000, color: '#95D67B', target: 20000000, actual: 16000000, percent: null },
        { dounttitle: "EnterPrise", svgImg: 'assets/images/credit.png', value: 10000, color: '#6CB49C', target: 100000000, actual: 75000000, percent: null },
        { dounttitle: "SMB", svgImg: 'assets/images/credit.png', value: 1000, color: '#AACC00', target: 10000000, actual: 70000000, percent: null },
        { dounttitle: "Cross Border", svgImg: 'assets/images/credit.png', value: 500, color: '#3F88A9', target: 500000000, actual: 300000000, percent: null }
    ]

    public yearlyData: any = [
        { id: 1, target: 1100000, actual: 11000, month: 'Jan' }, { id: 2, target: 1500000, actual: 11000, month: 'Feb' }, { id: 3, target: 1200000, actual: 14000, month: 'Mar' },
        { id: 4, target: 1400000, actual: 10000, month: 'Apr' }, { id: 5, target: 1400000, actual: 24000, month: 'May' }, { id: 6, target: 1100000, actual: 11000, month: 'Jun' },
        { id: 7, target: 1100000, actual: 18000, month: 'Jul' }, { id: 8, target: 1100000, actual: 17090, month: 'Aug' }, { id: 9, target: 1400000, actual: 14909, month: 'Sep' },
        { id: 10, target: 1100000, actual: 23000, month: 'Oct' }, { id: 11, target: 3600000, actual: 22000, month: 'Nov' }, { id: 12, target: 2800000, actual: 12098, month: 'Dec' },
    ]
    
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
    public prYAxis: any = {
        lineStyle: { width: 0 },
        minimum: 0,
        //maximum: 25,
        interval: 5,
        majorTickLines: { width: 0 },
        majorGridLines: { width: 1 },
        minorGridLines: { width: 0 },
        minorTickLines: { width: 0 },
        labelFormat: '${value} M',
      };
    public radius: Object = { bottomLeft: 0, bottomRight: 0, topLeft: 5, topRight: 5 }
    public marker: Object = { dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }
    public title: string = '';
    public tooltip: Object = {
        enable: false,
    };
    public legend: Object = {
        visible: false,
    };
    public chartArea: Object = {
        border: {
            width: 0,
        },
    };
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
    ngOnInit(): void {
        this.barChartData();
        this.donutChartsData();
        // this.prYAxis['maximum'] = 30
        this.prYAxis['labelFormat'] = '${value}' + `${this.shortNumber}`;

    }

    private loadjQueryScripts(): void {
        (($) => {
            "use strict";
            $('.knob').knob();

            $('#side_menu_bar > ul > li.nav-item > a').removeClass("active");
            $('#side_menu_bar > ul > li.nav-item > a#li_payment_gateway').addClass("active");
        })(jQuery);
    }
    barChartData() {
        this.finalData = [];
        this.finalQuarterData = [];
        this.data = [];
        let max: any;
        if (this.yearlyData && this.yearlyData.length > 0) {
            this.yearlyData.map((x: any) => {
                const Obj: any = {};
                x.percent = Math.round(x.actual / x.target * 100);
                this.finalData.push(x);
                Obj.x = x.month;
                Obj.y = x.actual / 1000;
                this.data = [...this.data, Obj];

                for (let i in this.quarterData) {
                    this.quarterData[i].quarter =
                        this.quarterData[i].quarterTitle === "Q1" ? this.yearlyData.slice(0, 3) :
                            this.quarterData[i].quarterTitle === "Q2" ? this.yearlyData.slice(3, 6) :
                                this.quarterData[i].quarterTitle === "Q3" ? this.yearlyData.slice(6, 9) : this.yearlyData.slice(9, 12);
                }
            });
            max = this.yearlyData.reduce(function (prev: any, current: any) {
                return (prev.actual > current.actual) ? prev : current
            });
            this.maxValue = max.actual

        }
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
        this.shortNumber = this.shortNumberFunc(max.actual);
    }
    shortNumberFunc(value: any) {
        if (value === null) return null;
        if (value === 0) return "0";
        var fractionSize = 1;
        var abs = Math.abs(value);
        var rounder = Math.pow(10, fractionSize);
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
                key = powers[i].key;
                break;
            }
        }
        return (isNegative ? '-' : '') + key;
    }

    ngAfterViewInit(): void {

        const curUrl = this.router.url;
        const URLs = ['/payment-gateway/govt', '/payment-gateway/enterprise', '/payment-gateway/smb', '/payment-gateway/cross-border']
        if (URLs.indexOf(curUrl) !== -1)
            this.isGatwayURL = true
        else
            this.isGatwayURL = false

        this.loadjQueryScripts();

    }


    // Enable & Disable Target function

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
        this.yearlyData.map((yrData: any) => {
            if (row.id === yrData.id) {
                yrData.target = parseInt(row.target)
            }
        });
        this.donutDataPaymentGWay.map((donutrow: any) => {
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
    donutChartsData() {
        this.finalDonutchart=[];
        if (this.donutDataPaymentGWay && this.donutDataPaymentGWay.length > 0) {
            this.donutDataPaymentGWay.map((x: any) => {
                x.percent = Math.round(x.actual / x.target * 100);
                const tempVal = 100 - x.percent;
                x.doNut = `${x.percent} ${tempVal}`
                this.finalDonutchart.push(x);            })
        }
    }
}

