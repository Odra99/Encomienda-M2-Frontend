import { Component, ViewChild, EventEmitter,Output } from '@angular/core';
import { Sucursal } from 'src/app/data/model/general';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { SucursalService } from 'src/app/services/backend/sucursal.service';
import { ToasterService } from 'src/app/services/others/toaster.service';
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

  
  @Output() finishEvent = new EventEmitter<any>();
  @ViewChild('sucursalForm', { read: NgForm }) form!: NgForm;
  sucursal: Sucursal = new Sucursal();
  list = true;
  
  save() {
    this.form.form.markAllAsTouched();
    /*
    if (!this.form.form.valid) {
      return;
    }*/
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


