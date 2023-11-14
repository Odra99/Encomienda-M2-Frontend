import { Injectable, Renderer2, RendererFactory2 } from "@angular/core";

// Usamos el decorator que le indica a Angular que esta clase podrá ser injectada en cualquier parte del proyecto
@Injectable()
// Creamos la clase para nuestro servicio
export class PredectiveModuleService {


    private renderer:Renderer2;

    constructor(rendererFactory:RendererFactory2){
        this.renderer = rendererFactory.createRenderer(null,null)
    }
  
    private url = 'http://localhost:8000/api/v1/'
    private colorTheme:string;

    public enterPredectiveModule(){
        this.url = 'http://localhost:8000/api/v1/test'
    }

    public exitPredectiveModule(){
        this.url = 'http://localhost:8000/api/v1/'
    }

    public getUlr(){
        return this.url
    }

    private setColorTheme(theme:string){
        this.colorTheme = theme
    }

}