import {Injectable} from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import {UaService} from '../@core/data/ua.service';
import {AuthService} from '../pages/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private uaSvc: UaService, private authSvc: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authSvc.getStorageKey()) {
      return true;
    } else {
      this.authSvc.requestAuth();
    }
    return false;
  }
}
