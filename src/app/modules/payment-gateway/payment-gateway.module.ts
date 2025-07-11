import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { PaymentGatewayComponent } from './payment-gateway.component';
import { GatwayMenusComponent } from './gatway-menus/gatway-menus.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  ChartAllModule,
  ColumnSeriesService,
  CategoryService,
  AccumulationChartAllModule, PieSeriesService,
  RangeNavigatorAllModule
} from '@syncfusion/ej2-angular-charts';
import { CommonModule } from "@angular/common";
import { GovtComponent } from './govt/govt.component';
import { ServiceTypeComponent } from './service-type/service-type.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ShortNumbersPipe } from 'src/app/pipes/short-number.pipe';
import { EnterpriseComponent } from './enterprise/enterprise.component';
import { SmbComponent } from './smb/smb.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { GatewayTransactionsComponent } from './gateway-transactions/gateway-transactions.component';

const routes: Routes = [
  { path: '', component: PaymentGatewayComponent, canActivate: [AuthGuard] },
  { path: 'govt', component: GovtComponent },
  { path: 'enterprise', component: EnterpriseComponent },
  { path: 'smb', component: SmbComponent },
  { path: 'service-types', component: ServiceTypeComponent },
  { path: 'transactions', component: GatewayTransactionsComponent }
];

@NgModule({
  declarations: [PaymentGatewayComponent, GatwayMenusComponent, GovtComponent, ServiceTypeComponent, ShortNumbersPipe, EnterpriseComponent, SmbComponent, GatewayTransactionsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
    ChartAllModule,
    AccumulationChartAllModule,
    RangeNavigatorAllModule,
    NgMultiSelectDropDownModule,
    Ng2SearchPipeModule,

    SharedModule,

  ],
  providers: [ColumnSeriesService, CategoryService, PieSeriesService]
})
export class PaymentGatewayModule { }
