import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gasto } from 'src/app/data/model/general';
import { environment } from 'src/environment/environment';
import { PredectiveModuleService } from '../others/predictive-module.service';

@Injectable({
  providedIn: 'root',
})
export class GastoService {
  baseUrl = environment.encomiendaBackendUrl + 'gasto';
  constructor(
    private http: HttpClient,
    private predectibleModule: PredectiveModuleService
  ) {
  }

  save(entity: Gasto): Observable<any> {
    this.getUrl();
    if (entity.id) {
      return this.http.patch<any>(`${this.baseUrl}/${entity.id}`, entity);
    }
    return this.http.post<any>(`${this.baseUrl}`, entity);
  }

  get(id: number): Observable<any> {
    this.getUrl();
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  delete(id: number): Observable<HttpResponse<any>> {
    this.getUrl()
    return this.http.delete<HttpResponse<any>>(`${this.baseUrl}/${id}`);
  }

  listAllHttp(queryParams: any): Observable<HttpResponse<any>> {
    this.getUrl();
    const params = this.getQueryParams(queryParams);
    return this.http.get<HttpResponse<any>>(this.baseUrl, {
      params: params,
      observe: 'response',
    });
  }

  private getQueryParams(queryParams: any): HttpParams {
    let params = new HttpParams();
    if (
      queryParams['sucursal_id'] !== undefined &&
      queryParams['sucursal_id'] != ''
    )
      params = params.append('sucursal_id', queryParams['sucursal_id']);
    if (
      queryParams['tipo_gasto_id'] !== undefined &&
      queryParams['tipo_gasto_id'] != ''
    )
      params = params.append('tipo_gasto_id', queryParams['tipo_gasto_id']);
    if (queryParams['fecha'] !== undefined && queryParams['fecha'] != '')
      params = params.append('fecha', queryParams['fecha']);
    return params;
  }

  getUrl(){
    this.baseUrl = this.predectibleModule.getUrl() + 'gasto';
  }
}
