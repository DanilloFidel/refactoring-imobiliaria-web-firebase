import { Injectable } from '@angular/core';
import { User } from '../_models/user.model';
import * as firebase from 'firebase';
import { NgxSpinnerService } from 'ngx-spinner';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userCollectionRef: AngularFirestoreCollection<User>;
  private user$: Observable<User[]>;

  constructor(
    private spinner: NgxSpinnerService,
    private angularFireAuth: AngularFireAuth,
    private angularFireDb: AngularFirestore
  ) {
    this.userCollectionRef = this.angularFireDb.collection<User>('usuarios');
    this.user$ = this.userCollectionRef.valueChanges();
  }

  public registerNewUserInFirebase(newUser: User): Promise<any> {
    this.openLoadingOverlay();
    return new Promise((resolve, reject) => {
      this.angularFireAuth.auth.createUserWithEmailAndPassword(newUser.email, newUser.senha)
        .then(() => {
          this.writeUserInDatabase(newUser).then(() => {
            this.closeLoadingOverlay()
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
    this.removePasswordFromUser(userRegistred);
    await this.angularFireDb.collection("usuarios").doc(`${btoa(userRegistred.email)}`)
      .set(Object.assign({}, userRegistred));
  }

  public authenticateUser(email: string, password: string) {
    this.openLoadingOverlay();
    return new Promise((resolve, reject) => {
      this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
        .then(() => {
          this.setUserToken();
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

  private removePasswordFromUser(user: User): void {
    delete user.senha;
  }

  public openLoadingOverlay(): void {
    this.spinner.show();
  }

  public closeLoadingOverlay(): void {
    this.spinner.hide();
  }
}
