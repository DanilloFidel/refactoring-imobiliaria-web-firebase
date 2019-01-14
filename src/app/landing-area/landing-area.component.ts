import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../_models/user.model';
import { UserHelperService } from '../_services/user-helper.service';


@Component({
  selector: 'app-landing-area',
  templateUrl: './landing-area.component.html',
  styleUrls: ['./landing-area.component.less']
})
export class LandingAreaComponent implements OnInit {

  private userCollectionRef: AngularFirestoreCollection<User>;
  constructor(
    private db: AngularFirestore,
    private fireAuth: AngularFireAuth,
    private userHelper: UserHelperService
  ) {
    this.userCollectionRef = this.db.collection<User>('usuarios');
  }

  ngOnInit() {
    this.userHelper.$params.next(null);
  }

  teste(){
    /*
    let col = this.db.collection('imoveis')
    let ref = col.doc('novo')
  ref.set({
      first: "Ada",
      last: "Lovelace",
      born: 1815
  })
  .then(function(docRef) {
      console.log("Document written with ID: ", docRef);
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });

  col.get().subscribe(
    x=> {
      if(x){
        x.forEach(b=>{
         console.log( b.data() )
        })
      }
    },
    e=> console.log('erro', e)
  )

  col.snapshotChanges().subscribe(x =>{
    if(x){
      x.forEach(b=>{
       console.log(b)
      })
    }
  })*/

  //this.fireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).catch(r=>console.log('resp:',r))



   this.fireAuth.auth.signInWithEmailAndPassword('danillopkt@gmail.com','1754712df')
  .then((r=>{
    //console.log('sucesso',r);
    //localStorage.setItem('#u', JSON.stringify(r.user))
  })
  ).catch(err=>console.log('erro',err))

  //this.fireAuth.auth.


  }

  public logout(){
    this.fireAuth.auth.signOut().then(resp=>console.log(resp)).catch(resp=>console.log(resp))
  }

  public status(){
    this.fireAuth.auth.onAuthStateChanged(user=>{
      console.log('onAuthChanged',user)
    })
  }

}


