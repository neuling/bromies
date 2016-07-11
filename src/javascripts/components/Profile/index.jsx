import React from 'react';

export default ({ name, avatar }) => {
  return (
    <div>
      {name} <img src={avatar} alt={name} />
    </div>
  );
};
