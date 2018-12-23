import { Injectable } from '@angular/core';
import { User } from '../_models/user.model';
import * as firebase from 'firebase';
import { NgxSpinnerService } from 'ngx-spinner';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

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

  public registerNewUserInFirebase(newUser: User): Promise<any>{
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(newUser.email, newUser.senha)
    .then((response)=>{
      this.writeUserInDatabase(newUser)
    })
    .catch((error: Error)=>{
      console.log(error) //implementar tratativas de erro
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
