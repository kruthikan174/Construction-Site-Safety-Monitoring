import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import Header from './Header';
import siren from "../Images/fallalet.mp3"
import loading from "../Images/loading.gif"

function Falldetection() {
  const [video, setVideo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isFallDetected, setIsFallDetected] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiModalMessage, setApiModalMessage] = useState(""); 
  const [apiModalVisible, setApiModalVisible] = useState(false); 
  const [showAlert, setShowAlert] = useState(false);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  


  const handleVideoChange = (event) => {
    setVideo(event.target.files[0]);
  };

  const handleSubmit = () => {
    if (video) {
      setIsUploaded(true);
      setShowModal(true);
      detectSafetyEquipment(video)
    } else {
      setIsUploaded(false);
      setShowModal(true);
    }
  };

  
  const detectSafetyEquipment = async (file) => {
    setIsLoading(true); 
    try {
      const googleMapsLink = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
      const formData = new FormData();
      formData.append('URL',googleMapsLink)
      formData.append("file", file);
      const response = await fetch("http://127.0.0.1:5000/upload_video", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setIsFallDetected(result.is_fall_detected)
        if (result.is_fall_detected)
        {
          playSound()
          setShowAlert(true); 
          setTimeout(() => setShowAlert(false), 5000); 
        }
        // alert('file uploaded successfully')
        setApiModalMessage("File uploaded successfully!");
        setApiModalVisible(true);
      } else {
        // alert("Detection failed");
        setApiModalMessage("Detection failed.");
        setApiModalVisible(true); 
        
      }
    } catch (error) {
      console.error("Error:", error);
      // alert("An error occurred");
      setApiModalMessage("An error occurred.");
      setApiModalVisible(true); 
      
    }
    finally {
      setIsLoading(false); 
    }
  };


  const handleFallOptionClick = (fallStatus) => {
    setIsFallDetected(fallStatus);
  };


  
    const playSound = () => {
      const audio = new Audio(siren);
      audio.play();
      setIsPlaying(true);
  
      
      audio.onended = () => setIsPlaying(false);
    };

     useEffect(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              setLocation({ latitude, longitude });
            },
            (err) => {
              setError("Unable to retrieve your location.");
            }
          );
        } else {
          setError("Geolocation is not supported by this browser.");
        }
      }, []);
    
  return (
    <div>
      <Header />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '20px',
          fontFamily: 'Arial',
        }}
      >
      
        <div style={{ flex: 1, marginRight: '20px', paddingRight: '20px' }}>
          <h3>Upload Video</h3>
          <Form>
            <Form.Group controlId="formFile">
              <Form.Label>Select Video (MP4)</Form.Label>
              <Form.Control
                type="file"
                accept="video/mp4"
                onChange={handleVideoChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={handleSubmit}
              style={{ marginTop: '10px' }}
            >
              Upload Video
            </Button>
          </Form>
        </div>

        

        
        <div style={{ flex: 1, paddingLeft: '20px' }}>
          <h3>Fall Detection</h3>

           {/* Alert for Fall Detected */}
           {showAlert && (
            <Alert
              variant="danger"
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                zIndex: 1000,
              }}
            >
              Mail sent to the supervisor regarding an emergency at this location.
            </Alert>
          )}

          <div
            style={{
              border: "2px solid",
              borderColor: isFallDetected === null ? "gray" : isFallDetected ? "red" : "green",
              borderRadius: "8px",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
             <p>{isFallDetected ? "Fall Detected" : "No Fall Detected"}</p>
             
             </div>
             <div style={{ display: "flex", gap: "10px" }}>
            <button
              style={{
                flex: 1,
                padding: "10px",
                background: isFallDetected === true ? "red" : "white",
                color: isFallDetected === true ? "white" : "black",
                border: "1px solid black",
                cursor: "pointer",
              }}
            >
              Fall Detected
            </button>
            <button
              style={{
                flex: 1,
                padding: "10px",
                background: isFallDetected === false ? "green" : "white",
                color: isFallDetected === false ? "white" : "black",
                border: "1px solid black",
                cursor: "pointer",
              }}
            >
              No Fall Detected
            </button>
          </div>



      
        </div>
      </div>
      {/* <div>
      <button onClick={playSound} disabled={isPlaying}>
        {isPlaying ? 'Playing...' : 'Play Sound'}
      </button>
    </div> */}

    {isLoading && (
        <div className="loader">
          <img
            src={loading} 
            alt="Loading..."
            style={{ width: "100px", height: "100px" }} 
          />
        </div>
      )}

      {/* Modal for Upload Status */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isUploaded ? (
            <Alert variant="success">Video uploaded successfully!</Alert>
          ) : (
            <Alert variant="danger">Please select a video to upload!</Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for API Response */}
      <Modal show={apiModalVisible} onHide={() => setApiModalVisible(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{apiModalMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setApiModalVisible(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default Falldetection;
