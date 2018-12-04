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
import { LoginModalComponent } from './login-modal/login-modal.component';
import { MaterialItensModule } from './material-itens/material-components.module';


@NgModule({
  declarations: [
    AppComponent,
    UserAreaComponent,
    HousesAreaComponent,
    LandingAreaComponent,
    FooterComponent,
    HeaderComponent,
    LoginModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialItensModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
