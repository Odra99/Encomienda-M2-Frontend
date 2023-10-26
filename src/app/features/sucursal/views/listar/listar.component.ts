import { Component, ViewChild,OnInit, AfterViewInit } from '@angular/core';
import { Sucursal } from 'src/app/data/model/general';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SucursalService } from 'src/app/services/backend/sucursal.service';
import { ToasterEnum } from 'src/global/toaster-enum';
import { ToasterService } from 'src/app/services/others/toaster.service';
@Component({
  selector: 'app-listar-sucursales',
  templateUrl: './listar.component.html',
  styleUrls: ['../crear/crear.component.scss']
})

export class ListarSucursalComponent implements OnInit, AfterViewInit  {


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
    private sucursalService: SucursalService,
    private toasterService: ToasterService
  ) {}

 
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

  deleteSucursal(id:any){
    if(id){
      this.sucursalService.delete(id).subscribe({
        next: () => {
          this.toasterService.show({message:'Departamento eliminado',type:ToasterEnum.SUCCESS})
          this.getAll();
        },
      
        error: () => {
          this.toasterService.showGenericErrorToast();
        },
      })
    }
  }
}
