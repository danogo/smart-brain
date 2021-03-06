import React from 'react';
import './SignIn.css';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  handleEmailChange =  event => {
    this.setState({email: event.target.value});
  }

  handlePasswordChange =  event => {
    this.setState({password: event.target.value});
  }

  handleSubmitSignIn = () => {
    // don't try to login user with empty strings as inputs
  if (!this.state.email || !this.state.password) {
    return console.log('Please provide all necessary information');
  }
    fetch('https://cors-anywhere-danogo.herokuapp.com/https://smart-brain-api-danogo.herokuapp.com/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
    .then(response => response.json())
    .then(userData => {
      if (userData.id) {
        this.props.onRouteChange('home');
        this.props.onUserLoad(userData);
      } else {
        console.log(userData);
      }
    })
    .catch(err => console.log('connection error'));
  }

  render() {
    const { onRouteChange } = this.props;
    return (
      <div className="form__container">
        <h2>Sign in</h2>
        <fieldset>
          <div className="form__group form__group--signin">
            <input onChange={this.handleEmailChange} type="email" className="form__input" placeholder="username@email.com" id="email"/>
            <label htmlFor="email" className="form__label">Email</label>
          </div>
          <div className="form__group form__group--signin">
            <input onChange={this.handlePasswordChange} type="password" className="form__input" placeholder="password" id="password"/>
            <label htmlFor="password" className="form__label">Password</label>
          </div>
        </fieldset>
        <fieldset>
          <div className="form__group form__group--signin">
            <input onClick={this.handleSubmitSignIn} type="submit" className="form__btn" value="Sign in"/>
          </div>
          <div className="form__group form__group--signin">
            <button onClick={() => onRouteChange('register')} className="form__btn form__btn--reg">Register</button>
          </div>
        </fieldset>
      </div>
    );
  }
 
};

export default SignIn;