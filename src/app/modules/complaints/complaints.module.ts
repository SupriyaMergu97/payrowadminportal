import { ComplaintsHistoryComponent } from './complaints-history/complaints-history.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplaintsComponent } from './complaints.component';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';

import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ComplaintsMenuComponent } from './complaints-menu/complaints-menu.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {ShortNumbersPipe} from './short-numbers.pipe';
import {
  ChartAllModule,
  ColumnSeriesService,
  CategoryService,
  AccumulationChartAllModule,
  PieSeriesService,
  RangeNavigatorAllModule,
} from '@syncfusion/ej2-angular-charts';

const routes: Routes = [
  {
    path: '',
    component: ComplaintsComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full',
  },
  { path: 'complaints-history', component: ComplaintsHistoryComponent },
];

@NgModule({
  declarations: [
    ComplaintsComponent,
    ComplaintsHistoryComponent,
    ComplaintsMenuComponent,
    ShortNumbersPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    Ng2SearchPipeModule,
    SharedModule,
    ChartAllModule,
    AccumulationChartAllModule,
    RangeNavigatorAllModule,
    DropDownListAllModule,
    RouterModule.forChild(routes),
  ],
  providers: [ColumnSeriesService, CategoryService, PieSeriesService],
})
export class ComplaintsModule {}
