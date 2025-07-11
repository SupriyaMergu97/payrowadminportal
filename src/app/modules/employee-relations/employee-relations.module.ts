import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { EmployeeRelationsComponent } from './employee-relations.component';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common'
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {SharedModule} from 'src/app/shared/shared.module'

const routes: Routes = [
  { path: '', component: EmployeeRelationsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [EmployeeRelationsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
})
export class EmployeeRelationsModule { }
