import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';


import { Paquete,  } from 'src/app/data/model/general';
import { MatPaginator } from '@angular/material/paginator';
import { SearchComponent } from './views/search/search.component';
import { EnterPackageComponent } from './views/enter-package/enter-package.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-paqueteria',
  templateUrl: './paqueteria.component.html',
  styleUrls: ['./paqueteria.component.scss']
})

export class PaqueteriaComponent {

  tabs = 0;
  constructor(private renderer2: Renderer2) { }
  @ViewChild('paginator') paginator: MatPaginator;

  changeTab(num: number) {
    this.tabs = num;
  }

}
