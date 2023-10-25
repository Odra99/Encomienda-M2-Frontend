import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConceptoGasto } from 'src/app/data/model/general';
import { needConfirmation } from 'src/app/decorators/confirm-dialog.decorator';
import { ConceptoGastoService } from 'src/app/services/backend/concepto-gastos.service';
import { DialogService } from 'src/app/services/others/dialog.service';
import { ToasterService } from 'src/app/services/others/toaster.service';
import { ToasterEnum } from 'src/global/toaster-enum';

@Component({
  selector: 'app-concepto-gasto',
  templateUrl: './concepto-gasto.component.html',
  styleUrls: ['./concepto-gasto.component.scss']
})
export class ConceptoGastoComponent implements OnInit, AfterViewInit {
  tabs = 0;

  displayedColumns: string[] = [
    'index',
    'name',
    'actions',
  ];
  datos: ConceptoGasto[] = [];
  @ViewChild('paginator') paginator: MatPaginator;

  dataSource = new MatTableDataSource<ConceptoGasto>(this.datos);

  list = true;
  selectedId:number

  constructor(
    private conceptoGastoService: ConceptoGastoService,
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
    this.conceptoGastoService.listAllHttp({}).subscribe({
      next: (value) => {
        this.datos = value.body.result;
        this.dataSource = new MatTableDataSource<ConceptoGasto>(this.datos);
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
      this.conceptoGastoService.delete(id).subscribe({
        next: () => {
          this.toasterService.show({message:'Concepto eliminado',type:ToasterEnum.SUCCESS})
          this.getAll();
        },
      
        error: () => {
          this.toasterService.showGenericErrorToast();
        },
      })
    }
  }

}
