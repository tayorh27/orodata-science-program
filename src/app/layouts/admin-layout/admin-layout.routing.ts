import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { MyChartComponent } from '../../pages/charts/charts.component';
import { AboutUsComponent } from 'src/app/pages/about-us/about-us.component';
import { StateComponent } from 'src/app/pages/state/state.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    // { path: 'user-profile',   component: UserProfileComponent },
    // { path: 'tables',         component: TablesComponent },
    // { path: 'icons',          component: IconsComponent },
    // { path: 'maps',           component: MapsComponent },
    { path: 'sector',           component:  MyChartComponent},
    { path: 'about-us',           component:  AboutUsComponent},
    { path: 'state',           component:  StateComponent}
];
