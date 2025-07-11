import { Component, OnInit } from "@angular/core";
import { AppManagerService } from "src/app/core/services/app-manager.service";
import { Browser } from "@syncfusion/ej2-base";
import {
  ILoadedEventArgs,
  ChartTheme,
  IPointRenderEventArgs,
} from "@syncfusion/ej2-angular-charts";
import { BarServiceService } from "src/services/bar-service.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
declare var jQuery: any;

@Component({
  selector: "app-payment-gateway",
  templateUrl: "./payment-gateway.component.html",
  styleUrls: ["./payment-gateway.component.scss"],
})
export class PaymentGatewayComponent implements OnInit {
  uploadForm: FormGroup;
  fileSelected: File;
  data1: Object[];
  marketDataStore: any = [];
  graphData: any = [];
  selected: any;
  nameOntoolTip: string;
  catData: Object[];
  imageUrl: any;
  public categoryItems: String[] = [];
  public multiSelectorData: any = [];
  public selectedData: any = [];
  height: any = 0;
  heightNew: any = "100";
  columnWidth: number = 0.01;
  public years: any = [];
  constructor(
    public fb: FormBuilder,
    private app: AppManagerService,
    private bar_Service: BarServiceService,
    private http: HttpClient,
  ) {
    this.app.ShowReportDate = "true";
    this.uploadForm = this.fb.group({
      avatar: [null],

      name: [""],
    });
  }

  public bgStyle: any = {
    border: "1px solid rgb(216, 214, 214)",
    //height :"ghkj"
  };

  public stylesImg: any = {
    width: "64px",
    "margin-left": "20px",
    "border-radius": "34px",
    padding: "6px 6px",
  };

  public chartData1: Array<any> = [
    { x: "Jan", y: 200 },
    { x: "Feb", y: 80 },
    { x: "Mar", y: 220 },
    { x: "Apr", y: 210 },
    { x: "May", y: 150 },
    { x: "Jun", y: 100 },
    { x: "Jul", y: 210 },
    { x: "Aug", y: 110 },
    { x: "Sep", y: 100 },
    { x: "Oct", y: 225 },
    { x: "Nov", y: 160 },
    { x: "Dec", y: 240 },
  ];
  dropdownSettings: {
    singleSelection: boolean;
    idField: string;
    textField: string;
    selectAllText: string;
    unSelectAllText: string;
    itemsShowLimit: number;
    allowSearchFilter: boolean;
    clearSearchFilter: boolean;
    enableCheckAll: boolean;
    searchPlaceholderText: string;
    limitSelection: Number;
  };
  //Initializing Primary X Axis
  public prXAxis: Object = {
    majorGridLines: { width: 0 },
    minorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
    interval: 1,
    lineStyle: { width: 0 },
    valueType: "Category",
  };
  palette: String[];
  //Initializing Primary Y Axis
  public prYAxis: Object = {
    lineStyle: { width: 0 },
    minimum: 0,
    maximum: 500,
    interval: 50,
    majorTickLines: { width: 0 },
    majorGridLines: { width: 1 },
    minorGridLines: { width: 0 },
    minorTickLines: { width: 0 },
    labelFormat: "${value} M",
  };
  public primaryXAxis1: Object = {
    valueType: "Category",
    majorGridLines: { width: 0 },
    enableTrim: false,
    Intervel: 1,
    labelIntersectAction: "Rotate45",
    edgeLabelPlacement: "Shift",
    // lineStyle: { width: 0 },
    majorTickLines: { width: 0 },

    minorGridLines: { width: 1 },
  };
  //Initializing Primary Y Axis
  public primaryYAxis1: Object = {
    labelFormat: "${value} M",
    edgeLabelPlacement: "Shift",
    enableTrim: false,
    labelIntersectAction: "Rotate45",
    majorTickLines: { width: 0 },
    minorGridLines: { width: 1 },
    minimum: 0,
    maximum: 500,
    interval: 50,
  };
  public pointRender(args: IPointRenderEventArgs): void {
    let seriesColor: string[] = [
      "#00bdae",
      "#404041",
      "#357cd2",
      "#e56590",
      "#f8b883",
      "#70ad47",
      "#dd8abd",
      "#7f84e8",
      "#7bb4eb",
      "#ea7a57",
    ];
    args.fill = "#72AC47";
  }
  public radius: Object = {
    bottomLeft: 0,
    bottomRight: 0,
    topLeft: 5,
    topRight: 5,
  };
  public marker: Object = {
    dataLabel: {
      // visible: true,
      // template:'<div><div><img src="/admin/assets/images/bakery1.png" width="40px"></div></div>' ,
    },
  };
  public title: string = "";
  public tooltip: Object = {
    enable: true,
  };
  public legend: Object = {
    visible: false,
  };
  public chartArea: Object = {
    border: {
      width: 0,
    },
  };
  public width: string = Browser.isDevice ? "100%" : "96%";

