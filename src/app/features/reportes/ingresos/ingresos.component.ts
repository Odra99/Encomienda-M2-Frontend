
import { Component, ViewChild, ElementRef, Renderer2, OnInit, AfterViewInit, Inject } from '@angular/core';

import { needConfirmation } from 'src/app/decorators/confirm-dialog.decorator';
import { Paquete, Salida,Sucursal } from 'src/app/data/model/general';
import { IngresoService } from 'src/app/services/backend/ingresos.service';
import { SucursalService } from 'src/app/services/backend/sucursal.service';

import { TrackingService } from 'src/app/services/backend/tracking.service';
import { ToasterEnum } from 'src/global/toaster-enum';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToasterService } from 'src/app/services/others/toaster.service';
import { DialogService } from 'src/app/services/others/dialog.service';
import { PermissionTypeEnum } from 'src/global/permissions';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'reporte-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.scss']
})

export class ReporteIngresosComponent {
  displayedColumns: string[] = [
    'id',
    'sucursal',
    'fecha',
    'monto',
    'detalles'
  ];

  datos: Paquete[] = [];
  @ViewChild('paginator') paginator: MatPaginator;

  idSucursal: any = 0;
  fecha="";
  sucursales: Sucursal[] = [];

  dataSource = new MatTableDataSource<Paquete>(this.datos);

  list = true;
  selectedId: number

  permissionTypes = PermissionTypeEnum

  constructor(
    private renderer2: Renderer2,
    public dialog: MatDialog,
    private sucursalService: SucursalService,
    private ingresoService: IngresoService,
    private toasterService: ToasterService,
    private confirmationDialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.getAll();
    this.llenarSucursales();
  }

  getAll() {
    let newDate =""; 
    
    if(this.fecha.length>0){
      newDate=new Date(this.fecha).toISOString()
    }

    var param = {};
    /* tipo_traking_id: this.idTipoTraking,
         numero_guia: this.numeroGuia*/
    param = {
      sucursal_id: this.idSucursal,
      fecha: newDate
    };
    console.log(param)
    
    this.ingresoService.listAllHttp(param).subscribe({
      next: (value) => {
        this.datos = value.body.result;
        console.log(this.datos);
        this.dataSource = new MatTableDataSource<Paquete>(this.datos);
        this.dataSource.paginator = this.paginator;
      },
      error: () => {
        this.toasterService.showGenericErrorToast();
      },
    });
  }

 


 

  llenarSucursales() {
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
