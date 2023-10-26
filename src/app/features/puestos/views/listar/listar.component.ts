import { Component, ViewChild,OnInit, AfterViewInit } from '@angular/core';
import { Puesto } from 'src/app/data/model/general';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PuestoService } from 'src/app/services/backend/puesto.service';

import { ToasterEnum } from 'src/global/toaster-enum';
import { ToasterService } from 'src/app/services/others/toaster.service';
@Component({
  selector: 'app-listar-puestos',
  templateUrl: './listar.component.html',
  styleUrls: ['../crear/crear.component.scss']
})

export class ListarPuestoComponent implements OnInit, AfterViewInit  {


  displayedColumns: string[] = [
    'index',
    'name',
    'pay',
    'description',
    'actions',
  ];
  
  tabs = 0;
  datos: Puesto[] = [];
  @ViewChild('paginator') paginator: MatPaginator;

  dataSource = new MatTableDataSource<Puesto>(this.datos);

  list = true;
  selectedId:number

  constructor(
    private puestoService: PuestoService,
    private toasterService: ToasterService
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
    this.puestoService.listAllHttp({}).subscribe({
      next: (value) => {
        this.datos = value.body.result;
        this.dataSource = new MatTableDataSource<Puesto>(this.datos);
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

  deleteCiudad(id:any){
    console.log("hello");
    if(id){
      this.puestoService.delete(id).subscribe({
        next: () => {
          this.toasterService.show({message:'Puesto eliminado',type:ToasterEnum.SUCCESS})
          this.getAll();
        },
      
        error: () => {
          this.toasterService.showGenericErrorToast();
        },
      })
    }
  }
}
