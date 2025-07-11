import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
import { AppManagerService } from 'src/app/core/services/app-manager.service';
import { CreateAcntService } from 'src/app/services/create-acnt.service';
import { SalesPersonService } from 'src/app/services/sales-person.service';
import { SignatureEncryptionService } from 'src/app/services/signature-encryption.service';
@Component({
  selector: 'app-sales-performance',
  templateUrl: './sales-performance.component.html',
  styleUrls: ['./sales-performance.component.scss']
})
export class SalesPerformanceComponent {
  constructor(private app: AppManagerService, private salesServ: SalesPersonService, private creatAcnt: CreateAcntService,
    private encryption: SignatureEncryptionService) {
    this.app.ShowReportDate = 'true';
  }

  searchText: any;
  salesList: any = [
    { userId: "2221", salesPersonName: "John Doe", contact: "9897856863", email: "a@gmail.com", remarks: "update", joiningDate: "12-22-2021", cust_Number: 987124, complaints: "7", incentives: "1500" },
    { userId: "2222", salesPersonName: "Aravind", contact: "7725328298", email: "b@gmail.com", remarks: "update", joiningDate: "10-15-2021", cust_Number: 912739, complaints: "2", incentives: "1100" },
    { userId: "2223", salesPersonName: "Sudhakar", contact: "8745096543", email: "c@gmail.com", remarks: "update", joiningDate: "04-02-2021", cust_Number: 561433, complaints: "10", incentives: "2000" },
    { userId: "2224", salesPersonName: "Chandra", contact: "6532987654", email: "d@gmail.com", remarks: "update", joiningDate: "05-15-2021", cust_Number: 614276, complaints: "14", incentives: "2800" },
    { userId: "2225", salesPersonName: "Supriya", contact: "9875983785", email: "e@gmail.com", remarks: "update", joiningDate: "12-05-2021", cust_Number: 187251, complaints: "8", incentives: "1200" },
    { userId: "2226", salesPersonName: "Sathya", contact: "8157320946", email: "f@gmail.com", remarks: "update", joiningDate: "09-20-2021", cust_Number: 986753, complaints: "12", incentives: "1800" }
  ];
  salesPersons: any = [
    {
      salesPersonId: "SID81621", emiratesId: "2973198", firstName: "Supriya", lastName: "M", title: "Mrs", gender: "Female", mobileNumber: "9843618221",
      basicSalary: "10000", houseAllowance: "2000", transportAllowance: "2000", bonus: "2000", bankName: "HDFC", accountNumber: "826198", showDetail: false,
      noOfCustomers: "200", noOfComplaints: "100", joiningDate: "12-22-2021"
    },
    {
      salesPersonId: "SID81622", emiratesId: "1287387", firstName: "Khaja", lastName: "P", title: "Mr", gender: "Male", mobileNumber: "9211361618",
      basicSalary: "10000", houseAllowance: "2000", transportAllowance: "2000", bonus: "2000", bankName: "HDFC", accountNumber: "826198", showDetail: false,
      noOfCustomers: "200", noOfComplaints: "100", joiningDate: "10-15-2021"
    },
    {
      salesPersonId: "SID81623", emiratesId: "9712686", firstName: "Srihari", lastName: "P", title: "Mrs", gender: "Female", mobileNumber: "7351822555",
      basicSalary: "10000", houseAllowance: "2000", transportAllowance: "2000", bonus: "2000", bankName: "HDFC", accountNumber: "826198", showDetail: false,
      noOfCustomers: "200", noOfComplaints: "100", joiningDate: "04-02-2021"
    },
    {
      salesPersonId: "SID81624", emiratesId: "9712686", firstName: "Rishabh", lastName: "P", title: "Mrs", gender: "Female", mobileNumber: "7351822555",
      basicSalary: "10000", houseAllowance: "2000", transportAllowance: "2000", bonus: "2000", bankName: "HDFC", accountNumber: "826198", showDetail: false,
      noOfCustomers: "200", noOfComplaints: "100", joiningDate: "05-15-2021"
    },

  ]
  merList: any;
  pridList: any = [];
  regionList: any = [
    { "city": "Hyderabad", "noOfSales": "10", "noOfCustomers": "20", "noOfComplaints": "6", "transValue": "1,00,000" },
    { "city": "Dubai", "noOfSales": "20", "noOfCustomers": "30", "noOfComplaints": "5", "transValue": "1,00,000" },
    { "city": "Qatar", "noOfSales": "15", "noOfCustomers": "34", "noOfComplaints": "3", "transValue": "1,00,000" },
    { "city": "Abu Dhabi", "noOfSales": "8", "noOfCustomers": "10", "noOfComplaints": "10", "transValue": "1,00,000" },
    // {"city":"","noOfSales":"10","noOfCustomers":"20","noOfComplaints":"8"},
    // {"city":"","noOfSales":"10","noOfCustomers":"20","noOfComplaints":"6"},
    // {"city":"","noOfSales":"10","noOfCustomers":"20","noOfComplaints":"4"}

  ]
  ngOnInit(): void {
    this.loadScripts();
    this.getAllSales()
  }
  private loadScripts(): void {
    (function ($) {
      "use strict";

      $('#side_menu_bar > ul > li.nav-item > a').removeClass("active");
      $('#side_menu_bar > ul > li.nav-item > a#li_sales_persons').addClass("active");
    })(jQuery);
  }
  getAllSales() {
    let merchants: any[] = [];
    let complaints: any[] = [];
    let reqheadmer = this.encryption.createHeader();
    const keymer = this.encryption.generateKey(reqheadmer.key)
    this.salesServ.getMerbySalesID(reqheadmer.headers).subscribe(async res => {
      if (res.success === true) {
      const encryptedDatamer = res.data;  // Assuming encrypted data comes under 'data'
      const decryptedDatamer = JSON.parse(this.encryption.decodeData(encryptedDatamer, await keymer));
      merchants = decryptedDatamer;
      }
    })
    let reqheadcomp = this.encryption.createHeader();
    const keycomp = this.encryption.generateKey(reqheadcomp.key)
    this.salesServ.getCompbysales(reqheadcomp.headers).subscribe(async res => {
      if (res.success === true) {
      const encryptedDatacomp = res.data;  // Assuming encrypted data comes under 'data'
      const decryptedDatacomp = JSON.parse(this.encryption.decodeData(encryptedDatacomp, await keycomp));
      complaints = decryptedDatacomp;
      console.log(decryptedDatacomp)
      }
    })
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.salesServ.getAllSales(reqhead.headers).subscribe(async res => {
      const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
      const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
      this.salesPersons = decryptedData;
      if (merchants.length > 0) {
        this.salesPersons.map((s: any) => {
          s.noOfMerchants = 0;
          s.complaints = 0;
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
  getMerchantsbySales(id: any) {
    this.pridList=[]
    this.salesPersons.map((s: any) => {
      if (s.salesId === id) {
        s.showDetail = true;
      }
      else {
        s.showDetail = false
      }
    })
    let reqheadprid = this.encryption.createHeader();
    const keyprid = this.encryption.generateKey(reqheadprid.key)
    this.creatAcnt.getPrid(reqheadprid.headers).subscribe(async res => {
      const encryptedDataprid = res.data;  // Assuming encrypted data comes under 'data'
      const decryptedDataprid = JSON.parse(this.encryption.decodeData(encryptedDataprid, await keyprid));
      // this.pridList=decryptedDataprid;

      decryptedDataprid.map((p: any) => {
        if (p.salesId === id) {
          p.noOfCustomers = 0;
          p.tid = 0;
          p.incentives = 0;
          let reqheadmer = this.encryption.createHeader();
          const keymer = this.encryption.generateKey(reqheadmer.key)
          this.creatAcnt.getMerchantsbyPrid(p.payRowId, reqheadmer.headers).subscribe(async res => {
            if (res.success === true) {
              const encryptedDatamer = res.data;  // Assuming encrypted data comes under 'data'
              const decryptedDatamer = JSON.parse(this.encryption.decodeData(encryptedDatamer, await keymer));
              p.noOfCustomers = decryptedDatamer.length
            }
          })
          let reqheadtid = this.encryption.createHeader();
          const keytid = this.encryption.generateKey(reqheadtid.key)
          this.creatAcnt.getAllTids(reqheadtid.headers).subscribe(async res => {
            if (res.success === true) {
              const encryptedDatatid = res.data;  // Assuming encrypted data comes under 'data'
              const decryptedDatatid = JSON.parse(this.encryption.decodeData(encryptedDatatid, await keytid));
              let count = 0
              decryptedDatatid.map((t: any) => {
                if (p.payRowId === t.payRowId) {
                  count++
                }
              })
              p.tid = count
            }
          })
          this.pridList.push(p)
        }
        console.log('pridlist', this.pridList)


      })
    })

  }
}
