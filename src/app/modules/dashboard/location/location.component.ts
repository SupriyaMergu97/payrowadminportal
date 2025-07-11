import { Component } from '@angular/core';
import { AppManagerService } from 'src/app/core/services/app-manager.service';
import { CreateAcntService } from 'src/app/services/create-acnt.service';
import { SignatureEncryptionService } from 'src/app/services/signature-encryption.service';
declare var jQuery: any;
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent {
  latitude = 17.3833318; // Default latitude
  longitude = 78.40249839; // Default longitude
  zoom = 12; // Default zoom level
  // 17.3833318 78.40249839
  locations: { lat: number, lng: number }[] = [
    // 17.35794097167173, 78.47170514497276
    // { lat: 17.361689789698726, lng: 78.47455856491307 },
    // { lat: 17.35794097167173, lng: 78.47170514497276 },
    // { lat: 17.331743899442568, lng: 78.46578358992174 }
  ];

  customRedIcon = {
    url: 'data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path fill="red" d="M480 976q-2.4 0-6-2T464 970L268 774q-82-82-105.5-186T192 396q0-130 89.5-219.5T480 96q130 0 219.5 89.5T789 396q0 104-24 208t-108 188L494 968q-4 4-7.5 6t-6.5 2Zm-1-442q48 0 82.5-34.5T596 416q0-48-34.5-82.5T479 299q-48 0-82.5 34.5T362 416q0 48 34.5 82.5T479 534Z"/></svg>',
    scaledSize: {
      width: 40,
      height: 40
    }
  };
  isLoading: boolean=true;
  constructor(private app: AppManagerService, private creat_acnt: CreateAcntService, private encryption: SignatureEncryptionService) {
    this.app.ShowReportDate = 'true';
  }


  ngOnInit(): void {
    this.loadjQueryScripts();
    this.getAllTids();
  }
  private loadjQueryScripts(): void {
    (($) => {
      'use strict';
      $('.knob').knob();

      $('#side_menu_bar > ul > li.nav-item > a').removeClass('active');
      $('#side_menu_bar > ul > li.nav-item > a#li_dashboard').addClass(
        'active'
      );
    })(jQuery);
  }

  getAllTids() {
    let reqhead = this.encryption.createHeader();
    const key = this.encryption.generateKey(reqhead.key)
    this.creat_acnt.getAllTids(reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
        this.locations = decryptedData;
        console.log(decryptedData, '====')
      }
      if (res) {
        this.isLoading = false;
    }
    })
  }
}
