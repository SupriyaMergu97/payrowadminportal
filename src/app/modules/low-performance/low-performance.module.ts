import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { LowPerformanceComponent } from './low-performance.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common'
import {HttpClientModule} from '@angular/common/http';
import { ArchwizardModule } from 'angular-archwizard';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  	{ path: '', component: LowPerformanceComponent, canActivate: [AuthGuard] },
];

@NgModule({
	declarations: [LowPerformanceComponent],
	imports: [
		HttpClientModule,
		CommonModule,
		Ng2SearchPipeModule,
		SharedModule,
        FormsModule,ReactiveFormsModule,
		RouterModule.forChild(routes),
        ArchwizardModule
	]
})
export class LowPerformanceModule { }
