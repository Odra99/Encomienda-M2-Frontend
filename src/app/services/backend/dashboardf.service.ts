import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gasto } from 'src/app/data/model/general';
import { environment } from 'src/environment/environment';
import { PredectiveModuleService } from '../others/predictive-module.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardFService {
  baseUrl = environment.encomiendaBackendUrl + 'dashboard';
  constructor(
    private http: HttpClient,
    private predectibleModule: PredectiveModuleService
  ) {
  }


  getGastoTotal(fecha: string): Observable<any> {
    this.getUrl();
    let params = new HttpParams();
    if (fecha !== undefined && fecha != '')
      params = params.append('fecha', fecha);
    return this.http.get<HttpResponse<any>>(this.baseUrl, {
      params: params,
      observe: 'response',
    });
  }



  getUrl(){
    this.baseUrl = this.predectibleModule.getUrl() + 'gasto';
  }
}