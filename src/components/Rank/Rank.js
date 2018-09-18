import React from 'react';
import './Rank.css';

const Rank = ({name, detections}) => {
  name = name === undefined || name === '' ? 'guest' : name;
  return (
    <div className="rank__container">
      <div>
        {`${name[0].toUpperCase()}${name.slice(1)}, your detection count is...`}
      </div>
      <div className="rank">
        {`${detections}`}
      </div>
    </div>
  );
};

export default Rank;