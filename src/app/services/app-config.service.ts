import { Injectable } from "@angular/core";

@Injectable()
export class AppConfig {
load() {
    return new Promise((resolve, reject) => { /* tu código */ resolve(true); });
  }
}