import {RouterModule, Routes} from "@angular/router";
import { PaqueteriaComponent } from "./paqueteria/paqueteria.component";
import { VehiculosComponent } from "./vehiculos/vehiculos.component";
import { CiudadComponent } from "./ciudad/ciudad.component";
import { AllowNavigationGuard } from "../security/guards/allow-navigation-admin.guard";

import { PuestosComponent } from "./puestos/puestos.component";
import { SucursalesComponent } from "./sucursal/sucursal.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";
import { ConceptoGastoComponent } from "./gasto/concepto-gasto/concepto-gasto.component";
import { GastoComponent } from "./gasto/gasto/gasto.component";
import { SegmentoComponent } from "./segmento/segmento.component";
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
        path: 'puestos', component: PuestosComponent,
        
        canActivate: [AllowNavigationGuard],
      },
      {
        path: 'sucursales', component: SucursalesComponent,
        
        canActivate: [AllowNavigationGuard],
      },
      {
        path: 'usuarios', component: UsuariosComponent,
        
        canActivate: [AllowNavigationGuard],
      },{
        path: 'ciudades', component: CiudadComponent,
        
        canActivate: [AllowNavigationGuard],
      },{
        path: 'concepto-gasto', component: ConceptoGastoComponent,
        
        canActivate: [AllowNavigationGuard],
      },{
        path: 'gastos', component: GastoComponent,
        
        canActivate: [AllowNavigationGuard],
      },{
        path: 'segmentos', component: SegmentoComponent,
        
        canActivate: [AllowNavigationGuard],
      }
    ],
  },
];

// pages

