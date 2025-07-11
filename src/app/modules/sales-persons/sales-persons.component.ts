import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DistributorService } from 'src/app/services/distributor.service';
import { IdentityService } from 'src/app/core/services/identity.service'
import { AppManagerService } from 'src/app/core/services/app-manager.service';
import { SalesPersonService } from 'src/app/services/sales-person.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { data } from 'jquery';
import { SignatureEncryptionService } from 'src/app/services/signature-encryption.service';
declare var jQuery: any;
@Component({
    selector: 'app-sales-persons',
    templateUrl: './sales-persons.component.html',
    styleUrls: ['./sales-persons.component.scss']
})
export class SalesPersonsComponent implements OnInit {
    isShow: boolean = false;
    isAddSales: boolean = false;
    searchText: any;
    salesForm: FormGroup;
    disId: any;
    // salesPersons: any=[];
    distData: any;
    distList: any = [];
    statuses: any = ["Active", "In-Active"];
    currentcityPage: number = 1;
    itemsPercityPage: any = 9;
    currentsalesPage: number = 1;
    itemsPersalesPage: any = 9;
    public salesList: any = [
        { userId: "2221", salesPersonName: "John Doe", contact: "9897856863", email: "a@gmail.com", remarks: "update", joiningDate: "12-22-2021", cust_Number: 987124, complaints: "7", incentives: "1500" },
        { userId: "2222", salesPersonName: "Aravind", contact: "7725328298", email: "b@gmail.com", remarks: "update", joiningDate: "10-15-2021", cust_Number: 912739, complaints: "2", incentives: "1100" },
        { userId: "2223", salesPersonName: "Sudhakar", contact: "8745096543", email: "c@gmail.com", remarks: "update", joiningDate: "04-02-2021", cust_Number: 561433, complaints: "10", incentives: "2000" },
        { userId: "2224", salesPersonName: "Chandra", contact: "6532987654", email: "d@gmail.com", remarks: "update", joiningDate: "05-15-2021", cust_Number: 614276, complaints: "14", incentives: "2800" },
        { userId: "2225", salesPersonName: "Supriya", contact: "9875983785", email: "e@gmail.com", remarks: "update", joiningDate: "12-05-2021", cust_Number: 187251, complaints: "8", incentives: "1200" },
        { userId: "2226", salesPersonName: "Sathya", contact: "8157320946", email: "f@gmail.com", remarks: "update", joiningDate: "09-20-2021", cust_Number: 986753, complaints: "12", incentives: "1800" }
    ]
    regionList: any = []
    // [
    //     {"city":"Hyderabad","noOfSales":"10","noOfCustomers":"20","noOfComplaints":"6","transValue":"1,00,000"},
    //     {"city":"Dubai","noOfSales":"20","noOfCustomers":"30","noOfComplaints":"5","transValue":"1,00,000"},
    //     {"city":"Qatar","noOfSales":"15","noOfCustomers":"34","noOfComplaints":"3","transValue":"1,00,000"},
    //     {"city":"Abu Dhabi","noOfSales":"8","noOfCustomers":"10","noOfComplaints":"10","transValue":"1,00,000"},
    // ]
    salesPersons: any = []
    profileImg: string;
    fileSelected: File;
    maxDate: string;
    minExpiryDate: string;
    isLoading: boolean = true;
    constructor(private fb: FormBuilder, private dist: DistributorService, private identity: IdentityService,
        private app: AppManagerService, private sales_serv: SalesPersonService, private noteService: NotificationService,
        private encryption: SignatureEncryptionService) {
        this.app.ShowReportDate = 'true';
    }

    ngOnInit(): void {
        const currentDate = new Date();
        const maxDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
        this.maxDate = maxDate.toISOString().split('T')[0]; // Format as y
        this.minExpiryDate = currentDate.toISOString().split('T')[0];
        this.loadScripts();
        this.getRegions()
        this.getDistributors();
        this.salesForm = this.fb.group({
            _id: [''],
            salesId: new FormControl(null),
            salesImageId: [null],
            path: (""),
            imgName: (""),
            salesName: new FormControl("", [Validators.required]),
            emailId: new FormControl("", Validators.required),
            distributorId: new FormControl("", Validators.required),
            gender: new FormControl("", Validators.required),
            address: new FormControl("", [Validators.required]),
            city: new FormControl("", Validators.required),
            dateOfBirth: new FormControl(''),
            dateOfJoining: new FormControl("", Validators.required),
            nationality: new FormControl("", Validators.required),
            mobileNumber: new FormControl("", Validators.required),
            acntNumber: new FormControl("", Validators.required),
            leaveBalance: [''],
            salary: [''],
            nationalId: new FormControl("", [Validators.required, Validators.minLength(15), Validators.maxLength(15)]),
            nationalIdFile: new FormControl(""),
            status: new FormControl(""),
        });
    };

