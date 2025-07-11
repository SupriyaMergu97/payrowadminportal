import { Component } from '@angular/core';
import { AppManagerService } from 'src/app/core/services/app-manager.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
interface ICountry {
  item_id: number;
  item_text: string;
  isDisabled?: boolean;
}
@Component({
  selector: 'app-payrow-card',
  templateUrl: './payrow-card.component.html',
  styleUrls: ['./payrow-card.component.scss']
})
export class PayrowCardComponent {
  isAddAcnt: boolean = false;
  typeOfCustomer: any;
  idProof: any
  name = "Angular";
  countries: Array<ICountry> = [];
  selectedItems2: Array<any> = [];
  dropdownSettings = {};
  selectedItems: any[]
  isLoading: boolean = true;
  // dropdownSettings2: IDropdownSettings = {};
  totalItems = 50; // Total number of items
  itemsPerPage = 9; // Default items per page
  currentPage = 1; // Current page
  initialPagesToShow = 5; // Number of pages to initially show
  currentPageRange: number[] = []; // Range o
  departmentList: any = [
    { "deptId": "219776221100", "departName": "Supriya", "emailId": "HR@gmail.com", "mobileNumber": "9421869845", "employees": "6", "status": "Active", "expiryDate": new Date() },
    { "deptId": "219776221101", "departName": "Khaja", "emailId": "Finance@gmail.com", "mobileNumber": "9318264561", "employees": "5", "status": "In-Active", "expiryDate": new Date() },
    { "deptId": "219776221102", "departName": "Srihari", "emailId": "Marketing@gmail.com", "mobileNumber": "9879877777", "employees": "3", "status": "Active", "expiryDate": new Date() },
    { "deptId": "219776221103", "departName": "Rishabh", "emailId": "IT@gmail.com", "mobileNumber": "7364554782", "employees": "10", "status": "Active", "expiryDate": new Date() },
    // { "deptId": "219776221104", "departName": "Sales", "emailId": "Sales@gmail.com", "mobileNumber": "8283465698", "employees": "8", "status": "Active", "expiryDate": new Date() },
    // { "deptId": "219776221105", "departName": "Legal", "emailId": "Legal@gmail.com", "mobileNumber": "9782374982", "employees": "6", "status": "Active", "expiryDate": new Date() },
    // { "deptId": "219776221106", "departName": "Management", "emailId": "Management@gmail.com", "mobileNumber": "6308492234", "employees": "4", "status": "Active", "expiryDate": new Date() },
    // { "deptId": "219776221107", "departName": "Risk and complaints", "emailId": "Risk and complaints@gmail.com", "mobileNumber": "6308492234", "employees": "2", "status": "Active", "expiryDate": new Date() },
    // { "deptId": "219776221108", "departName": "Regional Manager", "emailId": "Account Manager@gmail.com", "mobileNumber": "6308492234", "employees": "6", "status": "Active", "expiryDate": new Date() },
  ]
  transList: any = [
    {
      "date": "10/09/21", "time": "1:02:00", "merchant_id": "768762", "payment_type": "Tap to Pay", "posType": "Staff", "pos_id": "345301", "item": "Bakery", "product": "Cash",
      "email_id": "a@gmail.com", "mobile": "9897856863", "vatNo": "978568", "sequence_no": "3223451", "receipt_no": "12/3/00", "vat": "400", "total_credit": "6000000"
    },
    {
      "date": "12/03/21", "time": "9:02:00", "merchant_id": "623876", "payment_type": "Cash", "posType": "Manager", "pos_id": "341302", "item": "Soft drink", "product": "generateQR",
      "email_id": "b@gmail.com", "mobile": "7725328298", "vatNo": "253282", "sequence_no": "3223452", "receipt_no": "12/3/00", "vat": "320", "total_credit": "6000000"
    },
    {
      "date": "03/10/21", "time": "13:02:00", "merchant_id": "253685", "payment_type": "Tap to Pay", "posType": "Staff", "pos_id": "341303", "item": "Electronic", "product": "Card",
      "email_id": "c@gmail.com", "mobile": "8745096543", "vatNo": "450965", "sequence_no": "3223453", "receipt_no": "12/3/00", "vat": "800", "total_credit": "8000000"
    },
    {
      "date": "09/03/21", "time": "18:02:00", "merchant_id": "638726", "payment_type": "Tap to Pay", "posType": "Delivery", "pos_id": "341304", "item": "Vegetable", "product": "ECOMMERCE",
      "email_id": "d@gmail.com", "mobile": "6532987654", "vatNo": "329876", "sequence_no": "3223454", "receipt_no": "12/3/00", "vat": "500", "total_credit": "8000000"
    },
    {
      "date": "05/07/21", "time": "20:02:00", "merchant_id": "637286", "payment_type": "Cash", "posType": "Manager", "pos_id": "341305", "item": "Jewelry", "product": "Paybylink",
      "email_id": "e@gmail.com", "mobile": "9875983785", "vatNo": "759837", "sequence_no": "3223455", "receipt_no": "12/3/00", "vat": "400", "total_credit": "6000000"
    },
    {
      "date": "12/02/21", "time": "20:02:00", "merchant_id": "352652", "payment_type": "Cash", "posType": "Manager", "pos_id": "341306", "item": "Jewelry", "product": "Paybylink",
      "email_id": "f@gmail.com", "mobile": "8157320946", "vatNo": "573209", "sequence_no": "3223455", "receipt_no": "12/3/00", "vat": "400", "total_credit": "6000000"
    },
  ]


