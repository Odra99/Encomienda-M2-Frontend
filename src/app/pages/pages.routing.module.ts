import { Routes } from '@angular/router';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { AllowNavigationGuard } from '../security/guards/allow-navigation-admin.guard';
import { DashboardLogisticoComponent } from './dashboard/logistico/dashboardLogistico.component';

export const PagesRoutes: Routes = [
  {
    path: 'dashboard',
    children: [
      {
        path: '', component: AppDashboardComponent,
        
        canActivate: [AllowNavigationGuard],
      },
    
      {
        path: 'logistico', component: DashboardLogisticoComponent,
        
        canActivate: [AllowNavigationGuard],
      },
    ]
    
       
  },
];
