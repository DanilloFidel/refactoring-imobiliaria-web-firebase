import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UserAreaComponent } from './user-area/user-area.component';
import { HousesAreaComponent } from './houses-area/houses-area.component';
import { LandingAreaComponent } from './landing-area/landing-area.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MaterialItensModule } from './_material-itens/material-components.module';

import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingService } from './_services/loading.service';
import { AutenticationAreaComponent } from './autentication-area/autentication-area.component';
import { RegisterUserComponent } from './autentication-area/register-user/register-user.component';
import { LoginUserComponent } from './autentication-area/login-user/login-user.component';


@NgModule({
  declarations: [
    AppComponent,
    UserAreaComponent,
    HousesAreaComponent,
    LandingAreaComponent,
    FooterComponent,
    HeaderComponent,
    AutenticationAreaComponent,
    RegisterUserComponent,
    LoginUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialItensModule,
    NgxSpinnerModule
  ],
  providers: [ LoadingService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
