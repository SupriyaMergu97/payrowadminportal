import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppManagerService } from 'src/app/core/services/app-manager.service';
import { EmpService } from 'src/app/services/emp.service';
import { NotificationService } from 'src/app/core/services/notification.service'
import * as _ from 'lodash';
import { SignatureEncryptionService } from 'src/app/services/signature-encryption.service';
declare var jQuery: any;
declare var $: any;
@Component({
    selector: 'app-employee-relations',
    templateUrl: './employee-relations.component.html',
    styleUrls: ['./employee-relations.component.scss']
})
export class EmployeeRelationsComponent implements OnInit {
    // totalItems = 50; // Total number of items
    // itemsPerPage = 9; // Default items per page
    // currentPage = 1; // Current page
    // initialPagesToShow = 5; // Number of pages to initially show
    // currentPageRange: number[] = []; // Range o
    showDialog: boolean = false;
    empForm: FormGroup;
    deptForm: FormGroup;
    statuses: any = ["Active", "In-Active"]
    isShow: boolean = false;
    isAddEmp: boolean = false;
    isdisplay: boolean = false;
    profileImg: String;
    fileSelected: File;
    departId: any
    sickLeaves: any;
    annualLeaves: any;
    editEmpForm: FormGroup;
    wpsForm: FormGroup;
    searchText: any;
    sortValue: any;
    employeeDetails: any = [];
    oneEmpDetails: any = {};
    wpsData: any = {}
    leaveForm: FormGroup;
    wpsDetails: FormGroup;
    empID: any
    // hr, finance, marketing, IT, sales, legal,management
    departmentList: any = []
    dialogData: any;
    isLoading:boolean=true;
    // empData:any
    // { "deptId": "PRDID100", "departName": "HR", "emailId": "HR@gmail.com", "mobileNumber": "9421869845", "employees": "6", "status": "Active" },
    // { "deptId": "PRDID101", "departName": "Finance", "emailId": "Finance@gmail.com", "mobileNumber": "9318264561", "employees": "5", "status": "In-Active" },
    // { "deptId": "PRDID102", "departName": "Marketing", "emailId": "Marketing@gmail.com", "mobileNumber": "9879877777", "employees": "3", "status": "Active" },
    // { "deptId": "PRDID103", "departName": "IT", "emailId": "IT@gmail.com", "mobileNumber": "7364554782", "employees": "10", "status": "Active" },
    // { "deptId": "PRDID104", "departName": "Sales", "emailId": "Sales@gmail.com", "mobileNumber": "8283465698", "employees": "8", "status": "Active" },
    // { "deptId": "PRDID105", "departName": "Legal", "emailId": "Legal@gmail.com", "mobileNumber": "9782374982", "employees": "6", "status": "Active" },
    // { "deptId": "PRDID106", "departName": "Management", "emailId": "Management@gmail.com", "mobileNumber": "6308492234", "employees": "4", "status": "Active" },
    // { "deptId": "PRDID107", "departName": "Risk and complaints", "emailId": "Risk and complaints@gmail.com", "mobileNumber": "6308492234", "employees": "2", "status": "Active" },
    // { "deptId": "PRDID108", "departName": "Regional Manager", "emailId": "Account Manager@gmail.com", "mobileNumber": "6308492234", "employees": "6", "status": "Active" }
    empList: any = [
        // {
        //     "empId": "EMPID101", "empName": "Supriya", "emailId": "supriya@gmail.com", "deptId": "PRDID107", "gender": "Female", "title": "Mrs.", "mobileNumber": "9896654798", "jobTitle": "Software Engineer", "salary": "50,000", "empGrade": "A",
        //     "leaveBalance": "20", "jobDesc": "Application Development", "acntNumber": "71037019", "nationalId": "9741090192", "password": "Suppu@123", "status": "Active", "joiningDate": "02-04-2022"
        // },
        // {
        //     "empId": "EMPID102", "empName": "Khaja", "emailId": "khaja@gmail.com", "deptId": "PRDID107", "gender": "Male", "title": "Mr.", "mobileNumber": "9896654798", "jobTitle": "Software Engineer", "salary": "50,000", "empGrade": "A",
        //     "leaveBalance": "20", "jobDesc": "Application Development", "acntNumber": "71037019", "nationalId": "9741090192", "password": "Khaja@123", "status": "Active", "joiningDate": "02-04-2022"
        // },
        // {
        //     "empId": "EMPID103", "empName": "Srihari", "emailId": "srihari@gmail.com", "deptId": "PRDID107", "gender": "Male", "title": "Mr.", "mobileNumber": "9896654798", "jobTitle": "Software Engineer", "salary": "50,000", "empGrade": "A",
        //     "leaveBalance": "20", "jobDesc": "Application Development", "acntNumber": "71037019", "nationalId": "9741090192", "password": "Srihari@123", "status": "Active", "joiningDate": "02-04-2022"
        // }
    ]
    currentEmpPage: number = 1;
    itemsPerEmpPage: any = 9;
    currentDeptPage: number = 1;
    itemsPerDeptPage: any = 9
    maxDate: string;
    minExpiryDate: string;


