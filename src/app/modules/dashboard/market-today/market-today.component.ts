import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ILoadedEventArgs, ChartTheme, IPointRenderEventArgs } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { HomeService } from 'src/app/services/home.service';
import { SignatureEncryptionService } from 'src/app/services/signature-encryption.service';
import { BarServiceService } from 'src/services/bar-service.service'


declare var jQuery: any;

@Component({
    selector: 'app-market-today',
    // encapsulation: ViewEncapsulation.None,
    templateUrl: './market-today.component.html',
    styleUrls: ['./market-today.component.scss'],

})
export class MarketTodayComponent implements OnInit {
    uploadForm: FormGroup;
    public categoryItems: String[] = [];
    public multiSelectorData: any = [];
    height: any = 0;
    heightNew: any = '100';
    columnWidth: number = 0.01;
    marketDataStore: any = [];
    selected: any = "All Services";
    selectedItem: any = "All Services";
    graphData: any = [];
    nameOntoolTip: string;
    selectedProduct: any = ["All Products"];
    selectedType: any = "All Categories";
    products: any = ["All Products", "Tap to Pay", "Cash Invoice", "Payment Gateway"];
    prod: any = "All Products"
    serviceTypes: any = ["All Categories", "Government Catalogue", "Non-Government Catalogue"]
    allServices: any = [];
    chartData: any = [];
    filteredItems: any = [];
    serviceData: any = [];
    mtimage: any;
    emailId: any;


    // public bgStyle: any = {
    //     border: '1px solid rgb(216, 214, 214)',
    //     //height :"ghkj"
    // }

    public stylesImg: any = {
        width: "64px",
        'margin-left': '20px',
        'border-radius': '34px',
        'padding': '6px 6px'

    }
    prYAxis: Object = {
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        majorGridLines: { width: 1 },
        minorGridLines: { width: 1 },
        minorTickLines: { width: 0 },
        // minimum: 0, maximum: 500, interval: 50,
        labelFormat: '${value} M'
    }
    fileSelected: File;
    public years: any = [];
    prXAxis: Object = {
        majorGridLines: { width: 0 },
        minorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
        interval: 1,
        lineStyle: { width: 0 },
        labelIntersectAction: 'Rotate45',
        valueType: 'Category'
    }

    public chartData1: Array<any> = [{ x: 'Jan', y: 200 }, { x: 'Feb', y: 270 }, { x: 'Mar', y: 380 }, { x: 'Apr', y: 400 }, { x: 'May', y: 350 }, { x: 'Jun', y: 100 }, { x: 'Jul', y: 290 }, { x: 'Aug', y: 310 }, { x: 'Sep', y: 100 }, { x: 'Oct', y: 420 }, { x: 'Nov', y: 160 }, { x: 'Dec', y: 260 }]

    data1: Object[];
    data2: Object[];
    data3: Object[];
    catData: Object[];
    palette: String[];
    imageUrl: any;
    currentYear: any;
    dropdownSettings = {};
    isLoading: boolean = true;
    constructor(public fb: FormBuilder, private bar_Service: BarServiceService, private encryption: SignatureEncryptionService,
        private dashboard: HomeService) {
        this.uploadForm = this.fb.group({
            mtImage: [null],
            emailId: ''
        })
    }

    ngOnInit(): void {
        this.emailId = "supriyamergu1997@gmail.com";
        this.currentYear = new Date().getFullYear();
        for (let i = 2021; i <= this.currentYear + 1; i++) {
            this.years.push({ year: i })
        }
        this.getChartData();

        // const year: any = new Date().getFullYear();
        // this.years.push(year);
        // for (var i = 1; i < 3; i++) {
        //     this.years.push(year + i);
        // }

        this.data1 = this.chartData1.map(item => {
            return { x: item.x, y: item.y }
        });
        this.getAllItems();

        this.palette = ["#929E89"];
        // this.palette = ["#72AC47", "#406326", "#204406"];
        this.dropdownSettings = {
            singleSelection: false,
            idField: 'id',
            textField: 'x',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 0,
            allowSearchFilter: true
        };
        this.loadjQueryScripts();
        this.getImage()
        // this.getMarketFilterItems();
    }

