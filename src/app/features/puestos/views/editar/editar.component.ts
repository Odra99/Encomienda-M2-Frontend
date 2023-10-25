import { Component, EventEmitter,Input, Output,ViewChild } from '@angular/core';
import { Puesto } from 'src/app/data/model/general';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { PuestoService } from 'src/app/services/backend/puesto.service';
import { ToasterService } from 'src/app/services/others/toaster.service';
import { ToasterEnum } from 'src/global/toaster-enum';

@Component({
  selector: 'app-editar-puesto',
  templateUrl: './editar.component.html',
  styleUrls: ['../crear/crear.component.scss']
})

export class EditarPuestoComponent {
  constructor(
    private toasterService: ToasterService,
    private puestoService: PuestoService
  ) {}
  @Output() finishEvent = new EventEmitter<any>();
  @ViewChild('puestoForm', { read: NgForm }) form!: NgForm;
  @Input() usuarioId : number;
  puesto: Puesto = new Puesto();

}