import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { CashInvoiceComponent } from './cash-invoice.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CommonModule } from "@angular/common";
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  { path: '', component: CashInvoiceComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [CashInvoiceComponent],
  imports: [
    CommonModule,
    Ng2SearchPipeModule,
    SharedModule,
    FormsModule,ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class CashInvoiceModule { }
