import React from 'react';
import Tilt from 'react-tilt';
import brain from './brainv2.png';
import './Logo.css';


const Logo = () => {
  return (
    <div className="logo__box">
      <Tilt className="Tilt" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
        <div className="Tilt-inner">
          <img src={brain} alt="brain" />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;