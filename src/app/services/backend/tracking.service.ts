import { HttpClient, HttpParams, HttpResponse ,} from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Paquete } from 'src/app/data/model/general';
import { environment } from 'src/environment/environment';

const baseUrl = environment.encomiendaBackendUrl + 'tracking';

@Injectable({
  providedIn: 'root',
})
export class TrackingService {

  @Output()
  paqueteEmitter = new EventEmitter<Paquete>();

  paquete: Paquete;
  constructor(private http: HttpClient) {}

  save(entity: Paquete): Observable<any> {
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
    if (queryParams['salida_id'] !== undefined  && queryParams['salida_id']!='')
      params = params.append('salida_id', queryParams['salida_id']);
    if (queryParams['tipo_tracking_id'] !== undefined  && queryParams['tipo_tracking_id']!='')
      params = params.append('tipo_tracking_id', queryParams['tipo_tracking_id'] );
    if (queryParams['paquete_id'] !== undefined  && queryParams['paquete_id']!='')
      params = params.append('paquete_id', queryParams['paquete_id']);
    return params;
  }




  listAllHttpTracking(queryParams: any): Observable<HttpResponse<any>> {
    const params = this.getQueryParams(queryParams);
    return this.http.get<HttpResponse<any>>(environment.encomiendaBackendUrl+'tracking_log', {
      params: params,
      observe: 'response',
    });
  }   


 
}
