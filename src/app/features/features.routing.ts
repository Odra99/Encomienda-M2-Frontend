import {RouterModule, Routes} from "@angular/router";
import { PaqueteriaComponent } from "./paqueteria/paqueteria.component";
import { VehiculosComponent } from "./vehiculos/vehiculos.component";
import { CiudadComponent } from "./ciudad/ciudad.component";

import { PuestosComponent } from "./puestos/puestos.component";
import { SucursalesComponent } from "./sucursal/sucursal.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";
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
      },      
      {
        path: 'puestos', component: PuestosComponent
      },
      {
        path: 'sucursales', component: SucursalesComponent
      },
      {
        path: 'usuarios', component: UsuariosComponent
      },
    ],
  },
];

// pages

