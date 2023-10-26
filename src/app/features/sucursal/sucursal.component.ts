import { Component, ViewChild, ElementRef,Renderer2,OnInit, AfterViewInit } from '@angular/core';
import { needConfirmation } from 'src/app/decorators/confirm-dialog.decorator';
import { DialogService } from 'src/app/services/others/dialog.service';
import { Sucursal } from 'src/app/data/model/general';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SucursalService } from 'src/app/services/backend/sucursal.service';
import { ToasterEnum } from 'src/global/toaster-enum';
import { ToasterService } from 'src/app/services/others/toaster.service';

@Component({
  selector: 'app-puestos',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.scss']
})

export class SucursalesComponent {
  tabs = 0;

  displayedColumns: string[] = [
    'index',
    'name',
    'direccion',
    'ciudad',
    'tipoSucursal',
    'actions',
  ];
  
  datos: Sucursal[] = [];
  @ViewChild('paginator') paginator: MatPaginator;
  
  dataSource = new MatTableDataSource<Sucursal>(this.datos);
  
  list = true;
  selectedId:number
  
  

  constructor(
    private renderer2: Renderer2,
    private sucursalService: SucursalService,
    private toasterService: ToasterService,
    private confirmationDialogService: DialogService
    ) {}


 
  changeTab(num: number) {
    this.tabs = num;
  }
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.sucursalService.listAllHttp({}).subscribe({
      next: (value) => {
        this.datos = value.body.result;
        this.dataSource = new MatTableDataSource<Sucursal>(this.datos);
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
  deleteSucursal(id:any){
    if(id){
      this.sucursalService.delete(id).subscribe({
        next: () => {
          this.toasterService.show({message:'Sucursal eliminada',type:ToasterEnum.SUCCESS})
          this.getAll();
        },
      
        error: () => {
          this.toasterService.showGenericErrorToast();
        },
      })
    }
  }

}
