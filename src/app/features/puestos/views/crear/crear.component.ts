import { Component, EventEmitter, Output,ViewChild ,SimpleChanges, Input} from '@angular/core';
import { Puesto } from 'src/app/data/model/general';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { PuestoService } from 'src/app/services/backend/puesto.service';
import { ToasterEnum } from 'src/global/toaster-enum';
import { ToasterService } from 'src/app/services/others/toaster.service';
@Component({
  selector: 'app-crear-puesto',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})

export class CrearPuestoComponent {

  constructor(
    private toasterService: ToasterService,
    private puestoService: PuestoService
  ) {}


  @Output() finishEvent = new EventEmitter<any>();
  @ViewChild('puestoForm', { read: NgForm }) form!: NgForm;
  puesto: Puesto = new Puesto();
  list = true;
  @Input() puestoId : number;

  nombre = new FormControl<string | null>(null, Validators.required);
  ngOnInit(): void {
    if(this.puestoId){
      this.puestoService.get(this.puestoId).subscribe({
        next:(value)=> {
          this.puesto = value.result
        },error:()=> {
          this.toasterService.showGenericErrorToast();
        },
      })
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["puestoId"] ){
      this.puestoService.get(changes["puestoId"].currentValue).subscribe({
        next:(value)=> {
          this.puesto = value.result
        },error:()=> {
          this.toasterService.showGenericErrorToast();
        },
      })
    }
  }

  save() {
    this.form.form.markAllAsTouched();
   
    this.puestoService.save(this.puesto).subscribe({
      next: () => {
        if(!this.puesto){
          this.toasterService.show({
            message: 'Puesto creado con exito',
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
        console.log("error")
        this.toasterService.showGenericErrorToast();
      },
    });
  }
  finish(){
    this.finishEvent.emit();
  }

}