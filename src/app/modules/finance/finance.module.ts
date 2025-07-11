import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { FinanceComponent } from '../finance/finance.component';
import { FinanceDistributorComponent } from './distributor-payable/distributor-payable.component';
import { FinanceActualComponent } from './finance-actual/finance-actual.component';
import { FinanceConsolidatedComponent } from './finance-consolidated/finance-consolidated.component';
import { FinanceMenusComponent } from './finance-menus/finance-menus.component';
import { FinanceNewPropositionComponent } from './finance-newproposition/finance-newproposition.component';
import { FinanceWPSComponent } from './finance-wps/finance-wps.component';
import { FinanceTransactionRateComponent } from './transaction-rate/transaction-rate.component';


const routes: Routes = [
  { path: '', component: FinanceComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'actual', component: FinanceActualComponent},
  { path: 'new-proposition', component: FinanceNewPropositionComponent},
  { path: 'wps', component: FinanceWPSComponent},
  { path: 'distributor', component: FinanceDistributorComponent},
  { path: 'consolidated', component: FinanceConsolidatedComponent},
  { path: 'transaction-rate', component: FinanceTransactionRateComponent}
];

@NgModule({
  declarations: [FinanceComponent, FinanceMenusComponent, FinanceActualComponent, FinanceNewPropositionComponent, FinanceWPSComponent, FinanceDistributorComponent, FinanceConsolidatedComponent, FinanceTransactionRateComponent],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class FinanceModule { }
