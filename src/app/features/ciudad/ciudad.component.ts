import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Ciudad } from 'src/app/data/model/general';

@Component({
  selector: 'app-ciudad',
  templateUrl: './ciudad.component.html',
  styleUrls: ['./ciudad.component.scss'],
})
export class CiudadComponent implements AfterViewInit{
  tabs = 0;

  displayedColumns: string[] = ['index', 'name', 'department', 'description','actions'];
  datos: Ciudad[] = [
    {
      id: 1,
      nombre: 'ciudad',
      departamento: 'des',
      descripcion: 'asdasd',
    },{
      id: 2,
      nombre: 'ciudad',
      departamento: 'des',
      descripcion: 'asdasd',
    },{
      id: 3,
      nombre: 'ciudad',
      departamento: 'des',
      descripcion: 'asdasd',
    },{
      id: 4,
      nombre: 'ciudad',
      departamento: 'des',
      descripcion: 'asdasd',
    },{
      id: 5,
      nombre: 'ciudad',
      departamento: 'des',
      descripcion: 'asdasd',
    },{
      id: 6,
      nombre: 'ciudad',
      departamento: 'des',
      descripcion: 'asdasd',
    }  ];
  @ViewChild('paginator') paginator: MatPaginator;

  dataSource= new MatTableDataSource<Ciudad>(this.datos);
  
  changeTab(num: number) {
    this.tabs = num;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
