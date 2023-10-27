import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import * as moment from 'moment';
import {
  ConceptoGasto,
  Gasto,
  Sucursal,
  TipoGasto,
} from 'src/app/data/model/general';
import { ConceptoGastoService } from 'src/app/services/backend/concepto-gastos.service';
import { GastoService } from 'src/app/services/backend/gastos.service';
import { SucursalService } from 'src/app/services/backend/sucursal.service';
import { TipoService } from 'src/app/services/backend/tipos.service';
import { ToasterService } from 'src/app/services/others/toaster.service';
import { TipoEnum } from 'src/global/tipo-enum';
import { ToasterEnum } from 'src/global/toaster-enum';

@Component({
  selector: 'app-gasto-form',
  templateUrl: './gasto-form.component.html',
  styleUrls: ['./gasto-form.component.scss'],
})
export class GastoFormComponent implements OnInit, OnChanges {
  constructor(
    private toasterService: ToasterService,
    private gastoService: GastoService,
    private sucursalService: SucursalService,
    private conceptoGastoService: ConceptoGastoService,
    private tiposService: TipoService
  ) {}

  gasto: Gasto = new Gasto();
  @Input() gastoId: number;
  @Output() finishEvent = new EventEmitter<any>();

  sucursal = new FormControl<string | null>(null, Validators.required);
  tipoGasto = new FormControl<string | null>(null, Validators.required);
  conceptoGasto = new FormControl<string | null>(null, Validators.required);

  @ViewChild('gastoForm', { read: NgForm }) form!: NgForm;

  sucursales: Sucursal[] = [];
  tipoGastos: TipoGasto[] = [];
  conceptoGastos: ConceptoGasto[] = [];

  date = new FormControl(moment());

  setMonthAndYear(
    normalizedMonthAndYear: moment.Moment,
    datepicker: MatDatepicker<moment.Moment>
  ) {
    const ctrlValue = this.date.value!;
    if (ctrlValue) {
      ctrlValue.month(normalizedMonthAndYear.month());
      ctrlValue.year(normalizedMonthAndYear.year());
      this.date.setValue(ctrlValue);
      datepicker.close();
    }
  }

  ngOnInit(): void {
    if (this.gastoId) {
      this.gastoService.get(this.gastoId).subscribe({
        next: (value) => {
          this.gasto = value.result;
        },
        error: () => {
          this.toasterService.showGenericErrorToast();
        },
      });
    }
    this.getSucursales();
    this.getConceptoGastos();
    this.getTipoGasto();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['gastoId']) {
      this.gastoService.get(changes['gastoId'].currentValue).subscribe({
        next: (value) => {
          this.gasto = value.result;
        },
        error: () => {
          this.toasterService.showGenericErrorToast();
        },
      });
    }
  }

  save() {
    this.form.form.markAllAsTouched();
    if (!this.form.form.valid) {
      return;
    }
    this.gastoService.save(this.gasto).subscribe({
      next: () => {
        if (!this.gastoId) {
          this.toasterService.show({
            message: 'Gasto creado con exito',
            type: ToasterEnum.SUCCESS,
          });
        } else {
          this.toasterService.show({
            message: 'Cambios realizados con exito',
            type: ToasterEnum.SUCCESS,
          });
        }
        this.finish();
      },
      error: () => {
        this.toasterService.showGenericErrorToast();
      },
    });
  }

  finish() {
    this.finishEvent.emit();
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

  getConceptoGastos() {
    this.conceptoGastoService.listAllHttp({}).subscribe({
      next: (value) => {
        this.conceptoGastos = value.body.result;
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
}
