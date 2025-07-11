import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
import { AppManagerService } from 'src/app/core/services/app-manager.service';
import * as _ from 'lodash'
import { ComplaintsService } from 'src/app/services/complaints.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ILoadedEventArgs, ChartTheme, IPointRenderEventArgs } from '@syncfusion/ej2-angular-charts';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
import { SalesPersonService } from 'src/app/services/sales-person.service';
import { SignatureEncryptionService } from 'src/app/services/signature-encryption.service';

@Component({
    selector: 'app-complaints',
    templateUrl: './complaints.component.html',
    styleUrls: ['./complaints.component.scss']
})
export class ComplaintsComponent implements OnInit {
    // complaintsData:any=[]
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
    selectedStatus: any = ""
    rmkCPlaint: any;

    report_title: string;
    public jsonData: any = [];
    selected: any;
    merchant_identify: string;
    step = 1;
    csvData: any = [];
    itemsPerPage: any = 9;
    currentPage: any = 1;
    public csvOptions: any = {};
    currentYear: number;
    showDialog: boolean = false;
    years: any = [];
    dialogData: any = {};
    salesList: any = [];
    reassignSales: any = [];
    selSalesPerson: any;
    constructor(
        private app: AppManagerService, private fb: FormBuilder, private cmp_Srvce: ComplaintsService,
        private note_service: NotificationService, private sales_serv: SalesPersonService, private encryption: SignatureEncryptionService
    ) {
        this.app.ShowReportDate = 'true';
    }
    status: any = [{ key: "Open", color: "green" }, { key: "Close", color: "Yellow" }, { key: "Dispute", color: "Red" }]
    public complaintsData: any = [
    ]
    selComplaint: any = {}
    public remarksData: any = [];
    public remarksDataOut: any = [];

    public radius: Object = { bottomLeft: 0, bottomRight: 0, topLeft: 5, topRight: 5 }
    months: any = [
        { "month": "Jan", "id": 1 }, { "month": "Feb", "id": 2 }, { "month": "Mar", "id": 3 }, { "month": "Apr", "id": 4 },
        { "month": "May", "id": 5 }, { "month": "Jun", "id": 6 }, { "month": "Jul", "id": 7 }, { "month": "Aug", "id": 8 },
        { "month": "Sep", "id": 9 }, { "month": "Oct", "id": 10 }, { "month": "Nov", "id": 11 }, { "month": "Dec", "id": 12 },
    ]
    public month: any;
    // months: String[] = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', ' Nov', 'Dec'];
    public tooltip: Object = {
        enable: true
    };
    public title: string = '';
    public legend: Object = {
        visible: false
    }
    isLoading: boolean = true;
    public chartArea: Object = {
        border: {
            width: 0
        }
    };

