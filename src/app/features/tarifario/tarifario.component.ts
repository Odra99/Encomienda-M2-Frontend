import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { Sucursal, Tarifario } from 'src/app/data/model/general';
import { needConfirmation } from 'src/app/decorators/confirm-dialog.decorator';
import { SucursalService } from 'src/app/services/backend/sucursal.service';
import { TarifarioService } from 'src/app/services/backend/tarifario.service';
import { DialogService } from 'src/app/services/others/dialog.service';
import { ToasterService } from 'src/app/services/others/toaster.service';
import { ToasterEnum } from 'src/global/toaster-enum';

@Component({
  selector: 'app-tarifario',
  templateUrl: './tarifario.component.html',
  styleUrls: ['./tarifario.component.scss'],
})
export class TarifarioComponent implements OnInit, AfterViewInit {
  tabs = 0;

  displayedColumns: string[] = [
    'index',
    'fecha',
    'ganancia_envio',
    'costo_lb',
    'actions',
  ];

  datos: Tarifario[] = [];
  @ViewChild('paginator') paginator: MatPaginator;

  dataSource = new MatTableDataSource<Tarifario>(this.datos);


  @ViewChild('tarifarioForm', { read: NgForm }) form!: NgForm;

  list = true;
  selectedId: number;

  tarifario: Tarifario = new Tarifario();

  constructor(
    private sucursalService: SucursalService,
    private toasterService: ToasterService,
    private confirmationDialogService: DialogService,
    private tarifarioService: TarifarioService,
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
    this.tarifarioService.listAllHttp({}).subscribe({
      next: (value) => {
        this.datos = value.body.result;
        this.dataSource = new MatTableDataSource<Tarifario>(this.datos);
        this.dataSource.paginator = this.paginator;
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

  selection = new SelectionModel<Tarifario>(true, []);

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

  date = new FormControl(moment());

  setMonthAndYear(
    normalizedMonthAndYear: moment.Moment,
    datepicker: MatDatepicker<moment.Moment>
  ) {
    const ctrlValue = this.date.value!;
    if (ctrlValue) {
      ctrlValue.month(normalizedMonthAndYear.month());
      ctrlValue.year(normalizedMonthAndYear.year());
      this.tarifario.fecha = normalizedMonthAndYear.format();
      this.date.setValue(ctrlValue);
      datepicker.close();
    }
  }

  createTarifario() {
    this.form.form.markAllAsTouched();
    if (!this.form.form.valid) {
      return;
    }
    this.tarifarioService.save(this.tarifario).subscribe({
      next: () => {
        this.toasterService.show({message:"Tarifario calculado con exito",type:ToasterEnum.SUCCESS})
      },
      error: () => {
        this.toasterService.showGenericErrorToast();
      },
    });
  }
}
