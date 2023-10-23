import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PaqueteriaComponent } from './paqueteria/paqueteria.component';
import { MatCardModule } from '@angular/material/card';
import { FeaturesRouter } from './features.routing';
import { VehiculosComponent } from './vehiculos/vehiculos.component';

import { SearchComponent } from './paqueteria/views/search/search.component';
import { EnterPackageComponent } from './paqueteria/views/enter-package/enter-package.component';
import { RastreoComponent } from './paqueteria/views/tarificador/tarificador.component';
import { HandPackageComponent } from './paqueteria/views/hand-package/hand-package.component';
import { CiudadComponent } from './ciudad/ciudad.component';
import { CityFormComponent } from './ciudad/views/city-form/city-form.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

@NgModule({
  declarations: [
    PaqueteriaComponent,
    VehiculosComponent,
    SearchComponent,
    EnterPackageComponent,
    RastreoComponent,
    HandPackageComponent,
    CiudadComponent,
    CityFormComponent,
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
