import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AppManagerService } from 'src/app/core/services/app-manager.service';
declare var jQuery: any;

@Component({
  selector: 'app-tid-risk',
  templateUrl: './tid-risk.component.html',
  styleUrls: ['./tid-risk.component.scss']
})
export class TidRiskComponent implements OnInit {
  previousStep = false;
  nextstep = false;
  step = 1
  constructor(private app: AppManagerService) {
    this.app.ShowReportDate = 'true';
  }
  ngOnInit(): void {
    this.loadScripts()
  }
  private loadScripts(): void {
    (function ($) {
      "use strict";

      $('#side_menu_bar > ul > li.nav-item > a').removeClass("active");
      $('#side_menu_bar > ul > li.nav-item > a#li_create_account').addClass("active");
      $(document).on("change", "#accept", function () {
        if ($("#accept").is(':checked')) {
          $('#accep_label').text('Acccept');
        } else {
          $('#accept_label').text('Decline');
          console.log('decline')
        }
      });

    })(jQuery);
  }
  next() {
    this.previousStep = true;
    this.step = 2;
  }
  previous() {
    this.nextstep = true;
    this.step = 1;
  }
}
