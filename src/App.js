import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';
import Particles from 'react-particles-js';
import { particleOptions, clarifaiApp } from './assets/config';


class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  // using class field syntax(which is enabled by default in create-react-app) to prevent this from rebinding when event handler is triggered
  // another option would be to use standard shorthand method and bind it in constructor like: this.handleInputChange = this.handleInputChange.bind(this)
  handleInputChange = (event) => {
    console.log(event)
  }

  handleButtonSubmit = () => {
    clarifaiApp.models.predict("a403429f2ddf4b49b307e318f00e528b", "https://samples.clarifai.com/face-det.jpg").then(
      function(response) {
        console.log(response);
      },
      function(err) {
        // there was an error
      }
    );
  }

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <Navigation />
        <Rank />
        <ImageLinkForm onInputChange={this.handleInputChange} onButtonSubmit={this.handleButtonSubmit}/>
        {/*
          <FaceRecognition />*/}
      </div>
    );
  }
}

export default App;
