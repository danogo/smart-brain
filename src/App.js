import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import './App.css';
import ParticlesBackground from './components/ParticlesBackground/ParticlesBackground';
// import Clarifai from 'clarifai'; - not needed, moved to back-end

// const clarifaiApp = new Clarifai.App({
//   apiKey: process.env.REACT_APP_APIKEY
//  }); - not needed, moved to back-end

 const initialState = {
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

class App extends Component {
  constructor() {
    super();
    this.state = Object.assign({}, initialState);
  }
  // using class field syntax(which is enabled by default in create-react-app) to prevent this from rebinding when event handler is triggered
  // another option would be to use standard shorthand method and bind it in constructor like: this.handleInputChange = this.handleInputChange.bind(this)
  calculateFaceLocation = data => {
    data = data.outputs[0].data; 
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
    // clarifai is moved from front-end to back-end to hide clarifai api authorization key from network request headers. Instead of fetching data from clarifai api on frontend, we send input value to the backed imageurl route which handles api call and respond with the data from clarifai
    // clarifaiApp.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input) - that line was moved to backend
    fetch('https://smart-brain-api-danogo.herokuapp.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    // this following code stays the same regardless of where we made call to clarifai api
    .then(response => this.calculateFaceLocation(response))
    .then(boxData => {
      if (boxData) {
        fetch('https://smart-brain-api-danogo.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id 
          })
        })
        .then(response => response.json())
        .then(count => this.setState({user: Object.assign({}, this.state.user, {detections: count})}))
        .catch(console.log);
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
      this.setState(Object.assign({}, initialState));
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
