import firebase from 'firebase';
import faker from 'faker';

firebase.initializeApp({
  apiKey: 'AIzaSyCKAQvwZ62HogyefwHcaHtDmh17ejQAYVI',
  authDomain: 'project-2541425427882320451.firebaseapp.com',
  databaseURL: 'https://project-2541425427882320451.firebaseio.com',
  storageBucket: 'project-2541425427882320451.appspot.com',
});

chrome.runtime.onInstalled.addListener(() => {
  firebase.auth().onAuthStateChanged((currentUser) => {
    console.log(currentUser);
    if (!currentUser) {
      firebase.auth().signInAnonymously().then((user) => {
        const userName = faker.internet.userName();
        user.updateProfile({
          displayName: userName,
          photoURL: `https://robohash.org/${userName}`,
        }).then(() => {
          console.log('ok');
        }, (error) => {
          console.log('ok', error);
        });
      }).catch((error) => {
        console.log(error);
      });
    }
  });
});
