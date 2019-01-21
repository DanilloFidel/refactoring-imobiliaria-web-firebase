const functions = require('firebase-functions');
// Initialize Firebase Admin SDK

const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);


//send notifcations function

exports.fcmSend = functions.firestore.document('imoveis')
  .onCreate((event) => {
    const message = event.data.val();
    const userId = event.params.userId;

    const payload = {
      notification: {
        title: message.title,
        body: message.body,
        icon: 'https://placeimg/250/250/people'
      }
    };

    admin.firestore.doc('fcmTokens').collection('Vs5oo5z9toShClTIvjWfjH384pM2')
      .get().then((resp) => {
        resp.data().value
      })
      .then((fcmToken) => {
        return admin.messaging().sendToDevice(fcmToken, payload)
      })
  })

