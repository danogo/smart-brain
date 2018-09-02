import React from 'react';
import './Logo.css';
import Tilt from 'react-tilt';


const Logo = () => {
  return (
    <div className="logo-box">
      <Tilt className="Tilt" options={{ max : 25 }} style={{ height: 150, width: 150 }} >
        <div className="Tilt-inner"></div>
      </Tilt>
    </div>
  );
};

export default Logo;