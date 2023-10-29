import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Segmento } from 'src/app/data/model/general';
import { needConfirmation } from 'src/app/decorators/confirm-dialog.decorator';
import { SegmentoService } from 'src/app/services/backend/segmento.service';
import { DialogService } from 'src/app/services/others/dialog.service';
import { ToasterService } from 'src/app/services/others/toaster.service';
import { PermissionTypeEnum } from 'src/global/permissions';
import { ToasterEnum } from 'src/global/toaster-enum';

@Component({
  selector: 'app-segmento',
  templateUrl: './segmento.component.html',
  styleUrls: ['./segmento.component.scss']
})
export class SegmentoComponent implements OnInit, AfterViewInit {
  tabs = 0;

  displayedColumns: string[] = [
    'index',
    'sucursal_origen',
    'sucursal_destino',
    'distancia',
    'description',
    'actions',
  ];
  datos: Segmento[] = [];
  @ViewChild('paginator') paginator: MatPaginator;

  dataSource = new MatTableDataSource<Segmento>(this.datos);

  list = true;
  selectedId:number

  permissionTypes=PermissionTypeEnum

  constructor(
    private segmentoService: SegmentoService,
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
    this.segmentoService.listAllHttp({}).subscribe({
      next: (value) => {
        this.datos = value.body.result;
        this.dataSource = new MatTableDataSource<Segmento>(this.datos);
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
      this.segmentoService.delete(id).subscribe({
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

}
