import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PagesRoutes } from './pages.routing.module';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { DashboardLogisticoComponent } from './dashboard/logistico/dashboardLogistico.component';
import { DashboardIngresosComponent } from './dashboard/dashboard-ingresos/dashboard-ingresos.component';
import { DashboardGastosComponent } from './dashboard/dashboard-gastos/dashboard-gastos.component';

@NgModule({
  declarations: [
    AppDashboardComponent,
    DashboardLogisticoComponent,
    DashboardIngresosComponent,
    DashboardGastosComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    NgApexchartsModule,
    RouterModule.forChild(PagesRoutes),
    TablerIconsModule.pick(TablerIcons),
  ],
  exports: [TablerIconsModule],
})
export class PagesModule {}
