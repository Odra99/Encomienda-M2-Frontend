import {RouterModule, Routes} from "@angular/router";
import { PaqueteriaComponent } from "./paqueteria/paqueteria.component";
import { VehiculosComponent } from "./vehiculos/vehiculos.component";
import { CiudadComponent } from "./ciudad/ciudad.component";

export const FeaturesRouter: Routes = [
  {
    path: '',
    children: [
      {
        path: 'paqueteria', component: PaqueteriaComponent
      },
      {
        path: 'vehiculos', component: VehiculosComponent
      },
      {
        path: 'ciudades', component: CiudadComponent
      }
    ],
  },
];

// pages

