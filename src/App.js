import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
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
      faceBoxes: [],
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        detections: 0,
        joined: ''
      }
    };
  }
  
  // using class field syntax(which is enabled by default in create-react-app) to prevent this from rebinding when event handler is triggered
  // another option would be to use standard shorthand method and bind it in constructor like: this.handleInputChange = this.handleInputChange.bind(this)
  calculateFaceLocation = data => {
    data = data.outputs[0].data; 
    console.log('fetched data: ', data);
    // if object has no picture detected, throw error, and skip following code to .catch
    if (Object.keys(data).length === 0) throw new Error('No faces were detected');
    const image = document.getElementById('img__fetched');
    const width = image.width;
    const height = image.height;
    // extracting boxes for all find faces
    const clarifaiBoxes = data.regions.map(region => {
      let box = region.region_info.bounding_box;
      // calculating relative positions based on fetched width and height percentages
      return {
        topRow: box.top_row * height,
        leftCol: box.left_col * width,
        bottomRow: height - (box.bottom_row * height),
        rightCol: width - (box.right_col * width),
      }
    });
    return clarifaiBoxes;
  }
  
  setFaceBox = boxData => {
    this.setState({faceBoxes: boxData});
  }

  handleInputChange = event => {
    this.setState({input: event.target.value});
  }

  handlePictureSubmit = () => {
    this.setState({imgUrl: this.state.input});
    clarifaiApp.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.calculateFaceLocation(response))
    .then(boxData => {
      if (boxData) {
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id 
          })
        })
        .then(response => response.json())
        .then(count => this.setState({user: Object.assign({}, this.state.user, {detections: count})}));
      }
      return this.setFaceBox(boxData)})
    .catch(err => {
      console.log(err);
      // clearing previous red boxes in case there were no faces found or it was bad request to clarifai api
      this.setFaceBox([]);
    });
  }

  handleRouteChange = route => {
    if (route === 'home') {
      this.setState({isSignedIn: true});
    } else if (route === 'signout') {
      this.setState({isSignedIn: false, imgUrl: '', input: '', faceBoxes: []});
    }
    this.setState({route: route});
  }
  
  handleUserLoad = userData => {
    this.setState({
      user: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        detections: userData.detections,
        joined: userData.joined
      }
    });
  }

  render() {
    const { imgUrl, faceBoxes, route, isSignedIn } = this.state;
    return (
      <div className="App">
        <ParticlesBackground/>  
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.handleRouteChange}/>
        { route === 'home' 
        ? <main>
            <Rank name={this.state.user.name} detections={this.state.user.detections}/>
            <ImageLinkForm onInputChange={this.handleInputChange} onButtonSubmit={this.handlePictureSubmit}/>
            <FaceRecognition faceBoxes={faceBoxes} imageUrl={imgUrl}/>
          </main>
        : (
          route === 'signin' || route === 'signout'
            ? <SignIn onUserLoad={this.handleUserLoad} onRouteChange={this.handleRouteChange}/>
            : <Register onUserLoad={this.handleUserLoad} onRouteChange={this.handleRouteChange}/>
          )
        }
      </div>
    );
  }
}

export default App;
