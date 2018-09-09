import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';
import ParticlesBackground from './components/ParticlesBackground/ParticlesBackground';
import Clarifai from 'clarifai';

const clarifaiApp = new Clarifai.App({
  apiKey: process.env.REACT_APP_APIKEY
 });

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imgUrl: '',
      imgBox: {}
    };
  }

  // using class field syntax(which is enabled by default in create-react-app) to prevent this from rebinding when event handler is triggered
  // another option would be to use standard shorthand method and bind it in constructor like: this.handleInputChange = this.handleInputChange.bind(this)
  calculateFaceLocation = data => {
    data = data.outputs[0].data; 
    // if object has no picture detected, clear previous red box
    if (Object.keys(data).length === 0) return {visible: 'hidden'};
    const clarifaiBox = data.regions[0].region_info.bounding_box;
    const image = document.getElementById('img-input');
    const width = image.width;
    const height = image.height;
    return {
      topRow: clarifaiBox.top_row * height,
      leftCol: clarifaiBox.left_col * width,
      bottomRow: height - (clarifaiBox.bottom_row * height),
      rightCol: width - (clarifaiBox.right_col * width),
      visible: 'visible'
    }
  }
  
  setImgBox = box => {
    this.setState({imgBox: box});
  }

  handleInputChange = event => {
    this.setState({input: event.target.value});
  }

  handleButtonSubmit = () => {
    this.setState({imgUrl: this.state.input});
    clarifaiApp.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.calculateFaceLocation(response))
    .then(boxData => {
      return this.setImgBox(boxData)})
    .catch(err => {
      console.log(err);
      // clearing red dot on bad request after picture with face red box
      this.setImgBox({visible: 'hidden'})
    });
  }

  render() {
    return (
      <div className="App">
        <ParticlesBackground/>  
        <Navigation />
        <Rank />
        <ImageLinkForm onInputChange={this.handleInputChange} onButtonSubmit={this.handleButtonSubmit}/>
        <FaceRecognition imageBox={this.state.imgBox} imageUrl={this.state.imgUrl}/>
      </div>
    );
  }
}

export default App;
