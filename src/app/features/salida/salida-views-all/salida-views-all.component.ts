import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Paquete, Tracking } from 'src/app/data/model/general';
import { TrackingService } from 'src/app/services/backend/tracking.service';
import { DialogService } from 'src/app/services/others/dialog.service';
import { ToasterService } from 'src/app/services/others/toaster.service';
import { EstadoTrackingEnum } from 'src/global/backend-enum';
import { PermissionTypeEnum } from 'src/global/permissions';
import { ToasterEnum } from 'src/global/toaster-enum';

@Component({
  selector: 'app-salida-views-all',
  templateUrl: './salida-views-all.component.html',
  styleUrls: ['./salida-views-all.component.scss']
})
export class SalidaViewsAllComponent implements OnInit{

  constructor(
    private toasterService: ToasterService,
    private confirmationDialogService: DialogService,
    private trackingService: TrackingService,
    private route: ActivatedRoute
  ) {
    let salida = this.route.snapshot.paramMap.get('salida')
    if(salida){
      this.filters.salida_id = salida
      this.salidaId = Number(salida)
    }
  }

  permissionTypes= PermissionTypeEnum;
  salidaId !: number 
  displayedColumns: string[] = [
    'index',
    'guia',
    'status',
  ];

  datos: Tracking[] = [];
  @ViewChild('paginatorPaquetes') paginator: MatPaginator;

  dataSource = new MatTableDataSource<Tracking>(this.datos);

  estadoTracking = EstadoTrackingEnum

  filters = {
    salida_id:'',
  }

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.trackingService.listAllHttp(this.filters).subscribe({
      next: (value) => {
        this.datos = value.body.result;
        this.dataSource = new MatTableDataSource<Tracking>(this.datos);
        this.dataSource.paginator = this.paginator;
      },
      error: () => {
        this.toasterService.showGenericErrorToast();
      },
    })
    
  }

 
  


}
