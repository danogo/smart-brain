import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
  // destructuring as above or (props) and props.onInputChange
  return (
    <div className="form">
      <h2 className="form__title--link">
        {'This Magic Brain will detect faces in your picture. Give it a try!'}
      </h2>
      <div className="form__group">
        <input className="form__input" type="text" placeholder="Type img url here" onChange={onInputChange}/>
        <button className="form__btn" onClick={onButtonSubmit}>{'Detect faces'}</button>
      </div>
    </div>
  );
};

export default ImageLinkForm;
