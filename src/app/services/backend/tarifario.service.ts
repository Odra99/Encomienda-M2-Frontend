import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarifario } from 'src/app/data/model/general';
import { environment } from 'src/environment/environment';

const baseUrl = environment.encomiendaBackendUrl + 'tarifario';

@Injectable({
  providedIn: 'root',
})
export class TarifarioService {
  constructor(private http: HttpClient) {}

  save(entity: Tarifario): Observable<any> {
    if (entity.id) {
      return this.http.patch<any>(`${baseUrl}/${entity.id}`, entity);
    }
    return this.http.post<any>(`${baseUrl}`, entity);
  }

  get(id: number): Observable<any> {
    return this.http.get<any>(`${baseUrl}/${id}`);
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<HttpResponse<any>>(`${baseUrl}/${id}`);
  }

  listAllHttp(queryParams: any): Observable<HttpResponse<any>> {
    const params = this.getQueryParams(queryParams);
    return this.http.get<HttpResponse<any>>(baseUrl, {
      params: params,
      observe: 'response',
    });
  }

  private getQueryParams(queryParams: any): HttpParams {
    let params = new HttpParams();
    if (queryParams['fecha'] !== undefined)
      params = params.append('fecha', queryParams['fecha']);
    return params;
  }
}
