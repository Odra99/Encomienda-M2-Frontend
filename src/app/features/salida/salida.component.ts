import { AfterViewInit, Component, OnInit, ViewChild, } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import * as moment from 'moment';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Salida ,Sucursal} from 'src/app/data/model/general';
import { needConfirmation } from 'src/app/decorators/confirm-dialog.decorator';
import { SalidaService } from 'src/app/services/backend/salida.service';
import { DialogService } from 'src/app/services/others/dialog.service';
import { ToasterService } from 'src/app/services/others/toaster.service';
import { ToasterEnum } from 'src/global/toaster-enum';
import { MatDatepicker } from '@angular/material/datepicker';
import { SucursalService } from 'src/app/services/backend/sucursal.service';
import { TipoSalidaEnum } from 'src/global/backend-enum';
@Component({
  selector: 'app-segmento',
  templateUrl: './salida.component.html',
  styleUrls: ['./salida.component.scss']
})
export class SalidaComponent implements OnInit, AfterViewInit {
  tabs = 0;
  date = new FormControl(moment());
  idSucursal = '';
  tipoSalida='';
  fecha="";
  displayedColumns: string[] = [
    'index',
    'tipoSalida',
    'vehiculo',
    'fecha programada',
    'fecha llegada',
    'segmento',
    'actions'
  ];
  datos: Salida[] = [];
  @ViewChild('paginator') paginator: MatPaginator;

  dataSource = new MatTableDataSource<Salida>(this.datos);

  list = true;
  selectedId:number
  sucursalesSelect:Sucursal[]= [];

  tipoSalidaEnum=TipoSalidaEnum

  constructor(
    private salidaService: SalidaService,
    private toasterService: ToasterService,
    private confirmationDialogService: DialogService,
    private sucursalService:SucursalService
  ) {}

  changeTab(num: number) {
    this.tabs = num;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }



  ngOnInit(): void {
    this.getAll();   
    this.llenarSucursal();
  }
  imprimir():void{
    console.log('filtrando');
  }

  getAll() {
    let newDate = new Date(this.fecha);
    console.log('filtrando'+" "+this.idSucursal+" "+newDate+" ");
    var param ={};
    if(this.idSucursal.length>0){
      param ={sucursal_id:Number(this.idSucursal)};
    }else if(this.fecha.length>0){
      param ={fecha: newDate.toISOString()};
    }else if(this.tipoSalida.length>0){
      param ={tipo_salida_id:Number(this.tipoSalida)};
    }
    if(this.idSucursal.length>0&&this.tipoSalida.length>0&&this.fecha.length>0){
      param ={sucursal_id: Number(this.idSucursal),tipo_salida_id:Number(this.tipoSalida),fecha: newDate.toISOString()};
    }else if(this.idSucursal.length>0&&this.tipoSalida.length>0){
      param ={sucursal_id: Number(this.idSucursal),tipo_salida_id:Number(this.tipoSalida)};
    }else if(this.idSucursal.length>0&&this.fecha.length>0){
      param ={sucursal_id: Number(this.idSucursal),fecha: newDate.toISOString()};
    }else if(this.tipoSalida.length>0&&this.fecha.length>0){
      param ={tipo_salida_id:Number(this.tipoSalida),fecha: newDate.toISOString()};
    }
    
    this.salidaService.listAllHttp(param).subscribe({
      next: (value) => {
        this.datos = value.body.result;
        console.log(this.datos);
        this.dataSource = new MatTableDataSource<Salida>(this.datos);
        this.dataSource.paginator = this.paginator;
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
  delete(id:any){
    if(id){
      this.salidaService.delete(id).subscribe({
        next: () => {
          this.toasterService.show({message:'Segmento eliminado',type:ToasterEnum.SUCCESS})
          this.getAll();
        },
        error: () => {
          this.toasterService.showGenericErrorToast();
        },
      })
    }
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

}
