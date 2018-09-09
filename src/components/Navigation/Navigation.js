import React from 'react';
import './Navigation.css';
import Logo from '../Logo/Logo';

const Navigation = ({ onRouteChange }) => {
  return (
    <nav className="nav">
      <Logo />
      <button onClick={() => onRouteChange('signin')} className="nav__btn">Sign Out</button>
    </nav>
  );
}

export default Navigation;