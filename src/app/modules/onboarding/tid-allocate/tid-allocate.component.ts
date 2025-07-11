import { Component, OnInit } from '@angular/core';
import { AppManagerService } from 'src/app/core/services/app-manager.service';
import * as _ from 'lodash';
import { CreateAcntService } from 'src/app/services/create-acnt.service';
import { NotificationService } from 'src/app/core/services/notification.service';
declare var jQuery: any;

@Component({
  selector: 'app-tid-allocate',
  templateUrl: './tid-allocate.component.html',
  styleUrls: ['./tid-allocate.component.scss']
})
export class TidAllocateComponent implements OnInit {
  tidData: any = [];
  tidPerData: any = [];
  tidList: any = []
  isTrack: any;
  isForm: boolean = false;
  searchId: any;
  searchText: any;
  constructor(private app: AppManagerService, private createAcnt: CreateAcntService, private note_service: NotificationService) {
    this.app.ShowReportDate = 'true';
  }

  ngOnInit(): void {
    this.tIdList()
    this.loadScripts()
  }

  private loadScripts(): void {
    (function ($) {
      'use strict';

      $('#side_menu_bar > ul > li.nav-item > a').removeClass('active');
      $('#side_menu_bar > ul > li.nav-item > a#li_onboarding').addClass('active');
    })(jQuery);
  }

  userDetailsFunc(imei: any) {
    this.isTrack = !this.isTrack;
    this.tidPerData = [];
    this.tidData.map((sData: any) => {
      if (parseInt(imei) === sData.sNo) {
        this.isTrack = imei;
        this.tidPerData.push(sData);
        // this.selectStoreCat = sData.data[0].cat;
      }
    });

    // this.tidList.map((sData: any) => {
    //   console.log(sData.tidInfo.deviceIMEINumber)
    //   if (imei === sData.tidInfo.deviceIMEINumber) {
    //     this.isTrack = imei;
    //     this.tidPerData.push(sData);
    //     // this.selectStoreCat = sData.data[0].cat;
    //   }
    // });

    if (this.tidPerData.length === 0) {
      alert(`${imei} Does Not Exist`)
    };
    this.searchId = "";
    //console.log("###########################",this.storeCatData[0].data[0].cat);
  };

  sendAuthentication(id: any) {
    console.log(id, 'id')
    this.createAcnt.sendAuthCode(id).subscribe(data => {
      if (data.success === true) {
        this.note_service.showSuccess(`${200} : ${data.message}`, '')
      } else {
        this.note_service.showError(`${data.status} : ${data.error.message}`, '')
      }
      if (data) {
        console.log('Authentication is sent')
        this.isTrack = !this.isTrack;
      }
      // this.merchantList = data.data;
    })
  }

  tIdList() {
    this.createAcnt.getMerchants().subscribe(data => {
      data.data.map((tData: any) => {
        if (tData.terminalsInfo.length !== 0) {
          tData.terminalsInfo.map((data: any) => {
            let tids = {
              tidInfo: data, mid: tData.bankMID, activationDate: "pending", address: tData.addressDetails,
              emailId: tData.emailId, firstName: tData.firstName, tid: "pending", status: tData.status.status
            }
            this.tidList.push(tids)
          })
          console.log(this.tidList)
        }
      })
    })
  }



  backToList() {
    this.isTrack = !this.isTrack;
    this.tIdList()
  }
  showForm() {
    this.isForm = !this.isForm;
  }
}
