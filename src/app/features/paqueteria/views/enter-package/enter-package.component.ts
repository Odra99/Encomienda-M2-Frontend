import { Component, ViewChild, ElementRef,Renderer2, EventEmitter, Output,OnInit} from '@angular/core';
import { Paquete } from 'src/app/data/model/general';
import { PaqueteService } from 'src/app/services/backend/paquete.service';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/services/others/toaster.service';
import { ToasterEnum } from 'src/global/toaster-enum';
import {Router} from '@angular/router';
@Component({
  selector: 'app-enter-package',
  templateUrl: './enter-package.component.html',
  styleUrls: ['./enter-package.component.scss']
})

export class EnterPackageComponent  implements OnInit {
  constructor(
    private toasterService: ToasterService,
    private paqueteService: PaqueteService,
    private router:Router,
  ) { }


  ngOnInit(): void {
    this.paqueteService.paqueteEmitter.subscribe(
      data => {
        this.paqueteExterno = data;
      }
    );
  }


  @Output() finishEvent = new EventEmitter<any>();
  @ViewChild('sucursalForm', { read: NgForm }) form!: NgForm;
  paquete: Paquete = new Paquete();
  paqueteExterno: Paquete = new Paquete();



  RegistrarEnvio(): void {

    this.paqueteService.paqueteEmitter.subscribe(
      data => {
        this.paqueteExterno = data;
      }
    );

    this.paqueteExterno.remitente=this.paquete.remitente;
    this.paqueteExterno.destinatario=this.paquete.destinatario;
    this.paqueteExterno.descripcion=this.paquete.descripcion;
    this.finish();
     /*
    if (!this.form.form.valid) {
      return;
    }*/
    this.paqueteService.save(this.paqueteExterno).subscribe({
      next: () => {
        if (!this.paqueteExterno) {
          this.toasterService.show({
            message: 'Paquete creado con exito',
            type: ToasterEnum.SUCCESS,
          });
        } else {
          this.toasterService.show({
            message: 'Cambios realizados con exito',
            type: ToasterEnum.SUCCESS,
          });
        }
        this.finish();
      }, error: () => {
        this.toasterService.showGenericErrorToast();
      },
    });
  }
  finish() {
    
    this.finishEvent.emit();
    this.router.navigate(['dashboard']);
  }

}