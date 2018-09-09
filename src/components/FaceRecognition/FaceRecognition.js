import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, imageBox}) => {
  return (
    <div className="img__container">
      <img id="img__input" alt="" src={imageUrl}/>
      <div className="img__box" style={{top: imageBox.topRow, right: imageBox.rightCol, bottom: imageBox.bottomRow, left: imageBox.leftCol, visibility: imageBox.visible }}></div>
    </div>
  );
};

export default FaceRecognition;