import React from 'react';

import map from 'lodash/map';

import AddFriend from './AddFriend';
import FriendRequests from 'FriendRequests';

import { deleteFriend } from '../../actions/friends';

export default ({ friends, friendRequests }) => {
  const remove = (friendId) => {
    deleteFriend(friendId);
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