  constructor(private app: AppManagerService) {
    this.app.ShowReportDate = 'true';
  }
  ngOnInit(): void {
    this.loadScripts();
    if (this.departmentList.length > 0) {
      this.isLoading = false;
    } else {
      this.isLoading = false
    }
    this.countries = [
      {
        item_id: 1,
        item_text: 'India',
      },
      {
        item_id: 2,
        item_text: 'Spain',
      },
      {
        item_id: 3,
        item_text: 'United Kingdom'
      },
      {
        item_id: 4,
        item_text: 'Canada'
      },
      {
        item_id: 5,
        item_text: 'Israel'
      },
      {
        item_id: 6,
        item_text: 'Brazil'
      },
      {
        item_id: 7,
        item_text: 'Barbados'
      },
      {
        item_id: 8,
        item_text: 'Mexico'
      },
    ];
    // this.selectedItems2 = [
    //   {
    //     item_id: 1,
    //     item_text: 'India'},
    //   {
    //     item_id: 5,
    //     item_text: 'Israel'
    //   },
    // ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      itemsShowLimit: 2,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
    };
  }

  private loadScripts(): void {
    (function ($) {
      'use strict';

      $('#side_menu_bar > ul > li.nav-item > a').removeClass('active');
      $('#side_menu_bar > ul > li.nav-item > a#li_payrowCard').addClass(
        'active'
      );
    })(jQuery);
  }

  onItemSelect(item: any) {

    console.log('onItemSelect', item);
    console.log('selectedItem', this.selectedItems2);
  }
  onItemDeSelect(item: any) {
    console.log('onItem DeSelect', item);
  }

  onSelectAll(items: any) {
    console.log('onSelectAll', items);
  }

  onDropDownClose() {
    console.log('dropdown closed');
  }
  onAddAcntAction() {
    this.isAddAcnt = !this.isAddAcnt
  }
  back() {
    this.isAddAcnt = !this.isAddAcnt
  }
  onupdateAcntAction(id: any) {

  }
  onSelMerchantType(e: any) {
    this.typeOfCustomer = e.target.value;
    console.log(this.typeOfCustomer)
  }

  getPageNumbers(): number[] {
    const totalPages = this.getTotalPages();
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  getTotalPages(): number {
    return Math.ceil(this.departmentList.length / this.itemsPerPage);
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

}
