import React, { useState } from 'react';

const AboutPopup = ({ onClose }) => {
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); 
  };

  return (
    <div className={`aboutPopup ${closing ? 'closing' : ''}`}>
      <div className={`aboutPopup-content ${closing ? 'closing' : ''}`}>
        <h2>About GestoTalk</h2>
        <p>This application is designed to help individuals who want to practice their hand gestures,
          the way the application works is that you perform a gesture and then that gesture gets converted
          into words which will be used to communicate with the chatbot. </p>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default AboutPopup;
