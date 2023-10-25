import { Component, EventEmitter, Output,ViewChild } from '@angular/core';
import { Usuario } from 'src/app/data/model/general';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/backend/user.service';
import { ToasterService } from 'src/app/services/others/toaster.service';
import { ToasterEnum } from 'src/global/toaster-enum';


@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})

export class CrearUsuarioComponent {
  constructor(
    private toasterService: ToasterService,
    private userService: UserService
  ) {}
  @Output() finishEvent = new EventEmitter<any>();
  @ViewChild('usuarioForm', { read: NgForm }) form!: NgForm;
  usuario: Usuario = new Usuario();


  nombre = new FormControl<string | null>(null, Validators.required);
  save() {

    this.form.form.markAllAsTouched();
    if (!this.form.form.valid) {
      return;
    }
    this.userService.save(this.usuario).subscribe({
      next: () => {
        if(!this.usuario){
          this.toasterService.show({
            message: 'Usuario creado con exito',
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