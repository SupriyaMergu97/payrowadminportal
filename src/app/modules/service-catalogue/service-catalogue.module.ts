import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceCatalogueComponent } from './service-catalogue.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
const routes: Routes = [
  { path: '', component: ServiceCatalogueComponent, canActivate: [AuthGuard],pathMatch:'full' },
];

@NgModule({
  declarations: [ServiceCatalogueComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule, ReactiveFormsModule,Ng2SearchPipeModule,
    RouterModule.forChild(routes)
  ]
})
export class ServiceCatalogueModule { }
