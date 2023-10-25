import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { CurrentUserService } from 'src/app/services/others/current-user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardOutsideService {
  constructor(
    private router: Router,
    private currentUserService: CurrentUserService
  ) {}

  canActivate(next: ActivatedRouteSnapshot): boolean {
    if (!this.currentUserService.isAuthenticated()) {
      this.currentUserService.logout();
    }else{
      this.router.navigate(['/dashboard']);
    }
    return true;
  }
}
