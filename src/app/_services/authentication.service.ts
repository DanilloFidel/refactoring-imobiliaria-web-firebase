import { Injectable } from '@angular/core';
import { User } from '../_models/user.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router';
import { NavigationService } from './navigation.service';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements CanActivate {
  private userCollectionRef: AngularFirestoreCollection<User>;
  private user: any
  private actionCodeSettings: any;
  private userEmail: string;

  constructor(
    private spinner: NgxSpinnerService,
    private angularFireAuth: AngularFireAuth,
    private angularFireDb: AngularFirestore,
    private navigation: NavigationService
  ) {
    this.userCollectionRef = this.angularFireDb.collection<User>('usuarios');
  }


  public canActivate(){
    if(!this.getUserToken()){
      this.navigation.navigateToRoute('')
      return false
    }
      return true
  }


  public registerNewUserInFirebase(newUser: User): Promise<any> {
    this.openLoadingOverlay();
    return new Promise((resolve, reject) => {
      this.angularFireAuth.auth.createUserWithEmailAndPassword(newUser.email, newUser.senha)
        .then((resp) => {
          this.writeUserInDatabase(newUser).then(() => {
            this.sendEmailVerification(resp.user);
            this.closeLoadingOverlay();
            }
          )
          resolve();
        })
        .catch((error: Error) => {
          this.closeLoadingOverlay();
          reject(error['code']);
        })
    })
  }

  private async writeUserInDatabase(userRegistred: User) {
    this.removePasswordFromUser(userRegistred)
    await this.userCollectionRef.doc(`${btoa(userRegistred.email)}`)
      .set(Object.assign({}, userRegistred));
  }

  public authenticateUser(email: string, password: string) {
    this.openLoadingOverlay();
    return new Promise((resolve, reject) => {
      this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
        .then((resp) => {
          this.user = resp.user;
          if(this.checkEmailIsVerified(resp.user)){
            this.setUserToken();
            resolve('email is verified');
          }else{
            this.sendEmailVerification()
              .then(()=>{
                reject();
              })
          }
          this.closeLoadingOverlay();
        })
        .catch((error) => {
          this.closeLoadingOverlay();
          reject(error['code'])
        })
    })
  }

  private setUserToken(){
    this.angularFireAuth.auth.currentUser.getIdToken()
      .then((token)=>{
        sessionStorage.setItem('#', token)
      })
      .catch( error =>console.log(error))
  }

  private getUserToken(): string{
    return sessionStorage.getItem('#');
  }

  private removePasswordFromUser(user: User): void {
    delete user.senha;
  }

  public openLoadingOverlay(): void {
    this.spinner.show();
  }

  public closeLoadingOverlay(): void {
    this.spinner.hide();
  }

  public async sendEmailVerification(){
    await this.user.sendEmailVerification(this.getActionCodeSettings());
  }

  private getActionCodeSettings(){
    return this.actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be whitelisted in the Firebase Console.
      url: 'http://localhost:4200/?email=' + this.user.email,
      // This must be true.
      handleCodeInApp: true
    };
  }

  private checkEmailIsVerified(user: any): boolean{
    return user.emailVerified
  }

}
