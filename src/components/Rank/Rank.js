import React from 'react';
import './Rank.css';

const Rank = () => {
  return (
    <div className="rank__container">
      <div>
        {'Daniel, your current rank is...'}
      </div>
      <div className="rank">
        {'#2'}
      </div>
    </div>
  );
};

export default Rank;