import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';



import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HousesAreaComponent } from './houses-area/houses-area.component';
import { LandingAreaComponent } from './landing-area/landing-area.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MaterialItensModule } from './_material-itens/material-components.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { NgxSpinnerModule } from 'ngx-spinner';
import { AutenticationAreaComponent } from './autentication-area/autentication-area.component';
import { RegisterUserComponent } from './autentication-area/register-user/register-user.component';
import { LoginUserComponent } from './autentication-area/login-user/login-user.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ParallaxComponent } from './parallax/parallax.component';
import { RecoveryPasswordComponent } from './autentication-area/recovery-password/recovery-password.component';
import { HistorySpyDirective } from './_directives/history-spy.directive';
import { FIREBASE } from './_utils/constants';
import { AcessPanelComponent } from './autentication-area/acess-panel/acess-panel.component';
import { ChangePasswordComponent } from './autentication-area/change-password/change-password.component';
import { NotConfirmedComponent } from './autentication-area/not-confirmed/not-confirmed.component';
import { MaskDirective } from './_directives/mask.directive';
import { PopUpComponent } from './_shared-components/pop-up/pop-up.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [
    AppComponent,
    HousesAreaComponent,
    LandingAreaComponent,
    FooterComponent,
    HeaderComponent,
    AutenticationAreaComponent,
    RegisterUserComponent,
    LoginUserComponent,
    ParallaxComponent,
    RecoveryPasswordComponent,
    HistorySpyDirective,
    AcessPanelComponent,
    ChangePasswordComponent,
    NotConfirmedComponent,
    MaskDirective,
    PopUpComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(FIREBASE),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    DragDropModule,
    MaterialItensModule,
    NgxSpinnerModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}
   ],
  bootstrap: [AppComponent],
  entryComponents: [PopUpComponent]
})
export class AppModule { }
