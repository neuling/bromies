const firebase = () => {
  return chrome.extension.getBackgroundPage().firebase;
};

const ref = (path) => {
  return firebase().database().ref(path);
};

const currentUser = () => {
  return firebase().auth().currentUser;
};

export const addFriend = (friendName) => {
  return new Promise((resolve, reject) => {
    ref(`userNames/${friendName}`).once('value').then((snapshot) => {
      const friendId = snapshot.val();
      if (friendId) {
        ref('users').update({
          [`${currentUser().uid}/friends/${friendId}`]: { pending: true },
          [`${friendId}/friendRequests/${currentUser().uid}`]: true,
        });
        resolve();
      } else {
        reject();
      }
    });
  });
};

export const deleteFriend = (friendId) => {
  return ref('users').update({
    [`${friendId}/friends/${currentUser().uid}`]: null,
    [`${friendId}/friendRequests/${currentUser().uid}`]: null,
    [`${currentUser().uid}/friends/${friendId}`]: null,
  });
};
