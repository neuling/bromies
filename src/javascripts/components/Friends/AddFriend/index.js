import React from 'react';

export default class AddFriend extends React.Component {
  constructor() {
    super();
    this.firebase = chrome.extension.getBackgroundPage().firebase;
  }

  state = {
    value: '',
    message: null,
  }

  onChange = (evt) => {
    this.setState({
      value: evt.target.value,
    });
  }

  onAddFriend = (evt) => {
    const friendName = this.state.value;
    this.firebase.database().ref(`userNames/${friendName}`).once('value').then((snapshot) => {
      const friendId = snapshot.val();
      if (friendId) {
        const currentUser = this.firebase.auth().currentUser;
        const usersRef = this.firebase.database().ref();

        usersRef.update({
          [`/users/${currentUser.uid}/friends/${friendId}`]: {
            pending: true,
          },
          [`/users/${friendId}/friendRequests/${currentUser.uid}`]: true,
        });

        this.setState({
          message: `[OK] User ${friendName} added`,
          value: '',
        });
      } else {
        this.setState({
          message: `[ERROR] User ${friendName} not found`,
        });
      }
    });
    evt.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.onAddFriend}>
        {this.state.message && <p>{this.state.message}</p>}
        <input type="text" onChange={this.onChange} value={this.state.value} />
        <input type="submit" value="Add Friend" />
      </form>
    );
  }
}
