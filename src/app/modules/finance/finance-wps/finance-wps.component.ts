import { Component, OnInit } from '@angular/core';
import { AppManagerService } from 'src/app/core/services/app-manager.service';
declare var jQuery: any;

@Component({
  selector: 'app-finance-wps',
  templateUrl: './finance-wps.component.html',
  styleUrls: ['./finance-wps.component.scss']
})
export class FinanceWPSComponent implements OnInit {
   
    constructor(
        private app: AppManagerService
    ) { 
        this.app.ShowReportDate = 'true';
        
    }

    ngOnInit(): void {
        this.loadScripts();
    }
    
    // WPS : User ID, User name, basic salary, house allowance, 
    // transport, joining date, account number, month - drop down, action - radio button.
   
    
    private loadScripts(): void {
        (function($) {
        "use strict";

        $('#side_menu_bar > ul > li.nav-item > a').removeClass("active");
        $('#side_menu_bar > ul > li.nav-item > a#li_finance').addClass("active");

        function dataTable() {
            const jsonData = [
                {
                    "User ID": "5678709",
                    "User name": "Ahmad",
                    "basic salary": "6000",
                    "house allowance":"3452",
                    "transport":"6000",
                    "bonus":"",
                    "joining date":"20/8/2021",
                    "account number":"6739876554",
                    "month": "<select class='form-select form-select-sm-2'><option selected>Month</option><option value='January'>January</option><option value='February'>February</option><option value='March'>March</option><option value='Aprial'>Aprial</option><option value='May'>May</option><option value='June'>June</option><option value='July'>July</option><option value='August'>August</option> <option value='September'>September</option><option value='October'>October</option><option value='November'>November</option><option value='December'>December</option></select>",
                    "action":"<input class='form-check-input' style='margin-left:10px' type='radio' name='1' id='1' checked>"
                },
                {
                    "User ID": "5678709",
                    "User name": "Sadhana",
                    "basic salary": "6000",
                    "house allowance":"3452",
                    "transport":"6000",
                    "bonus":"1000",
                    "joining date":"20/8/2021",
                    "account number":"6739876554",
                    "month": "<select class='form-select form-select-sm-2'><option selected>Month</option><option value='January'>January</option><option value='February'>February</option><option value='March'>March</option><option value='Aprial'>Aprial</option><option value='May'>May</option><option value='June'>June</option><option value='July'>July</option><option value='August'>August</option> <option value='September'>September</option><option value='October'>October</option><option value='November'>November</option><option value='December'>December</option></select>",
                    "action":"<input class='form-check-input' style='margin-left:10px' type='radio' name='2' id='2' checked>"
                },
                {
                    "User ID": "5678709",
                    "User name": "Aravind",
                    "basic salary": "6000",
                    "house allowance":"3452",
                    "transport":"6000",
                    "bonus":"",
                    "joining date":"20/8/2021",
                    "account number":"6739876554",
                    "month": "<select class='form-select form-select-sm-2'><option selected>Month</option><option value='January'>January</option><option value='February'>February</option><option value='March'>March</option><option value='Aprial'>Aprial</option><option value='May'>May</option><option value='June'>June</option><option value='July'>July</option><option value='August'>August</option> <option value='September'>September</option><option value='October'>October</option><option value='November'>November</option><option value='December'>December</option></select>",
                    "action":"<input class='form-check-input' style='margin-left:10px' type='radio' name='3' id='3' checked>"
                },
                {
                    "User ID": "5678709",
                    "User name": "Sudhakar",
                    "basic salary": "6000",
                    "house allowance":"3452",
                    "transport":"6000",
                    "bonus":"",
                    "joining date":"20/8/2021",
                    "account number":"6739876554",
                    "month": "<select class='form-select form-select-sm-2'><option selected>Month</option><option value='January'>January</option><option value='February'>February</option><option value='March'>March</option><option value='Aprial'>Aprial</option><option value='May'>May</option><option value='June'>June</option><option value='July'>July</option><option value='August'>August</option> <option value='September'>September</option><option value='October'>October</option><option value='November'>November</option><option value='December'>December</option></select>",
                    "action":"<input class='form-check-input' style='margin-left:10px' type='radio' name='4' id='4' checked>"
                },
                {
                    "User ID": "5678709",
                    "User name": "Ahamad",
                    "basic salary": "6000",
                    "house allowance":"3452",
                    "transport":"6000",
                    "bonus":"1500",
                    "joining date":"20/8/2021",
                    "account number":"6739876554",
                    "month": "<select class='form-select form-select-sm-2'><option selected>Month</option><option value='January'>January</option><option value='February'>February</option><option value='March'>March</option><option value='Aprial'>Aprial</option><option value='May'>May</option><option value='June'>June</option><option value='July'>July</option><option value='August'>August</option> <option value='September'>September</option><option value='October'>October</option><option value='November'>November</option><option value='December'>December</option></select>",
                    "action": "<input class='form-check-input' style='margin-left:10px' type='radio' name='5' id='5' checked>"
                },
                {
                    "User ID": "5678709",
                    "User name": "Ahamad",
                    "basic salary": "6000",
                    "house allowance":"3452",
                    "transport":"6000",
                    "bonus":"",
                    "joining date":"20/8/2021",
                    "account number":"6739876554",
                    "month": "<select class='form-select form-select-sm-2'><option selected>Month</option><option value='January'>January</option><option value='February'>February</option><option value='March'>March</option><option value='Aprial'>Aprial</option><option value='May'>May</option><option value='June'>June</option><option value='July'>July</option><option value='August'>August</option> <option value='September'>September</option><option value='October'>October</option><option value='November'>November</option><option value='December'>December</option></select>",
                    "action":"<input class='form-check-input' style='margin-left:10px' type='radio' name='6' id='6' checked>"
                }
            ];

            $('#finance_wps_table').DataTable({
            data: jsonData,
            columns: [{
                    data: "User ID",
                    className: 'text-center',
                    orderable: true,
                    searchable: true
                },
                {
                    data: "User name",
                    className: 'text-center',
                    orderable: true,
                    searchable: true
                },
                {
                    data: "basic salary",
                    className: 'text-center',
                    orderable: true,
                    searchable: true
                },
                {
                    data: "house allowance",
                    className: 'text-center',
                    orderable: true,
                    searchable: true
                },
                {
                    data: "transport",
                    className: 'text-center',
                    orderable: true,
                    searchable: true
                },
                {
                    data: "bonus",
                    className: 'text-center',
                    orderable: true,
                    searchable: true
                },
                {
                    data: "joining date",
                    className: 'text-center',
                    orderable: true,
                    searchable: true
                },
                {
                    data: "account number",
                    className: 'text-center',
                    orderable: true,
                    searchable: true
                },
                {
                    data: "month",
                    className: 'text-center',
                    orderable: true,
                    searchable: true
                },
                {
                    data: "action",
                    className: 'text-center',
                    orderable: true,
                    searchable: true
                }
                ],
                "bDestroy": true,
                "pageLength": 40
            });

        }
        
        dataTable();
        })(jQuery);
    }

    
}
