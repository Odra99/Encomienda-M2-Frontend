
import { Component, ViewChild,OnInit, AfterViewInit ,Input} from '@angular/core';
import { Usuario } from 'src/app/data/model/general';
import { needConfirmation } from 'src/app/decorators/confirm-dialog.decorator';
import { DialogService } from 'src/app/services/others/dialog.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/backend/user.service';
import { ToasterEnum } from 'src/global/toaster-enum';
import { ToasterService } from 'src/app/services/others/toaster.service';
//import {SearchComponent} from './views/search/search.component';

@Component({
  selector: 'app-puestos',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})

export class UsuariosComponent implements OnInit, AfterViewInit{

  tabs = 0;

  displayedColumns: string[] = [
    'nombre',
    'user',
    'email',
    'horasTrabajo',
    'rol',
    'sucursal',
    'puesto',
    'actions',
  ];
  datos: Usuario[] = [];
  @ViewChild('paginator') paginator: MatPaginator;
  @Input() usuarioId : number;

  dataSource = new MatTableDataSource<Usuario>(this.datos);

  list = true;
  selectedId:number

  constructor(
    private userService: UserService,
    private toasterService: ToasterService,
    private confirmationDialogService: DialogService
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
    this.userService.listAllHttp({}).subscribe({
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

  setListView(){
    this.getAll();
    this.tabs = 0;
    this.list = true;
  }

  @needConfirmation()
  deleteUsuario(id:any){
    if(id){
      this.userService.delete(id).subscribe({
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
