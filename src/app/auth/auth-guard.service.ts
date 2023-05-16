import { ActivatedRouteSnapshot, CanActivateChild, CanActivateChildFn, Route, Router, RouterStateSnapshot } from '@angular/router'
import { Observable, map, take } from 'rxjs';

import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Role } from './auth.enum';
import { UiService } from '../common/ui.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(protected authService: AuthService,
    protected router: Router,
    private uiService: UiService) {
  }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLogin();
  }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLogin(route);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLogin(childRoute)
  }

  protected checkLogin(route?: ActivatedRouteSnapshot):
    Observable<boolean> {
    return this.authService.authStatus$.pipe(
      map((authStatus) => {
        const roleMatch = this.checkRoleMatch(
          authStatus.userRole, route
        )
        const allowLogin = authStatus.isAuthenticated && roleMatch
        if (!allowLogin) {
          this.showAlert(authStatus.isAuthenticated, roleMatch)
          this.router.navigate(['login'], {
            queryParams: {
              redirectUrl: this.getResolvedUrl(route),
            },
          })
        }
        return allowLogin
      }),
      take(1) // complete the observable for the guard to work
    )
  }

  private checkRoleMatch(role: Role,
    route?: ActivatedRouteSnapshot
  ) {
    if (!route?.data?.expectedRole) {
      return true
    }
    return role === route.data.expectedRole
  }

  private showAlert(isAuth: boolean, roleMatch: boolean) {
    if (!isAuth) {
      this.uiService.showToast('You must login to continue')
    }
    if (!roleMatch) {
      this.uiService.showToast(
        'You do not have the permissions to view this resource'
      )
    }
  }

  getResolvedUrl(route?: ActivatedRouteSnapshot): string {
    if (!route) {
      return ''
    }
    return route.pathFromRoot
      .map((r) => r.url.map((segment) => segment.toString())
        .join('/'))
      .join('/')
      .replace('//', '/')
  }
}
