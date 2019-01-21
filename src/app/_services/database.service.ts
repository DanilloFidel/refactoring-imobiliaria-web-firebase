import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { User } from '../_models/user.model';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService implements OnDestroy{
  private userColRef: AngularFirestoreCollection<User>;
  public email: string;
  private userEmailSubscription: Subscription;

  constructor(
    private afs: AngularFirestore,
    private authService: AuthenticationService
  ) {
  }

  ngOnDestroy(): void{

  }

  public getUserData(email: string): void{
    this.userColRef = this.afs.collection<User>('usuarios')
    this.userColRef.doc(`${btoa(email)}`).get().subscribe(res => {
      if(res.exists){

      }
    })
  }


}


