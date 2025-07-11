import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { TapToPayComponent } from './tap-to-pay.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: TapToPayComponent, canActivate: [AuthGuard] },
];


@NgModule({
  declarations: [TapToPayComponent],
  imports: [
    CommonModule,
    Ng2SearchPipeModule,
    RouterModule.forChild(routes),NgSelectModule,FormsModule,ReactiveFormsModule

  ]
})
export class TapToPayModule { }
