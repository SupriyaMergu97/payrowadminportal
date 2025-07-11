import { Component, OnInit } from '@angular/core';
import { AppManagerService } from 'src/app/core/services/app-manager.service';
import { BarServiceService } from 'src/services/bar-service.service';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
import * as _ from 'lodash';
import { AdminAPIService } from 'src/app/services/admin-api.service';
import { HttpParams } from '@angular/common/http';
import { HomeService } from 'src/app/services/home.service';
import { SignatureEncryptionService } from 'src/app/services/signature-encryption.service';
declare var jQuery: any;

@Component({
    selector: 'app-cash-invoice',
    templateUrl: './cash-invoice.component.html',
    styleUrls: ['./cash-invoice.component.scss']
})
export class CashInvoiceComponent implements OnInit {
    constructor(
        private app: AppManagerService, private bar_service: BarServiceService, private admin: AdminAPIService,
        private home: HomeService, private encryption: SignatureEncryptionService) {
        this.app.ShowReportDate = 'true';
    }
    dialogData: any = {}
    searchText: any;
    sortType: string;
    sortReverse: boolean = false;
    public csvOptions: any = {};
    public csvData: any = [];
    finalData: any = [];
    allData:any=[];
    report_title: string;
    selected: any;
    months: any = [
        { "month": "Jan", "id": 1 }, { "month": "Feb", "id": 2 }, { "month": "Mar", "id": 3 }, { "month": "Apr", "id": 4 },
        { "month": "May", "id": 5 }, { "month": "Jun", "id": 6 }, { "month": "Jul", "id": 7 }, { "month": "Aug", "id": 8 },
        { "month": "Sep", "id": 9 }, { "month": "Oct", "id": 10 }, { "month": "Nov", "id": 11 }, { "month": "Dec", "id": 12 },
    ]
    public month: any;
    public cashInvoiceData: any = []
    public cashinvoiceData: any = [];
    productType: any = "All";
    showDialog: boolean = false;
    itemsPerPage: any = 5;
    currentPage: any = 1;
    isLoading: boolean = true;
    ngOnInit(): void {
        this.selected = new Date().getMonth() + 1;
        // this.getCashInvoiceData();
        this.getProductDetails()
        this.loadScripts();
        // this.getCashData(this.selected)
    }

    private loadScripts(): void {
        (function ($) {
            "use strict";

            $('#side_menu_bar > ul > li.nav-item > a').removeClass("active");
            $('#side_menu_bar > ul > li.nav-item > a#li_product_type').addClass("active");


        })(jQuery);
    }


