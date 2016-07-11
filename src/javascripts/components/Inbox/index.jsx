import React from 'react';
import values from 'lodash/values';

export default ({ inbox }) => {
  return (
    <ul>
      {values(inbox).map((inboxItem) => <li>{inboxItem.url}</li>)}
    </ul>
  );
};
