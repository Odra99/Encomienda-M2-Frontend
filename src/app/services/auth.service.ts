import { HttpClient, HttpResponse } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  //login simulation
  login(credentials: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(
      `${environment.encomiendaBackendUrl}/login`,
      credentials
    );
  }
}
