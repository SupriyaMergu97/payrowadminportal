import { NgModule } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { OnboardingComponent } from './onboarding.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RiskTransactionComponent } from './risk-transaction/risk-transaction.component';
import { AllocationMenusComponent } from './allocation-menus/allocation-menus.component';
import { TidAllocateComponent } from './tid-allocate/tid-allocate.component';
import { PgAuthenticationComponent } from './pg-authentication/pg-authentication.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PersonalComponent } from './reuseble-forms/personal/personal.component';
import { CardFormComponent } from './reuseble-forms/card-form/card-form.component';
import { BankFormComponent } from './reuseble-forms/bank-form/bank-form.component';
import { AddressFormComponent } from './reuseble-forms/address-form/address-form.component';
import { StaffFormComponent } from './reuseble-forms/staff-form/staff-form.component';
import { LicenceFormComponent } from './reuseble-forms/licence-form/licence-form.component';
import { BusinessFormComponent } from './reuseble-forms/business-form/business-form.component';
import { NbqFormComponent } from './reuseble-forms/nbq-form/nbq-form.component'
import { NiFormComponent } from './reuseble-forms/ni-form/ni-form.component'
import { StoreManagerComponent } from './reuseble-forms/store-manager/store-manager.component';
import { AdminFormComponent } from './reuseble-forms/admin-form/admin-form.component';
import { MerchantAgreementComponent } from './reuseble-forms/merchant-agreement/merchant-agreement.component';
import { GoodsFormComponent } from './reuseble-forms/goods-form/goods-form.component';
import { MidReqFormComponent } from './reuseble-forms/mid-req-form/mid-req-form.component';
const routes: Routes = [
  { path: '', component: OnboardingComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'tid-allocate', component: TidAllocateComponent },
  { path: 'pgAuthentication', component: PgAuthenticationComponent },
];


@NgModule({
  declarations: [OnboardingComponent, RiskTransactionComponent, AllocationMenusComponent, TidAllocateComponent, PgAuthenticationComponent,
   PersonalComponent, CardFormComponent, BankFormComponent, AddressFormComponent, StaffFormComponent, LicenceFormComponent, BusinessFormComponent, 
   NbqFormComponent, NiFormComponent, StoreManagerComponent, AdminFormComponent, MerchantAgreementComponent, GoodsFormComponent,MidReqFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    Ng2SearchPipeModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    DatePipe // Provide DatePipe here
  ]
})
export class OnboardingModule { }
