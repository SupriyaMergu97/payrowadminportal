import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { VatReportComponent } from './vat-report.component';
import { VatMenusComponent } from './vat-menus/vat-menus.component';
import { VatRequestComponent } from './vat-request/vat-request.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

const routes: Routes = [
  { path: '', component: VatReportComponent, canActivate: [AuthGuard],pathMatch:'full' },
  {path:'vat-request',component:VatRequestComponent}
];

@NgModule({
  declarations: [
    VatReportComponent, 
    VatMenusComponent, 
    VatRequestComponent],
  imports: [
    RouterModule.forChild(routes),Ng2SearchPipeModule,
    FormsModule,ReactiveFormsModule,
    SharedModule,CommonModule,DropDownListModule
  ],
})
export class VatReportModule { }