    constructor(
        private app: AppManagerService, private fb: FormBuilder, private emp: EmpService,
        private noteService: NotificationService, private encryption: SignatureEncryptionService
    ) {
        this.app.ShowReportDate = 'true';
    }
    // public employeeDetails: any =[
    //     {   no:1,
    //         empName:"Ahmad",
    //         empId:3456,
    //         jobDescription:"Sales Associate",
    //         jobTitle:"Sales",
    //         empGrade:"25412",
    //         personalInfo:"Data all about personalinfo",
    //         salary: 12000,
    //         leaveBalance:"30 days",
    //         endService:new Date("23-4-2024"),
    //         avatar:"assets/images/avatar.png",
    //         wps:[]
    //     },
    // ]
    // public wpsDetails:any=[
    //     {empId:""}
    // ]
    ngOnInit(): void {
        this.getAllDepts();
        this.loadScripts();
        const currentDate = new Date();
        const maxDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
        this.maxDate = maxDate.toISOString().split('T')[0]; // Format as yyyy-mm-dd
        this.minExpiryDate = currentDate.toISOString().split('T')[0];
        // this.updatePageRange();
        this.deptForm = this.fb.group({
            _id: new FormControl(""),
            deptId: new FormControl(""),
            deptName: new FormControl("", Validators.required),
            emailId: new FormControl("", Validators.required),
            mobileNumber: new FormControl(""),
            status: new FormControl("")
        })
        this.empForm = this.fb.group({
            _id: new FormControl(""),
            empId: new FormControl(""),
            empImage: [null],
            path: (""),
            imgName: (""),
            empName: new FormControl("", [Validators.required]),
            emailId: new FormControl("", Validators.required),
            deptId: new FormControl("", Validators.required),
            gender: new FormControl("", Validators.required),
            address: new FormControl("", [Validators.required]),
            dateOfBirth: new FormControl('', [Validators.required]),
            dateOfJoining: new FormControl("", Validators.required),
            nationality: new FormControl("", Validators.required),
            mobileNumber: new FormControl("", Validators.required),
            jobTitle: new FormControl("", [Validators.required]),
            salary: new FormControl("", [Validators.required]),
            empGrade: new FormControl(""),
            leaveBalance: new FormControl(""),
            jobDesc: new FormControl("", [Validators.required]),
            acntNumber: new FormControl("", Validators.required),
            nationalId: new FormControl("",[ Validators.required, Validators.maxLength(15), Validators.minLength(15)]),
            idExpireDate: new FormControl(''),
            nationalIdFile: new FormControl(""),
            password: new FormControl("", Validators.required),
            status: new FormControl(""),

            // personalInfo: new FormControl(" "),
            endService: new FormControl(""),

        });
        this.editEmpForm = this.fb.group({
            empImage: [null],
            empName: new FormControl("", [Validators.required]),
            jobTitle: new FormControl("", [Validators.required]),
            salary: new FormControl("", [Validators.required]),
            empId: new FormControl(""),
            empGrade: new FormControl("", [Validators.required]),
            leaveBalance: new FormControl("", [Validators.required]),
            jobDesc: new FormControl("text", [Validators.required]),
            personalInfo: new FormControl(" ", [Validators.required]),
            endService: new FormControl("", [Validators.required]),

        });
        this.wpsDetails = this.fb.group({
            basic: new FormControl(''),
            hra: new FormControl(''),
            transport: new FormControl(''),
            dateOfJoining: new FormControl(''),
            bonus: new FormControl(''),
            acNum: new FormControl('')
        });
        // this.leaveForm = this.fb.array([])
        this.leaveForm = this.fb.group({
            empId: new FormControl(""),
            fromDate: new FormControl(""),
            toDate: new FormControl(""),
            typeOfLeave: new FormControl(""),
            remarks: new FormControl("")
        })
        // this.getAllEmployees();
    }
    // get leaves() : FormArray {
    //     return this.leaveForm.get("leaves") as FormArray
    // }
    // newLeavs(): FormGroup {
    //     return this.fb.group({
    //         fromDate:new FormControl(""),
    //         toDate:new FormControl(""),
    //         typeOfLeave:new FormControl(""),
    //         remarks:new FormControl("")
    //     })
    // }

