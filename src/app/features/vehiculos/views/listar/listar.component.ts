import { Component, ViewChild,OnInit, AfterViewInit } from '@angular/core';
import { Vehiculo } from 'src/app/data/model/general';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { VehiculoService } from 'src/app/services/backend/vehiculo.service';
import { ToasterEnum } from 'src/global/toaster-enum';
import { ToasterService } from 'src/app/services/others/toaster.service';
@Component({
  selector: 'app-listar-vehiculos',
  templateUrl: './listar.component.html',
  styleUrls: ['../crear/crear.component.scss']
})

export class ListarVehiculosComponent implements OnInit, AfterViewInit  {


  displayedColumns: string[] = [
    'index',
    'name',
    'department',
    'description',
    'actions',
  ];
  datos: Vehiculo[] = [];
  @ViewChild('paginator') paginator: MatPaginator;

  dataSource = new MatTableDataSource<Vehiculo>(this.datos);

  list = true;
  selectedId:number

  constructor(
    private vehiculoService: VehiculoService,
    private toasterService: ToasterService
  ) {}

 
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
      this.vehiculoService.delete(id).subscribe({
        next: () => {
          this.toasterService.show({message:'Vehuculo eliminado',type:ToasterEnum.SUCCESS})
          this.getAll();
        },
      
        error: () => {
          this.toasterService.showGenericErrorToast();
        },
      })
    }
  }
}
