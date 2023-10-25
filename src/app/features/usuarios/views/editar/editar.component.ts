import { Component, EventEmitter,Input, Output,ViewChild } from '@angular/core';
import { Usuario } from 'src/app/data/model/general';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/backend/user.service';
import { ToasterService } from 'src/app/services/others/toaster.service';
import { ToasterEnum } from 'src/global/toaster-enum';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar.component.html',
  styleUrls: ['../crear/crear.component.scss']
})

export class EditarUsuarioComponent {
  constructor(
    private toasterService: ToasterService,
    private userService: UserService
  ) {}
  @Output() finishEvent = new EventEmitter<any>();
  @ViewChild('usuarioForm', { read: NgForm }) form!: NgForm;
  @Input() usuarioId : number;
  usuario: Usuario = new Usuario();

}