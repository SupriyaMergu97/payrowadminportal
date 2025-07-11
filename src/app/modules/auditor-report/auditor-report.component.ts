import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
import { AppManagerService } from 'src/app/core/services/app-manager.service';
import * as _ from 'lodash'
import {BarServiceService} from 'src/services/bar-service.service';
import { ILoadedEventArgs, ChartTheme, IPointRenderEventArgs } from '@syncfusion/ej2-angular-charts';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
@Component({
  selector: 'app-auditor-report',
  templateUrl: './auditor-report.component.html',
  styleUrls: ['./auditor-report.component.scss']
})
export class AuditorReportComponent implements OnInit {
  totalItems = 50; // Total number of items
  itemsPerPage = 10; // Default items per page
  currentPage = 1; // Current page
  initialPagesToShow = 5; // Number of pages to initially show
  currentPageRange: number[] = []; // Range o
  complaintsData: any = []
  distributorForm: FormGroup;
  searchText: any;
  public palette: String[];
  sortValue: any;
  sortType: string;
  sortReverse: boolean = false;
  complaintObj: any = []
  remarksoutData: any = [];
  public remarksMsg: any
  public finalTabularData: any = [];
  public finalData: any = [];
  selectedStatus: any = "";

  report_title: string;
	public jsonData: any = [];
  selected:any;
  merchant_identify:string;
  step = 1;
  csvData:any=[];
  months: any = [
    { "month": "Jan", "id": 1 }, { "month": "Feb", "id": 2 }, { "month": "Mar", "id": 3 }, { "month": "Apr", "id": 4 },
    { "month": "May", "id": 5 }, { "month": "Jun", "id": 6 }, { "month": "Jul", "id": 7 }, { "month": "Aug", "id": 8 },
    { "month": "Sep", "id": 9 }, { "month": "Oct", "id": 10 }, { "month": "Nov", "id": 11 }, { "month": "Dec", "id": 12 },
]
public month: any;
  public csvOptions: any = {};
  constructor(
    private app: AppManagerService, private fb: FormBuilder, private bar_srvc: BarServiceService
  ) {
    this.app.ShowReportDate = 'true';
  }
  status: any = [{ key: "Open", color: "green" }, { key: "Close", color: "Yellow" }, { key: "Dispute", color: "Red" }]
  public complaintsList: any = [
    { trn: 201, user_name: "Arvind", tapToPay: "989763", cashInvoice: "989763", expenses:"989763",totalVat:"989763", totCredit: 732984, attachment:"",reqNo:"123",delay: 7, status: "Open" },
    { trn: 202, user_name: "Sudhakar", tapToPay: "772598", cashInvoice: "772598", expenses:"772598", totalVat:"772598", totCredit: 987124, attachment:"",reqNo:"123",delay: 12, status: "Open" },
    { trn: 203, user_name: "Chandra", tapToPay: "874543", cashInvoice: "874543", expenses:"874543", totalVat:"874543", totCredit: 912739, attachment:"",reqNo:"123",delay: 5, status: "Dispute" },
    { trn: 204, user_name: "Sadhana", tapToPay: "653254", cashInvoice: "653254", expenses:"653254", totalVat:"653254", totCredit: 561433, attachment:"",reqNo:"123",delay: 10, status: "Open" },
    { trn: 205, user_name: "Vikram", tapToPay: "987585", cashInvoice: "987585", expenses:"987585", totalVat:"987585", totCredit: 614276, attachment:"",reqNo:"123",delay: 3, status: "Close" },
    { trn: 206, user_name: "Arun Kumar", tapToPay: "815746", cashInvoice: "815746", expenses:"815746", totalVat:"815746", totCredit: 187251, attachment:"",reqNo:"123",delay: 9, status: "Dispute" },
    { trn: 207, user_name: "Ram", tapToPay: "672379", cashInvoice: "672379", expenses:"672379", totalVat:"672379", totCredit: 986753, attachment:"",reqNo:"123",delay: 5, status: "Open" },
    { trn: 208, user_name: "Krishna", tapToPay: "953637", cashInvoice: "953637", expenses:"953637", totalVat:"953637", totCredit: 564365, attachment:"",reqNo:"123",delay: 10, status: "Close" },
    { trn: 209, user_name: "Prasd", tapToPay: "757258", cashInvoice: "757258", expenses:"757258", totalVat:"757258", totCredit: 635272, attachment:"",reqNo:"123",delay: 4, status: "Dispute" },
    { trn: 210, user_name: "RadheSyam", tapToPay: "958723", cashInvoice: "958723", expenses:"958723", totalVat:"958723", totCredit: 847982, attachment:"",reqNo:"123",delay: 11, status: "Open" },
    { trn: 211, user_name: "Kiran", tapToPay: "976563", cashInvoice: "976563", expenses:"976563", totalVat:"976563", totCredit: 416798, attachment:"",reqNo:"123",delay: 7, status: "Close" },
    { trn: 208, user_name: "Krishna", tapToPay: "953637", cashInvoice: "953637", expenses:"953637", totalVat:"953637", totCredit: 564365, attachment:"",reqNo:"123",delay: 10, status: "Close" },
    { trn: 209, user_name: "Prasd", tapToPay: "757258", cashInvoice: "757258", expenses:"757258", totalVat:"757258", totCredit: 635272, attachment:"",reqNo:"123",delay: 4, status: "Dispute" },
    { trn: 210, user_name: "RadheSyam", tapToPay: "958723", cashInvoice: "958723", expenses:"958723", totalVat:"958723", totCredit: 847982, attachment:"",reqNo:"123",delay: 11, status: "Open" },
    { trn: 211, user_name: "Kiran", tapToPay: "976563", cashInvoice: "976563", expenses:"976563", totalVat:"976563", totCredit: 416798, attachment:"",reqNo:"123",delay: 7, status: "Close" },
    { trn: 208, user_name: "Krishna", tapToPay: "953637", cashInvoice: "953637", expenses:"953637", totalVat:"953637", totCredit: 564365, attachment:"",reqNo:"123",delay: 10, status: "Close" },
    { trn: 209, user_name: "Prasd", tapToPay: "757258", cashInvoice: "757258", expenses:"757258", totalVat:"757258", totCredit: 635272, attachment:"",reqNo:"123",delay: 4, status: "Dispute" },
    
  ]

