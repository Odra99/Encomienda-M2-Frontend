import { Component, ViewChild,OnInit, AfterViewInit } from '@angular/core';
import { Usuario } from 'src/app/data/model/general';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SucursalService } from 'src/app/services/backend/sucursal.service';
import { ToasterEnum } from 'src/global/toaster-enum';
import { ToasterService } from 'src/app/services/toaster.service';
@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar.component.html',
  styleUrls: ['../crear/crear.component.scss']
})

export class ListarUsuariosComponent implements OnInit, AfterViewInit  {


  displayedColumns: string[] = [
    'index',
    'name',
    'department',
    'description',
    'actions',
  ];
  datos: Usuario[] = [];
  @ViewChild('paginator') paginator: MatPaginator;

  dataSource = new MatTableDataSource<Usuario>(this.datos);

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
        this.dataSource = new MatTableDataSource<Usuario>(this.datos);
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

  deleteUsuario(id:any){
    if(id){
      this.sucursalService.delete(id).subscribe({
        next: () => {
          this.toasterService.show({message:'Usuario eliminado',type:ToasterEnum.SUCCESS})
          this.getAll();
        },
      
        error: () => {
          this.toasterService.showGenericErrorToast();
        },
      })
    }
  }
}
