import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FeaturesRouter } from './features.routing';

import { CiudadComponent } from './ciudad/ciudad.component';
import { CityFormComponent } from './ciudad/views/city-form/city-form.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
//paqueteria
import { PaqueteriaComponent } from './paqueteria/paqueteria.component';
import { SearchComponent } from './paqueteria/views/search/search.component';
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

//usuarios
import { UsuariosComponent } from './usuarios/usuarios.component';
import {CrearUsuarioComponent} from './usuarios/views/crear/crear.component';
import {ListarUsuariosComponent} from './usuarios/views/listar/listar.component';
import {EditarUsuarioComponent} from './usuarios/views/editar/editar.component';


@NgModule({
  declarations: [
    PaqueteriaComponent,
    
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
    
    UsuariosComponent,
    CrearUsuarioComponent,
    ListarUsuariosComponent,
    EditarUsuarioComponent,

    ListarPuestoComponent,
    PuestosComponent,
    CrearPuestoComponent,
    EditarPuestoComponent,
  ],
  imports: [
    RouterModule.forChild(FeaturesRouter),
    CommonModule,
    MatCardModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    TablerIconsModule.pick(TablerIcons),
  ],
})
export class FeaturesModule {}
