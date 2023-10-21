import { Component, Renderer2,  ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.scss']
})
export class VehiculosComponent {
  constructor(private renderer2: Renderer2) {}


  @ViewChild("astxt1") txt1!: ElementRef;
  @ViewChild("astxt2") txt2!: ElementRef;
  @ViewChild("astxt3") txt3!: ElementRef;

  @ViewChild("li0") li0!: ElementRef;
  @ViewChild("li1") li1!: ElementRef;
  @ViewChild("li2") li2!: ElementRef;
 
  
  tabs( panelIndex:number): void{
    const astxt0=this.txt1.nativeElement;
    const astxt2=this.txt2.nativeElement;
    const astxt3=this.txt3.nativeElement;

    const asli0=this.li0.nativeElement;
    const asli1=this.li1.nativeElement;
    const asli2=this.li2.nativeElement;

    this.renderer2.removeClass(asli0,'active');
    this.renderer2.removeClass(asli1,'active');
    this.renderer2.removeClass(asli2,'active');

    
    if(panelIndex==0){
      this.renderer2.addClass(asli0,'active');
      this.renderer2.setStyle(astxt0,'display', 'block');
      this.renderer2.setStyle(astxt2,'display', 'none');
      this.renderer2.setStyle(astxt3,'display', 'none');
    }else if(panelIndex==1){

      this.renderer2.addClass(asli1,'active');
      this.renderer2.setStyle(astxt0,'display', 'none');
      this.renderer2.setStyle(astxt2,'display', 'block');
      this.renderer2.setStyle(astxt3,'display', 'none');
    }else{

      this.renderer2.addClass(asli2,'active');
      this.renderer2.setStyle(astxt0,'display', 'none');
      this.renderer2.setStyle(astxt2,'display', 'none');
      this.renderer2.setStyle(astxt3,'display', 'block');
    }
  }

  
}
