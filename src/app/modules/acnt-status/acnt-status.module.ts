import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcntStatusComponent } from './acnt-status.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AcntStatusMenuComponent } from './acnt-status-menu/acnt-status-menu.component';
import { PgListComponent } from './pg-list/pg-list.component';


const routes: Routes = [
  { path: '', component: AcntStatusComponent, canActivate: [AuthGuard],pathMatch: 'full' },
  { path: 'pgList', component: PgListComponent },
];

@NgModule({
  declarations: [AcntStatusComponent, AcntStatusMenuComponent, PgListComponent],
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AcntStatusModule { }
