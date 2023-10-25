import { Component, EventEmitter, Output,ViewChild } from '@angular/core';
import { Puesto } from 'src/app/data/model/general';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { PuestoService } from 'src/app/services/backend/puesto.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { ToasterEnum } from 'src/global/toaster-enum';

@Component({
  selector: 'app-crear-puesto',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})

export class CrearPuestoComponent {

  constructor(
    private toasterService: ToasterService,
    private puestoService: PuestoService
  ) {}
  @Output() finishEvent = new EventEmitter<any>();
  @ViewChild('puestoForm', { read: NgForm }) form!: NgForm;
  puesto: Puesto = new Puesto();


  nombre = new FormControl<string | null>(null, Validators.required);
  save() {

    this.form.form.markAllAsTouched();
    if (!this.form.form.valid) {
      return;
    }
    this.puestoService.save(this.puesto).subscribe({
      next: () => {
        if(!this.puesto){
          this.toasterService.show({
            message: 'Puesto creado con exito',
            type: ToasterEnum.SUCCESS,
          });
        }else{
          this.toasterService.show({
            message: 'Cambios realizados con exito',
            type: ToasterEnum.SUCCESS,
          });
        }
        this.finish();
      },error:()=> {
        this.toasterService.showGenericErrorToast();
      },
    });
  }
  finish(){
    this.finishEvent.emit();
  }

}