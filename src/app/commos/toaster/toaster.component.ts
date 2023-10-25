import { Component } from '@angular/core';
import { ToasterService } from 'src/app/services/others/toaster.service';

@Component({
  selector: 'app-toaster',
  template: `
    <ngb-toast
      *ngFor="let toast of toastService.toasts"
      [class]="toast.borderClass"
      [autohide]="true"
      [delay]="toast.delay || 10000"
      (hidden)="close(toast)"
      style="background-color: white; border-left: 5px solid;"
      class="border-top-0 border-bottom-0 border-end-0 "
    >
      <ng-template ngbToastHeader>
        <div class=" me-auto toast-header-style" >
          <strong class="mx-1" [className]="toast.textClass">{{ toast.header }}</strong>
        </div>
      </ng-template>
      <div >
      {{toast.message }}
      </div>
    </ngb-toast>
  `,
  host: { 'class': 'toast-container position-fixed top-0 end-0 p-3 mt-5', 'style': 'z-index: 1200;' },
  styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent {
  constructor(public toastService: ToasterService) {
  }

  close(toast: any) {
    this.toastService.remove(toast);
  }
}
