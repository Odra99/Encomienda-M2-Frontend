import {RouterModule, Routes} from "@angular/router";
import { PaqueteriaComponent } from "./paqueteria/paqueteria.component";
import { VehiculosComponent } from "./vehiculos/vehiculos.component";

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
    ],
  },
];

// pages

