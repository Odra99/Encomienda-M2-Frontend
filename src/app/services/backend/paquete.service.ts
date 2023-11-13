import { HttpClient, HttpParams, HttpResponse ,} from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Paquete } from 'src/app/data/model/general';
import { environment } from 'src/environment/environment';

const baseUrl = environment.encomiendaBackendUrl + 'paquete';

@Injectable({
  providedIn: 'root',
})
export class PaqueteService {

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
  
  cotizar(entity: Paquete): Observable<any> {
    return this.http.post<any>(`${baseUrl}/cotizar`, entity,);
  }

  listAllHttp(queryParams: any): Observable<HttpResponse<any>> {
    const params = this.getQueryParams(queryParams);
    return this.http.get<HttpResponse<any>>(baseUrl, {
      params: params,
      observe: 'response',
    });
  }

    // Cambiamos el atributo this.persona y llamamos a cambioPersona().
    setPaquete(nuevoPaquete: Paquete) {
      
      this.paquete = nuevoPaquete;
      this.cambiosPaquete();
      
    }
  
    // Emitimos los cambio de this.persona.
    cambiosPaquete() {
      console.log(this.paquete)
      console.log('cambiandoPaquet')
      this.paqueteEmitter.emit(this.paquete);
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
