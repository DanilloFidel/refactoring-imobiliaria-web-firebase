import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase';

@Component({
  selector: 'app-landing-area',
  templateUrl: './landing-area.component.html',
  styleUrls: ['./landing-area.component.less']
})
export class LandingAreaComponent implements OnInit {

  private userCollectionRef: AngularFirestoreCollection<User>;
  constructor(
    private db: AngularFirestore,
    private fireAuth: AngularFireAuth
  ) {
    this.userCollectionRef = this.db.collection<User>('usuarios');
  }

  ngOnInit() {
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

  var actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be whitelisted in the Firebase Console.
    url: 'http://localhost:4200/?email=' + this.fireAuth.auth.currentUser.email,
    // This must be true.
    handleCodeInApp: true
  };

  /**
   * Initiate the password reset process for this user
   * @param email email of the user
   */

    this.fireAuth.auth.currentUser.sendEmailVerification(actionCodeSettings)




  .then((r=>console.log('sucesso',r))
  ).catch(err=>console.log('erro',err))



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


