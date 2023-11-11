
import { Component, ViewChild, ElementRef,Renderer2,OnInit, AfterViewInit  } from '@angular/core';
import { needConfirmation } from 'src/app/decorators/confirm-dialog.decorator';
import { Paquete } from 'src/app/data/model/general';
import { PaqueteService } from 'src/app/services/backend/paquete.service';
import { ToasterEnum } from 'src/global/toaster-enum';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToasterService } from 'src/app/services/others/toaster.service';
import { DialogService } from 'src/app/services/others/dialog.service';
import { PermissionTypeEnum } from 'src/global/permissions';


@Component({
  selector: 'app-search-paqueteria',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent {
  displayedColumns: string[] = [
    'id',
    'peso',
    'origen',
    'destino',
    'emisor',
    'receptor',
    'actions'
  ];

  datos: Paquete[] = [];
  @ViewChild('paginator') paginator: MatPaginator;

  dataSource = new MatTableDataSource<Paquete>(this.datos);

  list = true;
  selectedId:number

  permissionTypes=PermissionTypeEnum

  constructor(private renderer2: Renderer2,
    private paqueteService: PaqueteService,
    private toasterService: ToasterService,
    private confirmationDialogService: DialogService
    ) {}

    ngOnInit(): void {
      this.getAll();
    }
  
    getAll() {
      this.paqueteService.listAllHttp({}).subscribe({
        next: (value) => {
          this.datos = value.body.result;
          this.dataSource = new MatTableDataSource<Paquete>(this.datos);
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
  
 
  
    @needConfirmation()
    deletePuesto(id:any){
      console.log("hello");
      if(id){
        this.paqueteService.delete(id).subscribe({
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