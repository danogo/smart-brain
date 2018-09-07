import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl}) => {
  return (
    <div className="img-box">
      <img alt="" src={imageUrl}/>
    </div>
  );
};

export default FaceRecognition;