import { Component, ViewChild, ElementRef, Renderer2,SimpleChanges,
  Output, Input,  EventEmitter} from '@angular/core';
  import { Sucursal,Paquete } from 'src/app/data/model/general';
  import { FormControl, NgForm, Validators } from '@angular/forms';
  import { PaqueteService } from 'src/app/services/backend/paquete.service';
  import { ToasterService } from 'src/app/services/others/toaster.service';
  import { ToasterEnum } from 'src/global/toaster-enum';
  import { CiudadService } from 'src/app/services/backend/ciudad.service';
import { SucursalService } from 'src/app/services/backend/sucursal.service';


@Component({
  selector: 'app-rastreo',
  templateUrl: './tarificador.component.html',
  styleUrls: [
    '../enter-package/enter-package.component.scss',
    '../tarificador/tarificador.component.scss'
  ]
})

export class RastreoComponent {

  constructor(
    private renderer2: Renderer2,
    private toasterService: ToasterService,
    private sucursalService:SucursalService,
    private paqueteService:PaqueteService,
    ) { }
  @Output() finishEvent = new EventEmitter<any>();
  @ViewChild('paqueteForm', { read: NgForm }) form!: NgForm;
  @Input() paqueteId: number;
  @Input() paquete: Paquete;
  sucursalesSelect: Array<Sucursal>= new Array<Sucursal>;
  list = true;



  @ViewChild("f1") form1!: ElementRef;
  @ViewChild("f2") form2!: ElementRef;
  @ViewChild("f3") form3!: ElementRef;

  @ViewChild("fb1") formS1!: ElementRef;
  @ViewChild("fb2") formS2!: ElementRef;
  @ViewChild("fb3") formS3!: ElementRef;
  @ViewChild("btnSigueinte") btn1!: ElementRef;
  @ViewChild("regresoBtn") btn2!: ElementRef;
  
  @ViewChild("calcular") btnCalc!: ElementRef;
  @ViewChild("divPrecioEst") precEstDiv!: ElementRef;
  @ViewChild("divTiempoEst") precTiempoEstDiv!: ElementRef;

  calularPrecio(){

    const btnc2 = this.btn2.nativeElement;
    const divPrecioEst = this.precEstDiv.nativeElement;
    const divTiempoEst = this.precTiempoEstDiv.nativeElement;

    this.renderer2.setStyle(divPrecioEst, 'display', 'flex');
    this.renderer2.setStyle(divTiempoEst, 'display', 'flex');
    btnc2.classList.remove('active')
  }

  cambiar(): void {
    this.paquete.volumen=this.paquete.alto*this.paquete.ancho*this.paquete.largo ;
    if(this.paquete.ciudadDestinoObject!=null){
      this.paquete.ciudadDestino=this.paquete.ciudadDestinoObject.nombre;
      this.paquete.idCiudadDestino=this.paquete.ciudadDestinoObject.id;
      this.paquete.ciudadInicio=this.paquete.ciudadInicioObject.nombre;
      this.paquete.idCiudadInicio=this.paquete.ciudadInicioObject.id;
    }
        const formC1 = this.form1.nativeElement;
    const formC2 = this.form2.nativeElement;
    const formC3 = this.form3.nativeElement;

    const formCS1 = this.formS1.nativeElement;
    const formCS2 = this.formS2.nativeElement;
    const formCS3 = this.formS3.nativeElement;


    const btnc1 = this.btn1.nativeElement;
    const btnc2 = this.btn2.nativeElement;


    // this.renderer2.removeClass(asli0,'active');

    if (formC1.className == 'formbold-step-menu1 active') {
      
      formC1.classList.remove('active')
      formC2.classList.add('active')

      formCS1.classList.remove('active')
      formCS2.classList.add('active')

      btnc2.classList.add('active')
      btnc2.addEventListener("click", function (event: Event) {
        if (formC2.className == 'formbold-step-menu2 active') {
          event.preventDefault();

          formC1.classList.add('active');
          formC2.classList.remove('active');

          formCS1.classList.add('active');
          formCS2.classList.remove('active');

        } else if (formC3.className == 'formbold-step-menu3 active') {
          event.preventDefault();
          formC2.classList.add('active');
          formC3.classList.remove('active');

          formCS2.classList.add('active');
          formCS3.classList.remove('active');

          btnc1.style.display='flex';
          btnc1.textContent = 'Siguiente'
        }
      })

    } else if (formC2.className == 'formbold-step-menu2 active') {
      event?.preventDefault();

      formC2.classList.remove('active')
      formC3.classList.add('active')

      formCS2.classList.remove('active')
      formCS3.classList.add('active')

      // formCS3.add('active')
      //btnc1.textContent = 'Calcular'
      this.renderer2.setStyle(btnc1, 'display', 'none');
      //btnc1.classList.remove('active');

    } else if (formC3.className == 'formbold-step-menu3 active') {
      //document.querySelector('form').submit()

      console.log('calculando precio');
    }
  }

  ngOnInit(): void {
        if (this.paqueteId) {
          this.paqueteService.get(this.paqueteId).subscribe({
        next: (value) => {
          this.paquete = value.result
        }, error: () => {
          this.toasterService.showGenericErrorToast();
        },
      })
    }
    this.llenarDatosSucursal();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["paqueteId"]) {
      this.paqueteService.get(changes["paqueteId"].currentValue).subscribe({
        next: (value) => {
          this.paquete = value.result
        }, error: () => {
          this.toasterService.showGenericErrorToast();
        },
      })
    }
  }

  save() {
    this.form.form.markAllAsTouched();
    /*
    if (!this.form.form.valid) {
      return;
    }*/
    this.paqueteService.save(this.paquete).subscribe({
      next: () => {
        if (!this.paquete) {
          this.toasterService.show({
            message: 'Sucursal creada con exito',
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
  }

  llenarDatosSucursal(): void {
    this.sucursalService.listAllHttp({}).subscribe({
      next: (value) => {
        this.sucursalesSelect=value.body.result;
        console.log(this.sucursalesSelect);
      },
      error: () => {
        this.toasterService.showGenericErrorToast();
      },
    });
  }

  asignarNombreSucursalDestino(nombre:string):void{
    console.log(nombre);
    this.paquete.ciudadDestino=nombre;
  }
  asignarNombreSucursalOrigen(nombre:string):void{
    console.log(nombre);
    this.paquete.ciudadInicio=nombre;
  }
/*
  llenarTipoSucursal():void {
    this.tipoSucursalService.listAllHttp({}).subscribe({
      next: (value) => {
        this.tipoSucursal=value.body.result;
      },
      error: () => {
        this.toasterService.showGenericErrorToast();
      },
    });
  }
*/
}

