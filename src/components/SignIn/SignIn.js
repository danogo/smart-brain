import React from 'react';

const SignIn = () => {
  return (
    <div>
      <form>
        <fieldset>
          <legend>Sign In</legend>
          <div>
            <input type="email" placeholder="login" id="login"/>
            <label for="login"></label>
          </div>
        </fieldset>
        
      </form>
    </div>
  )
};