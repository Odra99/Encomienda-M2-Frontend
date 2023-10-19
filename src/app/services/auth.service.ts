import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  headers: any;
  constructor(private http: HttpClient) {
    this.headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    };
  }

  //login simulation
  login(credentials: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(
      `${environment.encomiendaBackendUrl}/login`,
      credentials,
      { headers: this.headers }
    );
  }
}