    // addleavs() {
    //     this.leaves.push(this.newLeavs());
    // }


    private loadScripts(): void {
        (function ($) {
            "use strict";

            $('#side_menu_bar > ul > li.nav-item > a').removeClass("active");
            $('#side_menu_bar > ul > li.nav-item > a#li_employee_relations').addClass("active");
        })(jQuery);
    }



    // getPageNumbers(): number[] {
    //     const totalPages = this.getTotalPages();
    //     return Array.from({ length: totalPages }, (_, index) => index + 1);
    // }

    // getTotalPages(): number {
    //     return Math.ceil(this.departmentList.length / this.itemsPerPage);
    // }

    // changePage(pageNum: number) {
    //     if (pageNum >= 1 && pageNum <= this.getTotalPages()) {
    //         this.currentPage = pageNum;
    //         // Load data for the selected page
    //         this.updatePageRange(); // Update the page range after changing the page
    //     }
    // }

    // updatePageRange() {
    //     const totalPages = this.getTotalPages();
    //     const currentPageIndex = this.currentPage - 1;
    //     const maxPageIndex = totalPages - 1;
    //     let startPageIndex = Math.max(0, currentPageIndex - Math.floor(this.initialPagesToShow / 2));
    //     let endPageIndex = Math.min(startPageIndex + this.initialPagesToShow - 1, maxPageIndex);
    //     // Handle edge case when the end range is at the last page
    //     if (endPageIndex - startPageIndex < this.initialPagesToShow - 1) {
    //         startPageIndex = Math.max(0, endPageIndex - this.initialPagesToShow + 1);
    //     }
    //     this.currentPageRange = Array.from({ length: endPageIndex - startPageIndex + 1 }, (_, index) => startPageIndex + index + 1);
    // }
    openDialog(id: any): void {
        this.departmentList.map((d: any) => {
            if (d.deptId == id) {
                this.dialogData = {
                    header1: "Contact Details",
                    subHeader11: "Email",
                    content11: d.emailId ?? "",
                    subHeader12: "Contact Number",
                    content12: d.mobileNumber ?? "",
                    subHeader13: "Department ID",
                    content13: d.deptId ?? "",
                    header2: "",
                    subHeader21: "",
                    content21: "",
                    subHeader22: "",
                    content22: "",
                    subHeader23: "",
                    content23: "",
                    header3: "",
                    subHeader31: "",
                    content31: "",
                    subHeader32: "",
                    content32: "",
                }
                // this.deptForm.patchValue(d);
            }
        })
        this.showDialog = true;
    }
    openDialogForEmp(id: any): void {
        this.showDialog = true;
        this.empList.map((d: any) => {
            if (d.empId == id) {
                // this.dialogData=d;
                this.dialogData = {
                    header1: "Contact Details",
                    subHeader11: "Email",
                    content11: d.emailId ?? "",
                    subHeader12: "Contact Number",
                    content12: d.mobileNumber ?? "",
                    subHeader13: "",
                    content13: "",
                    header2: "Employee Details",
                    subHeader21: "Employee ID",
                    content21: d.empId ?? "",
                    subHeader22: "Employee Name",
                    content22: d.empName ?? "",
                    subHeader23: "Department ID",
                    content23: d.deptId ?? "",
                    header3: "Job Details",
                    subHeader31: "Job Title",
                    content31: d.jobTitle ?? "",
                    subHeader32: "Date of Joining",
                    content32: d.dateOfJoining ?? "",
                }
                // this.empForm.patchValue(d);
                // this.profileImg = `https://payrowdev.uaenorth.cloudapp.azure.com/adminbackend/distributor/download/${d.empImageId}`;
                // console.log(d.path, this.profileImg, 'image');
            }
        })
    }
    closeDialog(): void {
        this.showDialog = false;
    }
    onDeptPageChange(page: number) {
        this.currentDeptPage = page;
    }
    getPageDept(): any[] {
        const startIndex = (this.currentDeptPage - 1) * this.itemsPerDeptPage;
        const endIndex = startIndex + this.itemsPerDeptPage;
        return this.departmentList.slice(startIndex, endIndex);
    }

