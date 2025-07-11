import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
@Component({
  selector: 'app-dashboard-footer-graphs',
  templateUrl: './dashboard-footer-graphs.component.html',
  styleUrls: ['./dashboard-footer-graphs.component.scss']
})
export class DashboardFooterGraphsComponent implements OnInit {

  constructor() { }
  public donutDataFooter: any = [
    { dounttitle: "Store Manager", svgImg: 'assets/images/credit.png', value: 10000, color: '#6CB49C', target: 1000000000, actual: 750000000, percent: null },
    { dounttitle: "Delivery POS", svgImg: 'assets/images/credit.png', value: 1000, color: '#AACC00', target: 1000000000, actual: 700000000, percent: null },
    { dounttitle: "Staff POS", svgImg: 'assets/images/credit.png', value: 500, color: '#3F88A9', target: 5000000000, actual: 3000000000, percent: null }]
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    (($) => {
      "use strict";
      $('.knob').knob();

      $('#side_menu_bar > ul > li.nav-item > a').removeClass("active");
      $('#side_menu_bar > ul > li.nav-item > a#li_dashboard').addClass("active");
    })(jQuery);

  }
}
