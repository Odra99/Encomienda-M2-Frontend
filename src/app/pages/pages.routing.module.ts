import { Routes } from '@angular/router';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { AllowNavigationGuard } from '../security/guards/allow-navigation-admin.guard';

export const PagesRoutes: Routes = [
  {
    path: '',
    component: AppDashboardComponent,
    data: {
      title: 'Starter Page',
    },
    
        canActivate: [AllowNavigationGuard],
  },
];
