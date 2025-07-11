import { Component, OnInit } from '@angular/core';
import { AppManagerService } from 'src/app/core/services/app-manager.service';
import * as _ from 'lodash';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
import { BarServiceService } from 'src/services/bar-service.service'
import { HttpClient } from '@angular/common/http';
declare var jQuery: any;

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {

    constructor(
        private app: AppManagerService,private bar_service: BarServiceService,private http:HttpClient
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
    public month: any;
    public expensesData:any = []

    ngOnInit(): void {
        this.selected = new Date().toLocaleDateString(undefined, { month: 'short' });
        this.getExpensesData();
        this.loadScripts();
    }

    

    private loadScripts(): void {
        (function($) {
        "use strict";

        $('#side_menu_bar > ul > li.nav-item > a').removeClass("active");
        $('#side_menu_bar > ul > li.nav-item > a#li_expenses').addClass("active");

    
        })(jQuery);
    }
    sortOrders(prop: any) {
        this.sortType = prop;
        this.expensesData = this.sortReverse === false ?
            _.orderBy(this.expensesData, [prop], ['desc']) :
            _.orderBy(this.expensesData, [prop], ['asc']);
        this.sortReverse = !this.sortReverse;
    }

    reportDownload() {
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
        this.report_title = 'Expenses';

        new AngularCsv(this.csvData, this.report_title, this.csvOptions);
    }

    async getExpensesData() {
        this.http.get<any>('../admin/assets/jsons/posPerformance.json').subscribe(
            (data) => {
                this.expensesData = data;
                console.log('JSON Data:', this.expensesData);
            },
            (error) => {
                console.error('Error fetching JSON:', error);
            }
        );
        this.getfexpensesData(this.selected)

    }
    onSelectMonth(event: any) {
        this.selected = event.target.value;
        this.getfexpensesData(this.selected)
    }

    async getfexpensesData(month: any) {
        this.finalData = [];
        await this.expensesData.map((mData: any) => {
            if (month === mData.month) {
                mData.data.map((fData: any) => {
                    this.finalData.push(fData);
                })
            }
        })
    }
}
