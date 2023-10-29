import { Component, EventEmitter, Output,ViewChild,Input,SimpleChanges } from '@angular/core';
import { Puesto, Sucursal, Usuario,Rol } from 'src/app/data/model/general';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/backend/user.service';
import { ToasterService } from 'src/app/services/others/toaster.service';
import { ToasterEnum } from 'src/global/toaster-enum';
import { RolService }  from 'src/app/services/backend/rol.service';
import { PuestoService } from 'src/app/services/backend/puesto.service';
import { SucursalService } from 'src/app/services/backend/sucursal.service';


@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})

export class CrearUsuarioComponent {
  constructor(
    private toasterService: ToasterService,
    private userService: UserService,
    private sucursalService: SucursalService,
    private rolService: RolService,
    private puestoService:PuestoService
  ) {}
  @Output() finishEvent = new EventEmitter<any>();
  @ViewChild('usuarioForm', { read: NgForm }) form!: NgForm;
  @Input() sucursalId : number;
  usuario: Usuario = new Usuario();
  sucursalesSelect:Sucursal[]= [];
  rolSelect: Array<Rol>= new Array<Rol>;
  puestosSelect: Array<Puesto>= new Array<Puesto>;
  keyword = 'nombre';
  inicial=''
  nombre = new FormControl<string | null>(null, Validators.required);

  ngOnInit(): void {
    if(this.sucursalId){
      this.userService.get(this.sucursalId).subscribe({
        next:(value)=> {
          this.usuario = value.result
        },error:()=> {
          this.toasterService.showGenericErrorToast();
        },
      })
    }
    this.llenarSucursal();
    this.llenarRoles();
    this.llenarPuestos();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["usuarioId"] ){
      this.userService.get(changes["usuarioId"].currentValue).subscribe({
        next:(value)=> {
          this.usuario = value.result
        },error:()=> {
          this.toasterService.showGenericErrorToast();
        },
      })
    }
  }
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

  llenarSucursal():void {
    this.sucursalService.listAllHttp({}).subscribe({
      next: (value) => {
        this.sucursalesSelect=value.body.result;
      },
      error: () => {
        this.toasterService.showGenericErrorToast();
      },
    });
  }

  llenarRoles():void {
    this.rolService.listAllHttp({}).subscribe({
      next: (value) => {
        this.rolSelect=value.body.result;
      },
      error: () => {
        this.toasterService.showGenericErrorToast();
      },
    });
  }

  llenarPuestos():void {
    this.puestoService.listAllHttp({}).subscribe({
      next: (value) => {
        this.puestosSelect=value.body.result;
      },
      error: () => {
        this.toasterService.showGenericErrorToast();
      },
    });
  }
  //guarda el id de la sucursal en usuario.sucursalId al momento de elegir la sucursal
  selectEvent(id:number) {
    this.usuario.sucursal_id=id;
  }
}