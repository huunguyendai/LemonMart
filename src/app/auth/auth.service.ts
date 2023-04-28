import { BehaviorSubject, Observable } from 'rxjs';
import { IUser, User } from '../user/user/user';

import { Injectable } from '@angular/core';
import { Role } from './auth.enum';

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
export abstract class AuthService implements IAuthService {

  readonly authStatus$ = new BehaviorSubject<IAuthStatus>(defaultAuthStatus);
  readonly currentUser$ = new  BehaviorSubject<IUser>(new User());

  constructor() { }

  login(email: string, password: string): Observable<void> {
    throw new Error('Method not implemented.')
  }
  logout(clearToken?: boolean): void {
    throw new Error('Method not implemented.')
  }
  getToken(): string {
    throw new Error('Method not implemented.')
  }
}