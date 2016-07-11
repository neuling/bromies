import React from 'react';
import Panel from 'Panel';
import firebase from 'firebase';
import firebaseConfig from '../constants/firebase';

export default class PanelConnector extends React.Component {
  constructor() {
    super();
    firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged((currentUser) => {
      firebase.database().ref(`users/${currentUser.uid}`).on('value', (snapshot) => {
        this.setState({
          name: currentUser.displayName,
          avatar: currentUser.photoURL,
          ...snapshot.val(),
        });
      });
    });
  }

  state = {}

  render() {
    const data = {
      friends: {},
      inbox: {},
      ...this.state,
    };
    return (
      <Panel {...data} />
    );
  }
}
