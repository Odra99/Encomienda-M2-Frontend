import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Paquete } from 'src/app/data/model/general';
import { needConfirmation } from 'src/app/decorators/confirm-dialog.decorator';
import { PaqueteService } from 'src/app/services/backend/paquete.service';
import { DialogService } from 'src/app/services/others/dialog.service';
import { ToasterService } from 'src/app/services/others/toaster.service';
import { EstadoTrackingEnum } from 'src/global/backend-enum';
import { PermissionTypeEnum } from 'src/global/permissions';
import { ToasterEnum } from 'src/global/toaster-enum';

@Component({
  selector: 'app-salida-views',
  templateUrl: './salida-views.component.html',
  styleUrls: ['./salida-views.component.scss']
})
export class SalidaViewsComponent implements OnInit{

  constructor(
    private toasterService: ToasterService,
    private confirmationDialogService: DialogService,
    private paquetesService: PaqueteService,
    private route: ActivatedRoute
  ) {
    let salida = this.route.snapshot.paramMap.get('salida')
    if(salida){
      this.filtersPackage.salida_id = salida
      this.filtersPackageCargados.salida_id = salida;
      this.salidaId = Number(salida)
    }
  }

  permissionTypes= PermissionTypeEnum;
  salidaId !: number 
  displayedColumns: string[] = [
    'index',
    'guia',
    'actions',
  ];

  displayedColumnsCargados: string[] = [
    'index',
    'guia'
  ];
  datos: Paquete[] = [];
  datosCargados: Paquete[] = [];
  @ViewChild('paginatorPaquetes') paginator: MatPaginator;

  dataSource = new MatTableDataSource<Paquete>(this.datos);
  @ViewChild('paginatorPaquetesCargados') paginatorCargados: MatPaginator;

  dataSourceCargados = new MatTableDataSource<Paquete>(this.datosCargados);

  filtersPackageCargados = {
    salida_id:'',
    tipo_tracking_id:EstadoTrackingEnum.CARGADO,
  }

  filtersPackage = {
    salida_id:'',
    tipo_tracking_id:EstadoTrackingEnum.CARGANDO,
  }

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.paquetesService.listAllHttp(this.filtersPackage).subscribe({
      next: (value) => {
        this.datos = value.body.result;
        this.dataSource = new MatTableDataSource<Paquete>(this.datos);
        this.dataSource.paginator = this.paginator;
      },
      error: () => {
        this.toasterService.showGenericErrorToast();
      },
    })
    this.paquetesService.listAllHttp(this.filtersPackageCargados).subscribe({
      next: (value) => {
        this.datosCargados = value.body.result;
        this.dataSourceCargados = new MatTableDataSource<Paquete>(this.datosCargados);
        this.dataSourceCargados.paginator = this.paginatorCargados;
      },
      error: () => {
        this.toasterService.showGenericErrorToast();
      },
    })
  }

  @needConfirmation()
  loadPackage(id:number){

    this.paquetesService.cargar(id).subscribe({
      next: () => {       
        this.toasterService.show({
          message: 'Paquete cargado exitosamente',
          type: ToasterEnum.SUCCESS,
        });
        this.getAll(); 
      },
      error: () => {
        this.toasterService.showGenericErrorToast();
      },
    })
  }


  


}
