import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';
import Particles from 'react-particles-js';
import { particleOptions } from './assets/config';
import Clarifai from 'clarifai';

const clarifaiApp = new Clarifai.App({
  apiKey: process.env.REACT_APP_APIKEY
 });

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imgUrl: ''
    };
  }

  // using class field syntax(which is enabled by default in create-react-app) to prevent this from rebinding when event handler is triggered
  // another option would be to use standard shorthand method and bind it in constructor like: this.handleInputChange = this.handleInputChange.bind(this)
  handleInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  handleButtonSubmit = () => {
    this.setState({imgUrl: this.state.input});
    clarifaiApp.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
      function(response) {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
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
        <FaceRecognition imageUrl={this.state.imgUrl}/>
      </div>
    );
  }
}

export default App;
