import { Component, EventEmitter, Output,ViewChild } from '@angular/core';
import { Vehiculo } from 'src/app/data/model/general';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { VehiculoService } from 'src/app/services/backend/vehiculo.service';
import { ToasterService } from 'src/app/services/others/toaster.service';
import { ToasterEnum } from 'src/global/toaster-enum';

@Component({
  selector: 'app-crear-vehiculo',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})

export class CrearVehiculoComponent {
  constructor(
    private toasterService: ToasterService,
    private vehiculoService: VehiculoService
  ) {}

  @Output() finishEvent = new EventEmitter<any>();
  @ViewChild('vehiculoForm', { read: NgForm }) form!: NgForm;
  vehiculo: Vehiculo = new Vehiculo();


  placa = new FormControl<string | null>('', Validators.required);
  capacidad = new FormControl<string | null>(null, Validators.required);
  tipo = new FormControl<string | null>(null, Validators.required);
  peso = new FormControl<string | null>(null, Validators.required);
  sucursal = new FormControl<string | null>(null, Validators.required);
  costokm = new FormControl<string | null>(null, Validators.required);

  save() {
    this.form.form.markAllAsTouched();
    if (!this.form.form.valid) {
      return;
    }
    this.vehiculoService.save(this.vehiculo).subscribe({
      next: () => {
        if(!this.vehiculo){
          this.toasterService.show({
            message: 'Vehiculo creado con exito',
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