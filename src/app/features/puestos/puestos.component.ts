import { Component, ViewChild, ElementRef,Renderer2,OnInit, AfterViewInit  } from '@angular/core';
import { needConfirmation } from 'src/app/decorators/confirm-dialog.decorator';
import { Puesto } from 'src/app/data/model/general';
import { PuestoService } from 'src/app/services/backend/puesto.service';
import { ToasterEnum } from 'src/global/toaster-enum';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToasterService } from 'src/app/services/others/toaster.service';
import { DialogService } from 'src/app/services/others/dialog.service';
import { PermissionTypeEnum } from 'src/global/permissions';

@Component({
  selector: 'app-puestos',
  templateUrl: './puestos.component.html',
  styleUrls: ['./puestos.component.scss']
})

export class PuestosComponent {
  tabs = 0;

  displayedColumns: string[] = [
    'index',
    'name',
    'pay',
    'description',
    'actions',
  ];


  datos: Puesto[] = [];
  @ViewChild('paginator') paginator: MatPaginator;

  dataSource = new MatTableDataSource<Puesto>(this.datos);

  list = true;
  selectedId:number

  permissionTypes=PermissionTypeEnum

  constructor(private renderer2: Renderer2,
    private puestoService: PuestoService,
    private toasterService: ToasterService,
    private confirmationDialogService: DialogService
    ) {}

  changeTab(num: number) {
    this.tabs = num;
    this.list = true
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
  deletePuesto(id:any){
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
