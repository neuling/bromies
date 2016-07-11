import firebase from 'firebase';
import faker from 'faker';
import firebaseConfig from './constants/firebase';

firebase.initializeApp(firebaseConfig);

function writeInitialUserSturcture(userId) {
  firebase.database().ref(`users/${userId}`).set({
    friends: {},
    inbox: {},
  });
}

chrome.runtime.onInstalled.addListener(() => {
  firebase.auth().onAuthStateChanged((currentUser) => {
    console.log(currentUser);
    if (!currentUser) {
      firebase.auth().signInAnonymously().then((user) => {
        const userName = faker.internet.userName();
        user.updateProfile({
          displayName: userName,
          photoURL: `https://robohash.org/${userName}`,
        });
        writeInitialUserSturcture(user.uid);
      }).catch((error) => {
        console.log(error);
      });
    }
  });
});
