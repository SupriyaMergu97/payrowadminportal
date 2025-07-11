import { Component, Input,EventEmitter, Output } from '@angular/core';
import { SignatureEncryptionService } from 'src/app/services/signature-encryption.service';
import { DistributorService } from 'src/app/services/distributor.service';
import { EmpService } from 'src/app/services/emp.service';
@Component({
  selector: 'app-contact-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.scss']
})
export class ContactDialogComponent {
  @Input() dialogData:any;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  showModal: boolean = false;
  objData:any;
  mngrList: any;
  selectedMngr: any
  distData:any
  constructor(
    private encryption: SignatureEncryptionService,
    private distributor: DistributorService,
    private emp: EmpService
  ){}
  openDialog(): void {
    console.log('hii')
    this.showModal = true;
  }

  closeDialog(): void {
    this.showModal = false;
    this.close.emit();
  }
  ngOnInit(){
    this.getRegMngr();
    console.log(this.dialogData);
    // this.objData={
    //   header1:"Contact Details",
    //   subHeader11:"Email",
    //   content11:this.dialogData.emailId,
    //   subHeader12:"Contact Number",
    //   content12:this.dialogData.mobileNumber,
    //   subHeader13:"Department ID",
    //   content13:this.dialogData.deptId,
    //   header2:"Contact Details",
    //   subHeader21:"Email",
    //   content21:this.dialogData.emailId,
    //   subHeader22:"Contact Number",
    //   content22:this.dialogData.mobileNumber,
    //   subHeader23:"Department ID",
    //   content23:this.dialogData.deptId,
    //   header3:"Contact Details",
    //   subHeader31:"Email",
    //   content31:this.dialogData.emailId,
    //   subHeader32:"Contact Number",
    //   content32:this.dialogData.mobileNumber,
    // }
    // this.openDialog();
  }
  async getRegMngr() {
    let reqhead = this.encryption.createHeader();
    const key = await this.encryption.generateKey(reqhead.key)
    this.distributor.getDistbyId("PDID114", reqhead.headers).subscribe(async res => {
      if (res.success === true) {
        const encryptedData = res.data;  // Assuming encrypted data comes under 'data'
        const decryptedData = await JSON.parse(this.encryption.decodeData(encryptedData, await key));
        console.log(decryptedData)
        this.distData=decryptedData
        let reqheadmngr = this.encryption.createHeader();
        const keymngr = await this.encryption.generateKey(reqheadmngr.key)
        this.emp.getEmpbyId(reqheadmngr.headers, decryptedData[0].regionalManagerID).subscribe(async res => {
          if (res.success === true) {
            const encryptedDatamngr = res.data;  // Assuming encrypted data comes under 'data'
            const decryptedDatamngr = await JSON.parse(this.encryption.decodeData(encryptedDatamngr, await keymngr));
            this.mngrList = decryptedDatamngr;
            this.selectedMngr = this.mngrList[0]
            console.log(decryptedDatamngr, 'dddaaaattaa')
          }
        })
      }
    })
    // regionalManagerID: "EMP101



  }
  // closeDialog(): void {
  //   this.close.emit();
  // }

}
