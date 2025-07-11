import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { ExpensesComponent } from '../expenses/expenses.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common'
const routes: Routes = [
  { path: '', component: ExpensesComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [ExpensesComponent],
  imports: [
    CommonModule,
    Ng2SearchPipeModule,
    FormsModule,ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ExpensesModule { }