    public randomIntFromInterval(min: any, max: any): any { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    public primaryXAxis1: Object = {
        valueType: 'Category',
        majorGridLines: { width: 0 },
        enableTrim: false,
        Intervel: 1,
        labelIntersectAction: 'Rotate45',
        edgeLabelPlacement: 'Shift',
        // lineStyle: { width: 0 },
        majorTickLines: { width: 0 },

        minorGridLines: { width: 1 },
        // minorTickLines: { width: 0 },
    };
    //Initializing Primary Y Axis
    public primaryYAxis1: any = {
        labelFormat: '{value} ',
        edgeLabelPlacement: 'Shift',
        enableTrim: false,
        labelIntersectAction: 'Rotate45',
        majorTickLines: { width: 0 },
        minorGridLines: { width: 1 },
        // minimum: 0, maximum: 500, interval: 50,
    };

    public pointRender(args: IPointRenderEventArgs): void {
        let seriesColor: string[] = ['#00bdae', '#404041', '#357cd2', '#e56590', '#f8b883',
            '#70ad47', '#dd8abd', '#7f84e8', '#7bb4eb', '#ea7a57'];
        args.fill = '#72AC47';
    };
    image: any = "/assets/images/bakery1.png"
    public radius: Object = { bottomLeft: 0, bottomRight: 0, topLeft: 5, topRight: 5 }
    public marker: Object = {
        dataLabel: {
            visible: true,
            template: ""
            // '<div><div><img style="width:30px;height:30px;border-radius:18px;margin-left: -6px;" [src]="/assets/images/bakery1.png"></div></div>' 
            //template:'<div><div>${id}</div></div>',

        }
    }


    public title: string = '';
    public tooltip: Object = {
        enable: true
    };
    public legend: Object = {
        visible: false
    }
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '98%';
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(
            (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(
                /-dark/i,
                'Dark'
            )
        );
    }

    private loadjQueryScripts(): void {
        (($) => {
            "use strict";
            $('.knob').knob();

            $('#side_menu_bar > ul > li.nav-item > a').removeClass("active");
            $('#side_menu_bar > ul > li.nav-item > a#li_dashboard').addClass("active");
        })(jQuery);
    }
    onSelectMonth(event: any) {
        this.currentYear = event.target.value;
    }
    onFileSelected(event: any) {
        const file = <File>event.target.files[0];
        // this.mtimage=event.target.files[0];
        this.uploadForm.patchValue({ mtImage: file });
        this.uploadForm.get('mtImage')?.updateValueAndValidity();
        // console.log(event.target.files[0]);
        // const file = <File>event.target.files[0];
        // this.uploadForm.patchValue({ avatar: file });
        // this.uploadForm.get('avatar')?.updateValueAndValidity();

        // //file preview
        const reader = new FileReader();
        reader.onload = () => {
            this.imageUrl = reader.result as string;
        }
        const [fileSelected, rest] = event.target.files[0].name.split(".");
        this.fileSelected = fileSelected;
        reader.readAsDataURL(file)
    }

    public onChartLoad(args: ILoadedEventArgs): void { }
    async submitImage() {
        this.uploadForm.value.emailId = this.emailId;
        console.log("^&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&777", this.uploadForm.value)
        const formData = new FormData();
        let encodedata = { 'emailId': this.emailId, 'deviceId': this.emailId, 'keyValidation': '12345678901234567890123456789012' }
        formData.append('mtImage', this.uploadForm.get('mtImage')?.value); // Add the file
        formData.append('data', this.encryption.encodeJsonObjectToHex(encodedata));
        let reqhead = this.encryption.createHeader();
        console.log(reqhead)
        this.dashboard.upload(formData, reqhead.headers).subscribe(async res => {
            const key = this.encryption.generateKey(reqhead.key)
            console.log('========keys', key)
            const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
            const decryptedData = this.encryption.decodeData(encryptedData, await key);
            console.log('======decryptedData', decryptedData)
            this.imageUrl = null
            this.getImage()
            console.log('data', decryptedData)
        })

    }

    getImage() {
        let reqhead = this.encryption.createHeader();
        const key = this.encryption.generateKey(reqhead.key)
        this.dashboard.getFiles(this.emailId, reqhead.headers).subscribe(async res => {
            const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
            const decryptedData = this.encryption.decodeData(encryptedData, await key);
            console.log('data', decryptedData)
            this.mtimage = decryptedData;
        })
    }

    onSelectProd(event: any) {
        this.prod = event.target.value;
        if (this.prod == "Payment Gateway") { this.selectedProduct = ["ECOMMERCE", "Paybylink", "generateQR"] }
        else if (this.prod == "Tap to Pay") { this.selectedProduct = ["Card"] }
        else if (this.prod == "Cash Invoice") { this.selectedProduct = ["Cash"] }
        else { this.selectedProduct = ["All Products"] }
        this.getChartData()
    }
    onSelectType(event: any) {
        this.selectedType = event.target.value;
        this.getFilteredItems()
    }

    async getAllItems() {
        let reqhead = this.encryption.createHeader();
        const key = this.encryption.generateKey(reqhead.key)
        this.dashboard.mtServices(reqhead.headers).subscribe(async res => {
            const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
            const decryptedData = await this.encryption.decodeData(encryptedData, await key);
            this.allServices = JSON.parse(decryptedData);
            if (this.allServices.length > 0) {
                this.getFilteredItems();

            }
        })
    }
    async getFilteredItems() {
        this.filteredItems = [];
        this.multiSelectorData = [];
        console.log(this.filteredItems, 'selected11')
        this.allServices.map((d: any) => {
            if (this.selectedType === d.serviceType) {
                console.log(this.selectedType, d.serviceType, d.data, 'type')
                this.filteredItems = d.data;
                d.data.map((d: any) => {
                    this.multiSelectorData.push({ x: d.serviceName, id: this.number++ })
                })
                // this.selected=this.filteredItems[0]
                // this.filteredItems.splice(0, 0, { serviceName: "All Services" });
                console.log(this.selected, 'selected222')

                this.itemSel()
            }
        })
        // this.getChartData()
        // console.log(this.filteredItems, 'filter')
    }
    async getChartData() {
        let value = { "channel": this.selectedProduct, "serviceType": this.selectedType, "item": this.selected }
        let req = { data: this.encryption.encodeJsonObjectToHex(value) }
        let reqhead = this.encryption.createHeader();
        const key = this.encryption.generateKey(reqhead.key)

        this.dashboard.mtBarChart(req, reqhead.headers).subscribe(async res => {
            if (res.success === true) {
                const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
                const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
                // console.log()
                this.chartData = decryptedData[0].data;
                console.log(this.chartData, 'chart')
            }
            if (res) {
                this.isLoading = false;
            }
        })
    }

    //temporarily Adding number  for multiselecter dropDown 
    public number: number = 1;

    // async getMarketFilterItems() {
    //     await this.bar_Service.getMarketData().subscribe((marketData: any) => {
    //         this.marketDataStore = marketData;
    //         this.selected = this.marketDataStore[0].item;
    //         this.nameOntoolTip = this.marketDataStore[0].item;
    //         this.marketDataStore[0].data.map((i: any) => {
    //             const obj: any = {}
    //             obj['x'] = i.month;
    //             obj['y'] = i.total;
    //             this.graphData = [...this.graphData, obj];
    //         })
    //     })
    // }

    // onSelectCat(item: any) {
    // 	// this.services=[]
    // 	const selectedOption = this.categoryList.find((option: { item_id: any; }) => option.item_id === item.item_id);
    // 	console.log(item, selectedOption, this.merchantData.bankDetails, 'item')
    // 	this.selectCategory = [];
    // 	// this.onCheckdData = [];
    // 	this.selectedCatName = item.item_text;
    // 	this.selectedCat = selectedOption.catId;
    // 	// this.getBusiTypes(this.selectedCat)
    // 	this.srvc_cats.getServByCat(this.selectedCat).subscribe(res => {
    // 		let bankMerchantId: string;
    // 		if (res.success == true) {
    // 			if (this.merchantData.bankDetails.length <= 0 || this.merchantData.bankDetails.bankServiceId == null || undefined) {
    // 				bankMerchantId = ""
    // 			}
    // 			else { bankMerchantId = this.merchantData.bankDetails.bankServiceId }
    // 			res.data.map((d: any) => {
    // 				let isMatched = false;
    // 				d['priceType'] = 'AED';
    // 				d['bankServiceId'] = bankMerchantId;
    // 				d['merchantId'] = this.mid;
    // 				d['mainMerchantId'] = this.mid;
    // 				d['categoryName'] = this.selectedCatName;
    // 				// d['isChecked'] = false;
    // 				Promise.all(this.merServices.map((m: any) => {
    // 					console.log(m.serviceId, d.serviceId, 'match')
    // 					if (m.serviceId === d.serviceId) {
    // 						isMatched = true;
    // 						d.isExist = true;
    // 						d.isChecked = true;
    // 						d.unitPrice = 0;
    // 						// console.log(d);
    // 						this.services.push(d)
    // 						// this.onCheckdData.push(d)
    // 					}
    // 				})).then(() => {
    // 					if (isMatched === false) {
    // 						d.unitPrice = 0;
    // 						d.isChecked = false
    // 						this.services.push(d);
    // 					}
    // 				})
    // 				// this.services.push(d);
    // 				console.log(this.services, this.onCheckdData, 'seee')
    // 			})
    // 			//   this.services = res.data;
    // 		}
    // 	})
    // }
    // onSelService(id: any) {
    // 	console.log(id);
    // 	let isMatched = false;
    // 	this.services.map((s: any) => {
    // 		if (s.serviceId === id) {
    // 			console.log(s)
    // 			if (this.onCheckdData.length > 0) {
    // 				Promise.all(this.onCheckdData.map((d: any) => {
    // 					console.log(d.serviceId, id, d.isChecked)
    // 					if (d.serviceId === id && d.isChecked === true) {
    // 						isMatched = true;
    // 						this.onCheckdData = this.onCheckdData.filter((item: any) => item !== d);
    // 						// break;
    // 						console.log(this.onCheckdData, 'check1')
    // 					}
    // 				})).then(() => {
    // 					if (isMatched === false) {
    // 						console.log('1')
    // 						s.isChecked = true;
    // 						delete s._id;
    // 						console.log('2=')
    // 						this.onCheckdData.push(s);
    // 						console.log('3')
    // 						console.log(this.onCheckdData, 'check2')
    // 					}
    // 				})
    // 			}
    // 			else {
    // 				console.log('1')
    // 				s.isChecked = true;
    // 				delete s._id;
    // 				console.log('2')
    // 				this.onCheckdData.push(s);
    // 				console.log('3')
    // 				console.log(this.onCheckdData, 'check2')
    // 			}
    // 			// this.services.delete(s)
    // 		}
    // 	})
    // }
    // onDeSelectAll(items: any) {
    // 	console.log(items, 'onDeSelectAll');
    // 	this.services = []
    // }
    // onSelectAll(items: any) {
    // 	console.log('onSelectAll', items);
    // 	this.services = [];
    // 	// let allServices=[];
    // 	items.map((item: any) => {
    // 		const selectedOption = this.categoryList.find((option: { item_id: any; }) => option.item_id === item.item_id);
    // 		console.log(items, selectedOption, this.merchantData.bankDetails, 'item')
    // 		this.selectedCatName = item.item_text;
    // 		this.selectedCat = selectedOption.catId;
    // 		this.srvc_cats.getServByCat(this.selectedCat).subscribe(res => {
    // 			let bankMerchantId: string;
    // 			if (res.success == true) {
    // 				if (this.merchantData.bankDetails.length <= 0 || this.merchantData.bankDetails.bankServiceId == null || undefined) {
    // 					bankMerchantId = ""
    // 				}
    // 				else { bankMerchantId = this.merchantData.bankDetails.bankServiceId }
    // 				res.data.map((d: any) => {
    // 					let isMatched = false;
    // 					d['priceType'] = 'AED';
    // 					d['bankServiceId'] = bankMerchantId;
    // 					d['merchantId'] = this.mid;
    // 					d['mainMerchantId'] = this.mid;
    // 					d['categoryName'] = this.selectedCatName;
    // 					// d['isChecked'] = false;
    // 					Promise.all(this.merServices.map((m: any) => {
    // 						console.log(m.serviceId, d.serviceId, 'match')
    // 						if (m.serviceId === d.serviceId) {
    // 							isMatched = true;
    // 							d.isExist = true;
    // 							d.isChecked = true;
    // 							d.unitPrice = 0;
    // 							// console.log(d);
    // 							this.services.push(d)
    // 							// this.onCheckdData.push(d)
    // 						}
    // 					})).then(() => {
    // 						if (isMatched === false) {
    // 							d.unitPrice = 0;
    // 							d.isChecked = false
    // 							this.services.push(d);
    // 						}
    // 					})
    // 					// this.services.push(d);
    // 					console.log(this.services, this.onCheckdData, 'seee')
    // 				})
    // 				//   this.services = res.data;
    // 			}
    // 		})
    // 	})
    // }

    onSelectItem(event: any) {
        this.selected = event.target.value
        this.getChartData()
    }
    selectedItems: any = [];
    requiredField: boolean = false;
    setStatus() {

        (this.selectedItems.length > 0) ? this.requiredField = true : this.requiredField = false;
    }
    // async onSelServ(selected: any) {
    //     console.log(this.selectedItems, 'see')
    //     let value = { item: selected.x }
    //     this.dashboard.mtServChart(value).subscribe(data => {
    //         if (data) {
    //             this.itemSel()
    //         }
    //     })

    // }
    itemSel() {
        let shortNumber: any, num = 0;
        this.serviceData = []
        this.multiSelectorData.map((d: any) => {
            let value = { item: d.x, year: this.currentYear }
            let req = { data: this.encryption.encodeJsonObjectToHex(value) }
            let reqhead = this.encryption.createHeader();
            const key = this.encryption.generateKey(reqhead.key)
            this.dashboard.mtServChart(req, reqhead.headers).subscribe(async res => {
                const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
                const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
                this.serviceData.push({ id: d.id, x: d.x, y: decryptedData[0].data.y })
                if (decryptedData[0].data.y > num) {
                    num = decryptedData[0].data.y
                    shortNumber = this.shortNumberFunc(decryptedData[0].data.y);
                    this.primaryYAxis1['labelFormat'] = '{value}' + `${shortNumber}`;
                    this.selectedItemsData()
                }
            })
        })
    }
    selectedItemsData() {
        this.selectedItems = []
        this.columnWidth = this.columnWidth + 0.01;


        if ((typeof (this.height) == "string") === true) {
            const [s, rest] = this.height.split("%");
            this.height = parseInt(this.height) + 10;
            this.height = `${this.height}%`;
        } else {
            this.height = '20%'
        }
        // this.selectedItems = this.serviceData.slice(2,5).map((a: { value: any; }) => a);
        for (let i = 1; i < 3; i++) {
            if (this.serviceData[i] != null) {
                if (this.serviceData[i] != this.serviceData[0]) {
                    this.selectedItems.push(this.serviceData[i])
                }
            }
            console.log(this.selectedItems, 'seleeeee')
        }
        // this.serviceData.map((d: any) => {
        // })
        this.setClass();

    }
    async onItemSelect(selected: any) {
        this.columnWidth = this.columnWidth + 0.01;


        if ((typeof (this.height) == "string") === true) {
            const [s, rest] = this.height.split("%");
            this.height = parseInt(this.height) + 10;
            this.height = `${this.height}%`;
        } else {
            this.height = '20%'
        }

        this.selectedItems.map((item: any) => {
            for (let i in this.serviceData) {
                if (this.serviceData[i].id === item.id) {
                    item.y = this.serviceData[i].y
                }
            }
        })
        console.log(this.selectedItems, 'sele')
        //Do something if required
        this.setClass();
    }
    onItemDeSelect(unselected: any) {
        this.selectedItems.map((item: any) => {
            for (let i in this.serviceData) {
                if (this.serviceData[i].id === item.id) {
                    item.y = this.serviceData[i].y
                }
            }
        })
        this.setClass();
    }
    onSelectAll(items: any) {
        this.selectedItems = [];

        // console.log(this.serviceData);
        items.map((i: any) => {
            this.serviceData.map((s: any) => {
                this.height = `0%`
                if (s.id === i.id) {
                    console.log(s)
                    this.columnWidth = this.columnWidth + 0.01;
                    if ((typeof (this.height) == "string") === true) {
                        const [s, rest] = this.height.split("%");
                        this.height = parseInt(this.height) + 10;
                        this.height = `${this.height}%`;
                    } else {
                        this.height = '20%'
                    }
                    this.selectedItems.push(s);
                    this.setClass();
                }
            })
        })

    }
    onDeSelectAll(items: any) {
        this.selectedItems = [];
    }
    shortNumberFunc(value: any) {
        if (value === null) return null;
        if (value === 0) return "0";
        var fractionSize = 1;
        var abs = Math.abs(value);
        var rounder = Math.pow(10, fractionSize);
        var isNegative = value < 0;
        var key = '';
        var powers = [
            { key: "Q", value: Math.pow(10, 15) },
            { key: "T", value: Math.pow(10, 12) },
            { key: "B", value: Math.pow(10, 9) },
            { key: "M", value: Math.pow(10, 6) },
            { key: "k", value: 1000 }
        ];
        for (let i in powers) {
            var reduced = abs / powers[i].value;
            reduced = Math.round(reduced * rounder) / rounder;
            if (reduced >= 1) {
                abs = reduced;
                key = powers[i].key;
                break;
            }
        }
        return (isNegative ? '-' : '') + key;
    }
    setClass() {
        this.setStatus();
        console.log("@", this.selectedItems)
        if (this.selectedItems.length > 0) { return 'validField' }
        else { return 'invalidField' }
    }


}


