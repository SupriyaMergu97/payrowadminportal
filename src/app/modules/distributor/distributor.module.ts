import { PosPerformanceComponent } from './pos-performance/pos-performance.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule, Routes } from '@angular/router';
import { DistributorComponent } from '../distributor/distributor.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { DistributorMenusComponent } from './distributor-menus/distributor-menus.component';
import { UserIdComponent } from './user-id/user-id.component';
import { SalesComponent } from './sales/sales.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ChartAllModule, 
  ColumnSeriesService,
  CategoryService,
  AccumulationChartAllModule, PieSeriesService,
  RangeNavigatorAllModule } from '@syncfusion/ej2-angular-charts';
import { MerchantLocationComponent } from './merchant-location/merchant-location.component';
import {ShortNumbersPipe} from './short-number.pipe';
import {SharedModule} from 'src/app/shared/shared.module';
// import { AgmCoreModule } from '@agm/core';



const routes: Routes = [
  { path: '', component: DistributorComponent, canActivate: [AuthGuard],pathMatch: 'full'},
  {path:'user-id', component: UserIdComponent},
  {path:'sales', component: SalesComponent},
  {path:'merchant-location',component:MerchantLocationComponent},
  {path:'pos-performance',component:PosPerformanceComponent},

];

@NgModule({
  declarations: [DistributorComponent, DistributorMenusComponent, UserIdComponent, SalesComponent, MerchantLocationComponent, PosPerformanceComponent,ShortNumbersPipe],
  imports: [
    CommonModule,
    FormsModule,
    Ng2SearchPipeModule,
    ChartAllModule,
    RangeNavigatorAllModule,
    AccumulationChartAllModule,
    RangeNavigatorAllModule,
    SharedModule,
    // AgmCoreModule.forRoot({
    //     apiKey: 'AIzaSyARE7VlXcKXgUI76ZbXWw8tW0ZqeVPz7Uc',
    //     libraries: ['places']
    // }),
    RouterModule.forChild(routes)
  ],
  providers:[ColumnSeriesService,CategoryService,PieSeriesService]
})
export class DistributorModule { }
