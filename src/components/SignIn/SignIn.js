import React from 'react';
import './SignIn.css';

const SignIn = () => {
  return (
    <div className="form__container">
      <form action="#" method="post">
          <h2>Sign in</h2>
          <div className="form__group">
            <input type="email" className="form__input" placeholder="username@email.com" id="email"/>
            <label for="email" className="form__label"></label>
          </div>
          <div className="form__group">
            <input type="password" className="form__input" placeholder="password" id="password"/>
            <label for="password" className="form__label"></label>
          </div>
          <div className="form__group">
            <input type="submit" className="form__btn" value="Submit"/>
          </div>
      </form>
    </div>
  )
};

export default SignIn;