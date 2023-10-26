import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/data/model/general';
import { environment } from 'src/environment/environment';

const baseUrl = environment.encomiendaBackendUrl + 'usuario';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}


  listAllHttp(queryParams: any): Observable<HttpResponse<any>> {
    const params = this.getQueryParams(queryParams);
    return this.http.get<HttpResponse<any>>(baseUrl, {
      params: params,
      observe: 'response',
    });
  }

  
  save(entity: Usuario): Observable<any> {
    if (entity.id) {
      return this.http.patch<any>(`${baseUrl}/${entity.id}`, entity);
    }
    return this.http.post<any>(`${baseUrl}`, entity);
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<HttpResponse<any>>(`${baseUrl}/${id}`);
  }


  get(id: number): Observable<any> {
    return this.http.get<any>(`${baseUrl}/${id}`);
  }

  private getQueryParams(queryParams: any): HttpParams {
    let params = new HttpParams();
    if (queryParams['page'] !== undefined)
      params = params.append('page', queryParams['page']);
    if (queryParams['max'] !== undefined)
      params = params.append('max', queryParams['max']);
    if (queryParams['asc'] !== undefined)
      params = params.append('asc', queryParams['asc']);
    if (queryParams['columnOrder'] !== undefined)
      params = params.append('columnOrder', queryParams['columnOrder']);
    if (queryParams['myConnections'] !== undefined)
      params = params.append('myConnections', queryParams['myConnections']);
    if (queryParams['status'] !== undefined)
      params = params.append('status', queryParams['status']);
    return params;
  }
}