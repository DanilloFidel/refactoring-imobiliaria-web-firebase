import { AUTHKEYFIREBASE } from './../_utils/constants';
import { Injectable } from '@angular/core';
import { AngularFireAuth }     from 'angularfire2/auth';
import { AngularFireMessaging } from 'angularfire2/messaging';
import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs'
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PATHS, URLS, PAYLOAD } from '../_utils/constants';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public currentMessage = new BehaviorSubject(null);

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private angularFireMessaging: AngularFireMessaging,
    private httpC: HttpClient
    ) {
    this.angularFireMessaging.messaging.subscribe(
      (_messaging) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      }
    )
  }

  /**
   * update token in firebase database
   *
   * @param userId userId as a key
   * @param token token as a value
   */
  updateToken(token) {
    // we can change this function to request our backend service
    this.angularFireAuth.authState.pipe(take(1)).subscribe(user =>{
      if(user){
        const data = {};
        data['value'] = token
        this.angularFirestore.collection('fcmTokens/').doc(user.uid).set(data);
      }
    })
  }

  /**
   * request permission for notification from firebase cloud messaging
   *
   *
   */
  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        this.updateToken(token);
        this.subscribeUserInTopic(token, 'imoveis');
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  /**
   * hook method when new notification received in foreground
   */
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        console.log("new message received. ", payload);
        this.currentMessage.next(payload);
      })
  }

  sendNotification(to = "/topics/imoveis"){
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `key=${AUTHKEYFIREBASE}`
    })
    this.httpC.post( URLS.sendNotification,
    {
      "notification": {
          "title": PAYLOAD.title,
          "body": PAYLOAD.body,
          "click_action": PAYLOAD.clickAction,
          "icon": PAYLOAD.icon
      },
      "to": to
  }, { headers: header}).subscribe( res=> console.log(res))
  }

  public getSubscribersTokens(): string[]{
    let tokens = [];
    this.angularFirestore.collection('fcmTokens').get().subscribe( resp => {
      resp.forEach( user =>{
        const userToken = user.data();
         tokens.push(userToken.value);
      })
    })
    return tokens;
  }

  public subscribeUserInTopic(token, topic): void{
    let header = new HttpHeaders({
      'Authorization': `key=${AUTHKEYFIREBASE}`
    })
    this.httpC.post(`${URLS.registerTopic}${token}/rel/topics/${topic}`, {} , { headers: header})
    .toPromise().then( resp => alert(resp)).catch( err => alert('eer,' + err))
  }

}

