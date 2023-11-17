import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/data/model/general';
import { environment } from 'src/environment/environment';
import { PredectiveModuleService } from '../others/predictive-module.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.encomiendaBackendUrl + 'usuario';
  constructor(private http: HttpClient,
    private predectibleModule: PredectiveModuleService) {}


  listAllHttp(queryParams: any): Observable<HttpResponse<any>> {
    this.getUrl();
    const params = this.getQueryParams(queryParams);
    return this.http.get<HttpResponse<any>>(this.baseUrl, {
      params: params,
      observe: 'response',
    });
  }

  
  save(entity: Usuario): Observable<any> {
    this.getUrl();
    if (entity.id) {
      return this.http.patch<any>(`${this.baseUrl}/${entity.id}`, entity);
    }
    return this.http.post<any>(`${this.baseUrl}`, entity);
  }

  delete(id: number): Observable<HttpResponse<any>> {
    this.getUrl();
    return this.http.delete<HttpResponse<any>>(`${this.baseUrl}/${id}`);
  }


  get(id: number): Observable<any> {
    this.getUrl();
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  private getQueryParams(queryParams: any): HttpParams {
    let params = new HttpParams();
    if (queryParams['sucursal_id'] !== undefined)
      params = params.append('sucursal_id', queryParams['sucursal_id']);
    return params;
  }



  private getUrl(){
    this.baseUrl = this.predectibleModule.getUrl() + 'usuario';
  }
}