    onEmpPageChange(page: number) {
        this.currentEmpPage = page;
    }
    getPageEmp(): any[] {
        const startIndex = (this.currentEmpPage - 1) * this.itemsPerEmpPage;
        const endIndex = startIndex + this.itemsPerEmpPage;
        return this.empList.slice(startIndex, endIndex);
    }
    createDepartment() {
        this.deptForm.patchValue({ status: "Active" })
        const value = this.deptForm.value;
        let req = { data: this.encryption.encodeJsonObjectToHex(value) }
        let reqhead = this.encryption.createHeader();
        const key = this.encryption.generateKey(reqhead.key)
        this.emp.createDept(req, reqhead.headers).subscribe(async res => {
            if (res.success === true) {
                const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
                const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
                this.deptForm.reset();
                this.noteService.showSuccess(`200 : ${res.message}`, '');
                this.getAllDepts();
            } else {
                this.noteService.showError(` ${res.message}`, '')
            }
        })
    }

    getAllDepts() {
        this.departmentList = []
        let reqhead = this.encryption.createHeader();
        const key = this.encryption.generateKey(reqhead.key)
        this.emp.getAllDept(reqhead.headers).subscribe(async res => {
            if (res.success === true) {
                const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
                const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
                console.log('deptLis', res);
                // this.departmentList = data.data;
                decryptedData.map((d: any) => {
                    let reqheademp = this.encryption.createHeader();
                    const keyemp = this.encryption.generateKey(reqheademp.key)
                    this.emp.getEmpbydeptId(d.deptId, reqheademp.headers).subscribe(async res => {
                        const encryptedDataemp = res.data;  // Assuming encrypted data comes under 'data'
                        const decryptedDataemp = JSON.parse(this.encryption.decodeData(encryptedDataemp, await keyemp));
                        console.log(decryptedDataemp.length)
                        d.noOfEmp = decryptedDataemp.length
                        d.showDetail == false;
                        this.departmentList.push(d);
                    })
                })
            }
            if(res){
                this.isLoading=false;
            }
        })
    }
    updateDept() {
        const value = this.deptForm.value;
        let req = { data: this.encryption.encodeJsonObjectToHex(value) }
        let reqhead = this.encryption.createHeader();
        const key = this.encryption.generateKey(reqhead.key)
        this.emp.updateDept(req, reqhead.headers).subscribe(async res => {
            if (res.success === true) {
                const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
                const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
                this.deptForm.reset();
                this.noteService.showSuccess(`200 : ${res.message}`, '');
                this.getAllDepts();
            } else {
                this.noteService.showError(` ${res.message}`, '')
            }
        })
    }
    removeDept() {
        this.deptForm.patchValue({ status: "In-Active" })
        const value = this.deptForm.value;
        let req = { data: this.encryption.encodeJsonObjectToHex(value) }
        let reqhead = this.encryption.createHeader();
        const key = this.encryption.generateKey(reqhead.key)
        this.emp.updateDept(req, reqhead.headers).subscribe(async res => {
            if (res.success === true) {
                const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
                const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
                this.deptForm.reset();
                this.getAllDepts();
            }
        })
    }
    onCreateEmpAction() {
        this.empForm.reset();
        this.profileImg = "";
        this.isAddEmp = !this.isAddEmp;
        this.isShow = false;
        this.empForm.patchValue({ dateOfBirth: new Date() });
        this.empForm.patchValue({ deptId: this.departId });
    }

