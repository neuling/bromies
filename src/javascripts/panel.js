import React from 'react';
import ReactDOM from 'react-dom';

import Panel from 'Panel';

const user = {
  name: 'Johnny',
  avatar: 'https://robohash.org/Johnny',
  friends: {
    '8s7dzhaksjhda9': {
      name: 'Nik',
      avatar: 'https://robohash.org/Nik',
    },
    '9q8sdhakjg9': {
      name: 'Moritz',
      avatar: 'https://robohash.org/Moritz',
    },
  },
  inbox: {
    1: {
      url: 'https://google.com',
    },
    2: {
      url: 'https://wunderporn.com',
    },
  },
};

ReactDOM.render(<Panel {...user} />, document.getElementById('app'));
