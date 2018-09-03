import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <main>
          <ImageLinkForm />
          {/*
            <FaceRecognition />*/}
        </main>
      </div>
    );
  }
}

export default App;
