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
import { environment } from 'src/environments/environment';
import { ParallaxComponent } from './parallax/parallax.component';
import { ModalComponent } from './modal/modal.component';
import { RecoveryPasswordComponent } from './autentication-area/recovery-password/recovery-password.component';
import { UserHelperComponent } from './autentication-area/user-helper/user-helper.component';
import { HistorySpyDirective } from './_directives/history-spy.directive';
import { FIREBASE } from './_utils/constants';
import { AcessPanelComponent } from './autentication-area/acess-panel/acess-panel.component';
import { ChangePasswordComponent } from './autentication-area/change-password/change-password.component';
import { NotConfirmedComponent } from './autentication-area/not-confirmed/not-confirmed.component';




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
    ModalComponent,
    RecoveryPasswordComponent,
    UserHelperComponent,
    HistorySpyDirective,
    AcessPanelComponent,
    ChangePasswordComponent,
    NotConfirmedComponent
  ],
  imports: [
    BrowserModule,
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
  ],
  providers: [

   ],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule { }
