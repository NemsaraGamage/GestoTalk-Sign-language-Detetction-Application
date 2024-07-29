import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../components/styles.css';
import ChatbotUi from '../rigthComponents/ChatbotUi';

const CameraAccess = (props) => {
  const webcamRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [livePrediction, setLivePrediction] = useState(null);
  const [liveDetectionInterval, setLiveDetectionInterval] = useState(null); 

  // Function to start or stop live detection based on isActive state
  const startCapturing = () => {
    if (isActive) {
      const interval = setInterval(() => {
        liveDetection();
      }, 1000); // Set interval for live detection
      // Store interval in state
      setLiveDetectionInterval(interval); 
    } else {
      // Clear interval when webcam is inactive
      clearInterval(liveDetectionInterval); 
    }
  };

  useEffect(() => {
    // Start capturing when isActive state changes
    startCapturing(); 
  }, [isActive]);

  // Toggle webcam
  const toggleCamera = () => {
    setIsActive(prevState => !prevState);
  };

  // Function to perform the live gesture prediction
  const liveDetection = async () => {
    // Capture screenshot from webcam
    const imageSrc = webcamRef.current.getScreenshot();

    // Convert base64 image to file
    const blob = await fetch(imageSrc).then((res) => res.blob());
    const file = new File([blob], "screenshot.jpg", { type: "image/jpeg" });

    // Send screenshot file to Flask backend on port 3002
    const formData = new FormData();
    formData.append('imagefile', file);

    axios.post('http://localhost:3002/predict', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      // Handle prediction response from backend
      setLivePrediction(response.data.prediction);
    })
    .catch(error => {
      console.error('Error predicting:', error);
    });
  };

  // Function to capture the predicted gesture screenshot and perform prediction
  const captureAndPredict = async () => {
    // Capture screenshot from webcam
    const imageSrc = webcamRef.current.getScreenshot();
  
    // Convert base64 image to file
    const blob = await fetch(imageSrc).then((res) => res.blob());
    const file = new File([blob], "screenshot.jpg", { type: "image/jpeg" });
  
    // Send screenshot file to Flask backend on port 3002
    const formData = new FormData();
    formData.append('imagefile', file);
  
    axios.post('http://localhost:3002/predict', formData, { 
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      // Handle prediction response from backend
      setPrediction(response.data.prediction);
      toast.success("Screenshot captured and prediction successful!");
    })
    .catch(error => {
      console.error('Error predicting:', error);
      toast.error("Error capturing screenshot or predicting.");
    });
  };

  return (
    <div className={`container ${props.isDarkMode ? 'dark-mode' : ''}`}>
      <div className='leftPanel'>
        <p>left Panel</p>
        <div className="leftPanelCamera">
          <ToastContainer autoClose={1000}/>
          <div className="cameraControls">
            <h2>Sign Here</h2>
            <div>
              <p>Camera Access</p>
              <label className="switch">
                <input type="checkbox" checked={isActive} onChange={toggleCamera} />
                <span className="slider"></span>
              </label>
            </div>
            <button className='predictButton' onClick={captureAndPredict} disabled={!isActive}>Capture & Predict</button>
            {isActive && livePrediction && (
              <div className="predictionOverlay">
                <p>Live Prediction: {livePrediction}</p>
              </div>
            )}
          </div>

          <div className="webcamContainer">
            {isActive && (
              <div className="webcamWithPrediction">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="webcam"
                />
                {prediction && (
                  <div className="predictionOverlay">
                    <p>Prediction: {prediction}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chatbot */}
      <div className="rightPanel">
        <p>Right Panel</p>
        <div className='chatbot'>
          <ChatbotUi prediction={prediction}></ChatbotUi>
        </div>
      </div>
    </div>
  );
};

export default CameraAccess;