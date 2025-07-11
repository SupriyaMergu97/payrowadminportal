import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    ChartAllModule,
    AccumulationChartAllModule,
    ColumnSeriesService,
    CategoryService,
    PieSeriesService,
    RangeNavigatorAllModule
} from '@syncfusion/ej2-angular-charts';
import { DonutChartComponent } from './donut-chart/donut-chart.component';
import { BarChartsComponent } from './bar-charts/bar-charts.component';
// import { ShortNumbersPipe } from './short-number.pipe';
import { ShortNumPipe } from './short-num.pipe';
import { DistPersonalComponent } from './distPersonal/distPersonal.component';
import { DistLicenceFormComponent } from './distLicence-form/distLicence-form.component';
import { DistBankFormComponent } from './distBank-form/distBank-form.component';
import { DistBusinessFormComponent } from './distBusiness-form/distBusiness-form.component';
import { OnboardingFormComponent } from './onboarding-form/onboarding-form.component';
import { AdminDetailsComponent } from './admin-details/admin-details.component';
import { BasicFormComponent } from './basic-form/basic-form.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ContactDialogComponent } from './contact-dialog/contact-dialog.component';
import { PridformComponent } from './pridform/pridform.component';

@NgModule({
    declarations: [DonutChartComponent, BarChartsComponent, ShortNumPipe,DistPersonalComponent,
        DistLicenceFormComponent,DistBankFormComponent,DistBusinessFormComponent,OnboardingFormComponent, AdminDetailsComponent, BasicFormComponent, PaginationComponent, ContactDialogComponent, PridformComponent],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        ChartAllModule,
        AccumulationChartAllModule,
        RangeNavigatorAllModule
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        DonutChartComponent,
        BarChartsComponent,
        ShortNumPipe,
        DistPersonalComponent,
        DistLicenceFormComponent,
        DistBankFormComponent,
        DistBusinessFormComponent,
        OnboardingFormComponent,
        AdminDetailsComponent,
        BasicFormComponent,
        PaginationComponent,
        ContactDialogComponent,
        PridformComponent
        // ShortNumbersPipe

    ],
    providers: [ColumnSeriesService, CategoryService, PieSeriesService],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class SharedModule { }
