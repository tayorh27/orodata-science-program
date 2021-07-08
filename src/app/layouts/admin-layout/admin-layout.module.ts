import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { ToastrModule } from 'ngx-toastr';

import { MapsModule } from "@syncfusion/ej2-angular-maps";
import { ChartModule, ChartAllModule, AccumulationChartAllModule, RangeNavigatorAllModule } from "@syncfusion/ej2-angular-charts";
import { MyChartComponent } from 'src/app/pages/charts/charts.component';
import { AboutUsComponent } from 'src/app/pages/about-us/about-us.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    MapsModule,
    ChartModule,ChartAllModule, AccumulationChartAllModule, RangeNavigatorAllModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    MyChartComponent,
    AboutUsComponent
  ]
})

export class AdminLayoutModule {}
