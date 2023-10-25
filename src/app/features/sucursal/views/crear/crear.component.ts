import { Component, ViewChild, EventEmitter,Output } from '@angular/core';
import { Sucursal } from 'src/app/data/model/general';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { SucursalService } from 'src/app/services/backend/sucursal.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { ToasterEnum } from 'src/global/toaster-enum';

@Component({
  selector: 'app-crear-sucursal',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})

export class CrearSucursalComponent {
  constructor(
    private toasterService: ToasterService,
    private sucursalService: SucursalService
  ) {}
  
  @ViewChild('sucursalForm', { read: NgForm }) form!: NgForm;
  
  @Output() finishEvent = new EventEmitter<any>();
  sucursal: Sucursal = new Sucursal();
  //sucursal2=new FormControl<Sucursal | null>(null, Validators.required);
  nombre = new FormControl<string | null>(null, Validators.required);
  direccion = new FormControl('', Validators.required);
  ciudad = new FormControl(null, Validators.required);
  departamento = new FormControl('', Validators.required);
  latitud = new FormControl(null, Validators.required);
  longitud = new FormControl(null, Validators.required);
  tipoSucursal = new FormControl(null, Validators.required);

  save() {
    this.sucursal.nombre =this.nombre.value!;
    this.sucursal.direccion =this.direccion.value!;
    this.sucursal.ciudadId =this.ciudad.value!;
    this.sucursal.latitud =this.latitud.value!;
    this.sucursal.longitud =this.longitud.value!;
    this.sucursal.tipoSucursalId =this.tipoSucursal.value!;

    this.form.form.markAllAsTouched();
    if (!this.form.form.valid) {
      return;
    }
    this.sucursalService.save(this.sucursal).subscribe({
      next: () => {
        if(!this.sucursal){
          this.toasterService.show({
            message: 'Sucursal creada con exito',
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


