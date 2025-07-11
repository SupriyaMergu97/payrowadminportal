import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { HighConsumptionComponent } from './high-consumption.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common'
// import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';
import { ArchwizardModule } from 'angular-archwizard';
import { SharedModule } from 'src/app/shared/shared.module';
const routes: Routes = [
    { path: '', component: HighConsumptionComponent, canActivate: [AuthGuard] },
];
// const ngWizardConfig: NgWizardConfig = {
//     theme: THEME.default
//   };

@NgModule({
    declarations: [HighConsumptionComponent],
    imports: [
        CommonModule,
        Ng2SearchPipeModule,
        SharedModule,
        FormsModule,ReactiveFormsModule,
        RouterModule.forChild(routes),
        // NgWizardModule.forRoot(ngWizardConfig),
        ArchwizardModule
    ]
})
export class HighConsumptionModule { }
