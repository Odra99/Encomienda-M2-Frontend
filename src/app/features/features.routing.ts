import {RouterModule, Routes} from "@angular/router";
import { PaqueteriaComponent } from "./paqueteria/paqueteria.component";
import { VehiculosComponent } from "./vehiculos/vehiculos.component";
import { CiudadComponent } from "./ciudad/ciudad.component";
import { AllowNavigationGuard } from "../security/guards/allow-navigation-admin.guard";

export const FeaturesRouter: Routes = [
  {
    path: '',
    children: [
      {
        path: 'paqueteria', component: PaqueteriaComponent,
        
        canActivate: [AllowNavigationGuard],
      },
      {
        path: 'vehiculos', component: VehiculosComponent,
        
        canActivate: [AllowNavigationGuard],
      },
      {
        path: 'ciudades', component: CiudadComponent,
        
        canActivate: [AllowNavigationGuard],
      }
    ],
  },
];

// pages