    onupdateEmpAction(id: any) {
        this.profileImg = ""
        this.isAddEmp = !this.isAddEmp;
        this.empList.map((d: any) => {
            if (d.empId == id) {
                this.empForm.patchValue(d);
                this.profileImg = d.empImageId;
                console.log(d.path, this.profileImg, 'image');
            }
        })
        this.isShow = true;
    }
    onCreateDept() {
        this.deptForm.reset();
        this.isShow = false;
    }
    onUpdateDept(id: any) {
        this.departmentList.map((d: any) => {
            if (d.deptId == id) {
                this.deptForm.patchValue(d);
            }
        })
        this.isShow = true;
    }

    onOpenEmp(id: any) {
        this.departId = ""
        this.isdisplay = !this.isdisplay;
        this.departId = id;
        this.departmentList.map((d: any) => {
            if (d.deptId == id) { d.showDetail = true; }
            else { d.showDetail = false; }
        })
        this.getEmpbydeptId(this.departId);
    }
    getEmpbydeptId(deptId: any) {
        this.empList = []
        let reqhead = this.encryption.createHeader();
        const key = this.encryption.generateKey(reqhead.key)
        this.emp.getEmpbydeptId(deptId, reqhead.headers).subscribe(async res => {
            if (res.success === true) {
                const encryptedDataemp = res.data;  // Assuming encrypted data comes under 'data'
                const decryptedDataemp = JSON.parse(this.encryption.decodeData(encryptedDataemp, await key));
                decryptedDataemp.map((d: any) => {
                    console.log(decryptedDataemp)
                    d.leaveBalance = d.sickLeaves + d.annualLeaves;
                    this.empList.push(d);
                })
            }
        })
    }
    removeEmp() {
        this.empForm.patchValue({ status: "In-Active" })
        const value = this.empForm.value;
        let req = { data: this.encryption.encodeJsonObjectToHex(value) }
        let reqhead = this.encryption.createHeader();
        const key = this.encryption.generateKey(reqhead.key)
        this.emp.updateDept(req, reqhead.headers).subscribe(async res => {
            if (res.success === true) {
                const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
                const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
                this.empForm.reset();
                this.isAddEmp = !this.isAddEmp;
            }
        })
    }
    updateEmpDetails() {
        // this.empForm.value.empImage = this.empForm.value.path;
        // this.empForm.value.imgName = this.empForm.value.imgName;
        const value = this.empForm.value;
        let req = { data: this.encryption.encodeJsonObjectToHex(value) }
        let reqhead = this.encryption.createHeader();
        const key = this.encryption.generateKey(reqhead.key)
        this.emp.updateDept(req, reqhead.headers).subscribe(async res => {
            if (res.success === true) {
                const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
                const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
                this.noteService.showSuccess(`200 : ${res.message}`, '');
                this.empForm.reset();
                this.isAddEmp = !this.isAddEmp;
                // this.getAllEmployees();
                // this.close();
            } else {
                this.noteService.showError(`${res.message}`, '');
                this.isAddEmp = !this.isAddEmp;
            }
        })
    }

