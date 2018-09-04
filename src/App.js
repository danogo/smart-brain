import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import './App.css';
import { particleOptions } from './assets/particles.config';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <Navigation />
        <Rank />
        <ImageLinkForm />
        {/*
          <FaceRecognition />*/}
      </div>
    );
  }
}

export default App;