  public remarksData: any = [];

  public radius: Object = { bottomLeft: 0, bottomRight: 0, topLeft: 5, topRight: 5 }
  // months: String[] = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', ' Nov', 'Dec'];
  public tooltip: Object = {
    enable: true
  };
  public title: string = '';
  public legend: Object = {
    visible: false
  }
  public chartArea: Object = {
    border: {
      width: 0
    }
  };

  ngOnInit(): void {
    this.month = new Date().toLocaleDateString('en', { month: 'short' });
    console.log("####################################", new Date().toISOString().slice(0, 10));
    this.getcomplaintsData();
    this.complaintsList;
    this.updatePageRange();
  }

  ngAfterViewInit(): void {

    this.loadScripts()
  }
  public randomIntFromInterval(min: any, max: any): any { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  private loadScripts(): void {
    (function ($) {
      "use strict";
      $('.knob').knob();

      $('#side_menu_bar > ul > li.nav-item > a').removeClass("active");
      $('#side_menu_bar > ul > li.nav-item > a#li_aud_report').addClass("active");
    })(jQuery);
  }
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

  sortOrders(prop: any) {
    this.sortType = prop;
    this.complaintsList = this.sortReverse === false ?
      _.orderBy(this.complaintsList, [prop], ['desc']) :
      _.orderBy(this.complaintsList, [prop], ['asc']);
    this.sortReverse = !this.sortReverse;
  }


  sort(event: any) {
    if (event) {
      this.sortValue = event;
    }
    this.complaintsList = event === "A to Z" ? _.orderBy(this.complaintsList, [(obj) => obj['cust_name'].toLowerCase()], ['asc'])
      : event === "Z to A" ? _.orderBy(this.complaintsList, [(obj) => obj['cust_name'].toLowerCase()], ['desc'])
        : event === "date_low" ? _.orderBy(this.complaintsList, ['date'], ['asc'])
          : _.orderBy(this.complaintsList, ['date'], ['desc'])
  }

  async getcomplaintsData() {
    this.complaintsList.map((data: any) => {
      data.color = data.status === 'Dispute' ? 'red' : data.status === 'Close' ? 'green' : 'yellow'
    })
  }

  getPageNumbers(): number[] {
    const totalPages = this.getTotalPages();
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  getTotalPages(): number {
    return Math.ceil(this.complaintsList.length / this.itemsPerPage);
  }

  changePage(pageNum: number) {
    if (pageNum >= 1 && pageNum <= this.getTotalPages()) {
      this.currentPage = pageNum;
      // Load data for the selected page
      this.updatePageRange(); // Update the page range after changing the page
    }
  }

  updatePageRange() {
    const totalPages = this.getTotalPages();
    const currentPageIndex = this.currentPage - 1;
    const maxPageIndex = totalPages - 1;
    let startPageIndex = Math.max(0, currentPageIndex - Math.floor(this.initialPagesToShow / 2));
    let endPageIndex = Math.min(startPageIndex + this.initialPagesToShow - 1, maxPageIndex);
    // Handle edge case when the end range is at the last page
    if (endPageIndex - startPageIndex < this.initialPagesToShow - 1) {
      startPageIndex = Math.max(0, endPageIndex - this.initialPagesToShow + 1);
    }
    this.currentPageRange = Array.from({ length: endPageIndex - startPageIndex + 1 }, (_, index) => startPageIndex + index + 1);
  }


  updateRemarks(msg: any) {
    let obj: any = {};
    this.remarksoutData = []
    obj["data"] = msg;
    obj["date"] = new Date().toISOString().slice(0, 10);
    obj["name"] = "Distributor Name Here"
    this.complaintObj[0].remarks.map((data: any) => {
      data.out = [...data.out, obj]
    });
    this.remarksoutData = this.complaintObj[0].remarks[0].out;
    this.remarksMsg = ""
  }
  edit(complaint: any) {
    this.complaintObj = [];
    this.complaintObj.push(complaint);
    this.remarksData = [];
    for (let i in complaint.remarks) {
      complaint.remarks[i].in.map((iData: any) => {
        iData["name"] = complaint.cust_name;
      })
      this.remarksData = complaint.remarks[i].in;
    }

  }

  openDialog() {
     console.log("open dialog")
  }

  reportDownload() {
    console.log("report",this.finalData)
      this.csvData = [];
      if (this.finalData) {
        this.finalData.map((csv: any) => {
          let Obj: any = {};
          Obj['merchant_id'] = csv.merchant_id;
          Obj['merchant_name'] = csv.merchant_name;
          Obj['address'] = csv.address;
          Obj['expenses'] = csv.expenses
          Obj['seq_no'] = csv.seq_no
          Obj['average'] = csv.average
          Obj['total_credit'] = csv.total_credit
          this.csvData = [...this.csvData, Obj];
        })
      }
      const options = {
        title: '', fieldSeparator: ',', quoteStrings: '"', decimalseparator: '.', showLabels: true, showTitle: true,
        headers: ['merchant_id', 'merchant_name', 'address', 'expenses', 'seq_no', 'average', 'total_credit']
      };
      this.csvOptions = options;
      this.report_title = 'tap to pay';
  
      new AngularCsv(this.csvData, this.report_title, this.csvOptions);
  }
  onSelectMonth(e:any){
    console.log("sm",this.finalData)
    this.month = e.target.value;
    this.jsonData.map((mData:any)=>{
      if(this.month === mData.month){
        this.finalData =mData.data;
      }
    });
    this.finalData.map((jData:any)=>{
      jData['step']=1
    });
  };
  onMerchent(data:any){
    this.merchant_identify =data;
    this.jsonData.map((obj:any)=>{
      if(obj['merchant_name'] === data){
        this.step =obj.step;
      }
    })
  };

}
