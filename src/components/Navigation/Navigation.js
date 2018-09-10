import React from 'react';
import './Navigation.css';
import Logo from '../Logo/Logo';

const Navigation = ({ onRouteChange, isSignedIn }) => {
  
  if (isSignedIn) {
    return (
      <nav className="nav">
        <Logo />
        <button onClick={() => onRouteChange('signout')} className="nav__btn">Sign Out</button>
      </nav>
    );
  } else {
    return (
      <nav className="nav">
        <Logo />
        <div className="nav__links">
          <button onClick={() => onRouteChange('signin')} className="nav__btn">Sign In</button>
          <button onClick={() => onRouteChange('register')} className="nav__btn">Register</button>
        </div>
      </nav>
    );
  }
}

export default Navigation;