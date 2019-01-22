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
  public $userName = new BehaviorSubject<string>(null);

  constructor(
    private afs: AngularFirestore
  ) {
  }

  ngOnDestroy(): void{

  }

  public searchUserInFirestore(email: string): void{
    this.userColRef = this.afs.collection<User>('usuarios')
    this.userColRef.doc(`${btoa(email)}`).get().subscribe(res => {
      if(res.exists){
        this.$userName.next(res.data().nome);
      }
    })
  }


}