    sampleapi() {
        const signature = this.encryption.createHeaderSignature('GET', '/mobileapis/settlementJson/1', {}, 'e1f4ea9d3124388d42ce48786f2752c9f0e23bef4b8f7c892cf417d702b86a39', '');
        let data = { timestamp: "1748518874855", uri: '/mobileapis/settlementJson/1', httpmethod: "GET" }
        let timestamp = new Date().getTime().toString()
        let signkey = this.encryption.signKey(data);
        console.log("signkey", signkey)
        let res = {
            "data": "a12972d303b92d087d492c686ae2e8238bda2f67d10d18aaf41fff8da711664a8e55e40eb3d92e9a1fb12650b05e2562f0ea21b754ec47895c3866a17882d4377116781f1a5408f7351b8ec25a6658d3fcd34c427e66267421f7b15c3d4c7ab4bb3447b2b8dfbb36ace764d5662f21991a2cd55b2c8cca2cf0451f016785ccf744bd69ecc04c54b35d127484c5a0b03fb02a7bef9af4d502627bf13442cb5f1afdf3e672276788e96a24b7699744de1333907bbf1c2cd4a4610c9a792854f79762f96846ae4b3f60f8015590d4fc45db9c0283499e3952f61011b95a324755f0aa7a8ebf8b1c857e42ad4f5030634d10d828c4af27a745aabefbdd05532f62ec7610f4eaa9668f164e13481264ea70476edf96e9d7a408313da90a008599d548dfc51134fe1cbbf3b20b9b6243090f034ee4b62343ac6075059c6aea40af6f30dad25c14068fbd3fa86996ec11a9bb59a3e0dfa6c43162da1b9e3adec4c36498d9d51b605715a61e17883136e19fabaa41807636ac4823b7a69c601df314432c13d8bd88d71e8b131036621031ba6a430ce34c2337e68e2e5cbccfd242d573e8c6156b0a41606eaba80fda5a09b6f73e807c4b1e60b90b7f6dc66f6ad9153129c23fb6f2c47619419dda7fcb6b417ca28035b61cbbcf56c2138b6477e7c23de0532b20f83725bb079a37c26cfeadca1d6041c66d9798e0cb17c498de5f3eb64613950f9d79c0f6269c8eae19dd25f1d6a6c5a6db64b597ac8428ab6ff30ad4521cf69200d33aeb588294fb7302355630e768d35fa4cba8fbaa476cdca3bb6e2e412e5f7aecb4dbd8194077e87a816865679f3f9c7fa7367d32ed332e106659bdc162dabbad8d5e7b445ba1cb4061ce649edf4238b7c9652b6b3ab4a49dac38080df885bda532ae0710f55905b829fae63d3bcb531855eee45614e165c7a64d143e9516595767f4fb7e4565a313680322a9eb93ab41f81a79a4959b3424a3e7bdd728cc8a2791599f7dac16f271c1757714f3f9b54015a93e19159ae43fcd39a93236fdffe86add3d489c648185b5e8dd8519a97359d7ead055e4f280f1f20debac24a39cb244ebaaed578e01a4fd0c0b2f72a12f1aaeb41b3e20e445ddfacc217b47ef615f66229bf5fea9019db4106243fd9a2040b97fb04bf470cce24796b69df3b4d735cb771966b36ea5f2bf5fe6ae452ff56d04da1debf20eac714d5ba2d18f4d54d08e3957b44508d844899a42880c7bb87ca6ebb897d6a87c02a42a278a16233acd5bd8d0909c6a5072d6e95f007b9c36ed8214207dcaa02db9bd1040b9e8d7f0ce14d668d8d19213f1f4e25ad1a21936a46b80923782a9b6d8a504155c58100ea2b118eda773716264d0cc9a3ac70b940c1482556cbf3a8c3ad5f72f76bd34e2958dc6bfde891d03e1beca7daceb08d80e4b842f3ed0ae8b72884a4a04cb644edeb731d064a86801ed0ccaf9532b1a39af769e8f5a2d3fd4de4f689a27b2b92258612f0ac78985dc73d678c5ca293d0d003c21258011ac95b911e2d24560794f72dad994bf21dc3d5546382864a903b2de8323a5bc5c559fb116959e6e422ccb72c21f51634ee1f8c0ac7ff1d22453e3cb01a3f3993ef74e26f605d9f67c1127fb6551c52cada3f14b93910e6290ab84b401cf24c1ea12af64cd78bf445abef7bb03b63ca743a98206459f69f6a614be778d00a98d058f45af2c9acb58c5b8d5dfb51bcd92f62c3cc0982feeca739f6cc488205369bbddb2b2ccc589efba7176f4bba408cd4101655eb617ce408347cf679a32b607499c9fae8826e4acb526758445d56e117c1ea8cd538a1fc75182337d6c3aaafac156d816fd591c739411a899ae32ce1ef1b64555ef361dbde3b7144ac5ebe6b86c17bbc1739e422137e1ec6381674c104401408d672db86059be88bf49196ea7564f2dcab516f59702e41b02735be461d3b6f1e1bde0045fba625411d0dc97913d6a54ec17b824f9bfb20c2bec48674f15624346d9703cdad9828a1b910f6308ef1055cd7d32ea8c0c6451412ab79c4f3a067bfb64c81ea2aacb2691018cd6ea42f26ac883fc16842b9236820f2b9b656547a94f3c6655bb858ea28259a3f67ef145bc32223abe380940bcb8309b0d48087aea5894e15e108b7bb3149d7c77857cfe1c22e78f03a36de6f8e1e299dba233afaf16d8860df1f2d3f2a50007ac1ed96ee59dfc6b9da9dbfdd544d933410bcb172fa8a3bd7376d96400ad1d063dae0d54fe0cb0066e20cc19f2c8c903d7637a880247ff107b7a22aff7f033920e575ef347e03bd855fc5157f0afdcd68797d8af024463bb501f35f6f87d1099742abac85cc2b994882998d327980b23fc73114283b05cae71d0a681205551ec748dcf7fc14665a0e61523e965c91e6c4eeab3eb72b3f6f7e1593f0c87b901292257ceb2362cff5cdff7ec7547d689f8746a08e8713c5eb43765497b5c2a2ce629a65e7753f30f04964011961e8c6943e764053fffb6a99de314285df8d8790afb54830116345cd49a95d3f97818cfb022c291f88197fffd1113a2055e504e35e679defb9f0f05782b4e5470610d5d35980714ede130e170a153528fdfa4ba3c6b8946d988f96662be19d2e8e2bdd1f6c208deceb61b625ac3b0cbf2627039ca3e387563236119cc7465c394838cd4618e6e4f52097e4a1648ed27112788c7ce1d3941cae7b44f27ccbd33313b3c0d31c816ee7ea587ae4dfa13a4f3fb06d8e74b5b0a612921ab662a3d237822a6471cb08c76519c009a61436d0b8aa61f42de1434c091b4c974309175caee86f68f6b17c0b813ece1b50ce975dcda8e1435f3282ead8bdf16a2ab998bc22202c059637a017e6d693e269290fd4c1b58fb5524513799e0325f5619c2045736448f1d92d0e88aa11e66765600cb7a0f84d7a338c124e6b18f720e4c9cb751bdfb07c40d9ff19a43f4a47161f7745847df97066e7933b26d7c88b01f6dbcf1b237eeed148468ae4730b28c1667e8c36c2e9ddfb11c3c0ea1964291dd7dd9e4b45d4510a715b88fbb32aa87c066aad25be2398fd926ea83002ae8edf9b6c88f79b36cf8b1e50040674a70bd923304dde09ffd0ecf2bc7f10ef76f3d13ae8d206a522899e4ebdef705c3740e1b6c575909aeb12560856839734ceab2f0ad0c6a30830841fab174ff7e92afc558f80f02c4254aedafd79f40819f9c5faf082b466a1d8535f98fbd36d35a15ae87f221469eadb909851cb2855afb7df53503c43867cf29d3c5e076974c3591cab131f40c671e91e79eeb7ab784bee72a291867a2d4a4430fa0ee7d2169bfa12f4e7b9a65e23d3c07235652814517b7dcbb799b7a9a7876d18078cb00f86269ea7f33a03979ac39405d370df4d79bcbd9b9a61cdc23dc9378d18a59dfdb5dbc76aca58057b050a4dd2910ef7cdd601c6b062a789612a72238557d6b85dbc9e13f10aceb0f9680631b804a5367c99a6703d158ca852b7ea734583e916f3fc48bd4389e39fe766d9198ac8d0f7b400d82ea84dd866a96bccb0f340ae47c3d0c1a132918886e882c3a7068d17a97a6a533b1e871e5a0a3f68846ad9968ff8045fead78a91d6c4c155fbb74f509e82b7811d1c64d40a12a34cdd2aec3e749beb779bc014a124f5cb85a3f60a99c79f7b7378d534016519d0de536b92303a03370c8ae003daf80dcac4a6149bd94459c4fb6e24bef1fb9a179e11c82e88623324a130748a3b9c8acfe066114e85cd8e8fe1ed64f58b870a0ce4f37c93b1e7223884d6bf93df7602faa91b5ca2cd1eb39ab6b99ec0e643613a0721939fd38322da32965a20c8ac77aaae0fd05c8f851ed179638a3ce5dbc6d24927bb4bdfe4ea8249f5eeabcc555ddb8d68aa6006cfb0edff38c9356a98988bf2ecc4fcbd72d53a8c11e90ad0ac3ef9ed095bb445f951891b02a305b0b55ef20ea8cab78f98fe96c402898cb8d7c5abc15128a68fae54d9508090312e819209f285c707f7b386e4012775ac03fc0b1d9a7887e9da2c29305a34e3ded5bbb8dd7d840c54bb1ad8caa63192107b527ba111ebcbda14327c734c68b7abce7aca2f0fe6b5a9befeba5c19546184594c4e39bcb308737214584e1ef3fd978bf4ca4b8003349caa1001059a88eddf2347dbdbd4387239f7b81c0b9ec138f82982edf252b32cb35484df576b5b33c53bbaecda59de22d5a8f50f992bacb69c16666bab43b0a837b8bf87700648ae061c5311d08b38225f3c8bc403cf1446f46780ff29c286630dc42e5b54888b978afc50a389871d2848297802ca58a75cb2f8f519cdd62ed71e8aca226c86966be70468e05aad231c8457f33413589f6bb69aead1f5edd256d1ec858a0197fdb318d5cb3f96ecfae08a834b89364a5c0eda13d576987af40d1bc9c07e9486d748f7dec8ed1942e92996edd8905e146547e92b0689e2846e35509869487f6fc0866f446df7851b285c0489ccca517b0604e8c0fc3706629ab8604767aa1fdfa4d93671d09c6c7a57d2e34e72a5f7054404422f96b2e21940aa4f011d3c6f04cc9b6805f2dca8dd0da6a86a6911a614279d312cbbc44789191093106ab692597ae5c3424c181fd83e0f044c3e8ae5240095f8aa20427270e924620cd0a77396e44463968b6d45b87100b539ce4963b2750f54b2929d23a2a3f70c8746c4869828a220ad32e62712351b985d93a8e1ef25b2b53905f69e604d946286e617ad67694110eb1e9517b1f0ceccd7c6eed18ec6da2955e9b885f564c03f7e6bfb0c765abd918530a15424ae92cd00a1ab184df7d753fbb2eb831cfe24f2acf5e289055ddce3581f289e6b83da287c2d136c8b0c496387bba84f1e685ef12db5ebf217d52ce06b477b98190d0b3ec668a90093cf479fa87091d8d8be159982221d688c302e2f406c742f9ef4e16ae51bda5fca5a967dea97f42f2c96fc4c37f41edd0a2ec6868920f9a672b48c47ab9a34dff9e17d05a733872a67ce9b808c7cad908f6232ea3200666fa73d34abca7941e77af4e6c4df12a868bcb3ae1cf74192ed95022182f841021b901c0c650c872472018c1e06a1a6a53f0b9deb225b281b62b265d4ef646e9658d6164bee6aeaeac89d2473f4c80a0999506874458493562ce9b32c7380d7e8c3f056269c325fa55646ce5da4ad0742ff30a752fc1f702e52742bab9589b5dce2360318ba5a69b19842d4e24f54cb4d8190a8003ec6a43d255a06e2c4801d85ac45a9cdf19567ed2169fe5cbb454fc8f89c87048d8864811e6d21f00621d1ab6bec85347f5419fab94a94085203f4b0a4a64bc25bd9d9759291e003cea0e3b3c05230aa8f0e1b05b27d0b16264f05d47ae7fe8c42cad32df7af13a94c725e083f63ede83bb65c70164210ffb71770c7e9a15ad938f61bfbbe1a8694fb7fdcc6dfd6945988fbf038518a1309e8189c97a6701d5faefe52aeed59104848cadfc18b22ea347ed5cfff3a51a289a43284eaa86f65057fdc43fac773d39728beedebf28425067137df75e7c1ad7d2bae0490639d1706b99a229b91bab97b8bbef4eba863830bb8a12ac7196830b29c3998577d0b4d0337338b54be4c6c9488ba0f445fa585a0eb25298866d18cd7fdef25a43a400835e7341d62f0dfc65be11f87f05c5d02f7b1035f1aea8473142e393b91341f60a999617f6516f425682730bb674dbdbb44697c85d3f966f4ff8f4516e2baf5f804694658caec8e5c5a524b2d443b3696e22cd37c1b339841e79b67df8002557cd805eeebde3b22557ceabaebfadef4e36791cf01ef1568631874d7eabd14757c1cfd3bd476fe04de58a94938f871e9cf944f5c2822fa8d587eb3d6aa09aeb487c6f05930d13e4a66bc2b83b01c7164d414e6f69583399dc899567d7a49159cb2890cc4d3a17e0b07fcd4522248fe1f1438229c5193ebf64a9af95b20f19ddd83026336e02feb456300ab85f7e9a41acd587bb6e620bd350edee245482c35365e74173779678ab2c43404a3cdbda5df89da8ad3a2f09e43fc6b241d0a6476c2343607b08301f50675782631a79fc3de3dc3a049d47aa25d2aaff9adc19563d0b2872d33a9b7c6ed42b9b2086273207e117313260dd24ae4e938852794a9b054baf5c76287c93ab292735dc2a8e302bcb1c3735d2fa218220864378d0a7b241506c421210226d98cf855bb696b851311a7c441e8b211ae245d72c914ad1ea0019c33b5bfd0d17d097f64aad697cc8b2ed73fe7f6a45a0f565288965eabaed1232261db79115d75ca42dbc6884e10f726eb13f83b4276ef1e6c095739d2c3cadab00716a63b5473ea65152ab47a46f45d6a53d1b26d45b67b68f3ab4719ea602848cd35f76490aeeb39565e9a56196b6e2532a525f8e239aae2cea5c1362d418aab9b8ed342232c63a9adb96753f1a89d3f080bf5ef19b6fba18f4563eb0561fd9ebc5605448175ad11a7a0410cc979dd7a0d76c01704db76a8d085bbe96439e8422ab4e2d79e340304e02311b6135a69fb8385392b1507f89a46a5b7ed13f8b73c3861e051774f05000448a2032b39e6b2fed4cda81599a88cb6f477e7e7c8c17a23d740a9cdb869c44b84f071f995952624f3c71a792f4d3964dbf"
        }
        let data1 = this.encryption.decryptData(res.data, "5XEO+4vvWqNMbnZKChgDsxFouZntf7pj/sKjcNgoLbM=");
        console.log(data1)
        this.home.getData(signature, timestamp).subscribe(response => {
            console.log(response);
        })
    }
    getProductDetails() {
        this.finalData = []
        let value = { month: this.selected, channel: this.productType }
        let req = { data: this.encryption.encodeJsonObjectToHex(value) }
        let reqhead = this.encryption.createHeader();
        const key = this.encryption.generateKey(reqhead.key)
        this.home.getProductTypeDetails(req, reqhead.headers).subscribe(async res => {
            if (res.success === true) {
                const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
                const decryptedData = JSON.parse(this.encryption.decodeData(encryptedData, await key));
                decryptedData.map((d: any) => {
                    console.log(d, 'data')
                    const arrayOfStrings: string[] = d.services
                    d = d.details[0];
                    if (d.terminalId != null) {
                        d.terminalId = d.terminalId
                    }
                    else {
                        d.terminalId = "N/A"
                    }
                    d.services = arrayOfStrings.join(" ");
                    console.log(d, 'data')
                    this.finalData.push(d);
                    this.allData.push(d);
                })
            }
            if (res) {
                this.isLoading = false;
            }
        })
    }
    openDialog(id: any) {
        this.showDialog = true;
        this.finalData.map((d: any) => {
            if (d.orderNumber == id) {
                this.dialogData = {
                    header1: "Order Details",
                    subHeader11: "Order Number",
                    content11: d.orderNumber !== undefined && d.orderNumber !== null ? d.orderNumber : '',
                    subHeader12: "Purchased Items",
                    content12: d.services !== undefined && d.services !== null ? d.services : '',
                    subHeader13: "Amount",
                    content13: d.amount !== undefined && d.amount !== null ? d.amount : '',
                    header2: "Contact Details",
                    subHeader21: "Email ID",
                    content21: d.terminalEmail !== undefined && d.terminalEmail !== null ? d.terminalEmail : d.customerEmail,
                    subHeader22: "Mobile Number",
                    content22: d.terminalPhone !== undefined && d.terminalPhone !== null ? d.terminalPhone : d.customerPhone,
                    subHeader23: "",
                    content23: "",
                    header3: "Customer Details",
                    subHeader31: "Main Merchant ID",
                    content31: d.mainMerchantId !== undefined && d.mainMerchantId !== null ? d.mainMerchantId : '',
                    subHeader32: "Terminal ID",
                    content32: d.terminalId !== undefined && d.terminalId !== null ? d.terminalId : '',
                }
            }
        })
    }
    closeDialog(): void {
        this.showDialog = false;
    }
    search(term: string) {
        if (!term || term.trim() === '') {
            this.finalData = [...this.allData];
        } else {
            const lowerTerm = term.toLowerCase();
            this.finalData = this.finalData.filter((item:any) =>
                Object.values(item).some(value =>
                    String(value).toLowerCase().includes(lowerTerm)
                )
            );
        }

        this.currentPage = 1; // Reset to first page after search
    }
    onPageChange(page: number) {
        this.currentPage = page;
    }
    getPage(): any[] {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.finalData.slice(startIndex, endIndex);
    }




