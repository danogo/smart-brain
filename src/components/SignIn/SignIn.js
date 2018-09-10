import React from 'react';
import './SignIn.css';

const SignIn = ({ onRouteChange }) => {
  return (
    <div className="form__container">
      <form action="#">
          <h2>Sign in</h2>
          <fieldset>
            <div className="form__group form__group--signin">
              <input type="email" className="form__input" placeholder="username@email.com" id="email"/>
              <label htmlFor="email" className="form__label">Email</label>
            </div>
            <div className="form__group form__group--signin">
              <input type="password" className="form__input" placeholder="password" id="password"/>
              <label htmlFor="password" className="form__label">Password</label>
            </div>
          </fieldset>
          <fieldset>
            <div className="form__group form__group--signin">
              <input onClick={() => onRouteChange('home')} type="submit" className="form__btn" value="Sign in"/>
            </div>
            <div className="form__group form__group--signin">
              <button onClick={() => onRouteChange('register')} className="form__btn form__btn--reg">Register</button>
            </div>
          </fieldset>
      </form>
    </div>
  )
};

export default SignIn;