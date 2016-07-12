import React from 'react';

export default ({ name, avatar }) => {
  return (
    <div>
      {name} <img src={avatar} alt={name} width={50} />
    </div>
  );
};
