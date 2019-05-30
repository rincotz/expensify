import * as firebase from 'firebase/app'
import * as auth from 'firebase/auth'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()

export { firebase, auth, db as default }

// db.collection('user').add({
//     name: 'felipe',
//     age: 29,
//     isSingle: true,
//     location: {
//         city: 'mairinque',
//         country: 'brasil'
//     }
// }).then((docRef) => {
//     console.log("Document written with ID: ", docRef.id)
// }).catch((error) => {
//     console.log('Error adding document: ', error)
// })

// db.collection('user').doc('ywIku1uoPBqUFK4KVp3a').update({
//     'location.city': 'sao paulo'
// })