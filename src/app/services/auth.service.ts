import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, mergeMap, of } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  headers: any;
  constructor(private http: HttpClient) {}

  //login simulation
  login(credentials: any): void {
    this.http
      .post<any>(`${environment.encomiendaBackendUrl}/login`, credentials, {
        headers: this.headers,
      })
      .pipe(
        mergeMap((token) => {
          this.storeToken(token.authc);
          return of('');
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem('nibelungo');
  }

  storeToken(token: string): void {
    if (token.startsWith('Bearer ')) {
      token = token.substring('Bearer '.length);
    }
    localStorage.setItem('auth_token', token);
  }
}
