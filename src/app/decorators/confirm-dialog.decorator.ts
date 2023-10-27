import { ConfirmDialogData } from "../commos/confirm-dialog-data";
import { ConfirmDialogComponent } from "../commos/confirm-dialog/confirm-dialog.component";
import { DialogService } from "../services/others/dialog.service";

const defaultConfirmData = {
    title: "Confirmacion",
    message: "¿Estas seguro de realizar esta accion?"
}


export function needConfirmation ( confirmData : ConfirmDialogData = defaultConfirmData) {
    return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any) {
            DialogService.getInstance()?.openDialog(confirmData,ConfirmDialogComponent).subscribe((validation) => {
                if (validation){
                    originalMethod.apply(this, args);
                }
              });
        };

        return descriptor;
    };

}