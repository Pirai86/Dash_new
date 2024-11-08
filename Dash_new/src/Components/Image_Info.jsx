import React from 'react';
import PropTypes from 'prop-types';
import Cancel_Icon from '../../assets/Cancel_Icon.png';
import '../../Styles/Image_Info.css';

const Image_Info = ({ isVisible, onClose, content, width, height }) => {
  const rightPercentage = width;
  const heightPercentage = height;
  return (
    <div className={`Image-Info-Container ${isVisible ? 'slide-in' : 'slide-out'}`} style={{ width: rightPercentage, height: heightPercentage }}>
      <div className="Cancel-Icon-Container">
        <img className="Cancel-Icon" src={Cancel_Icon} alt="Cancel-Icon" onClick={onClose}/>
      </div>
      <div className="content-container" style={{padding:"10px", fontSize:"14px"}}>
        {content}
      </div>
    </div>
  );
};

Image_Info.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  content: PropTypes.node.isRequired,
};

export default Image_Info;
