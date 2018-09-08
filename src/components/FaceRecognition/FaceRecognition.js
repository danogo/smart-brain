import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, imageBox}) => {
  return (
    <div className="img-container">
      <img id="img-input" alt="" src={imageUrl}/>
      <div className="img-box" style={{top: imageBox.topRow, right: imageBox.rightCol, bottom: imageBox.bottomRow, left: imageBox.leftCol, visibility: imageBox.visible }}></div>
    </div>
  );
};

export default FaceRecognition;