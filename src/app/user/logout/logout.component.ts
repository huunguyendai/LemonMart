import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template: `
    <p>
      logout works!
    </p>
  `,
  styles: [
  ]
})
export class LogoutComponent implements OnInit{
  constructor(
    private router:Router,
    private authService: AuthService
  ){

  }
  ngOnInit(): void {
    this.authService.logout(true);
    this.router.navigate(['/']);
  }
}
