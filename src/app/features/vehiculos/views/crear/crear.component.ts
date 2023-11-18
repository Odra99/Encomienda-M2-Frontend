import { Component, EventEmitter, Output,ViewChild,Input,SimpleChanges } from '@angular/core';
import { Sucursal, Vehiculo } from 'src/app/data/model/general';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { VehiculoService } from 'src/app/services/backend/vehiculo.service';
import { SucursalService } from 'src/app/services/backend/sucursal.service';
import { TipoVehiculoService } from 'src/app/services/backend/tipoVehiculo.service';

import { ToasterEnum } from 'src/global/toaster-enum';
import { ToasterService } from 'src/app/services/others/toaster.service';

@Component({
  selector: 'app-crear-vehiculo',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})

export class CrearVehiculoComponent {
  constructor(
    private toasterService: ToasterService,
    private vehiculoService: VehiculoService,
    private sucursalService:SucursalService,
    private tipoVehiculoService:TipoVehiculoService,
  ) {}

  @Input() vehiculoId : number;
  @Output() finishEvent = new EventEmitter<any>();
  @ViewChild('vehiculoForm', { read: NgForm }) form!: NgForm;
  vehiculo: Vehiculo = new Vehiculo();
  sucursalesSelect:Sucursal[]= [];
  tipoVehiculoSelect:Sucursal[]= [];

  placa = new FormControl<string | null>('', Validators.required);
  capacidad = new FormControl<string | null>(null, Validators.required);
  tipo = new FormControl<number | null>(null, Validators.required);
  peso = new FormControl<string | null>(null, Validators.required);
  sucursal = new FormControl<number | null>(null, Validators.required);
  costokm = new FormControl<string | null>(null, Validators.required);

  ngOnInit(): void {
    if(this.vehiculoId){
      this.vehiculoService.get(this.vehiculoId).subscribe({
        next:(value)=> {
          this.vehiculo = value.result
        },error:()=> {
          this.toasterService.showGenericErrorToast();
        },
      })
    }
    this.llenarSucursal();
    this.llenarTipoVehiculo();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["vebiculoId"] ){
      this.vehiculoService.get(changes["vebiculoId"].currentValue).subscribe({
        next:(value)=> {
          this.vehiculo = value.result
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

  llenarTipoVehiculo():void {
    this.tipoVehiculoService.listAllHttp({}).subscribe({
      next: (value) => {
        this.tipoVehiculoSelect=value.body.result;
      },
      error: () => {
        this.toasterService.showGenericErrorToast();
      },
    });
  }

}