    private loadScripts(): void {
        (function ($) {
            "use strict";

            $('#side_menu_bar > ul > li.nav-item > a').removeClass("active");
            $('#side_menu_bar > ul > li.nav-item > a#li_sales_persons').addClass("active");
        })(jQuery);
    }

    onCreateAction() {
        this.isAddSales = !this.isAddSales;
        this.isShow = false;
    }
    success() { this.noteService.showSuccess(`200 : "success`, ''); }
    error() { this.noteService.showError(`200 : "error`, ''); }


    createSalesPerson() {
        let value = this.salesForm.value;
        var formData: any = new FormData();
        // formData.append('salesName', this.salesForm.get('salesName')?.value);
        // formData.append('emailId', this.salesForm.get('emailId')?.value);
        // formData.append('distributorId', this.salesForm.get('distributorId')?.value);
        // formData.append('gender', this.salesForm.get('gender')?.value);
        // formData.append('address', this.salesForm.get('address')?.value);
        // formData.append('city', this.salesForm.get('city')?.value);
        // formData.append('dateOfBirth', this.salesForm.get('dateOfBirth')?.value);
        // formData.append('nationality', this.salesForm.get('nationality')?.value);
        // formData.append('mobileNumber', this.salesForm.get('mobileNumber')?.value);
        // formData.append('acntNumber', this.salesForm.get('acntNumber')?.value);
        // formData.append('nationalId', this.salesForm.get('nationalId')?.value);
        formData.append('nationalIdFile', this.salesForm.get('nationalIdFile')?.value);
        formData.append('salesImageId', this.salesForm.get('salesImageId')?.value);

        // formData.append('status', this.salesForm.get('status')?.value);

        value.nationalIdFile = "";
        value.salesImageId = "";
        if (this.salesForm.value.salesId == null || "") {
            delete value._id;
            value.status = "Active";
            formData.append('data', this.encryption.encodeJsonObjectToHex(value))
            let reqhead = this.encryption.createHeader();
            const key = this.encryption.generateKey(reqhead.key)
            this.sales_serv.createSales(formData, reqhead.headers).subscribe(async res => {
                this.isAddSales = !this.isAddSales;
                if (res.success === true) {
                    const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
                    const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
                    this.salesForm.reset();
                    this.noteService.showSuccess(`200 : ${res.message}`, '');
                    this.getRegions();
                    // this.getAllEmployees();
                } else {
                    this.noteService.showError(`${res.message}`, '')
                }
            })
        }
        else {
            formData.append('data', this.encryption.encodeJsonObjectToHex(value))
            let reqhead = this.encryption.createHeader();
            const key = this.encryption.generateKey(reqhead.key)
            this.sales_serv.createSales(formData, reqhead.headers).subscribe(async res => {
                this.isAddSales = !this.isAddSales;
                if (res.success === true) {
                    const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
                    const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
                    this.salesForm.reset();
                    this.noteService.showSuccess(`200 : ${res.message}`, '');
                    this.getRegions();
                    // this.getAllEmployees();
                } else {
                    this.noteService.showError(` ${res.message}`, '')
                }
            })
        }






        // this.salesForm.value.status = "Active"; 
        // const value = this.salesForm.value;
        // this.sales_serv.createSales(value).subscribe(async data => {
        //     this.getRegions();
        // });
    }
    onCityPageChange(page: number) {
        this.currentcityPage = page;
    }
    getPageCity(): any[] {
        const startIndex = (this.currentcityPage - 1) * this.itemsPercityPage;
        const endIndex = startIndex + this.itemsPercityPage;
        return this.regionList.slice(startIndex, endIndex);
    }
    onSalesPageChange(page: number) {
        this.currentsalesPage = page;
    }
    getPageSales(): any[] {
        const startIndex = (this.currentsalesPage - 1) * this.itemsPersalesPage;
        const endIndex = startIndex + this.itemsPersalesPage;
        return this.salesList.slice(startIndex, endIndex);
    }
    onupdateAction(salesId: any) {
        let reqhead = this.encryption.createHeader();
        const key = this.encryption.generateKey(reqhead.key)
        this.sales_serv.getSalesbyID(salesId, reqhead.headers).subscribe(async res => {
            const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
            const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
            this.salesForm.patchValue(decryptedData[0]);
            this.profileImg = decryptedData[0].salesImageId;
            this.isAddSales = !this.isAddSales;
            this.isShow = true;
        })
    }
    getRegions() {
        this.regionList = [];
        let reqhead = this.encryption.createHeader();
        const key = this.encryption.generateKey(reqhead.key)
        this.sales_serv.getRegions(reqhead.headers).subscribe(async res => {
            const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
            const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
            decryptedData.map((d: any) => {
                d.city = d._id;
                d.transValue = 1000000;
                d.noOfSales = d.documents.length;
                d.noOfCustomers = 20;
                d.noOfComplaints = 15;
                d.showDetail = false
                this.regionList.push(d);
            })
            if (res) {
                this.isLoading = false;
            }
        })
    }
    getbyCity(city: any) {
        let merchants: any[] = [];
        let complaints: any[] = [];
        this.regionList.map((d: any) => {
            if (d.city == city) { d.showDetail = true }
            else { d.showDetail = false }
        })
        let reqhead = this.encryption.createHeader();
        const key = this.encryption.generateKey(reqhead.key)
        this.sales_serv.getMerbySalesID(reqhead.headers).subscribe(async res => {
            if (res.success === true) {
                const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
                const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
                merchants = decryptedData;
            }
        })
        let reqheadcomp = this.encryption.createHeader();
        const keycomp = this.encryption.generateKey(reqheadcomp.key)
        this.sales_serv.getCompbysales(reqheadcomp.headers).subscribe(async res => {
            if (res.success === true) {
                const encryptedDatacomp = res.data;  // Assuming encrypted data comes under 'data'
                const decryptedDatacomp = JSON.parse(this.encryption.decodeData(encryptedDatacomp, await keycomp));
                complaints = decryptedDatacomp;
                console.log(decryptedDatacomp)
            }
        })
        let reqheadcity = this.encryption.createHeader();
        const keycity = this.encryption.generateKey(reqheadcity.key)
        this.sales_serv.getSalesbyCity(city, reqheadcity.headers).subscribe(async res => {
            const encryptedDatacity = res.data;  // Assuming encrypted data comes under 'data'
            const decryptedDatacity = JSON.parse(this.encryption.decodeData(encryptedDatacity, await keycity));
            this.salesList = decryptedDatacity;
            if (merchants.length > 0) {
                this.salesList.map((s: any) => {
                    s.noOfMerchants = 0;
                    s.complaints = 0;
                    s.incentives = 0;
                    merchants.map((m: any) => {
                        if (s.salesId === m._id) {
                            s.noOfMerchants = m.count;
                        }
                    })
                    complaints.map((c: any) => {
                        if (s.salesId === c._id) {
                            s.complaints = c.count
                        }
                    })
                })
            }
            console.log(this.salesList)
        })
    }
    onFileSelected(event: any) {
        this.profileImg = ""
        console.log("##############################", event.target.files[0])
        const file = <File>event.target.files[0];
        this.salesForm.patchValue({ salesImageId: file });
        this.salesForm.get('salesImageId')?.updateValueAndValidity();
        console.log('image', this.salesForm.value.salesImageId);
        const reader = new FileReader();
        reader.onload = () => {
            this.profileImg = reader.result as string;
        }
        const [fileSelected, rest] = event.target.files[0].name.split(".");
        this.fileSelected = fileSelected;
        reader.readAsDataURL(file)
    }

    // submit(){
    //     const obj =this.salesForm.value;
    //     this.dist.addSalesPerson(obj,this.distData._id).subscribe(async data=>{
    //         if(data.success === true){
    //             alert("sales person added sucessfully!!")
    //             this.getDistributors();
    //             this.salesForm.reset();
    //         }
    //     });
    // }

    getDistributors() {
        let reqhead = this.encryption.createHeader();
        const key = this.encryption.generateKey(reqhead.key)
        this.dist.getAllDistributors(reqhead.headers).subscribe(async res => {
            const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
            const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
            if (decryptedData != null) {
                this.distList = decryptedData;
            }
        })
        //  this.disId = this.identity.getUser().distId;
        // this.dist.getSalesPersons(this.disId).subscribe(async data => {
        //     this.distData = data.data;
        //     this.salesPersons = data.data.salesPersons;
        // })

    }

}


