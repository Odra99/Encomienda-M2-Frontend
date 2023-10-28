import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Segmento, Sucursal } from 'src/app/data/model/general';
import { SegmentoService } from 'src/app/services/backend/segmento.service';
import { SucursalService } from 'src/app/services/backend/sucursal.service';
import { ToasterService } from 'src/app/services/others/toaster.service';
import { ToasterEnum } from 'src/global/toaster-enum';

@Component({
  selector: 'app-segmento-form',
  templateUrl: './segmento-form.component.html',
  styleUrls: ['./segmento-form.component.scss']
})
export class SegmentoFormComponent implements OnInit, OnChanges {
  constructor(
    private toasterService: ToasterService,
    private sucursalService: SucursalService,
    private segmentoService: SegmentoService
  ) {}

  segmento: Segmento = new Segmento();
  @Input() segmentoId: number;
  @Output() finishEvent = new EventEmitter<any>();

  sucursalDestino = new FormControl<string | null>(null, Validators.required);
  sucursalOrigen = new FormControl<string | null>(null, Validators.required);

  @ViewChild('segmentoForm', { read: NgForm }) form!: NgForm;

  sucursales: Sucursal[] = [];

  

  ngOnInit(): void {
    if (this.segmentoId) {
      this.segmentoService.get(this.segmentoId).subscribe({
        next: (value) => {
          this.segmento = value.result;
        },
        error: () => {
          this.toasterService.showGenericErrorToast();
        },
      });
    }
    this.getSucursales();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['segmentoId']) {
      this.segmentoService.get(changes['segmentoId'].currentValue).subscribe({
        next: (value) => {
          this.segmento = value.result;
        },
        error: () => {
          this.toasterService.showGenericErrorToast();
        },
      });
    }
  }

  save() {
    this.form.form.markAllAsTouched();
   

    if (!this.form.form.valid) {
      if((this.segmento.sucursal_destino_id) && (this.segmento.sucursal_origen_id) && this.segmento.sucursal_destino_id==this.segmento.sucursal_origen_id){
        this.sucursalOrigen.setErrors({sameSucursal:true})
        this.sucursalDestino.setErrors({sameSucursal:true})
      }
      return;
    }
    
    this.segmentoService.save(this.segmento).subscribe({
      next: () => {
        if (!this.segmentoId) {
          this.toasterService.show({
            message: 'Segmento creado con exito',
            type: ToasterEnum.SUCCESS,
          });
        } else {
          this.toasterService.show({
            message: 'Cambios realizados con exito',
            type: ToasterEnum.SUCCESS,
          });
        }
        this.finish();
      },
      error: () => {
        this.toasterService.showGenericErrorToast();
      },
    });
  }

  finish() {
    this.finishEvent.emit();
  }

  getSucursales() {
    this.sucursalService.listAllHttp({}).subscribe({
      next: (value) => {
        this.sucursales = value.body.result;
      },
      error: () => {
        this.toasterService.showGenericErrorToast();
      },
    });
  }

 
}
