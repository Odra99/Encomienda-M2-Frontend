import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-rastreo',
  templateUrl: './tarificador.component.html',
  styleUrls: [
    '../enter-package/enter-package.component.scss',
    '../tarificador/tarificador.component.scss'
  ]
})

export class RastreoComponent {

  constructor(private renderer2: Renderer2) { }

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
}