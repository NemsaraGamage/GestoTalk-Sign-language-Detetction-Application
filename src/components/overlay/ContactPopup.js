import React, { useState } from 'react';

const ContactPopup = ({ onClose }) => {
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // Assuming the transition duration is 300ms, adjust if needed
  };

  return (
    <div className={`contactPopup ${closing ? 'closing' : ''}`}>
      <div className={`contactPopup-content ${closing ? 'closing' : ''}`}>
        <h2>Need help?</h2>
        <p>Contact us by email at gestoTalk@gmail.com</p>
        <p>By Phone +94 0772181197</p>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default ContactPopup;
