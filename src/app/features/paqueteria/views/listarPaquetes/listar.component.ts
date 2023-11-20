
import { Component, ViewChild, ElementRef, Renderer2, OnInit, AfterViewInit, Inject } from '@angular/core';

import { needConfirmation } from 'src/app/decorators/confirm-dialog.decorator';
import { Paquete, Salida } from 'src/app/data/model/general';
import { PaqueteService } from 'src/app/services/backend/paquete.service';
import { SalidaService } from 'src/app/services/backend/salida.service';

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
  selector: 'app-search-paqueteria',
  templateUrl: './listar.component.html',
  styleUrls: ['../enter-package/enter-package.component.scss']
})

export class ListarPaquetesComponent {
  displayedColumns: string[] = [
    'id',
    'peso',
    'origen',
    'destino',
    'emisor',
    'receptor',
    'NoGuia',
    'actions'
  ];

  datos: Paquete[] = [];
  @ViewChild('paginator') paginator: MatPaginator;

  idSalida: number = 0;
  idTipoTraking: number = 0;
  estadoPaquete: number = 0;
  numeroGuia: string = '';
  salidas: Salida[] = [];

  dataSource = new MatTableDataSource<Paquete>(this.datos);

  list = true;
  selectedId: number

  permissionTypes = PermissionTypeEnum

  constructor(private renderer2: Renderer2,
    public dialog: MatDialog,
    private salidaService: SalidaService,
    private paqueteService: PaqueteService,
    private toasterService: ToasterService,
    private confirmationDialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.getAll();
    this.llenarSalidas();
  }

  getAll() {
    var param = {};
    /* tipo_traking_id: this.idTipoTraking,
         numero_guia: this.numeroGuia*/
    param = {
      salida_id: this.idSalida,
      tipo_tracking_id: this.idTipoTraking,
      estado_paquete_id: this.estadoPaquete,

    };
    this.paqueteService.listAllHttp(param).subscribe({
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

  @needConfirmation()
  entregar(id: any,paquete:Paquete) {
   let  paqueteNuevo:Paquete = new Paquete();
   paqueteNuevo.estado_paquete_id=4;
    
    this.paqueteService.update(id,paqueteNuevo).subscribe({
      next: () => {
        this.toasterService.show({
          message: 'Paquete entregado exitosamente',
          type: ToasterEnum.SUCCESS,
        });
        this.getAll();
      },
      error: () => {
        this.toasterService.showGenericErrorToast();
      },
    })
  }

  filtrar() {
    this.getAll();
  }


  @needConfirmation()
  deletePaquete(id: any) {
    console.log("hello");
    if (id) {
      this.paqueteService.delete(id).subscribe({
        next: () => {
          this.toasterService.show({ message: 'Paquete eliminado', type: ToasterEnum.SUCCESS })
          this.getAll();
        },

        error: () => {
          this.toasterService.showGenericErrorToast();
        },
      })
    }
  }

  llenarSalidas() {
    this.salidaService.listAllHttp({}).subscribe({
      next: (value) => {
        this.salidas = value.body.result;
      },
      error: () => {
        this.toasterService.showGenericErrorToast();
      },
    });
  }

  getPaqueteGuia() {
    this.paqueteService.buscarPaqueteByGuia(this.numeroGuia).subscribe({
      next: (value) => {
        this.datos = [];
        this.datos.push(value.result)
        this.dataSource = new MatTableDataSource<Paquete>(this.datos);
        this.dataSource.paginator = this.paginator;
      },
      error: () => {
        this.toasterService.showGenericErrorToast();
      },
    });
  }

  openDialog(paquete: Paquete) {
    const dialogRef = this.dialog.open(InfoPaqueteDialog, {
      data: paquete,
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }



}

@Component({
  selector: 'info-paquete-dialog',
  templateUrl: './info-paquete-dialog.html',
  styleUrls: ['../enter-package/enter-package.component.scss'],
  template: 'passed in {{ data.name }}',
})


export class InfoPaqueteDialog implements OnInit {
  
  constructor(

    private trackingService: TrackingService,
    private toasterService: ToasterService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  
  @ViewChild('paginator') paginator: MatPaginator;
  paquete: any = this.data;
  tracking: any[] = [];
  trackings: any[] = [];
  dataSource = new MatTableDataSource<Paquete>(this.tracking);
  displayedColumns: string[] = [
    'id',
    'peso',
    'origen',
    'destino',
    'emisor',
    'receptor',
    'NoGuia',
    'actions'
  ];

  ngOnInit(): void {
    this.listarTrackingPaquete();
  }

  listarTrackingPaquete() {
    
    var param = {
      paquete_id: this.paquete.id,
      estado_tracking_id: "",
      salida_id: ""
    };

    

    this.trackingService.listAllHttp(param).subscribe({
      next: (value) => {
        this.tracking = value.body.result;
        console.log(this.tracking);
        //this.dataSource = new MatTableDataSource<Paquete>(this.tracking);
        //this.dataSource.paginator = this.paginator;
      },
      error: () => {
        this.toasterService.showGenericErrorToast();
      },
    });
    this.trackingService.listAllHttpTracking(param).subscribe({
      next:(value)=>{
        this.trackings = value.body.result;
      }
    })
  }

}

