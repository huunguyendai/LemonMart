import { Component, OnInit } from '@angular/core';
import { combineLatest, filter, tap } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `
    <div *ngIf = '(authService.authStatus$ | async)?.isAuthenticated; else doLogin'>
      <div class="mat-display-4">
        This is LemonMart! The place where
      </div>
      <div class="mat-display-4">
        You get a lemon, you get a lemon, you get a lemon...
      </div>
      <div class="mat-display-4">
        Everybody gets a lemon.
      </div>
    </div>
    <ng-template #doLogin>
      <app-login></app-login>
    </ng-template>
  `,
  styles: [
    `div[fxLayout] {margin-top: 32px;}`
  ]
})
export class HomeComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  login() {
    this.authService.login('manager@test.com', '12345678');
    combineLatest([
      this.authService.authStatus$, this.authService.currentUser$
    ]).pipe(
      filter(([authStatus, user]) => authStatus.isAuthenticated && user._id !== ''),
      tap(([authStatus, user]) => {
        this.router.navigate(['/manager']);
      })
    ).subscribe();
  }

}
