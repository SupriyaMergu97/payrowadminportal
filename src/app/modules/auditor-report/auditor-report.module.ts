import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { AuditorReportComponent } from './auditor-report.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

const routes: Routes = [
  { path: '', component: AuditorReportComponent, canActivate: [AuthGuard],pathMatch:'full' }
];

@NgModule({
  declarations: [
    AuditorReportComponent
  ],
  imports: [
    RouterModule.forChild(routes),Ng2SearchPipeModule,
    FormsModule,ReactiveFormsModule,
    SharedModule,CommonModule,DropDownListModule
  ],
})
export class AuditorReportModule { }
