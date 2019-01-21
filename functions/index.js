const functions = require('firebase-functions');
// Initialize Firebase Admin SDK

const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);


//send notifications function

exports.fcmSend = functions.firestore.document('imoveis/{imovelId}')
  .onCreate((snap, context) => {
    const data = snap.val();
    const userId = data.userId;
    const imovel = data.imovelId

    const payload = {
      notification: {
        title: 'Novo imovel',
        body: data.imovelId,
        icon: 'https://placeimg/250/250/people'
      }
    };

    const db = admin.firestore();
    const usersRef = db.collection('fcmTokens');

    const users = usersRef.get();

    const tokens = [];

    users.forEach( result =>{
      const token = result.data().value;
      tokens.push( token );
    })

    return admin.messaging().sendToDevice('fPgBOseogqU:APA91bGQYPZGkOVeLbU9R8I6gNleuFQ0u477T9T7rkGjs4bek17eWUj_2IoOOeXPmo0yG5hPYfMP_eSSUxBQbtUYvWIYdsNnRUV40iSPp3WORWxv4llrovWrFduPQ91ofvLjpN0y_CS3', payload)

  })

