import { Component, EventEmitter, Output,ViewChild ,SimpleChanges, Input} from '@angular/core';
import { Salida, Segmento,Vehiculo } from 'src/app/data/model/general';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { SalidaService } from 'src/app/services/backend/salida.service';
import { VehiculoService } from 'src/app/services/backend/vehiculo.service';

import { SegmentoService } from 'src/app/services/backend/segmento.service';
import { ToasterEnum } from 'src/global/toaster-enum';
import { ToasterService } from 'src/app/services/others/toaster.service';
@Component({
  selector: 'app-crear-puesto',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})

export class CrearSalidaComponent {

  constructor(
    private toasterService: ToasterService,
    private salidaService: SalidaService,
    private segmentoService: SegmentoService,
    private vehiculoService: VehiculoService
  ) {}


  @Output() finishEvent = new EventEmitter<any>();
  @ViewChild('puestoForm', { read: NgForm }) form!: NgForm;
  salida: Salida = new Salida();
  segmentos:Segmento[]=[];
  vehiculos:Vehiculo[]= [];
  list = true;

  @Input() salidaId : number;

  nombre = new FormControl<string | null>(null, Validators.required);
  ngOnInit(): void {
    this.cargarSegmentos();
    this.cargarVehiculos();
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

  cargarSegmentos(){
    this.segmentoService.listAllHttp({}).subscribe({
      next: (value) => {
        this.segmentos = value.body.result;
      },
      error: () => {
        this.toasterService.showGenericErrorToast();
      },
    });
  }

  cargarVehiculos(){
    this.vehiculoService.listAllHttp({}).subscribe({
      next: (value) => {
        this.vehiculos = value.body.result;
        console.log(this.vehiculos);
      },
      error: () => {
        this.toasterService.showGenericErrorToast();
      },
    });
  }

  save() {
    this.form.form.markAllAsTouched();
   //let puestoNuevo= new Puesto();
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
        console.log("error")
        this.toasterService.showGenericErrorToast();
      },
    });
  }
  finish(){
    this.finishEvent.emit();
  }

}