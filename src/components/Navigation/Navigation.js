import React from 'react';
import './Navigation.css';
import Logo from '../Logo/Logo';

const Navigation = () => {
  return (
    <nav className="nav">
      <Logo />
      <p className="nav__btn">Sign Out</p>
    </nav>
  );
}

export default Navigation;