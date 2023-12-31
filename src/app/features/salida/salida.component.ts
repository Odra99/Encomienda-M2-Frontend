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
  idEstadoSalida='';
  fecha="";
  displayedColumns: string[] = [
    'index',
    'sucursalOrigen',
    'segmento',
    'tipoSalida',
    'vehiculo',
    'fecha programada',
    'capacidad',
    'capacidad reservada',
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
    let newDate =""; 
    
    if(this.fecha.length>0){
      newDate=new Date(this.fecha).toISOString()
    }
    if(this.idSucursal!=""){
      Number(this.idSucursal)
    }
    var param = {
      sucursal_id: this.idSucursal,
      tipo_salida_id: this.tipoSalida,
      fecha:  newDate
      
    };
    console.log(param)
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

  @needConfirmation()
  darSalida(salida:number){
    if(salida){
      this.salidaService.darSalida(salida).subscribe({
        next: () => {
          this.toasterService.show({message:'Salida Iniciada',type:ToasterEnum.SUCCESS})
          this.getAll();
        },
        error: () => {
          this.toasterService.showGenericErrorToast();
        },
      })
    }
  }
  @needConfirmation()
  recepcionarSalida(id:any){
    if(id){
      this.salidaService.recapcionarSalida(id).subscribe({
        next: () => {
          this.toasterService.show({message:'Ruta recibida con exito',type:ToasterEnum.SUCCESS})
          this.getAll();
        },
        error: () => {
          this.toasterService.showGenericErrorToast();
        },
      })
    }
  }


  @needConfirmation()
  prepararParaCargar(salida:Salida){
    let salidaAuxiliar:Salida= new Salida();
    salidaAuxiliar.tipo_salida_id=3;
    salida.tipo_salida_id=3;
    if(salida){
      this.salidaService.update(salida.id,salidaAuxiliar).subscribe({
        next: () => {
          this.toasterService.show({message:'Salida Preparada',type:ToasterEnum.SUCCESS})
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
