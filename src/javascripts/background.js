import firebase from 'firebase';

firebase.initializeApp({
  apiKey: 'AIzaSyCKAQvwZ62HogyefwHcaHtDmh17ejQAYVI',
  authDomain: 'project-2541425427882320451.firebaseapp.com',
  databaseURL: 'https://project-2541425427882320451.firebaseio.com',
  storageBucket: 'project-2541425427882320451.appspot.com',
});

firebase.auth().onAuthStateChanged((user) => {
  console.log(user);

  if (!user) {
    firebase.auth().signInAnonymously().catch((error) => {
      console.log(error);
    });
  }
});
