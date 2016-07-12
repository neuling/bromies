import React from 'react';

import map from 'lodash/map';

import AddFriend from './AddFriend';
import FriendRequests from 'FriendRequests';

export default ({ friends, friendRequests }) => {
  const remove = (userId) => {
    const firebase = chrome.extension.getBackgroundPage().firebase;
    const currentUser = firebase.auth().currentUser;

    firebase.database().ref().update({
      [`/users/${userId}/friends/${currentUser.uid}`]: null,
      [`/users/${userId}/friendRequests/${currentUser.uid}`]: null,
      [`/users/${currentUser.uid}/friends/${userId}`]: null,
    });
  };

  const friend = (data, id) => {
    const { name, pending, avatar } = data;
    return <li key={`friend_${id}`}>{name} ({id}) <a onClick={() => remove(id)}>x</a> {pending && <span>(pending)</span>}<img src={avatar} width={50} alt={name} /></li>;
  };

  return (
    <div>
      <ul>
        {map(friends, friend)}
      </ul>
      <FriendRequests friendRequests={friendRequests} />
      <AddFriend />
    </div>
  );
};
