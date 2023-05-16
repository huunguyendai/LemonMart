import { BehaviorSubject, Observable, catchError, filter, flatMap, map, pipe, tap, throwError } from 'rxjs';
import { IUser, User } from '../user/user/user';

import { CacheService } from './cache.service';
import { Injectable } from '@angular/core';
import { Role } from './auth.enum';
import decode from 'jwt-decode';
import { transformError } from '../common/common';

export interface IAuthService {
  readonly authStatus$: BehaviorSubject<IAuthStatus>
  readonly currentUser$: BehaviorSubject<IUser>
  login(email: string, password: string): Observable<void>
  logout(clearToken?: boolean): void
  getToken(): string
}

export interface IAuthStatus {
  isAuthenticated: boolean;
  userRole: Role;
  userId: string;
}

export interface IServerAuthResponse {
  accessToken: string;
}

export const defaultAuthStatus: IAuthStatus = {
  isAuthenticated: false,
  userRole: Role.None,
  userId: ''
}

@Injectable()
export abstract class AuthService extends CacheService implements IAuthService {

  private getAndUpdateUserIfAuthenticated = pipe(
    filter((status: IAuthStatus) => status.isAuthenticated),
    flatMap(() => this.getCurrentUser()),
    map((user: IUser) => this.currentUser$.next(user)),
    catchError(transformError)
  );

  readonly authStatus$ = new BehaviorSubject<IAuthStatus>(defaultAuthStatus);
  readonly currentUser$ = new BehaviorSubject<IUser>(new User());
  protected readonly resumeCurrentUser$ = this.authStatus$.pipe(
    this.getAndUpdateUserIfAuthenticated
  );

  constructor() {
    super();

    //this.authStatus$.pipe(tap((authStatus) => this.setItem('authStatus', authStatus)));
    if (this.hasExpiredToken()) {
      this.logout(true);
    }
    else {
      this.authStatus$.next(this.getAuthStatusFromToken());
      setTimeout(() => this.resumeCurrentUser$.subscribe(), 0);
    }
  }

  protected abstract authProvider(email: string, password: string): Observable<IServerAuthResponse>;
  protected abstract transformJwtToken(token: unknown): IAuthStatus;
  protected abstract getCurrentUser(): Observable<User>;

  login(email: string, password: string): Observable<void> {
    const loginResponse$ = this.authProvider(email, password)
      .pipe(
        map((value) => {
          this.setToken(value.accessToken);
          const token = decode(value.accessToken);
          return this.transformJwtToken(token);
        }),
        tap((status) => this.authStatus$.next(status)),
        this.getAndUpdateUserIfAuthenticated
        // filter((status: IAuthStatus) => status.isAuthenticated),
        // flatMap(() => this.getCurrentUser()),
        // map(user => this.currentUser$.next(user)),
        // catchError(transformError)
      );

    loginResponse$.subscribe({
      error: err => {
        this.logout();
        return throwError(() => new Error(err))
      },
    });

    return loginResponse$;

  }
  logout(clearToken?: boolean): void {
    if (clearToken) {
      this.clearToken();
    }
    setTimeout(() => {
      this.authStatus$.next(defaultAuthStatus);
    }, 0);
  }
  getToken(): string {
    return this.getItem('jwt') ?? '';
  }

  protected setToken(jwt: string) {
    this.setItem('jwt', jwt);
  }

  protected clearToken() {
    this.removeItem('jwt');
  }

  protected hasExpiredToken(): boolean {
    const jwt = this.getToken();
    if (jwt) {
      const payload = decode(jwt) as any;
      return Date.now() >= payload.exp * 1000;
    }
    return true;
  }

  protected getAuthStatusFromToken(): IAuthStatus {
    return this.transformJwtToken(decode(this.getToken()));
  }
}
