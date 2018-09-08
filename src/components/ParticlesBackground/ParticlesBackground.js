import React from 'react';
import Particles from 'react-particles-js';
import { particleOptions } from './config';
import './ParticlesBackground.css';

class ParticlesBackground extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    return (
      <Particles className="particles" params={particleOptions} />
    );
  }
}

export default ParticlesBackground;