import { Component, OnInit } from '@angular/core';
import { AppManagerService } from 'src/app/core/services/app-manager.service';
import * as _ from 'lodash';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
import { BarServiceService } from 'src/services/bar-service.service'
import { AdminAPIService } from 'src/app/services/admin-api.service';
import { HttpClient, HttpParams } from '@angular/common/http';
declare var jQuery: any;

@Component({
    selector: 'app-tap-to-pay',
    templateUrl: './tap-to-pay.component.html',
    styleUrls: ['./tap-to-pay.component.scss']
})
export class TapToPayComponent implements OnInit {

    constructor(
        private app: AppManagerService, private bar_service: BarServiceService, private admin: AdminAPIService,
        private http:HttpClient
    ) {
        this.app.ShowReportDate = 'true';
    }
    searchText: any;
    sortType: string;
    sortReverse: boolean = false;
    public csvOptions: any = {};
    public csvData: any = [];
    finalData: any = [];
    report_title: string;
    selected: any;
    months: any = [
        { "month": "Jan", "id": 1 }, { "month": "Feb", "id": 2 }, { "month": "Mar", "id": 3 }, { "month": "Apr", "id": 4 },
        { "month": "May", "id": 5 }, { "month": "Jun", "id": 6 }, { "month": "Jul", "id": 7 }, { "month": "Aug", "id": 8 },
        { "month": "Sep", "id": 9 }, { "month": "Oct", "id": 10 }, { "month": "Nov", "id": 11 }, { "month": "Dec", "id": 12 },
    ]
    public month: any;
    public tapToPayData: any = []
    public tapTopayData: any

    ngOnInit(): void {
        this.selected = new Date().toLocaleDateString(undefined, { month: 'short' });
        this.getTaptoPayData(this.selected);
        this.loadScripts();
        this.getTapTPData()
        // this.getTaptoPayData(this.selected)
        // this.getTaptoPayData();
        // if(this.tapToPayData && this.tapToPayData.length>0){
        //     this.tapToPayData.map((x:any)=>{

        //         x.percent = Math.round(x.actual / x.target * 100);
        //         this.finalData.push(x);
        //     });
        // }
    }

    private loadScripts(): void {
        (function ($) {
            "use strict";

            $('#side_menu_bar > ul > li.nav-item > a').removeClass("active");
            $('#side_menu_bar > ul > li.nav-item > a#li_tap_to_pay').addClass("active");
        })(jQuery);
    }

    sortOrders(prop: any) {
        this.sortType = prop;
        this.tapToPayData = this.sortReverse === false ?
            _.orderBy(this.tapToPayData, [prop], ['desc']) :
            _.orderBy(this.tapToPayData, [prop], ['asc']);
        this.sortReverse = !this.sortReverse;
    }

    downloadCSV() {
        this.csvData = [];
        if (this.finalData) {
            this.finalData.map((csv: any) => {
                let Obj: any = {};
                Obj['date'] = csv.date;
                Obj['time'] = csv.time;
                Obj['merchant_id'] = csv.merchant_id;
                Obj['posType'] = csv.posType;
                Obj['pos_id'] = csv.pos_id
                Obj['item'] = csv.item
                Obj['email_id'] = csv.email_id
                Obj['mobile'] = csv.mobile
                Obj['sequence_no'] = csv.sequence_no
                Obj['receipt_no'] = csv.receipt_no
                Obj['vat'] = csv.vat
                Obj['total_credit'] = csv.total_credit
                this.csvData = [...this.csvData, Obj];
            })
        }
        const options = {
            title: '', fieldSeparator: ',', quoteStrings: '"', decimalseparator: '.', showLabels: true, showTitle: true,
            headers: ['date', 'time', 'merchant_id', 'posType', 'pos_id', 'item', 'email_id', 'mobile', 'sequence_no', 'receipt_no', 'vat', 'total_credit']
        };
        this.csvOptions = options;
        this.report_title = 'tap to pay';

        new AngularCsv(this.csvData, this.report_title, this.csvOptions);
    }

    async getTapTPData() {
        this.http.get<any>('../admin/assets/jsons/posPerformance.json').subscribe(
            (data) => {
                this.tapToPayData = data;
                console.log('JSON Data:', this.tapToPayData);
            },
            (error) => {
                console.error('Error fetching JSON:', error);
            }
        );
    }
    // async getTaptoPayDatabyDid(month: any) {
    //     this.tapTopayData = []
    //     console.log(month)
    //     let value: any
    //     let did:any = 7123897
    //     this.months.map((mData: any) => {
    //         if (month === mData.month) {
    //             this.admin.getTapToPayDetailsByDid(did,mData.id).subscribe(data => {
    //                 if (data) {
    //                     console.log(data);
    //                     data.map((tData: any) => {
    //                         let vat = (tData._id.tapValue * 5) / 100;
    //                         tData.vat = vat;
    //                         this.tapTopayData.push(tData);
    //                         console.log(this.tapTopayData);
    //                     });
    //                 }
    //             })
    //         }
    //     })
    // }
    async getTaptoPayData(month: any) {
        this.tapTopayData = []
        console.log(month)
        let value: any
        this.months.map((mData: any) => {
            if (month === mData.month) {
                this.admin.getTapToPayDetails(mData.id).subscribe(data => {
                    if (data) {
                        data.map((tData: any) => {
                            let vat = (tData.value.tapValue * 5) / 100;
                            tData.vat = vat;
                            this.tapTopayData.push(tData);
                        });
                    }
                })
            }
        })
    }
    onSelectMonth(event: any) {
        this.selected = event.target.value;
        console.log(this.selected)
        // this.getfTapToPayData(this.selected)
        this.getTaptoPayData(this.selected)
    }

    async getfTapToPayData(month: any) {
        this.finalData = [];
        await this.tapToPayData.map((mData: any) => {
            if (month === mData.month) {
                mData.data.map((fData: any) => {
                    this.finalData.push(fData);
                    console.log(this.finalData)
                })
            }
        })
    }
}
