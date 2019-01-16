import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { User } from '../_models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private itemDoc: AngularFirestoreDocument<User>;
  $item: Observable<User>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.itemDoc = afs.doc<User>('items/1');
    this.$item = this.itemDoc.valueChanges();
   }

}

