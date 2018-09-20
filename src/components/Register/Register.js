import React from 'react';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: ''
    }
  }

  handleNameChange = (event) => {
    this.setState({name: event.target.value});
  }

  handleEmailChange = (event) => {
    this.setState({email: event.target.value});
  }

  handlePasswordChange = (event) => {
    this.setState({password: event.target.value});
  }

  handleSubmitRegister = () => {
    // don't register user with emty strings as inputs
    if (!this.state.name || !this.state.email || !this.state.password) {
      return console.log('Please provide all necessary information');
    }
    // send credentials to server for registration
    fetch('http://localhost:3000/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
    })
    .then(response => response.json())
    .then(userData => {
      if (userData.name && userData.email) {
        this.props.onRouteChange('home');
        this.props.onUserLoad(userData);
      } else {
        console.log(userData);
      }
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="form__container">
        <h2>Register</h2>
        <fieldset>
          <div className="form__group form__group--signin">
            <input onChange={this.handleNameChange} type="text" className="form__input" placeholder="username" id="name"/>
            <label htmlFor="name" className="form__label">Name</label>
          </div>
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
            <input onClick={this.handleSubmitRegister } type="submit" className="form__btn" value="Register"/>
          </div>
        </fieldset>
      </div>
    )
  }
};

export default Register;