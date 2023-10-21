import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PaqueteriaComponent } from './paqueteria/paqueteria.component';
import {MatCardModule} from '@angular/material/card'; 
import { FeaturesRouter } from './features.routing';
import { VehiculosComponent } from './vehiculos/vehiculos.component';

import {SearchComponent} from './paqueteria/views/search/search.component';
import {EnterPackageComponent} from './paqueteria/views/enter-package/enter-package.component';
import {RastreoComponent} from './paqueteria/views/tarificador/tarificador.component';
import {HandPackageComponent} from './paqueteria/views/hand-package/hand-package.component';

@NgModule({
  declarations: [
    PaqueteriaComponent,
    VehiculosComponent,
    SearchComponent,
    EnterPackageComponent,
    RastreoComponent,
    HandPackageComponent,
  ],
  imports: [
    RouterModule.forChild(FeaturesRouter),
    CommonModule,
    MatCardModule,
    
  ]
})
export class FeaturesModule { }
