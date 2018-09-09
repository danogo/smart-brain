import React from 'react';
import './SignIn.css';

const SignIn = ({ onRouteChange }) => {
  return (
    <div className="form__container">
      <form action="#" method="post">
          <h2>Sign in</h2>
          <div className="form__group form__group--signin">
            <input type="email" className="form__input" placeholder="username@email.com" id="email"/>
            <label for="email" className="form__label">Email</label>
          </div>
          <div className="form__group form__group--signin">
            <input type="password" className="form__input" placeholder="password" id="password"/>
            <label for="password" className="form__label">Password</label>
          </div>
          <div className="form__group form__group--signin">
            <input onClick={() => onRouteChange('home')} type="submit" className="form__btn" value="Sign in"/>
          </div>
      </form>
    </div>
  )
};

export default SignIn;