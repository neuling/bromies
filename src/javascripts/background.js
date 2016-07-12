import firebase from 'firebase';
import faker from 'faker';
import firebaseConfig from './constants/firebase';

import toPairs from 'lodash/toPairs';

firebase.initializeApp(firebaseConfig);

function writeInitialUserSturcture(userId, name, avatar) {
  firebase.database().ref(`users/${userId}`).set({
    profile: {
      name,
      avatar,
    },
  }).then(() => {
    firebase.database().ref(`userNames/${name}`).set(userId);
  });
}

const joinFriendsData = (friendsToLoad) => {
  const loadFriendData = (friendIds, data, success) => {
    const friendToLoad = friendsToLoad.shift();

    if (friendToLoad) {
      const [idToLoad, friendData] = friendToLoad;
      firebase.database().ref(`users/${idToLoad}/profile`).once('value').then((snapshot) => {
        const mergedFriendData = friendData !== true ? Object.assign(friendData, snapshot.val()) : snapshot.val();
        loadFriendData(friendIds, Object.assign(data, { [idToLoad]: mergedFriendData }), success);
      });
    } else {
      success(data);
    }
  };

  loadFriendData(friendsToLoad, {}, (friends) => {
    chrome.storage.local.get(({ panel }) => {
      chrome.storage.local.set({ panel: Object.assign(panel, { friends }) });
    });
  });
};

firebase.auth().onAuthStateChanged((currentUser) => {
  firebase.database().ref(`users/${currentUser.uid}`).on('value', (snapshot) => {
    const data = {
      friendRequests: {},
      friends: {},
      ...snapshot.val(),
    };

    chrome.storage.local.set({ panel: data }, () => {
      joinFriendsData(toPairs(data.friends));
    });
  });
});

chrome.runtime.onInstalled.addListener(() => {
  firebase.auth().onAuthStateChanged((currentUser) => {
    console.log(currentUser);
    if (!currentUser) {
      firebase.auth().signInAnonymously().then((user) => {
        let name = faker.internet.userName();
        name = name.replace(/\.|#|\$|\[|\]/, '_');
        writeInitialUserSturcture(user.uid, name, `https://robohash.org/${name}`);
      }).catch((error) => {
        console.log(error);
      });
    }
  });
});

window.firebase = firebase;
