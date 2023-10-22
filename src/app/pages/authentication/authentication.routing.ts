import { Routes } from '@angular/router';

import { AppSideLoginComponent } from './login/login.component';
import { AppSideRegisterComponent } from './register/register.component';
import { AuthGuardOutsideService } from 'src/app/security/guards/auth-guard-outside.service';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: AppSideLoginComponent,
        canActivate: [AuthGuardOutsideService],
      },
      {
        path: 'register',
        component: AppSideRegisterComponent,
        canActivate: [AuthGuardOutsideService],
      },
    ],
  },
];
