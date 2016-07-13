import React from 'react';

import { addFriend } from '../../../actions/friends';

export default class AddFriend extends React.Component {
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
    addFriend(friendName).then(() => {
      this.setState({
        message: `[OK] User ${friendName} added`,
        value: '',
      });
    }, () => {
      this.setState({
        message: `[ERROR] User ${friendName} not found`,
      });
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