  ngOnInit(): void {
    const year: any = new Date().getFullYear();
    this.years.push(year);
    for (var i = 1; i < 3; i++) {
      this.years.push(year + i);
    }

    this.data1 = this.chartData1.map((item) => {
      return { x: item.x, y: item.y };
    });

    this.palette = ["#72AC47", "#406326", "#204406"];
    this.dropdownSettings = {
      singleSelection: false,
      idField: "id",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 1,
      allowSearchFilter: true,
      textField: "x",
      clearSearchFilter: true,
      enableCheckAll: false,
      searchPlaceholderText: "Search Here",
      limitSelection: 25,
    };
    this.loadScripts();
    this.getItems();
    this.getMarketFilterItems();
  }

  private loadScripts(): void {
    (function ($) {
      "use strict";

      $("#side_menu_bar > ul > li.nav-item > a").removeClass("active");
      $("#side_menu_bar > ul > li.nav-item > a#li_payment_gateway").addClass(
        "active",
      );
    })(jQuery);
  }
  public load(args: ILoadedEventArgs): void {
    let selectedTheme: string = location.hash.split("/")[1];
    selectedTheme = selectedTheme ? selectedTheme : "Material";
    args.chart.theme = <ChartTheme>(
      (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(
        /-dark/i,
        "Dark",
      )
    );
  }
  public number: number = 1;
  async getItems() {
    this.http
      .get<any>("../admin/assets/jsons/currentStatusMarket.json")
      .subscribe((data) => {
        this.categoryItems = data;
        this.categoryItems.map((itemsPerYr: any) => {
          if (itemsPerYr.year == new Date().getFullYear()) {
            this.multiSelectorData = itemsPerYr.data.map((itemData: any) => {
              return { x: itemData.item, y: itemData.total, id: this.number++ };
            });
          }
        });
      });
  }

  filteItemsOnYears(filterYear: any) {
    this.catData = [];
    this.categoryItems.map((itemsPerYr: any) => {
      if (filterYear == itemsPerYr.year) {
        this.catData = itemsPerYr.data.map((itemData: any) => {
          return { x: itemData.item, y: itemData.total };
        });
      }
    });
  }

  onFileSelected(event: any) {
    const file = <File>event.target.files[0];
    console.log(
      "File selected:",
      file?.name,
      "Size:",
      file?.size,
      "Type:",
      file?.type,
    );

    this.uploadForm.patchValue({ avatar: file });
    this.uploadForm.get("avatar")?.updateValueAndValidity();

    //file preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
    const [fileSelected, rest] = event.target.files[0].name.split(".");
    this.fileSelected = fileSelected;
    reader.readAsDataURL(file);
  }

  submitImage() {
    console.log("^&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&777");
  }
  selectedItems: any = [];
  requiredField: boolean = false;
  setStatus() {
    this.selectedItems.length > 0
      ? (this.requiredField = true)
      : (this.requiredField = false);
  }
  async onItemSelect(selected: any) {
    this.columnWidth = this.columnWidth + 0.01;

    if ((typeof this.height == "string") === true) {
      const [s, rest] = this.height.split("%");
      this.height = parseInt(this.height) + 10;
      this.height = `${this.height}%`;
    } else {
      this.height = "20%";
    }
    await this.selectedItems.map((item: any) => {
      for (let i in this.multiSelectorData) {
        if (this.multiSelectorData[i].id === item.id) {
          item.y = this.multiSelectorData[i].y;
        }
      }
    });

    //Do something if required
    this.setClass();
  }
  onItemDeSelect(unselected: any) {
    this.selectedItems.map((item: any) => {
      for (let i in this.multiSelectorData) {
        if (this.multiSelectorData[i].id === item.id) {
          item.y = this.multiSelectorData[i].y;
        }
      }
    });
    this.setClass();
  }
  onSelectAll(items: any) {
    items.map((item: any) => {
      for (let i in this.multiSelectorData) {
        if (this.multiSelectorData[i].id === item.id) {
          item.y = this.multiSelectorData[i].y;
        }
      }
    });
    this.selectedItems = items;
    //this.setClass();
  }

  setClass() {
    this.setStatus();
    console.log("@", this.selectedItems);
    if (this.selectedItems.length > 0) {
      return "validField";
    } else {
      return "invalidField";
    }
  }

  async getMarketFilterItems() {
    this.http
      .get<any>("../admin/assets/jsons/marketItems.json")
      .subscribe((data) => {
        this.marketDataStore = data;
        this.selected = this.marketDataStore[0].item;
        this.nameOntoolTip = this.marketDataStore[0].item;
        this.marketDataStore[0].data.map((i: any) => {
          const obj: any = {};
          obj["x"] = i.month;
          obj["y"] = i.total;
          this.graphData = [...this.graphData, obj];
        });
      });
  }
  onSelectItem(event: any) {
    this.graphData = [];
    this.nameOntoolTip = event.target.value;
    this.marketDataStore.map((i: any) => {
      if (event.target.value === i.item) {
        for (let j in i.data) {
          const obj: any = {};
          obj["x"] = i.data[j].month;
          obj["y"] = i.data[j].total;
          this.graphData = [...this.graphData, obj];
        }
      }
    });
  }
}
