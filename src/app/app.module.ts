import { } from '@angular/fire/'

import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/compat/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthHttpInterceptor } from './auth/auth-http-interceptor';
import { AuthService } from './auth/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { FirebaseAuthService } from './auth/auth.firebase.service';
import { FlexLayoutModule } from '@angular/flex-layout'
import { HomeComponent } from './home/home.component';
import { InMemoryAuthService } from './auth/auth.inmemory.service';
import { InventoryModule } from './inventory/inventory.module';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material.module';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PosModule } from './pos/pos.module';
import { SimpleDialogComponent } from './common/simple-dialog/simple-dialog.component';
import { UserModule } from './user/user.module';
import { authFactory } from './auth/auth.factory';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    LoginComponent,
    SimpleDialogComponent,
    NavigationMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    InventoryModule,
    PosModule,
    UserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore())
  ],
  providers: [
    {
      provide: FIREBASE_OPTIONS,
      useValue: environment.firebase
    },
    {
      provide: AuthService,
      //useClass: InMemoryAuthService
      //useClass: FirebaseAuthService
      useFactory: authFactory,
      deps: [AngularFireAuth]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents:[SimpleDialogComponent]
})
export class AppModule { }
