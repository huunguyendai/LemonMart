import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, tap } from 'rxjs';

import { AuthService } from './auth/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { MediaObserver } from '@angular/flex-layout';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'lemon-mart';
  private subs = new SubSink();
  opened: boolean = false;

  constructor(iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    public authService:AuthService,
    public media: MediaObserver) {
      iconRegistry.addSvgIcon('lemon',sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/lemon.svg'));
    }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.subs.sink = combineLatest([
      this.media.asObservable(),
      this.authService.authStatus$,
    ]).pipe
    (
      tap(([mediaValue, authStatus]) =>{
        if(!authStatus?.isAuthenticated){
          this.opened = false;
        }
        else {
          if(mediaValue[0].mqAlias === 'xs'){
            this.opened = false;
          }
          else{
            this.opened = true;
          }
        }
      })
    ).subscribe();
  }
}