    submit() {
        let value = this.empForm.value;
        var formData: any = new FormData();
        // formData.append('empName', this.empForm.get('empName')?.value);
        // formData.append('emailId', this.empForm.get('emailId')?.value);
        // formData.append('deptId', this.empForm.get('deptId')?.value);
        // formData.append('gender', this.empForm.get('gender')?.value);
        // formData.append('address', this.empForm.get('address')?.value);
        // formData.append('dateOfBirth', this.empForm.get('dateOfBirth')?.value);
        // formData.append('nationality', this.empForm.get('nationality')?.value);
        // formData.append('mobileNumber', this.empForm.get('mobileNumber')?.value);
        // formData.append('jobTitle', this.empForm.get('jobTitle')?.value);
        // formData.append('salary', this.empForm.get('salary')?.value);
        // formData.append('empGrade', this.empForm.get('empGrade')?.value);
        // // formData.append('leaveBalance', this.empForm.get('leaveBalance')?.value);
        // formData.append('jobDesc', this.empForm.get('jobDesc')?.value);
        // formData.append('acntNumber', this.empForm.get('acntNumber')?.value);
        // formData.append('nationalId', this.empForm.get('nationalId')?.value);
        // formData.append('password', this.empForm.get('password')?.value);

        formData.append('nationalIdFile', this.empForm.get('nationalIdFile')?.value);
        formData.append('empImage', this.empForm.get('empImage')?.value);
        value.nationalIdFile="";
        value.empImage=""
        if (this.empForm.value.empId == null || "") {
            value.status = "Active"
            delete value._id;
            formData.append('data', this.encryption.encodeJsonObjectToHex(value));
            let reqhead = this.encryption.createHeader();
            const key = this.encryption.generateKey(reqhead.key)
            this.emp.empCreation(formData, reqhead.headers).subscribe(async res => {
                this.isAddEmp = !this.isAddEmp;
                if (res.success === true) {
                    const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
                    const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
                    this.empForm.reset();
                    this.noteService.showSuccess(`200 : ${res.message}`, '');
                    this.getEmpbydeptId(this.departId);
                    // this.getAllEmployees();
                } else {
                    this.noteService.showError(` ${res.message}`, '')
                }
            })
        }
        else {
            // formData.append('_id', this.empForm.get('_id')?.value);
            // formData.append('empId', this.empForm.get('empId')?.value);
            // formData.append('dateOfJoining', this.empForm.get('dateOfJoining')?.value);
            // formData.append('status', this.empForm.get('status')?.value);
            formData.append('data', this.encryption.encodeJsonObjectToHex(value));
            let reqhead = this.encryption.createHeader();
            const key = this.encryption.generateKey(reqhead.key)
            this.emp.empCreation(formData, reqhead.headers).subscribe(async res => {
                this.isAddEmp = !this.isAddEmp;
                if (res.success === true) {
                    const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
                    const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
                    this.empForm.reset();
                    this.noteService.showSuccess(`200 : ${res.message}`, '');
                    this.getEmpbydeptId(this.departId);
                    // this.getAllEmployees();
                } else {
                    this.noteService.showError(`${res.message}`, '')
                }
            })
        }

        // formData.append('empName', this.empForm.get('empName')?.value);
        // formData.append('jobTitle', this.empForm.get('jobTitle')?.value);
        // formData.append('salary', this.empForm.get('salary')?.value);
        // formData.append('empGrade', this.empForm.get('empGrade')?.value);
        // formData.append('leaveBalance', this.empForm.get('leaveBalance')?.value);
        // formData.append('jobDesc', this.empForm.get('jobDesc')?.value);
        // formData.append('personalInfo', this.empForm.get('personalInfo')?.value);
        // formData.append('endService', this.empForm.get('endService')?.value);
        // this.isShow = !this.isShow
    }


    sort(event: any) {
        if (event) {
            this.sortValue = event;
        }
        this.employeeDetails = event === "A to Z" ? _.orderBy(this.employeeDetails, [(obj) => obj['empName'].toLowerCase()], ['asc'])
            : event === "Z to A" ? _.orderBy(this.employeeDetails, [(obj) => obj['empName'].toLowerCase()], ['desc'])
                : event === "salary_low" ? _.orderBy(this.employeeDetails, ['salary'], ['asc'])
                    : _.orderBy(this.employeeDetails, ['salary'], ['desc'])

    }


    onIdFileSelected(e: any) {
        const file = <File>e.target.files[0];
        this.empForm.patchValue({ nationalIdFile: file });
        this.empForm.get('nationalIdFile')?.updateValueAndValidity();
    }
    onFileSelected(event: any) {
        this.profileImg = ""
        console.log("##############################", event.target.files[0])
        const file = <File>event.target.files[0];
        this.empForm.patchValue({ empImage: file });
        this.empForm.get('empImage')?.updateValueAndValidity();
        console.log('image', this.empForm.value.empImage);
        const reader = new FileReader();
        reader.onload = () => {
            this.profileImg = reader.result as string;
        }
        const [fileSelected, rest] = event.target.files[0].name.split(".");
        this.fileSelected = fileSelected;
        reader.readAsDataURL(file)
    }
    // onUpdateFile(opt:any){

    // }

