import {
  Component, ViewChild, ElementRef, Renderer2, SimpleChanges,
  Output, Input, EventEmitter
} from '@angular/core';
import { Sucursal, Paquete, Cotizacion } from 'src/app/data/model/general';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { PaqueteService } from 'src/app/services/backend/paquete.service';
import { ToasterService } from 'src/app/services/others/toaster.service';
import { ToasterEnum } from 'src/global/toaster-enum';
import { CiudadService } from 'src/app/services/backend/ciudad.service';
import { SucursalService } from 'src/app/services/backend/sucursal.service';
import { E } from '@angular/cdk/keycodes';

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
    private sucursalService: SucursalService,
    private paqueteService: PaqueteService,
  ) { }
  @Output() finishEvent = new EventEmitter<any>();

  @ViewChild('paqueteForm', { read: NgForm }) form!: NgForm;

  paquete: Paquete = new Paquete();

  //tipo de cotizaciones: 0=distancia. 1= costo
  tipoCotizacion=1;

  cotizaciones: Array<Cotizacion> = new Array<Cotizacion>;
  //cotizacionSalidas: Cotizacion = new Cotizacion();
  cotizacionDistancia:Cotizacion = new Cotizacion();
  cotizacionCosto :Cotizacion = new Cotizacion();

  sucursalesSelect: Array<Sucursal> = new Array<Sucursal>;
  sucursalOrigen: Sucursal = new Sucursal();
  sucursalDestino: Sucursal = new Sucursal();
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
  @ViewChild("divDistancia") distDiv!: ElementRef;

  calularPrecio() {
    const btnc2 = this.btn2.nativeElement;
    const divPrecioEst = this.precEstDiv.nativeElement;
    const divTiempoEst = this.precTiempoEstDiv.nativeElement;
    const distDiv = this.distDiv.nativeElement;

    this.cotizacionDistancia= this.cotizaciones[0];
    this.cotizacionCosto= this.cotizaciones[1];
  
    if(this.tipoCotizacion=1){
      this.paquete.precio=this.cotizacionCosto.costo_total;
      this.paquete.distanciaRecorrida=this.cotizacionDistancia.distancia_total;
      this.paquete.campo='distancia';
    }else if(this.tipoCotizacion=0){
      this.paquete.precio=this.cotizacionDistancia.costo_total;
      this.paquete.distanciaRecorrida=this.cotizacionDistancia.distancia_total;
      this.paquete.campo='costo_lb';

    }
    this.paqueteService.setPaquete(this.paquete);

    this.renderer2.setStyle(divPrecioEst, 'display', 'flex');
    this.renderer2.setStyle(divTiempoEst, 'display', 'flex');
    this.renderer2.setStyle(distDiv, 'display', 'flex');
    btnc2.classList.remove('active')

  }

  cambiar(): void {
    this.paquete.volumen = this.paquete.alto * this.paquete.ancho * this.paquete.largo;

    this.buscarNombreSucursal(this.paquete.sucursal_origen_id, 0);
    this.buscarNombreSucursal(this.paquete.sucursal_destino_id, 1);

    const formC1 = this.form1.nativeElement;
    const formC2 = this.form2.nativeElement;
    const formC3 = this.form3.nativeElement;

    const formCS1 = this.formS1.nativeElement;
    const formCS2 = this.formS2.nativeElement;
    const formCS3 = this.formS3.nativeElement;

    const btnc1 = this.btn1.nativeElement;
    const btnc2 = this.btn2.nativeElement;


    // this.renderer2.removeClass(asli0,'active');
    if (this.paquete.peso && this.paquete.ancho && this.paquete.alto && this.paquete.largo) {

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

            btnc1.style.display = 'flex';
            btnc1.textContent = 'Siguiente'
          }
        })

      } else if (formC2.className == 'formbold-step-menu2 active') {
        if (this.paquete.sucursal_origen_id!=this.paquete.sucursal_destino_id) {
          event?.preventDefault();

          formC2.classList.remove('active')
          formC3.classList.add('active')

          formCS2.classList.remove('active')
          formCS3.classList.add('active')
          
          this.cotizar();
          // formCS3.add('active')
          //btnc1.textContent = 'Calcular'
          this.renderer2.setStyle(btnc1, 'display', 'none');
          //btnc1.classList.remove('active');
        }else{
          this.toasterService.show({message:'La sucursal de origen no puede ser igual a la sucursal de destino',type:ToasterEnum.ERROR})
        }
      } else if (formC3.className == 'formbold-step-menu3 active') {
        //document.querySelector('form').submit()

        
      }
    }
  }
  ngOnInit(): void {
    this.llenarSucursal();
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


  cotizar() {
    var idOrigen= Number(this.paquete.sucursal_origen_id);
    var idDestino= Number(this.paquete.sucursal_destino_id);
    this.paquete.sucursal_origen_id=idOrigen;
    this.paquete.sucursal_destino_id=idDestino;

    let paqueteCootizar:Paquete= new Paquete();

      paqueteCootizar.sucursal_origen_id =idOrigen;
      paqueteCootizar.sucursal_destino_id =idDestino;
      paqueteCootizar.peso= this.paquete.peso;
    
    /*
    if (!this.form.form.valid) {
      return;
       data => 
      {
        this.cotizaciones = data.body
        console.log(this.cotizaciones)
      }
    }*/
    this.paqueteService.cotizar(paqueteCootizar).subscribe(
      data => 
      {
        this.cotizaciones[0] = data.result[0];
        this.cotizaciones[1] = data.result[1];
      }
    );
      
  }


  llenarSucursal(): void {
    this.sucursalService.listAllHttp({}).subscribe({
      next: (value) => {
        this.sucursalesSelect = value.body.result;
        //console.log(this.sucursalesSelect)
      },
      error: () => {
        this.toasterService.showGenericErrorToast();
      },
    });
  }


  buscarNombreSucursal(id: number, tipo: number): any {
    this.sucursalesSelect.forEach((sucursal, index) => {
      if (sucursal.id == id) {
        if (tipo == 0) {
          this.paquete.sucursalOrigen = sucursal.nombre
          return sucursal;
        } else {
          this.paquete.sucursalDestino = sucursal.nombre
          return sucursal;
        }
      } else {
        return null;
      }
    });
  }
}
