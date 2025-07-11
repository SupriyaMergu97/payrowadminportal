import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReferdesignComponent } from './referdesign.component';

const routes: Routes = [
  { path: '', component: ReferdesignComponent,pathMatch:'full' },
];

@NgModule({
  declarations: [ReferdesignComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ReferDesignModule { }
