import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { Ciudad } from 'src/app/data/model/general';
import { CiudadService } from 'src/app/services/backend/ciudad.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { ToasterEnum } from 'src/global/toaster-enum';

@Component({
  selector: 'app-city-form',
  templateUrl: './city-form.component.html',
  styleUrls: ['./city-form.component.scss'],
})
export class CityFormComponent implements OnInit,OnChanges {
  constructor(
    private toasterService: ToasterService,
    private ciudadService: CiudadService
  ) {}

  ciudad: Ciudad = new Ciudad();
  @Input() ciudadId : number;
  @Output() finishEvent = new EventEmitter<any>();

  departamento = new FormControl<string | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);

  @ViewChild('cityForm', { read: NgForm }) form!: NgForm;
  ngOnInit(): void {
    if(this.ciudadId){
      this.ciudadService.get(this.ciudadId).subscribe({
        next:(value)=> {
          this.ciudad = value.result
        },error:()=> {
          this.toasterService.showGenericErrorToast();
        },
      })
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["ciudadId"] ){
      this.ciudadService.get(changes["ciudadId"].currentValue).subscribe({
        next:(value)=> {
          this.ciudad = value.result
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
    this.ciudadService.save(this.ciudad).subscribe({
      next: () => {
        if(!this.ciudadId){
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
