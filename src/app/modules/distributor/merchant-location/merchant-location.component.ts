import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
@Component({
  selector: 'app-merchant-location',
  templateUrl: './merchant-location.component.html',
  styleUrls: ['./merchant-location.component.scss']
})
export class MerchantLocationComponent implements OnInit {
    latitude = 40.730610; // Default latitude
    longitude = -73.935242; // Default longitude
    zoom = 12; // Default zoom level
    
    locations: { lat: number, lng: number }[] = [
      { lat: 40.730610, lng: -73.935242 },
      { lat: 34.052235, lng: -118.243683 },
      { lat: 41.878113, lng: -87.629799 }
    ];
    constructor() { }

    ngOnInit(): void {
        this.loadjQueryScripts();
    }

    private loadjQueryScripts(): void {
        (function ($) {
        "use strict";
        $('.knob').knob();

        $('#side_menu_bar > ul > li.nav-item > a').removeClass("active");
        $('#side_menu_bar > ul > li.nav-item > a#li_distributor').addClass("active");
        })(jQuery);
    }
}
