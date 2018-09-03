import React from 'react';
import './Navigation.css';
import Logo from '../Logo/Logo';

const Navigation = () => {
  return (
    <nav className="nav">
      <Logo />
      <p className="sign-btn">Sign Out</p>
    </nav>
  );
}

export default Navigation;