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
import { TarifarioComponent } from "./tarifario/tarifario.component";
import { SalidaComponent } from "./salida/salida.component";
import { SalidaViewsComponent } from "./salida/salida-views/salida-views.component";
import { SalidaViewsAllComponent } from "./salida/salida-views-all/salida-views-all.component";
import { MapComponent } from "./sucursal/views/map/map.component";
import { GastosDashboardComponent } from "./dashboards/gastos-dashboard/gastos-dashboard.component";
import { ListarPaquetesComponent } from "./paqueteria/views/listarPaquetes/listar.component";

export const FeaturesRouter: Routes = [
  {
    path: '',
    children: [
      {
        path: 'paqueteria', component: PaqueteriaComponent,
        
        canActivate: [AllowNavigationGuard],
      },{
        path: 'paqueteria/listado', component: ListarPaquetesComponent,
        
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
        path: 'sucursales/map', component: MapComponent,
        
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
        path: 'gastos/:fecha', component: GastoComponent,
        
        canActivate: [AllowNavigationGuard],
      },{
        path: 'segmentos', component: SegmentoComponent,
        
        canActivate: [AllowNavigationGuard],
      },{
        path: 'tarifario', component: TarifarioComponent,

        canActivate: [AllowNavigationGuard]
      },{
        path: 'salidas', component: SalidaComponent,
        
        canActivate: [AllowNavigationGuard],
      },{
        path: 'salidas/carga/:salida', component: SalidaViewsComponent,
      },{
        path: 'salidas/ver/:salida', component: SalidaViewsAllComponent,
      },{
        path: 'gastos/dashboard',component:GastosDashboardComponent,
        canActivate: [AllowNavigationGuard]
      }
    ],
  },
];

// pages

