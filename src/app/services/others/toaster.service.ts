import { Injectable } from '@angular/core';
import { ToasterEnum } from 'src/global/toaster-enum';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  toasts: any[] = [];

  show(options: { type: ToasterEnum, message: string, header?: string, params?: { [key: string]: string } }) {
    const { borderClass, textClass, header } = this.getToastConfig(options.type);
    this.toasts.push({ ...options, borderClass, textClass, header: options.header || header });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }

  private getToastConfig(type: ToasterEnum): { borderClass: string, textClass: string, header: string } {
    switch (type) {
      case ToasterEnum.INFO:
        return { borderClass: 'border-primary', textClass: 'text-primary', header: 'Información' };
      case ToasterEnum.SUCCESS:
        return { borderClass: 'border-success', textClass: 'text-success', header: 'Éxito' };
      case ToasterEnum.ERROR:
        return { borderClass: 'border-danger', textClass: 'text-danger', header: 'Error' };
      case ToasterEnum.WARNING:
        return { borderClass: 'border-warning', textClass: 'text-warning', header: 'Advertencia' };
    }

    return { borderClass: '', textClass: '', header: '' };
  }

  showGenericErrorToast(){
    this.show({message:'Ha ocurrido un error, intente mas tarde',type:ToasterEnum.ERROR})
  }
}
