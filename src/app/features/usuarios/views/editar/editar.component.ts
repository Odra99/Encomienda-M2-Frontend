import { Component, EventEmitter,Input, Output,ViewChild,SimpleChanges} from '@angular/core';
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
  list = true;
  constructor(
    private toasterService: ToasterService,
    private userService: UserService
  ) {}


  user: Usuario = new Usuario();
  @Input() usuarioId : number;
  @Output() finishEvent = new EventEmitter<any>();

  usuarioInput = new FormControl<string | null>(null, Validators.required);
  nombreInput = new FormControl('', Validators.required);
  emailInput = new FormControl('', Validators.required);
  passwordInput = new FormControl('', Validators.required);
  idRolInput = new FormControl(null, Validators.required);
  idPuestoInput = new FormControl(null, Validators.required);
  horasInput= new FormControl(null, Validators.required);
  SucursalInput= new FormControl(null, Validators.required);
  idSucursal= new FormControl(null, Validators.required);
 
  
  @ViewChild('usuarioForm', { read: NgForm }) form!: NgForm;

  ngOnInit(): void {
    if(this.usuarioId){
      this.userService.get(this.usuarioId).subscribe({
        next:(value)=> {
          this.user = value.result
        },error:()=> {
          this.toasterService.showGenericErrorToast();
        },
      })
    }
  }


  ngOnChanges(changes: SimpleChanges): void {
    if(changes["usuarioId"] ){
      this.userService.get(changes["usuarioId"].currentValue).subscribe({
        next:(value)=> {
          this.user = value.result
        },error:()=> {
          this.toasterService.showGenericErrorToast();
        },
      })
    }
  }

}