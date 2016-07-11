import React from 'react';
import values from 'lodash/values';

export default ({ friends }) => {
  return (
    <ul>
      {values(friends).map(({ name, avatar }) => <li>{name} <img src={avatar} width={50} alt={name} /></li>)}
    </ul>
  );
};
