import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
declare var jQuery: any;
import { NotificationService } from 'src/app/core/services/notification.service';
import * as _ from 'lodash'
import { VatService } from 'src/app/services/vat.service';
import { ILoadedEventArgs, ChartTheme, IPointRenderEventArgs } from '@syncfusion/ej2-angular-charts';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
    selector: 'app-vat-request',
    templateUrl: './vat-request.component.html',
    styleUrls: ['./vat-request.component.scss']
})
export class VatRequestComponent implements OnInit {
    @ViewChild('inputFile') myInputVariable: ElementRef;
    auditors: any = [];
    complaintsData: any = []
    distributorForm: FormGroup;
    searchText: any;
    public palette: String[];
    sortValue: any;
    sortType: string;
    sortReverse: boolean = false;
    complaintObj: any = []
    remarksoutData: any = [];
    auditorForm: FormGroup;

    public remarksMsg: any
    public finalTabularData: any = [];
    public finalData: any = [];
    selectedStatus: any = ""
    constructor(
        private note_Service: NotificationService, private fb: FormBuilder, private vat: VatService
    ) {
        // this.app.ShowReportDate = 'true';
    }
    status: any = [{ key: "active", color: "green" }, { key: "inactive", color: "Red" }]
    public complaintsLists: any = [
        { userId: 201, cust_name: "Arvinds", contact: "9897856863", email: "a@gmail.com", remarks: [{ date: new Date().toISOString().slice(0, 10), data: "Hi theres" }], date: new Date("12-20-2021"), complaint_Num: 732984, delay: 7, status: "Open" },
        { userId: 202, cust_name: "Sudhakar", contact: "7725328298", email: "b@gmail.com", remarks: [{ date: new Date(), data: "Hi theres" }], date: new Date("12-17-2021"), complaint_Num: 987124, delay: 12, status: "Open" },
        { userId: 203, cust_name: "Chandra", contact: "8745096543", email: "c@gmail.com", remarks: [], date: new Date("12-18-2021"), complaint_Num: 912739, delay: 5, status: "Dispute" },
        { userId: 204, cust_name: "Sadhana", contact: "6532987654", email: "d@gmail.com", remarks: [], date: new Date("12-5-2021"), complaint_Num: 561433, delay: 10, status: "Open" },
        { userId: 205, cust_name: "Vikram", contact: "9875983785", email: "e@gmail.com", remarks: [], date: new Date("12-14-2021"), complaint_Num: 614276, delay: 3, status: "Close" },
        { userId: 206, cust_name: "Arun Kumar", contact: "8157320946", email: "f@gmail.com", remarks: [], date: new Date("12-14-2021"), complaint_Num: 187251, delay: 9, status: "Dispute" },
        { userId: 207, cust_name: "Ram", contact: "6723954679", email: "g@gmail.com", remarks: [], date: new Date("12-08-2021"), complaint_Num: 986753, delay: 5, status: "Open" },
        { userId: 208, cust_name: "Krishna", contact: "9536896637", email: "h@gmail.com", remarks: [], date: new Date("12-7-2021"), complaint_Num: 564365, delay: 10, status: "Close" },
        { userId: 209, cust_name: "Prasd", contact: "7572338758", email: "i@gmail.com", remarks: [], date: new Date("12-01-2021"), complaint_Num: 635272, delay: 4, status: "Dispute" },
        { userId: 210, cust_name: "RadheSyam", contact: "9587682623", email: "j@gmail.com", remarks: [], date: new Date("12-07-2021"), complaint_Num: 847982, delay: 11, status: "Open" },
        { userId: 211, cust_name: "Kiran", contact: "9765635263", email: "k@gmail.com", remarks: [], date: new Date("12-14-2021"), complaint_Num: 416798, delay: 7, status: "Close" }
    ]

    remarksData: any = [];

    public radius: Object = { bottomLeft: 0, bottomRight: 0, topLeft: 5, topRight: 5 }
    months: String[] = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', ' Nov', 'Dec'];
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
    auditorsList: any = [
        { auditorName: "Supriya", city: "hyd", phNum: "9867826321", email: "priya@gmail.com", jod: "11-08-2022", status: "Active" },
        { auditorName: "Sushmitha", city: "hyd", phNum: "7163121869", email: "sushmitha@gmail.com", jod: "12-07-2022", status: "Active" }

    ]
    ngOnInit(): void {
        this.auditorForm = this.fb.group({
            file: [null],
            city: new FormControl("", Validators.required),
            auditorName: new FormControl("", Validators.required),
            phNum: new FormControl("", Validators.required),
            email: new FormControl("", Validators.required),
            jod: new FormControl("", Validators.required)
        })
        // console.log("####################################", new Date().toISOString().slice(0, 10));
        // this.getcomplaintsData();
        this.getAllAuditors();

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
            $('#side_menu_bar > ul > li.nav-item > a#li_vat_report').addClass("active");
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
        this.complaintsLists = this.sortReverse === false ?
            _.orderBy(this.complaintsLists, [prop], ['desc']) :
            _.orderBy(this.complaintsLists, [prop], ['asc']);
        this.sortReverse = !this.sortReverse;
    }


    sort(event: any) {
        if (event) {
            this.sortValue = event;
        }
        this.complaintsLists = event === "A to Z" ? _.orderBy(this.complaintsLists, [(obj) => obj['cust_name'].toLowerCase()], ['asc'])
            : event === "Z to A" ? _.orderBy(this.complaintsLists, [(obj) => obj['cust_name'].toLowerCase()], ['desc'])
                : event === "date_low" ? _.orderBy(this.complaintsLists, ['date'], ['asc'])
                    : _.orderBy(this.complaintsLists, ['date'], ['desc'])
    }

