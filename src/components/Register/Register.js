import React from 'react';

const Register = ({ onRouteChange }) => {
  return (
    <div className="form__container">
      <form action="#">
          <h2>Register</h2>
          <fieldset>
            <div className="form__group form__group--signin">
              <input type="text" className="form__input" placeholder="username" id="name"/>
              <label htmlFor="name" className="form__label">Name</label>
            </div>
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
              <input onClick={() => onRouteChange('home')} type="submit" className="form__btn" value="Register"/>
            </div>
          </fieldset>
      </form>
    </div>
  )
};

export default Register;