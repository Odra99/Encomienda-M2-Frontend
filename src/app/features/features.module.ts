import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FeaturesRouter } from './features.routing';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';


import { CiudadComponent } from './ciudad/ciudad.component';
import { CityFormComponent } from './ciudad/views/city-form/city-form.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
//paqueteria
import { PaqueteriaComponent } from './paqueteria/paqueteria.component';
import { SearchComponent } from './paqueteria/views/search/search.component';
import { ListarPaquetesComponent,InfoPaqueteDialog } from './paqueteria/views/listarPaquetes/listar.component';
import { EnterPackageComponent } from './paqueteria/views/enter-package/enter-package.component';
import { RastreoComponent } from './paqueteria/views/tarificador/tarificador.component';
import { HandPackageComponent } from './paqueteria/views/hand-package/hand-package.component';

//vehiculo
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import {CrearVehiculoComponent} from './vehiculos/views/crear/crear.component';
import {EditarVehiculoComponent} from './vehiculos/views/editar/editar.component';
import {ListarVehiculosComponent} from './vehiculos/views/listar/listar.component';

//puestos
import { PuestosComponent } from './puestos/puestos.component';
import {CrearPuestoComponent} from './puestos/views/crear/crear.component';
import {EditarPuestoComponent} from './puestos/views/editar/editar.component';
import {ListarPuestoComponent} from './puestos/views/listar/listar.component';

//sucursales
import { SucursalesComponent } from './sucursal/sucursal.component';
import {CrearSucursalComponent} from './sucursal/views/crear/crear.component';
import {ListarSucursalComponent} from './sucursal/views/listar/listar.component';
import {EditarSucursalComponent} from './sucursal/views/editar/editar.component';
import { SalidaComponent } from './salida/salida.component';

//usuarios
import { UsuariosComponent } from './usuarios/usuarios.component';
import {CrearUsuarioComponent} from './usuarios/views/crear/crear.component';
import {ListarUsuariosComponent} from './usuarios/views/listar/listar.component';
import {EditarUsuarioComponent} from './usuarios/views/editar/editar.component';
import { ConceptoGastoComponent } from './gasto/concepto-gasto/concepto-gasto.component';
import { ConceptoGastoFormComponent } from './gasto/concepto-gasto/views/concepto-gasto-form/concepto-gasto-form.component';
import { GastoComponent } from './gasto/gasto/gasto.component';
import { GastoFormComponent } from './gasto/gasto/views/gasto-form/gasto-form.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { SegmentoComponent } from './segmento/segmento.component';
import { SegmentoFormComponent } from './segmento/views/segmento-form/segmento-form.component';
import { CheckPermissionDirective } from '../directives/check-permission.directive';
import { TarifarioComponent } from './tarifario/tarifario.component';
import { SalidaViewsComponent } from './salida/salida-views/salida-views.component';
import { SalidaViewsAllComponent } from './salida/salida-views-all/salida-views-all.component';
import { MapComponent } from './sucursal/views/map/map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { GastosDashboardComponent } from './dashboards/gastos-dashboard/gastos-dashboard.component';
import { IngresoDashboardComponent } from './dashboards/ingreso-dashboard/ingreso-dashboard.component';


export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    PaqueteriaComponent,
    InfoPaqueteDialog,
    
    ListarPaquetesComponent,
    SearchComponent,
    EnterPackageComponent,
    RastreoComponent,
    HandPackageComponent,
    CiudadComponent,
    CityFormComponent,

    VehiculosComponent,
    CrearVehiculoComponent,
    EditarVehiculoComponent,
    ListarVehiculosComponent,

    SucursalesComponent,
    ListarSucursalComponent,
    EditarSucursalComponent,
    CrearSucursalComponent,
    SalidaComponent,
    UsuariosComponent,
    CrearUsuarioComponent,
    ListarUsuariosComponent,
    EditarUsuarioComponent,

    ListarPuestoComponent,
    PuestosComponent,
    CrearPuestoComponent,
    EditarPuestoComponent,
    ConceptoGastoComponent,
    ConceptoGastoFormComponent,
    GastoComponent,
    GastoFormComponent,
    SegmentoComponent,
    SegmentoFormComponent,
    CheckPermissionDirective,
    TarifarioComponent,
    SalidaViewsComponent,
    SalidaViewsAllComponent,
    MapComponent,
    GastosDashboardComponent,
    IngresoDashboardComponent
  ],
  imports: [
    RouterModule.forChild(FeaturesRouter),
    CommonModule,
    MatCardModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    TablerIconsModule.pick(TablerIcons),
    AutocompleteLibModule,
    GoogleMapsModule
  ],
  exports:[

    CheckPermissionDirective
  ],
  providers:[
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class FeaturesModule {}
