import { Component, OnInit } from '@angular/core';
import {BarServiceService} from 'src/services/bar-service.service';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
import {OpCenterService} from 'src/app/services/op-center.service';
import {NotificationService} from 'src/app/core/services/notification.service'
declare var jQuery: any;
@Component({
  selector: 'app-user-id',
  templateUrl: './user-id.component.html',
  styleUrls: ['./user-id.component.scss']
})
export class UserIdComponent implements OnInit {
    storeData:any=[];
    storeCatData:any=[];
    catFData:any =[];
    csvData:any=[];
    selectStore:string;
    selectStoreCat:string;
    nextTab:any;
    searchId:any;
    searchText:any
    csvOptions:any;
    report_title:string;
    csvstore:string;
    headers:any;
    constructor(private note_Servce:NotificationService,private op_center:OpCenterService) { }
    ngOnInit(): void {
        //this.getposData();
        this.loadScripts();
        this.getAllStores()
    }

    // onSelectCat(e:any){
    //     this.catFData=[];
    //     this.storeCatData.map((cData:any)=>{
    //         cData.data.map((data:any)=>{
    //             if(e.target.value === data['cat']){
    //                 this.catFData = data.catData;
    //             }
    //         });
    //         this.catFData.map((fData:any)=>{
    //             fData['storeId'] = cData.storeId;
    //         });
    //     });
    // }

    posDetailsFunc(id:any){
		
        this.storeCatData=[];
        this.storeData.map((sData:any)=>{
            if(id === sData.storeId){
                this.nextTab =id;
                this.storeCatData.push(sData);
            }
        });
        
        this.storeCatData.map((cData:any)=>{
            this.catFData = cData.transaction
        });
        if(this.storeCatData.length === 0){
            this.note_Servce.showWarning(`${id} Does Not Exist`,'');
        };
		console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",id,this.nextTab)
        this.searchId ="";
    };
    goBack(){
        this.nextTab =undefined;
    };

    downloadReport(type:any,opt?:any){
        this.csvData=[];
        switch(type){
            case  'Stores':
            case  'Store' :
                this.headers =  ['STOREID', 'STORENAME', 'EMAIL','ADDRESS','ACTIVATIONDATE','TRANSACTIONVALUE'] ;
                if(this.storeData && this.storeData.length >0){
                    this.storeData.map((data:any)=>{
                        let Obj:any={};
                        if(opt === data.storeId){
                            // Obj['userId'] = data.userId;
                            Obj['storeId'] = data.storeId;
                            Obj['storeName'] = data.storeName;
                            Obj['email'] = data.sEmail;
                            Obj['address'] = data.storeAddress;
                            Obj['activationDate'] = data.entryDate;
                            Obj['transactionValue'] = data.totalTransction;
                            this.csvData = [...this.csvData,Obj];
                        };
                        if(!opt){
                            // Obj['userId'] = data.userId;
                            Obj['storeId'] = data.storeId;
                            Obj['storeName'] = data.storeName;
                            Obj['email'] = data.sEmail;
                            Obj['address'] = data.storeAddress;
                            Obj['activationDate'] = data.entryDate;
                            Obj['transactionValue'] = data.totalTransction;
                            this.csvData = [...this.csvData,Obj];
                        };
                    });
                };
            break;
            case 'Categories':
            case 'Category':
                this.headers =[,'STOREID','CONTACT', 'ACTIVATIONDATE','TRANSACTIONVALUE'];
                if(this.catFData && this.catFData.length >0){
                    this.catFData.map((fData:any)=>{
                        let Obj:any={};
                        if(opt === fData.tid){
                            this.csvstore =fData.storeId
                            // Obj['userId'] = fData.userId;
                            Obj['tid'] = fData.tid;
                            // Obj['name'] = fData.name;
                            Obj['contact'] =fData.contact
                            // Obj['email'] = fData.email;
                            // Obj['remarks'] = fData.remarks;
                            Obj['activationDate'] = fData.transDate;
                            Obj['transactionValue'] = fData.amount.tapValue ? fData.amount.tapValue :fData.amount.cashValue;
                            this.csvData = [...this.csvData,Obj];
                        };
                        if(!opt){
                            this.csvstore =fData.tid
                            // Obj['userId'] = fData.userId;
                            Obj['tid'] = fData.tid;
                            // Obj['name'] = fData.name;
                            Obj['contact'] =fData.contact
                            // Obj['email'] = fData.email;
                            // Obj['remarks'] = fData.remarks;
                            Obj['activationDate'] = fData.transDate;
                            Obj['transactionValue'] = fData.amount.tapValue ? fData.amount.tapValue :fData.amount.cashValue;
                            this.csvData = [...this.csvData,Obj];
                        };
    
                    });
                };
            break;
            default :
            break;
        }
        
        if(this.csvData && this.csvData.length > 0){
            const options = {
                title: '',fieldSeparator: ',',quoteStrings: '"',decimalseparator: '.',showLabels: true,showTitle: true,useBom: true,
                headers: this.headers
            };
            this.csvOptions=options;
            this.report_title = type === 'Stores' ? 'ALL STORES': type === 'Categories' || type === 'Category' ? `STORE-${this.csvstore} ${this.selectStoreCat}`:'Store'
            new  AngularCsv(this.csvData, this.report_title, this.csvOptions);
        }else{
            this.note_Servce.showWarning("something went wrong",'')
        };

    };

    private loadScripts(): void {
        (function($) {
        "use strict";
        $('.knob').knob();

        $('#side_menu_bar > ul > li.nav-item > a').removeClass("active");
        $('#side_menu_bar > ul > li.nav-item > a#li_distributor').addClass("active");
        })(jQuery);
    };

    getAllStores(){
        this.op_center.storePerformance().subscribe(data=>{
            this.storeData= data.data;
            this.storeData.map((sData:any)=>{
                let amount: any ;
                sData.storeName = sData.storeAddress.addressTitle;
                sData.storeAddress = `${sData.storeAddress.addressTitle}`+',\n'+`${sData.storeAddress.completeAddress}`;
                sData.transaction.map((tData:any)=>{
                    if(tData.amount.cashValue){
                        if(amount === undefined){
                            amount = tData.amount.cashValue
                        }else{
                            amount =amount + tData.amount.cashValue
                        }
                    }else{
                        if(amount === undefined){
                            amount = tData.amount.tapValue
                        }else{
                            amount =amount + tData.amount.tapValue
                        }
                    }
                    sData.totalTransction =amount
                })
            })
        })

    }
    onChangeStatus(e:any,store:any){
        const obj={status:e.target.value}
        this.op_center.statusIntidPerformance("dId1005",store.tid,obj).subscribe(data=>{
            if(data.success = 200){
                this.note_Servce.showSuccess(`200 - ${data.message}`,'')
            }else{
                this.note_Servce.showError(`${data.message}`,'')
            }
        })
    }

}
