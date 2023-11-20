import { Routes } from '@angular/router';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { AllowNavigationGuard } from '../security/guards/allow-navigation-admin.guard';
import { DashboardLogisticoComponent } from './dashboard/logistico/dashboardLogistico.component';
import { DashboardGastosComponent } from './dashboard/dashboard-gastos/dashboard-gastos.component';
import { DashboardIngresosComponent } from './dashboard/dashboard-ingresos/dashboard-ingresos.component';

export const PagesRoutes: Routes = [
  {
    path: 'dashboard',
    children: [
      {
        path: '', component: DashboardLogisticoComponent,
        
        canActivate: [AllowNavigationGuard],
      },
    
      {
        path: 'logistico', component: DashboardLogisticoComponent,
        
        canActivate: [AllowNavigationGuard],
      },
    
      {
        path: 'gasto', component: DashboardGastosComponent,
        
        canActivate: [AllowNavigationGuard],
      },
    
      {
        path: 'ingreso', component: DashboardIngresosComponent,
        
        canActivate: [AllowNavigationGuard],
      },
    ]
    
       
  },
];
