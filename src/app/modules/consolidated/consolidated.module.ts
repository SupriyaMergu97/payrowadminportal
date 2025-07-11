import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { ConsolidatedComponent } from '../consolidated/consolidated.component';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ChartAllModule,
  ColumnSeriesService,
  CategoryService,
  AccumulationChartAllModule, PieSeriesService,
  RangeNavigatorAllModule
} from '@syncfusion/ej2-angular-charts';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { NumericTextBoxModule, UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { SharedModule } from 'src/app/shared/shared.module';
// import {ShortNumbersPipe} from './../../pipes/short-number.pipe';

const routes: Routes = [
  { path: '', component: ConsolidatedComponent, canActivate: [AuthGuard], pathMatch: 'full' },
];

@NgModule({
  declarations: [ConsolidatedComponent],
  imports: [
    CommonModule,
    DatePickerModule,
    ChartAllModule,
    AccumulationChartAllModule,
    RangeNavigatorAllModule,
    DropDownListAllModule,
    NumericTextBoxModule, UploaderModule,
    ButtonModule,
    SharedModule,
    // ShortNumbersPipe,
    RouterModule.forChild(routes), NgSelectModule, FormsModule, ReactiveFormsModule,
  ],
  providers: [ColumnSeriesService, CategoryService, PieSeriesService]

})
export class ConsolidatedModule { }
