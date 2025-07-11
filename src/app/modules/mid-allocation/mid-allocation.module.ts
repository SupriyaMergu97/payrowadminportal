import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { RiskTransactionComponent } from './risk-transaction/risk-transaction.component';
// import { AllocationMenusComponent } from './allocation-menus/allocation-menus.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MidAllocationComponent } from './mid-allocation.component';
import { MidAllocationMenusComponent } from './mid-allocation-menus/mid-allocation-menus.component';
import { PgMidAllocationComponent } from './pg-mid-allocation/pg-mid-allocation.component';

const routes: Routes = [
  { path: '', component: MidAllocationComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  // { path: 'tid-allocate', component: TidAllocateComponent },
  { path: 'pgMid', component: PgMidAllocationComponent },
];


@NgModule({
  declarations: [MidAllocationComponent, MidAllocationMenusComponent, PgMidAllocationComponent, MidAllocationMenusComponent],
  imports: [
    CommonModule,
    SharedModule,
    Ng2SearchPipeModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class MidAllocationModule { }
