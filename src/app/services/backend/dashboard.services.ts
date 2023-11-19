import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { PredectiveModuleService } from '../others/predictive-module.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  baseUrl = environment.encomiendaBackendUrl + 'dashboard';
  constructor(
    private http: HttpClient,
    private predectibleModule: PredectiveModuleService
  ) {
  }

 
  getNumeroPaquetes(fecha: any): Observable<any> {
    const params = this.getQueryParams(fecha);
    this.getUrl();
    return this.http.get<any>(`${this.baseUrl}/numero_paquetes`, {
        params: params,
        observe: 'response',
      });
  }

  getPesoPromedio(fecha: any): Observable<any> {
    const params = this.getQueryParams(fecha);
    this.getUrl();
    return this.http.get<any>(`${this.baseUrl}/peso_promedio`, {
        params: params,
        observe: 'response',
      });
  }
  getCostoPromedio(fecha: any): Observable<any> {
    const params = this.getQueryParams(fecha);
    this.getUrl();
    return this.http.get<any>(`${this.baseUrl}/costo_promedio`, {
        params: params,
        observe: 'response',
      });
  }

  getVehiculosTotales():Observable<any>{
    this.getUrl();
    return this.http.get<any>(`${this.baseUrl}/vehiculos_tot`, {});
  }

  getSucursalesTotales(): Observable<any> {
    this.getUrl();
    return this.http.get<any>(`${this.baseUrl}/sucursales_tot`, {});
  }

  getempleadosTotales(fecha: any): Observable<any> {
    const params = this.getQueryParams(fecha);
    this.getUrl();
    return this.http.get<any>(`${this.baseUrl}/empleados_tot`, {
        params: params,
        observe: 'response',
      });
  }

  getPaquetesEstado(fecha: any): Observable<HttpResponse<any>>  {
    const params = this.getQueryParams(fecha);
    this.getUrl();
    return this.http.get<HttpResponse<any>>(`${this.baseUrl}/paquetes_estado`, {
        params: params,
        observe: 'response',
      });
  }

  getTopSucursales(fecha: any):Observable<HttpResponse<any>>  {
    const params = this.getQueryParams(fecha);
    this.getUrl();
    return this.http.get<HttpResponse<any>>(`${this.baseUrl}/top_sucursales`, {
        params: params,
        observe: 'response',
      });
  }



  private getQueryParams(queryParams: any): HttpParams {
    let params = new HttpParams();
    if (queryParams['fecha'] != undefined && queryParams['fecha'] != ''  )
      params = params.append('fecha', queryParams['fecha']);
    return params;
  }

  getUrl(){
    this.baseUrl = this.predectibleModule.getUrl() + 'dashboard';
  }
}