    // getAllEmployees() {
    //     this.emp.getAllEmp().subscribe(async data => {
    //    res.success === true) {
    //             console.log(data.data)
    //             data.data.map((d: any) => {
    //                 d.isShowDetail == false;
    //                 this.employeeDetails.push(d);
    //             })
    //         }
    //     })
    // }
    showDetails(id: any) {
        this.employeeDetails.map((d: any) => {
            if (d.empId == id) {
                d.isShowDetail == !d.isShowDetail
            }
        })
    }
    // closeDetails()
    getDetails(emp: any) {
        this.oneEmpDetails = emp;
        if (emp.wpsDetails != undefined) {
            this.wpsData = emp.wpsDetails;
        }
    }

    updateOne(emp: any) {
        var formData: any = new FormData();
        console.log(this.empForm.get('empImage')?.value, '219837189')
        if (this.empForm.get('empImage')?.value === null) {
            formData.append('empImage', this.empForm.get('empImage')?.value);
            formData.append('empName', this.empForm.get('empName')?.value);
            formData.append('jobTitle', this.empForm.get('jobTitle')?.value);
            formData.append('salary', this.empForm.get('salary')?.value);
            // formData.append('empId',this.empForm.get('empId')?.value);
            formData.append('empGrade', this.empForm.get('empGrade')?.value);
            formData.append('leaveBalance', this.empForm.get('leaveBalance')?.value);
            formData.append('jobDesc', this.empForm.get('jobDesc')?.value);
            formData.append('personalInfo', this.empForm.get('personalInfo')?.value);
            formData.append('endService', this.empForm.get('endService')?.value);
            this.emp.empCreation(formData, emp.empId).subscribe(data => {
                if (data.success === true) {
                    this.empForm.reset()
                    this.noteService.showSuccess(`200 : ${data.message}`, '');
                    // this.getAllEmployees();
                    this.close();
                } else {
                    this.noteService.showError(`${data.message}`, '')
                    this.close();
                }
            })
        } else {
            this.empForm.value.empImage = emp.path;
            this.empForm.value.imgName = emp.imgName;
            let req = { data: this.encryption.encodeJsonObjectToHex(this.empForm.value) }
            let reqhead = this.encryption.createHeader();
            const key = this.encryption.generateKey(reqhead.key)
            this.emp.updateDept(req, reqhead.headers).subscribe(async res => {
                if (res.success === true) {
                    const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
                    const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
                    this.noteService.showSuccess(`200 : ${res.message}`, '');
                    // this.getAllEmployees();
                    this.close();
                } else {
                    this.noteService.showError(` ${res.message}`, '');
                    this.close();
                }
            })
        }
    }
    wps(emp: any) {
        let value = this.wpsDetails.value;
        let req = { data: this.encryption.encodeJsonObjectToHex(value) }
        let reqhead = this.encryption.createHeader();
        const key = this.encryption.generateKey(reqhead.key)
        this.emp.wpsDetails(req, emp.empId, reqhead.headers).subscribe(async res => {
            if (res.success === true) {
                const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
                const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
                this.noteService.showSuccess(`200 : ${res.message}`, '');
                // this.getAllEmployees();
                this.close();
            } else {
                this.noteService.showError(`${res.message}`, '');
                this.close();
            }
        })
    }
    getId(id: any, sL: any, aL: any) {
        this.leaveForm.patchValue({ empId: id });
        this.sickLeaves = sL;
        this.annualLeaves = aL;
        console.log(this.sickLeaves, this.annualLeaves, 'leeeeves')

    }
    applyLeaves() {
        let value = this.leaveForm.value;
        let req = { data: this.encryption.encodeJsonObjectToHex(value) }
        let reqhead = this.encryption.createHeader();
        const key = this.encryption.generateKey(reqhead.key)
        this.emp.applyLeavs(req, reqhead.headers).subscribe(async res => {
            if (res.success === true) {
                const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
                const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
                this.noteService.showSuccess(`200 : ${res.message}`, '');
                this.leaveForm.reset();
                this.getEmpbydeptId(this.departId);
                this.close();
            } else {
                this.noteService.showError(` ${res.message}`, '');
                this.close();
            }
        })
    }
    close() {
        $(".modal").modal("hide");
    }


}