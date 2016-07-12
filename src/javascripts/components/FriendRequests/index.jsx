import React from 'react';
import keys from 'lodash/keys';

export default ({ friendRequests }) => {
  const accept = (userId) => {
    const firebase = chrome.extension.getBackgroundPage().firebase;
    const currentUser = firebase.auth().currentUser;

    firebase.database().ref().update({
      [`/users/${userId}/friends/${currentUser.uid}`]: true,
      [`/users/${currentUser.uid}/friendRequests/${userId}`]: null,
      [`/users/${currentUser.uid}/friends/${userId}`]: true,
    });
  };

  return (
    <div>
      <ul>
        {keys(friendRequests).map((id) => <li>{id} <a onClick={() => accept(id)}>accept</a></li>)}
      </ul>
    </div>
  );
};
