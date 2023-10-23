import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Ciudad } from 'src/app/data/model/general';
import { CiudadService } from 'src/app/services/backend/ciudad.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { ToasterEnum } from 'src/global/toaster-enum';

@Component({
  selector: 'app-ciudad',
  templateUrl: './ciudad.component.html',
  styleUrls: ['./ciudad.component.scss'],
})
export class CiudadComponent implements OnInit, AfterViewInit {
  tabs = 0;

  displayedColumns: string[] = [
    'index',
    'name',
    'department',
    'description',
    'actions',
  ];
  datos: Ciudad[] = [];
  @ViewChild('paginator') paginator: MatPaginator;

  dataSource = new MatTableDataSource<Ciudad>(this.datos);

  list = true;
  selectedId:number

  constructor(
    private ciudadService: CiudadService,
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
    this.ciudadService.listAllHttp({}).subscribe({
      next: (value) => {
        this.datos = value.body.result;
        this.dataSource = new MatTableDataSource<Ciudad>(this.datos);
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

  deleteCiudad(id:any){
    console.log("hello");
    if(id){
      this.ciudadService.delete(id).subscribe({
        next: () => {
          this.toasterService.show({message:'Ciudad eliminada',type:ToasterEnum.SUCCESS})
          this.getAll();
        },
      
        error: () => {
          this.toasterService.showGenericErrorToast();
        },
      })
    }
  }
}
