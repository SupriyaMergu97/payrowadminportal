import { AppManagerService } from './../../core/services/app-manager.service';
import { IdentityService } from 'src/app/core/services/identity.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var jQuery: any;
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { SignatureEncryptionService } from 'src/app/services/signature-encryption.service';
import { DistributorService } from 'src/app/services/distributor.service';
import { EmpService } from 'src/app/services/emp.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  decodedToken: any;
  menuItem: any = {}; // Initialize as an empty object
  sideMenu: any[] = []; // Define sideMenu as an array
  mngrList: any;
  selectedMngr: any
  distData:any
  constructor(
    public identity: IdentityService,
    public app: AppManagerService,
    public cookieService: CookieService,
    private encryption: SignatureEncryptionService,
    private distributor: DistributorService,
    private emp: EmpService
  ) { }

  ngOnInit(): void {
    this.getRegMngr();
    this.loadScripts();
    let userData = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzFmMGY0YjM0M2JhMDAwODMxMTA5Y2YiLCJlbWFpbElkIjoic3Vwcml5YW1lcmd1MTk5N0BnbWFpbC5jb20iLCJuYW1lIjoiUGF5cm93IiwiZGlzdElkIjoiZGlkNDE0NDYzIiwicm9sZSI6ImRpc3RyaWJ1dG9yIiwiaWF0IjoxNjc4MTkxOTExfQ.jzaB4MG_TrVYEuYODrz-Jbmal8tHFbWdGy-F23VxRQw"
    // const userData = this.cookieService.get("auth_tok");
    console.log("token", userData);
    // Check if token exists and is a valid string
    if (userData) {
      try {
        // Decode the token
        this.decodedToken = jwtDecode(userData);
        console.log("Decoded Token:", this.decodedToken);
        this.sideMenu = this.decodedToken.sideMenuList || [];

        this.menuItem = this.getMenuItems();
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      console.error('Token not found in localStorage');
    }
  }

  private getMenuItems() {
    const menuItems = {
      Home: this.validateMenuItem('Home'),
      ProductType: this.validateMenuItem('ProductType'),
      Top20Customers: this.validateMenuItem('Top20Customers'),
      LowPerformance: this.validateMenuItem('LowPerformance'),
      HighConsumption: this.validateMenuItem('HighConsumption'),
      VATReport: this.validateMenuItem('VATReport'),
      AuditorReport: this.validateMenuItem('AuditorReport'),
      Complaints: this.validateMenuItem('Complaints'),
      ServiceCatalogue: this.validateMenuItem('ServiceCatalogue'),
      EmployeeRelations: this.validateMenuItem('EmployeeRelations'),
      SalesPersons: this.validateMenuItem('SalesPersons'),
      Distributor: this.validateMenuItem('Distributor'),
      PayRowCard: this.validateMenuItem('PayRowCard'),
      MerchantAccount: this.validateMenuItem('MerchantAccount'),
      MIDTIDAllocation: this.validateMenuItem('MIDTIDAllocation'),
    };

    return menuItems;
  }

  private validateMenuItem(itemId: string) {
    const item = this.sideMenu.find((i: { item_id: string; }) => i.item_id === itemId);
    // Additional validation logic can go here
    return item ? item : null; // Return the item if it exists, otherwise return null
  }
  async getRegMngr() {
    let reqhead = this.encryption.createHeader();
    const key = await this.encryption.generateKey(reqhead.key)
    this.distributor.getDistbyId(this.decodedToken.distId, reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = await JSON.parse(this.encryption.decodeData(encryptedData, await key));
        console.log(decryptedData)
        this.distData=decryptedData
        let reqheadmngr = this.encryption.createHeader();
        const keymngr = await this.encryption.generateKey(reqheadmngr.key)
        this.emp.getEmpbyId(reqheadmngr.headers, decryptedData[0].regionalManagerID).subscribe(async res => {
          if (res.success === true) {
            const encryptedDatamngr = res.data;  // Assuming encrypted data comes under 'data'
            const decryptedDatamngr = await JSON.parse(this.encryption.decodeData(encryptedDatamngr, await keymngr));
            this.mngrList = decryptedDatamngr;
            this.selectedMngr = this.mngrList[0]
            console.log(decryptedDatamngr, 'dddaaaattaa')
          }
        })
      }
    })
    // regionalManagerID: "EMP101



  }

  private loadScripts(): void {
    (function ($) {
      "use strict";
      $('.reservation').daterangepicker();
    })(jQuery);
  }
}
