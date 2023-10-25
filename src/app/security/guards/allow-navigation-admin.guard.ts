import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CurrentUserService } from 'src/app/services/others/current-user.service';

@Injectable({
  providedIn: 'root',
})
export class AllowNavigationGuard {
  constructor(
    private currentUserService: CurrentUserService
  ) {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.currentUserService.isAuthenticated()) {
      this.currentUserService.logoutWithMessage(
        'Vuelve a iniciar sesión',
        'La sesión ha caducado '
      );
      return false;
    }

    return true;
  }
}
