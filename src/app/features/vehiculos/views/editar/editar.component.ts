import { Component, EventEmitter,Input, Output,ViewChild } from '@angular/core';
import { Vehiculo } from 'src/app/data/model/general';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { VehiculoService } from 'src/app/services/backend/vehiculo.service';
import { ToasterService } from 'src/app/services/others/toaster.service';
import { ToasterEnum } from 'src/global/toaster-enum';
@Component({
  selector: 'app-editar-vehiculo',
  templateUrl: './editar.component.html',
  styleUrls: ['../crear/crear.component.scss']
})

export class EditarVehiculoComponent {
  constructor(
    private toasterService: ToasterService,
    private vehiculoService: VehiculoService
  ) {}
  @Output() finishEvent = new EventEmitter<any>();
  @ViewChild('vehiculoForm', { read: NgForm }) form!: NgForm;
  @Input() usuarioId : number;
  vehiculo: Vehiculo = new Vehiculo();

}