import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayrowCardComponent } from './payrow-card.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
const routes: Routes = [
  { path: '', component: PayrowCardComponent, canActivate: [AuthGuard], pathMatch: 'full' }
];

@NgModule({
  declarations: [PayrowCardComponent],
  imports: [
    CommonModule,
    Ng2SearchPipeModule,
    SharedModule,
    NgMultiSelectDropDownModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class PayrowCardModule { }
