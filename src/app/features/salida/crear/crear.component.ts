import { Component, EventEmitter, Output,ViewChild ,SimpleChanges, Input} from '@angular/core';
import { Salida, Segmento,Vehiculo,Sucursal} from 'src/app/data/model/general';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { SalidaService } from 'src/app/services/backend/salida.service';
import { VehiculoService } from 'src/app/services/backend/vehiculo.service';
import { SucursalService } from 'src/app/services/backend/sucursal.service';
import { SegmentoService } from 'src/app/services/backend/segmento.service';
import { ToasterEnum } from 'src/global/toaster-enum';
import { ToasterService } from 'src/app/services/others/toaster.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-crear-salida',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})

export class CrearSalidaComponent {

  constructor(
    private toasterService: ToasterService,
    private salidaService: SalidaService,
    private segmentoService: SegmentoService,
    private vehiculoService: VehiculoService,
    private sucursalService:SucursalService,
    private router:Router
  ) {}


  @Output() finishEvent = new EventEmitter<any>();
  @ViewChild('puestoForm', { read: NgForm }) form!: NgForm;
  salida: Salida = new Salida();
  segmentos:Segmento[]=[];
  vehiculos:Vehiculo[]= [];
  sucursales:Sucursal[]= [];
  idSucursal:number=0;
  list = true;

  @Input() salidaId : number;

  nombre = new FormControl<string | null>(null, Validators.required);
  ngOnInit(): void {
    this.cargarSucursales();
    if(this.salidaId){
      this.salidaService.get(this.salidaId).subscribe({
        next:(value)=> {
          this.salida = value.result
        },error:()=> {
          this.toasterService.showGenericErrorToast();
        },
      })
    }
  }

  valores(){
    this.cargarSegmentos();
    this.cargarVehiculos();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["salidaId"] ){
      this.salidaService.get(changes["salidaId"].currentValue).subscribe({
        next:(value)=> {
          this.salida = value.result
        },error:()=> {
          this.toasterService.showGenericErrorToast();
        },
      })
    }
  }


  cargarSucursales(){
    this.sucursalService.listAllHttp({}).subscribe({
      next: (value) => {
        this.sucursales=value.body.result;
      },
      error: () => {
        this.toasterService.showGenericErrorToast();
      },
    });
  }

  cargarSegmentos(){
    this.segmentoService.listbySucursal(this.idSucursal).subscribe({
      next: (value) => {
        this.segmentos = value.result;
      },
      error: () => {
        this.toasterService.showGenericErrorToast();
      },
    });
  }

  cargarVehiculos(){
    this.vehiculoService.listbySucursal(this.idSucursal).subscribe({
      next: (value) => {
        this.vehiculos = value.result;
      },
      error: () => {
        this.toasterService.showGenericErrorToast();
      },
    });
  }

  save() {
    this.form.form.markAllAsTouched();
   //let puestoNuevo= new Puesto();
   this.salida.segmento_id=  Number(this.salida.segmento_id);
   this.salida.vehiculo_id=  Number(this.salida.vehiculo_id);
    this.salidaService.save(this.salida).subscribe({
      
      next: () => {
        if(!this.salida){
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
    this.router.navigate(['/features/salidas']);
  }
  finish(){
    
    this.router.navigate(['/features/salidas']);
  }

}