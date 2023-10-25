import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ToasterEnum } from 'src/global/toaster-enum';
import { ToasterService } from './toaster.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  private preventMultiCalls$ = new Subject();

  constructor(private router: Router, private toaster: ToasterService) {
    this.logoutMultiCall();
  }
  clearToken() {
    localStorage.clear();
  }

  isAuthenticated(): boolean {
    const authToken = localStorage.getItem('auth_token');
    if (!authToken !== undefined && authToken !== null) {
      const helper = new JwtHelperService();
      if (helper.isTokenExpired(authToken)) {
        localStorage.clear();
        return false;
      }
      return true;
    }
    return false;
  }


  logout() {
    this.preventMultiCalls$.next(new Date());
  }

  logoutWithMessage(message: string, header: string) {
    this.toaster.show({ message: message, header: header, type: ToasterEnum.ERROR });
    this.logout();
  }

  logoutMultiCall() {
    this.preventMultiCalls$
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe({
        next: () => {
          this.clearToken();
          this.router.navigate(['/authentication/login']);
        },
      });
  }

  getMyRole() {
    let authToken = localStorage.getItem('auth_token') + '';
    try {
      let dataToken: any = jwt_decode(authToken);
      return dataToken.rol;
    } catch (error) {
      return undefined;
    }
  }

  getMyEmail() {
    let authToken = localStorage.getItem('auth_token') + '';
    try {
      let dataToken: any = jwt_decode(authToken);
      return dataToken.sub;
    } catch (error) {
      return undefined;
    }
  }
}
