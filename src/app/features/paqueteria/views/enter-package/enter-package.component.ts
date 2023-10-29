import { Component, ViewChild, ElementRef,Renderer2 } from '@angular/core';
import { Paquete } from 'src/app/data/model/general';
@Component({
  selector: 'app-enter-package',
  templateUrl: './enter-package.component.html',
  styleUrls: ['./enter-package.component.scss']
})

export class EnterPackageComponent {
  paquete: Paquete = new Paquete();

}