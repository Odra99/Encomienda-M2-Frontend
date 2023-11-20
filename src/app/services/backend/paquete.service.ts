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

  cargar(id:number): Observable<any> {
    return this.http.patch<any>(`${baseUrl}/cargar/${id}`, {});
  }

  update(id:number, paquete:Paquete): Observable<any> {
    return this.http.patch<any>(`${baseUrl}/${id}`, paquete);
  }
  entregar(id:number): Observable<any> {
    return this.http.patch<any>(`${baseUrl}/entregar/${id}`, {});
  }
  
  listAllHttp(queryParams: any): Observable<any> {
    const params = this.getQueryParams(queryParams);
    return this.http.get<HttpResponse<any>>(baseUrl, {
      params: params,
      observe: 'response',
    });
  }
  
  buscarPaqueteByGuia(guia: String): Observable<any>  {
    return this.http.get<any>(`${baseUrl}/buscar/${guia}`);
  }

  descargarPaqueteByGuia(guia: String): Observable<any>  {
    return this.http.get<any>(`${baseUrl}/pdf/${guia}`);
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
    if (queryParams['salida_id'] !== undefined  && queryParams['salida_id']!='')
      params = params.append('salida_id', queryParams['salida_id']);
    if (queryParams['tipo_tracking_id'] !== undefined  && queryParams['tipo_tracking_id']!='')
      params = params.append('tipo_tracking_id', queryParams['tipo_tracking_id'] );
    if (queryParams['estado_paquete_id'] !== undefined  && queryParams['estado_paquete_id']!='')
      params = params.append('estado_paquete_id', queryParams['estado_paquete_id']);
    return params;
  }


 
}
