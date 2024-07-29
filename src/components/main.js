import React, { useState } from 'react';
import '../components/styles.css';
import LeftPanelCameraAccess from './leftComponents/CameraAccess';
import SiteOverlay from './overlay/SiteOverlay';
import AboutPopup from './overlay/AboutPopup';
import ContactPopup from './overlay/ContactPopup';

const Main = () => {
  
  // Darkmode 
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Instruction overlay
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);

  const closeOverlay = () => {
    setIsOverlayVisible(false);
  };

  // About pop-up
  const [isAboutPopupVisible, setIsAboutPopupVisible] = useState(false);

  const openAboutPopup = () => {
    setIsAboutPopupVisible(true);
  };

  const closeAboutPopup = () => {
    setIsAboutPopupVisible(false);
  };

  // Contact pop-up
  const [isContactPopupVisible, setIsContactPopupVisible] = useState(false);

  const openContactPopup = () => {
    setIsContactPopupVisible(true);
  };

  const closeContactPopup = () => {
    setIsContactPopupVisible(false);
  };


  return (
    <>
      {/* Overlay for the website that explains the website */}
      {isOverlayVisible && <SiteOverlay onClose={closeOverlay} />}

      {/* About Pop-up */}
      {isAboutPopupVisible && <AboutPopup onClose={closeAboutPopup} />}

      {/* contact Pop-up */}
      {isContactPopupVisible && <ContactPopup onClose={closeContactPopup} />}

      {/* Navigation bar  */}
      <div className="navBar">
        <div className="title">GestoTalk</div>
        <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#" onClick={openAboutPopup}>About</a></li>
            <li><a href="#" onClick={openContactPopup}>Contact</a></li>
        </ul>

        {/* dark mode switch */}
        <div className='darkModeSwitch'>
            <p>Mode</p>
            <label className="switch">
                <input type="checkbox" onChange={toggleDarkMode} checked={isDarkMode} />
                <span className="slider"></span>
            </label>    
        </div>    
      </div>

      {/* Calling the Camera component as the chatbot component is called in it */}
      <div >
        <LeftPanelCameraAccess isDarkMode={isDarkMode}/>
      </div>
    </>
  );
};

export default Main;
