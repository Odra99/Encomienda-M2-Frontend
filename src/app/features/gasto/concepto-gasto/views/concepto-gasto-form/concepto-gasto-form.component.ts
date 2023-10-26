import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { ConceptoGasto } from 'src/app/data/model/general';
import { ConceptoGastoService } from 'src/app/services/backend/concepto-gastos.service';
import { ToasterService } from 'src/app/services/others/toaster.service';
import { ToasterEnum } from 'src/global/toaster-enum';

@Component({
  selector: 'app-concepto-gasto-form',
  templateUrl: './concepto-gasto-form.component.html',
  styleUrls: ['./concepto-gasto-form.component.scss']
})
export class ConceptoGastoFormComponent implements OnInit,OnChanges {
  constructor(
    private toasterService: ToasterService,
    private conceptoGastoService: ConceptoGastoService
  ) {}

  conceptoGasto: ConceptoGasto = new ConceptoGasto();
  @Input() conceptoId : number;
  @Output() finishEvent = new EventEmitter<any>();

  departamento = new FormControl<string | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);

  @ViewChild('conceptoForm', { read: NgForm }) form!: NgForm;
  ngOnInit(): void {
    if(this.conceptoId){
      this.conceptoGastoService.get(this.conceptoId).subscribe({
        next:(value)=> {
          this.conceptoGasto = value.result
        },error:()=> {
          this.toasterService.showGenericErrorToast();
        },
      })
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["conceptoId"] ){
      this.conceptoGastoService.get(changes["conceptoId"].currentValue).subscribe({
        next:(value)=> {
          this.conceptoGasto = value.result
        },error:()=> {
          this.toasterService.showGenericErrorToast();
        },
      })
    }
  }

  save() {
    this.form.form.markAllAsTouched();
    if (!this.form.form.valid) {
      return;
    }
    this.conceptoGastoService.save(this.conceptoGasto).subscribe({
      next: () => {
        if(!this.conceptoId){
          this.toasterService.show({
            message: 'Ciudad creada con exito',
            type: ToasterEnum.SUCCESS,
          });
        }else{
          this.toasterService.show({
            message: 'Cambios realizados con exito',
            type: ToasterEnum.SUCCESS,
          });
        }
        this.finish();
      },error:()=> {
        this.toasterService.showGenericErrorToast();
      },
    });
  }

  finish(){
    this.finishEvent.emit();
  }

}
