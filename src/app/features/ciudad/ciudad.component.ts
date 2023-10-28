import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Ciudad } from 'src/app/data/model/general';
import { needConfirmation } from 'src/app/decorators/confirm-dialog.decorator';
import { CiudadService } from 'src/app/services/backend/ciudad.service';
import { DialogService } from 'src/app/services/others/dialog.service';
import { ToasterService } from 'src/app/services/others/toaster.service';
import { PermissionTypeEnum } from 'src/global/permissions';
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

  permissionTypes = PermissionTypeEnum

  constructor(
    private ciudadService: CiudadService,
    private toasterService: ToasterService,
    private confirmationDialogService: DialogService,
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
  deleteCiudad(id:any){
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
