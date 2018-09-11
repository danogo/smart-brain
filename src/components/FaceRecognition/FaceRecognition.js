import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, faceBoxes}) => {
  let divBoxes;
  // check if faceBoxes is an array and if there are any faces boxes to display
  if (Array.isArray(faceBoxes) && faceBoxes.length > 0) {
    divBoxes = faceBoxes.map((boxObj, index) => {
      return <div key={"id_" + index} className="img__box" style={{top: boxObj.topRow, right: boxObj.rightCol, bottom: boxObj.bottomRow, left: boxObj.leftCol}}></div>
    })
  }
  return (
    <div className="img__container">
      <img id="img__fetched" alt="" src={imageUrl}/>
      {divBoxes}
    </div>
  );
};

export default FaceRecognition;