// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { DialogService } from './app/services/others/dialog.service';
import { inject } from '@angular/core';

export function initializeDialogService() {
  return () => {
    inject(DialogService)
  };
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
