import { Component, Renderer2,  ViewChild, ElementRef,OnInit, AfterViewInit} from '@angular/core';
import { needConfirmation } from 'src/app/decorators/confirm-dialog.decorator';
import { DialogService } from 'src/app/services/others/dialog.service';
import { Vehiculo } from 'src/app/data/model/general';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { VehiculoService } from 'src/app/services/backend/vehiculo.service';
import { ToasterEnum } from 'src/global/toaster-enum';
import { ToasterService } from 'src/app/services/others/toaster.service';
import { PermissionTypeEnum } from 'src/global/permissions';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.scss']
})
export class VehiculosComponent {
  tabs = 0;

  displayedColumns: string[] = [
    'index',
    'placa',
    'capacidad',
    'costo',
    'tipoVehiculo',
    'sucursal',
    'actions'
  ];
  datos: Vehiculo[] = [];
  @ViewChild('paginator') paginator!: MatPaginator;

  dataSource = new MatTableDataSource<Vehiculo>(this.datos);
  
  

  list = true;
  selectedId:number
  permissionTypes = PermissionTypeEnum
  

  constructor(
    private vehiculoService: VehiculoService,
    private toasterService: ToasterService,
    private confirmationDialogService: DialogService
  ) {}

  changeTab(num: number) {
    this.tabs = num;
    this.list = true;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.vehiculoService.listAllHttp({}).subscribe({
      next: (value) => {
        this.datos = value.body.result;
        this.dataSource = new MatTableDataSource<Vehiculo>(this.datos);
        this.dataSource.paginator = this.paginator
      },
      error: () => {
        this.toasterService.showGenericErrorToast();
      },
    });
  }

  edit(id:number){
    this.selectedId = id;
    this.list = false;
  }

  setListView(){
    this.getAll();
    this.tabs = 0;
    this.list = true;
  }

  @needConfirmation()
  deleteVehiculo(id:any){
    if(id){
      this.vehiculoService.delete(id).subscribe({
        next: () => {
          this.toasterService.show({message:'Vehiculo eliminado',type:ToasterEnum.SUCCESS})
          this.getAll();
        },
      
        error: () => {
          this.toasterService.showGenericErrorToast();
        },
      })
    }
  }
  
}
