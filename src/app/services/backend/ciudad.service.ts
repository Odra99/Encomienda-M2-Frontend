import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ciudad } from 'src/app/data/model/general';
import { environment } from 'src/environment/environment';
import { PredectiveModuleService } from '../others/predictive-module.service';

@Injectable({
  providedIn: 'root',
})
export class CiudadService {
  baseUrl = environment.encomiendaBackendUrl + 'ciudad';
  constructor(
    private http: HttpClient,
    private predectibleModule: PredectiveModuleService
  ) {}

  private getUrl() {
    this.baseUrl = this.predectibleModule.getUrl() + 'ciudad';
  }


  save(entity: Ciudad): Observable<any> {
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
    this.getUrl();
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
    return params;
  }
}
