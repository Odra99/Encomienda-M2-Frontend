import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Sucursal } from 'src/app/data/model/general';
import { needConfirmation } from 'src/app/decorators/confirm-dialog.decorator';
import { SucursalService } from 'src/app/services/backend/sucursal.service';
import { DialogService } from 'src/app/services/others/dialog.service';
import { ToasterService } from 'src/app/services/others/toaster.service';
import { ToasterEnum } from 'src/global/toaster-enum';

@Component({
  selector: 'app-tarifario',
  templateUrl: './tarifario.component.html',
  styleUrls: ['./tarifario.component.scss']
})
export class TarifarioComponent implements OnInit, AfterViewInit {
  tabs = 0;

  displayedColumns: string[] = [
    'select',
    'index',
    'name',
    'direccion',
    'ciudad',
    'tipoSucursal',
    'actions',
  ];
  
  datos: Sucursal[] = [];
  @ViewChild('paginator') paginator: MatPaginator;
  
  dataSource = new MatTableDataSource<Sucursal>(this.datos);
  
  list = true;
  selectedId:number
  
  

  constructor(
    private sucursalService: SucursalService,
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
    this.sucursalService.listAllHttp({}).subscribe({
      next: (value) => {
        this.datos = value.body.result;
        this.dataSource = new MatTableDataSource<Sucursal>(this.datos);
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

  selection = new SelectionModel<Sucursal>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }


  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  


}
