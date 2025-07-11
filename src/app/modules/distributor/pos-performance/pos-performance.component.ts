import { Component, OnInit } from '@angular/core';
import { AppManagerService } from 'src/app/core/services/app-manager.service';
import * as _ from 'lodash';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
import { BarServiceService } from 'src/services/bar-service.service';
import { AdminAPIService } from 'src/app/services/admin-api.service';
import { HttpClient, HttpParams } from '@angular/common/http';


declare var jQuery: any;

@Component({
    selector: 'app-pos-performance',
    templateUrl: './pos-performance.component.html',
    styleUrls: ['./pos-performance.component.scss']
})
export class PosPerformanceComponent implements OnInit {

    constructor(
        private app: AppManagerService, private bar_service: BarServiceService, private admin: AdminAPIService,
        private http: HttpClient
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
    tapToPayData: any = [];
    posDetails: any = []

    ngOnInit(): void {
        this.selected = new Date().toLocaleDateString(undefined, { month: 'short' });
        this.getPosData();
        this.getPosFData(this.selected)
        this.loadjQueryScripts()
    }

    private loadjQueryScripts(): void {
        (function ($) {
            "use strict";
            $('.knob').knob();

            $('#side_menu_bar > ul > li.nav-item > a').removeClass("active");
            $('#side_menu_bar > ul > li.nav-item > a#li_distributor').addClass("active");
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
        if (this.posDetails) {
            this.posDetails.map((csv: any) => {
                let Obj: any = {};
                Obj['date'] = csv._id.date;
                Obj['time'] = csv._id.date;
                Obj['payment_type'] = csv.paymentType;
                Obj['posType'] = csv._id.posType;
                Obj['pos_id'] = csv._id.posId
                Obj['item'] = csv._id.typeOfOrder
                Obj['email_id'] = csv._id.posEmail
                Obj['mobile'] = csv._id.posMobile
                Obj['sequence_no'] = csv._id.invoiceNumber
                Obj['receipt_no'] = csv._id.invoiceNumber
                Obj['vat'] = csv.vat
                Obj['total_credit'] = csv._id.cash
                this.csvData = [...this.csvData, Obj];
            })
        }
        const options = {
            title: '', fieldSeparator: ',', quoteStrings: '"', decimalseparator: '.', showLabels: true, showTitle: true,
            headers: ['date', 'time', 'payment_type', 'user_id', 'pos_id', 'item', 'email_id', 'mobile', 'sequence_no', 'receipt_no', 'vat', 'total_credit']
        };
        this.csvOptions = options;
        this.report_title = 'POS Details';

        new AngularCsv(this.csvData, this.report_title, this.csvOptions);

        this.loadjQueryScripts();
    }

    async getPosData() {
        // this.http.get<any[]>('assets/data.json').subscribe(
        this.http.get<any>('../admin/assets/jsons/posPerformance.json').subscribe(
            (data) => {
                this.tapToPayData = data;
                console.log('JSON Data:', this.tapToPayData);
            },
            (error) => {
                console.error('Error fetching JSON:', error);
            }
        );
        // await this.bar_service.getPosPerformanceData().then(data => {
        //     this.tapToPayData = data;
        // });
        this.getPosFData(this.selected)

    }
    // async getPosdataByDid(month: any) {
    //     this.posDetails = []
    //     let value: any
    //     let did: any = 7123897
    //     this.months.map((mData: any) => {
    //         if (month === mData.month) {
    //             this.admin.getTapToPayDetailsByDid(did,mData.id).subscribe(data => {
    //                 if (data) {
    //                     console.log(data)
    //                     data.map((tData: any) => {
    //                         let vat = (tData._id.tapValue * 5) / 100
    //                         tData.vat = vat
    //                         tData.paymentType = "Tap to Pay"
    //                         tData._id.cash = tData._id.tapValue
    //                         // console.log(tData)
    //                         this.posDetails.push(tData)
    //                         console.log(this.posDetails)
    //                     })
    //                 }
    //             })
    //             this.admin.getcashDetailsByDid(did,mData.id).subscribe(data => {
    //                 if (data) {
    //                     console.log(data)
    //                     data.map((cData: any) => {
    //                         let vat = (cData._id.cash * 5) / 100
    //                         cData.vat = vat
    //                         cData.paymentType = "Cash"
    //                         // console.log(cData)
    //                         this.posDetails.push(cData)
    //                         console.log(this.posDetails)
    //                     });
    //                 }
    //             })
    //         }
    //     })
    // }
    async getPosdata(month: any) {
        this.posDetails = []
        let value: any
        this.months.map((mData: any) => {
            if (month === mData.month) {
                this.admin.getTapToPayDetails(mData.id).subscribe(data => {
                    if (data) {
                        data.map((tData: any) => {
                            let vat = (tData.value.tapValue * 5) / 100
                            tData.vat = vat
                            tData.paymentType = "Tap to Pay"
                            tData.cash = tData.value.tapValue
                            // console.log(tData)
                            this.posDetails.push(tData)
                        })
                    }
                })
                this.admin.getcashDetails(mData.id).subscribe(data => {
                    if (data) {
                        data.map((cData: any) => {
                            let vat = (cData.value.cashValue * 5) / 100
                            cData.vat = vat
                            cData.paymentType = "Cash"
                            cData.cash = cData.value.cashValue
                            // console.log(cData)
                            this.posDetails.push(cData)
                        });
                    }
                })
            }
        })
    }
    onSelectMonth(event: any) {
        this.selected = event.target.value;
        this.getPosFData(this.selected)
    }

    async getPosFData(month: any) {
        this.finalData = [];
        await this.tapToPayData.map((mData: any) => {
            if (month === mData.month) {
                mData.data.map((fData: any) => {

                    this.finalData.push(fData);
                })
            }
        })
    }

}