    sortOrders(prop: any) {
        this.sortType = prop;
        this.cashInvoiceData = this.sortReverse === false ?
            _.orderBy(this.cashInvoiceData, [prop], ['desc']) :
            _.orderBy(this.cashInvoiceData, [prop], ['asc']);
        this.sortReverse = !this.sortReverse;
    }

    reportDownload() {
        this.csvData = [];
        if (this.finalData) {
            this.finalData.map((csv: any) => {
                let Obj: any = {};
                Obj['date'] = new Date(csv.paymentDate).toLocaleDateString();
                Obj['time'] = new Date(csv.paymentDate).toLocaleTimeString();
                Obj['mainMerchantId'] = csv.mainMerchantId;
                // Obj['posType'] = csv.posType;
                Obj['terminalId'] = csv.terminalId
                Obj['item'] = csv.services
                Obj['email_id'] = csv.terminalEmail
                Obj['mobile'] = csv.terminalPhone
                // Obj['sequence_no'] = csv.sequence_no
                Obj['orderNumber'] = csv.orderNumber
                // Obj['vat'] = csv.vat
                Obj['amount'] = csv.amount
                this.csvData = [...this.csvData, Obj];
            })
        }
        const options = {
            title: '', fieldSeparator: ',', quoteStrings: '"', decimalseparator: '.', showLabels: true, showTitle: true,
            headers: ['date', 'time', 'mainMerchantId', 'terminalId', 'item', 'email_id', 'mobile', 'orderNumber', 'amount']
        };
        this.csvOptions = options;
        this.report_title = this.productType;

        new AngularCsv(this.csvData, this.report_title, this.csvOptions);
    }

    // async getCashInvoiceData() {
    //     await this.bar_service.getPosPerformanceData().then(data => {
    //         this.cashInvoiceData = data;
    //     });
    //     this.getfInvoiceData(this.selected)

    // }
    onSelectMonth(event: any) {
        this.selected = event.target.value;
        this.getProductDetails()

        // this.getCashData(this.selected)
    }

    async getfInvoiceData(month: any) {
        this.finalData = [];
        await this.cashInvoiceData.map((mData: any) => {
            if (month === mData.month) {
                mData.data.map((fData: any) => {
                    if (fData.product === this.productType)
                        this.finalData.push(fData);
                })
            }
        })
    }

    async getCashData(month: any) {
        this.cashinvoiceData = []
        let value: any
        this.months.map((mData: any) => {
            if (month === mData.month) {
                this.admin.getcashDetails(mData.id).subscribe(data => {
                    if (data) {
                        data.map((tData: any) => {
                            let vat = (tData.value.cashValue * 5) / 100
                            tData.vat = vat
                            this.cashinvoiceData.push(tData)
                        });
                    }
                })
            }
        })
    }
    onSelectProduct(event: any) {
        this.productType = event.target.value;
        this.getProductDetails()
    }
}