    ngOnInit(): void {
        this.month = new Date().getMonth() + 1;
        this.currentYear = new Date().getFullYear();
        for (let i = 2021; i <= this.currentYear + 1; i++) {
            this.years.push({ year: i })
        }
        this.getcomplaintsbyMonth();
        this.getSalesPersons()
        this.complaintsData;

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
            $('#side_menu_bar > ul > li.nav-item > a#li_complaints').addClass("active");
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

    onPageChange(page: number) {
        this.currentPage = page;
    }
    getPage(): any[] {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.complaintsData.slice(startIndex, endIndex);
    }

    sortOrders(prop: any) {
        this.sortType = prop;
        this.complaintsData = this.sortReverse === false ?
            _.orderBy(this.complaintsData, [prop], ['desc']) :
            _.orderBy(this.complaintsData, [prop], ['asc']);
        this.sortReverse = !this.sortReverse;
    }

    getcomplaintsbyMonth() {
        this.complaintsData = []
        let value = { year: this.currentYear, month: this.month }
        let req = { data: this.encryption.encodeJsonObjectToHex(value) }
        let reqhead = this.encryption.createHeader();
        const key = this.encryption.generateKey(reqhead.key)
        this.cmp_Srvce.getCompbyMonth(req, reqhead.headers).subscribe(async res => {
            console.log(res, '657890')
            if (res.success === true) {
                const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
                const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
                this.complaintsData = decryptedData;
            }
            if (res) {
                // setTimeout(() => {
                this.isLoading = false;
                //   this.redirectToCheckout();
                // }, 200); // Redirect after 2 seconds
            }
        })
    }
    onSelectYear(event: any) {
        this.currentYear = event.target.value;
        this.getcomplaintsbyMonth()
    }
    onSelectMonth(event: any) {
        this.month = event.target.value;
        this.getcomplaintsbyMonth()
        // this.getAllChartData(this.selected)
    }

    getSalesPersons() {
        let reqhead = this.encryption.createHeader();
        const key = this.encryption.generateKey(reqhead.key)
        this.sales_serv.getAllSales(reqhead.headers).subscribe(async res => {
            if (res.success === true) {
                const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
                const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
                this.salesList = decryptedData;
                console.log(this.salesList)
            }
        })
    }
    removeObjectById(array: any, idToRemove: any): Object[] {
        return array.filter((obj: { salesId: any; }) => obj.salesId !== idToRemove);
    }
    onReassignClick(id: any) {
        this.reassignSales = this.salesList
        this.complaintsData.map((com: any) => {
            if (com._id == id) {
                this.selComplaint = com;
                this.reassignSales = this.removeObjectById(this.reassignSales, com.salesId);
            }
        })
        // this.salesList.filter((obj: { salesId: any; }) => obj.salesId !== salesId);
        console.log(this.salesList)
    }
    onSelSales(e: any) {
        this.selSalesPerson = e.target.value;
        console.log(this.selSalesPerson)
        this.selComplaint.salesId = this.selSalesPerson;
        console.log(this.selComplaint);
    }
    reAssignComplaint() {
        let value = this.selComplaint;
        let req = { data: this.encryption.encodeJsonObjectToHex(value) }
        let reqhead = this.encryption.createHeader();
        const key = this.encryption.generateKey(reqhead.key)
        this.cmp_Srvce.reAssign(req, reqhead.headers).subscribe(async res => {
            if (res.success === true) {
                const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
                const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
                // console.log(data.data);
                this.note_service.showSuccess(`200 - ${res.message}`, '')
                this.getcomplaintsbyMonth()
            } else {
                this.note_service.showError(`${res.message}`, '')
            }
        })
    }
    openDialog(id: any) {
        this.showDialog = true;
        this.complaintsData.map((d: any) => {
            if (d._id == id) {
                this.dialogData = {
                    header1: "Complaint Details",
                    subHeader11: "Complaint Number",
                    content11: d.complaintNum !== undefined && d.complaintNum !== null ? d.complaintNum : '',
                    subHeader12: "Complaint Type",
                    content12: d.typeOfComplaint !== undefined && d.typeOfComplaint !== null ? d.typeOfComplaint : '',
                    subHeader13: "Description",
                    content13: d.briefCompliant !== undefined && d.briefCompliant !== null ? d.briefCompliant : '',
                    header2: "Contact Details",
                    subHeader21: "Sales Id",
                    content21: d.salesId !== undefined && d.salesId !== null ? d.salesId : d.salesId,
                    subHeader22: "Email ID",
                    content22: d.salesEmail !== undefined && d.salesEmail !== null ? d.salesEmail : d.customerEmail,
                    subHeader23: "Mobile Number",
                    content23: d.salesContact !== undefined && d.salesContact !== null ? d.salesContact : d.customerPhone,
                    header3: "Customer Details",
                    subHeader31: "Main Merchant ID",
                    content31: d.mainMerchantId !== undefined && d.mainMerchantId !== null ? d.mainMerchantId : '',
                    subHeader32: "Terminal ID",
                    content32: d.terminalId !== undefined && d.terminalId !== null ? d.terminalId : '',
                }
            }
        })
    }
    closeDialog(): void {
        this.showDialog = false;
    }

    reportDownload() {
        // console.log("report", this.complaintsData)
        this.csvData = [];
        if (this.complaintsData) {
            this.complaintsData.map((csv: any) => {
                let Obj: any = {};
                Obj['complaintNum'] = csv.complaintNum;
                Obj['ComplaintType'] = csv.typeOfComplaint;
                Obj['salesId'] = csv.salesId;
                Obj['salesEmail'] = csv.salesEmail;
                Obj['salesContact'] = csv.salesContact;
                Obj['salesName'] = csv.salesName;
                Obj['distributorId'] = csv.distributorId;
                Obj['mainMerchantId'] = csv.mainMerchantId;
                Obj['complaintDate'] = csv.complaintDate;
                Obj['status'] = csv.status;

                this.csvData = [...this.csvData, Obj];
            })
        }
        const options = {
            title: '', fieldSeparator: ',', quoteStrings: '"', decimalseparator: '.', showLabels: true, showTitle: true,
            headers: ['Complaint No.', 'Complaint Type', 'Sales ID', 'Email Id', 'Mobile Number', 'Sales Name', 'Distributor Id',
                'Main Merchant ID', 'Complaint Date', 'Status']
        };
        this.csvOptions = options;
        this.report_title = 'Complaints';

        new AngularCsv(this.csvData, this.report_title, this.csvOptions);
    }






    //old code

    sort(event: any) {
        if (event) {
            this.sortValue = event;
        }
        this.complaintsData = event === "A to Z" ? _.orderBy(this.complaintsData, [(obj) => obj['cust_name'].toLowerCase()], ['asc'])
            : event === "Z to A" ? _.orderBy(this.complaintsData, [(obj) => obj['cust_name'].toLowerCase()], ['desc'])
                : event === "date_low" ? _.orderBy(this.complaintsData, ['date'], ['asc'])
                    : _.orderBy(this.complaintsData, ['date'], ['desc'])
    }

    getcomplaintsData() {
        let reqhead = this.encryption.createHeader();
        const key = this.encryption.generateKey(reqhead.key)
        this.cmp_Srvce.getAllComplaints(reqhead.headers).subscribe(async res => {
            if (res.success === true) {
                const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
                const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
                this.complaintsData = decryptedData;
            }
            this.complaintsData.map((data: any) => {
                // switch(data.status){
                // 	case "Open" :
                // 		data.color = new Date(data.date).getDate() === new Date().getDate()  
                //         ? "yellow" : new Date().getDate() - new Date(data.date).getDate() <= 5 
                //         ? "blue" :"red"
                // 		break;
                // 	case "Dispute" :
                // 		data.color =  "red"
                // 		break;
                // 	case "Close" :
                // 		data.color =  "green"
                // 		break;
                // 	default:
                // 		break;
                // }

                data.color = data.status === 'Dispute' ? 'red' : data.status === 'Close' ? 'green' : 'yellow';
                const date1: any = new Date(data.complaintDate);
                const date2: any = new Date();
                const diffTime = Math.abs(date2 - date1);
                data.delay = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            });
        })
    }
    updateRemarks(msg: any) {
        const obj: any = {
            key: 'admin',
            msg: msg
        }
        this.cmp_Srvce.addRemarks(this.rmkCPlaint.complaintNum, obj).subscribe(data => {
            if (data.success === true) {
                this.cmp_Srvce.cmpById(this.rmkCPlaint._id).subscribe(data => {
                    if (data.success === true) {
                        this.remarksData = data.data['remarks'];
                    }
                })
                this.note_service.showSuccess(`200 - ${data.message}`, '');

            } else {
                this.note_service.showError(`${data.error.message}`, '')
            }
        })
        this.remarksMsg = ""
    }
    edit(complaint: any) {
        this.remarksData = [];
        this.remarksData = complaint.remarks;
        this.rmkCPlaint = complaint;
    }
    onChangeStatus(e: any, complaint: any) {
        const Obj = {
            "status": e.target.value,
        }
        this.cmp_Srvce.updateStatus(complaint._id, Obj).subscribe(data => {
            if (data.success === true) {
                this.note_service.showSuccess(`${200} : ${data.message}`, '')
                this.getcomplaintsData();
            } else {
                this.note_service.showError(`${data.status} : ${data.error.message}`, '')
            }
        })
    }

    // onSelectMonth(e: any) {
    //     console.log("sm", this.finalData)
    //     this.month = e.target.value;
    //     this.jsonData.map((mData: any) => {
    //         if (this.month === mData.month) {
    //             this.finalData = mData.data;
    //         }
    //     });
    //     this.finalData.map((jData: any) => {
    //         jData['step'] = 1
    //     });
    // };
    onMerchent(data: any) {
        this.merchant_identify = data;
        this.jsonData.map((obj: any) => {
            if (obj['merchant_name'] === data) {
                this.step = obj.step;
            }
        })
    };
    reAssign(e: any) { }

}
