import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Gasto, Sucursal, TipoGasto } from 'src/app/data/model/general';
import { needConfirmation } from 'src/app/decorators/confirm-dialog.decorator';
import { CiudadService } from 'src/app/services/backend/ciudad.service';
import { GastoService } from 'src/app/services/backend/gastos.service';
import { SucursalService } from 'src/app/services/backend/sucursal.service';
import { TipoService } from 'src/app/services/backend/tipos.service';
import { DialogService } from 'src/app/services/others/dialog.service';
import { ToasterService } from 'src/app/services/others/toaster.service';
import { PermissionTypeEnum } from 'src/global/permissions';
import { TipoEnum } from 'src/global/tipo-enum';
import { ToasterEnum } from 'src/global/toaster-enum';

@Component({
  selector: 'app-gasto',
  templateUrl: './gasto.component.html',
  styleUrls: ['./gasto.component.scss'],
})
export class GastoComponent implements OnInit, AfterViewInit {
  tabs = 0;

  displayedColumns: string[] = [
    'index',
    'sucursal',
    'tipo_gasto',
    'concepto_gasto',
    'monto',
    'fecha',
    'actions',
  ];
  datos: Gasto[] = [];
  @ViewChild('paginator') paginator: MatPaginator;

  dataSource = new MatTableDataSource<Gasto>(this.datos);

  list = true;
  selectedId: number;
  permissionTypes= PermissionTypeEnum;

  filtersGasto={
    sucursal_id:'',
    tipo_gasto_id:'',
    fecha:''
  }


  sucursales: Sucursal[] = [];
  tipoGastos: TipoGasto[] = [];

  constructor(
    private gastoService: GastoService,
    private toasterService: ToasterService,
    private confirmationDialogService: DialogService,
    private route: ActivatedRoute,
    private sucursalService: SucursalService,
    private tiposService: TipoService
  ) {
    let fecha = this.route.snapshot.paramMap.get('fecha')
    if(fecha){
      this.filtersGasto.fecha = fecha
    }
  }

  changeTab(num: number) {
    this.tabs = num;
    this.list = true;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getAll();
    this.getSucursales();
    this.getTipoGasto();
  }

  getAll() {
    this.gastoService.listAllHttp(this.filtersGasto).subscribe({
      next: (value) => {
        this.datos = value.body.result;
        this.dataSource = new MatTableDataSource<Gasto>(this.datos);
        this.dataSource.paginator = this.paginator;
      },
      error: () => {
        this.toasterService.showGenericErrorToast();
      },
    });
  }


  getSucursales() {
    this.sucursalService.listAllHttp({}).subscribe({
      next: (value) => {
        this.sucursales = value.body.result;
      },
      error: () => {
        this.toasterService.showGenericErrorToast();
      },
    });
  }

  getTipoGasto() {
    this.tiposService.listAllHttp(TipoEnum.T_GASTO, {}).subscribe({
      next: (value) => {
        this.tipoGastos = value.body.result;
      },
      error: () => {
        this.toasterService.showGenericErrorToast();
      },
    });
  }

  edit(id: number) {
    this.selectedId = id;
    this.list = false;
  }

  setListView() {
    this.getAll();
    this.tabs = 0;
    this.list = true;
  }

  @needConfirmation()
  deleteCiudad(id: any) {
    if (id) {
      this.gastoService.delete(id).subscribe({
        next: () => {
          this.toasterService.show({
            message: 'Gasto eliminado',
            type: ToasterEnum.SUCCESS,
          });
          this.getAll();
        },

        error: () => {
          this.toasterService.showGenericErrorToast();
        },
      });
    }
  }

  formatDate(date: string) {
    return moment(date).format('MM/YYYY');
  }

  date = new FormControl(moment());

  setMonthAndYear(
    normalizedMonthAndYear: moment.Moment,
    datepicker: MatDatepicker<moment.Moment>
  ) {
    const ctrlValue = this.date.value!;
    if (ctrlValue) {
      ctrlValue.month(normalizedMonthAndYear.month());
      ctrlValue.year(normalizedMonthAndYear.year());
      this.filtersGasto.fecha = normalizedMonthAndYear.format();
      this.getAll()
      this.date.setValue(ctrlValue);
      datepicker.close();
    }
  }
}
