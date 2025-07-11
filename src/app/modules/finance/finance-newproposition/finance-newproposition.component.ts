import { Component, OnInit } from '@angular/core';
import { AppManagerService } from 'src/app/core/services/app-manager.service';
declare var jQuery: any;

@Component({
  selector: 'app-finance-newproposition',
  templateUrl: './finance-newproposition.component.html',
  styleUrls: ['./finance-newproposition.component.scss']
})
export class FinanceNewPropositionComponent implements OnInit {

  constructor(
    private app: AppManagerService
  ) { 
    this.app.ShowReportDate = 'true';
  }

  ngOnInit(): void {
    this.loadScripts();
  }

  private loadScripts(): void {
    (function($) {
      "use strict";

      $('#side_menu_bar > ul > li.nav-item > a').removeClass("active");
      $('#side_menu_bar > ul > li.nav-item > a#li_finance').addClass("active");
    })(jQuery);
  }
}
