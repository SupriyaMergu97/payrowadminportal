import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateDistributorComponent } from './create-distributor.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// import { PersonalComponent } from '../create-account/reuseble-forms/personal/personal.component';
import { SharedModule } from 'src/app/shared/shared.module';


const routes: Routes = [
  { path: '', component: CreateDistributorComponent, canActivate: [AuthGuard], pathMatch: 'full' },
];
@NgModule({
  declarations: [CreateDistributorComponent],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    NgSelectModule, FormsModule, ReactiveFormsModule,
    // PersonalComponent,
    RouterModule.forChild(routes),
  ]
})

export class CreateDistributorModule { }