    // async getcomplaintsData() {
    //     await this.bar_srvc.getcompalintsData().then(data => {
    //     this.complaintsData = data;
    //     });
    //     this.complaintsData.map((data: any) => {
    //     // switch(data.status){
    //     // 	case "Open" :
    //     // 		data.color = new Date(data.date).getDate() === new Date().getDate()  
    //     //         ? "yellow" : new Date().getDate() - new Date(data.date).getDate() <= 5 
    //     //         ? "blue" :"red"
    //     // 		break;
    //     // 	case "Dispute" :
    //     // 		data.color =  "red"
    //     // 		break;
    //     // 	case "Close" :
    //     // 		data.color =  "green"
    //     // 		break;
    //     // 	default:
    //     // 		break;
    //     // }
    //     data.color = data.status === 'active' ? 'green' : 'red';
    //     })
    // }
    changeStatus(data: any, userId: any) {

        console.log(data);
        console.log(userId);
    }


    updateRemarks(msg: any) {
        let obj: any = {};
        this.remarksoutData = []
        obj["data"] = msg;
        obj["date"] = new Date().toISOString().slice(0, 10);
        obj["name"] = "Distributor Name Here"
        this.complaintObj[0].remarks.map((data: any) => {
            if (!data.out) {
                data.out = []
            }
            data.out = [...data.out, obj]
        });
        this.remarksoutData = this.complaintObj[0].remarks[0].out;
        this.remarksMsg = ""
    }
    edit(complaint: any) {
        this.complaintObj = [];
        this.complaintObj.push(complaint);
        this.remarksData = [];

        complaint.remarks.map((iData: any) => {
            iData["name"] = complaint.cust_name;
            iData["id"] = complaint.userId;
            return this.remarksData.push(iData)
        })

    }



    isShow = false;
    value1: string = '';
    value2: string = '';
    value3: string = '';
    value4: string = '';
    value5: string = '';
    value6: string = '';
    value7: string = '';
    value8: string = 'active';




    addItem() {

        this.isShow = !this.isShow
        // console.log(this.items);
        // if (!this.isShow) {
        //   this.items.push({ userId: this.items.length + 1, cust_name: this.value1, contact: this.value2, email: this.value3, remarks: [{ date: new Date(), data: this.value4 }], date: new Date(), delay: this.value6, status: this.value7 });
        //   localStorage.setItem('vat-request', JSON.stringify(this.items));
        //   console.log(this.items);
        // }
    }

    // getVal1(value: any) {
    //     this.value1 = value;
    //     console.log(this.remarksData);

    // }
    // getVal2(value: any) {
    //     this.value2 = value;
    // }
    // getVal3(value: any) {
    //     this.value3 = value;
    // }
    // getVal4(value: any) {
    //     this.value4 = value;
    // }
    // getVal5(value: any) {
    //     this.value5 = value;
    // }
    // getVal6(value: any) {
    //     this.value6 = value;
    // }
    // getVal7(value: any) {
    //     this.value7 = value;
    // }
    // getVal8(value: any) {
    //     this.value8 = value;
    // }


    //sudhakr
    onFileSelected(e: any) {
        const file = <File>e.target.files[0];
        this.auditorForm.patchValue({ file: file });
        this.auditorForm.get('file')?.updateValueAndValidity();
    }
    submit() {
        var formData: any = new FormData();
        formData.append('file', this.auditorForm.get('file')?.value);
        formData.append('auditorName', this.auditorForm.get('auditorName')?.value);
        formData.append('phNum', this.auditorForm.get('phNum')?.value);
        formData.append('email', this.auditorForm.get('email')?.value);
        formData.append('jod', this.auditorForm.get('jod')?.value);
        formData.append('city', this.auditorForm.get('city')?.value);
        this.vat.createAuditor(formData).subscribe(data => {
            if (data.success === true) {
                this.auditorForm.reset();
                this.reset();
                this.note_Service.showSuccess(`200 : ${data.message}`, '');
                this.getAllAuditors();
            } else {
                this.auditorForm.reset();
                this.reset();
                this.note_Service.showError(`${data.status} : ${data.error.message}`, '')
            }
            this.isShow = !this.isShow

        })
    };
    getAllAuditors() {
        this.auditors = [];
        this.vat.getAuditorList().subscribe(data => {
            if (data.success === true) {
                data.data.map((aData: any) => {
                    aData.auditorsList.forEach((auditor: any) => {
                        auditor.city = aData.city;
                        this.auditors = [...this.auditors, auditor]
                    });
                })
            } else {
                this.note_Service.showInfo(`${data.status} : ${data.error.message}`, '')
            }
        })
    }
    onChangeStatus(e: any, auditor: any) {
        const Obj = {
            "status": e.target.value,
            "city": auditor.city
        }
        this.vat.updateStatus(auditor._id, Obj).subscribe(data => {
            if (data.success === true) {
                this.note_Service.showSuccess(`${data.status} : ${data.message}`, '')
                this.getAllAuditors();
            } else {
                this.note_Service.showError(`${data.status} : ${data.error.message}`, '')
            }
        })
    }
    reset() {
        this.myInputVariable.nativeElement.value = '';
    }

}

