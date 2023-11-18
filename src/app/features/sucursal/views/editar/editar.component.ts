import { Component,  ViewChild, EventEmitter,Output ,Input } from '@angular/core';
import { Sucursal } from 'src/app/data/model/general';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { SucursalService } from 'src/app/services/backend/sucursal.service';
import { ToasterService } from 'src/app/services/others/toaster.service';
import { ToasterEnum } from 'src/global/toaster-enum';
@Component({
  selector: 'app-editar-sucursal',
  templateUrl: './editar.component.html',
  styleUrls: ['../crear/crear.component.scss']
})

export class EditarSucursalComponent {
  constructor(
    private toasterService: ToasterService,
    private sucursalService: SucursalService
  ) {}
  list = true;
  @ViewChild('sucursalForm', { read: NgForm }) form!: NgForm;
  @Input() sucursalId : number;
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

  ngOnInit(): void {
    if(this.sucursalId){
      this.sucursalService.get(this.sucursalId).subscribe({
        next:(value)=> {
          this.sucursal = value.result
        },error:()=> {
          this.toasterService.showGenericErrorToast();
        },
      })
    }
  }

  save() {
    this.sucursal.id=this.sucursalId;
    this.sucursal.nombre =this.nombre.value!;
    this.sucursal.direccion =this.direccion.value!;
    this.sucursal.ciudad_id =this.ciudad.value!;
    this.sucursal.latitud =this.latitud.value!;
    this.sucursal.longitud =this.longitud.value!;
    this.sucursal.tipo_sucursal_id =this.tipoSucursal.value!;

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