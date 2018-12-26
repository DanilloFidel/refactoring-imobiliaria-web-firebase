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
    private angularFireDb: AngularFirestore,
    private errorService: ErrorService
    ) {
      this.userCollectionRef = this.angularFireDb.collection<User>('usuarios');
      this.user$ = this.userCollectionRef.valueChanges();
    }

    public registerNewUserInFirebase(newUser: User): Promise<any>{
      return new Promise((resolve, reject)=>{
        this.angularFireAuth.auth.createUserWithEmailAndPassword(newUser.email, newUser.senha)
        .then(()=>{
          this.writeUserInDatabase(newUser);
          resolve();
        })
        .catch((error: Error)=>{
          this.closeLoadingOverlay();
          reject(error['code']);
        })
      })
    }

    private writeUserInDatabase(userRegistred: User): void{
      this.removePasswordFromUser(userRegistred);
      this.angularFireDb.collection("usuarios").doc(`${btoa(userRegistred.email)}`)
      .set(Object.assign({}, userRegistred));
    }

    private removePasswordFromUser(user: User): void{
      delete user.senha;
    }

    public openLoadingOverlay(): void{
      this.spinner.show();
    }

    public closeLoadingOverlay(): void{
      this.spinner.hide();
    }
  }
