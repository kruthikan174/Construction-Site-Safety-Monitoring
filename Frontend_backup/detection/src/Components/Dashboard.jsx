import React, { useState, useRef, useEffect } from "react";
import Header from "./Header";
import siren from "../Images/alert.mp4";
import { Button, Modal, Form, Alert } from 'react-bootstrap';

function Dashboard() {
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [isWearingHelmet, setIsWearingHelmet] = useState(false);
  const [isWearingVest, setIsWearingVest] = useState(false);
  const [isWearingMask, setIsWearingMask] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null); 
  const [errorMessage, setErrorMessage] = useState(""); 
  const [showErrorModal, setShowErrorModal] = useState(false); 

  const dataURLtoFile = (dataURL, fileName) => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
  };

  const handleCameraToggle = () => {
    setCameraEnabled((prev) => !prev);
  };

  useEffect(() => {
    if (cameraEnabled) {
      const startCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        } catch (error) {
          console.error("Error accessing camera:", error);
        }
      };
      startCamera();
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    }
  }, [cameraEnabled]);

  const detectSafetyEquipment = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setIsWearingHelmet(result.is_helmet_found);
        setIsWearingVest(result.is_vest_found);
        setIsWearingMask(result.is_mask_found);
        alert('file uploaded successfully')
      } else {
        alert("Detection failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    }
  };

  const handleCapture = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      const ctx = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataURL = canvas.toDataURL("image/png");
      setCapturedImage(dataURL);
      const file = dataURLtoFile(dataURL, "captured-image.png");
      detectSafetyEquipment(file);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrorMessage("Invalid file type. Please upload an image.");
        setShowErrorModal(true);
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result); 
      };
      reader.readAsDataURL(file);
      detectSafetyEquipment(file);
    }
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

  if (error) {
    return <div>{error}</div>;
  }

  if (!location) {
    return <div>Loading...</div>;
  }

  const googleMapsLink = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;

  const isSafe = isWearingHelmet && isWearingVest && isWearingMask;

  return (
    <div>
      <Header />
      <div style={{ display: "flex", padding: "20px", fontFamily: "Arial" }}>
        <div style={{ flex: 1 }}>
        <h3>Capture Photo</h3>
          {cameraEnabled ? (
            <div>
              <video ref={videoRef} style={{ width: "100%", border: "1px solid black" }} />
              <canvas ref={canvasRef} style={{ display: "none" }} />
            </div>
          ) : (
            <p>Camera is off. Click the button to enable.</p>
          )}
          <Button onClick={handleCameraToggle} style={{ marginTop: "10px" }}>
            {cameraEnabled ? "Turn Camera Off" : "Turn Camera On"}
          </Button>
          {cameraEnabled && (
            <Button 
            variant="success"
            onClick={handleCapture} style={{ marginTop: "10px", marginLeft: "10px" }}>
              Capture
            </Button>
          )}

          <br/>
          <br/>
          <br/>

               {/* File Upload */}
               <div style={{ flex: 1, marginRight: '20px', paddingRight: '20px' }}>
          <h3>Upload Photo</h3>
          <Form>
            <Form.Group controlId="formFile">
              <Form.Label>Select Photo</Form.Label>
              <Form.Control
               type="file"
               accept="image/*"
               onChange={handleFileUpload}
               style={{width:"55%",marginLeft:"22%"}}
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={() => {
                if (!uploadedImage) {
                  setErrorMessage("Please upload an image before submitting.");
                  setShowErrorModal(true);
                }
              }}
              style={{ marginTop: '10px' }}
            >
              Upload Photo
            </Button>
          </Form>
        </div>
        </div>


       
        <div style={{ flex: 1, padding: "20px" }}>
          <h2>Safety Check</h2>

          {/* <div
            style={{
              border: "2px solid",
              borderColor: isWearingHelmet === null ? "gray" : isWearingHelmet ? "green" : "red",
              borderRadius: "8px",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <p>{isWearingHelmet ? "With Safety Helmet" : "Without Safety Helmet"}</p>
          </div>

          <div
            style={{
              border: "2px solid",
              borderColor: isWearingVest === null ? "gray" : isWearingVest ? "green" : "red",
              borderRadius: "8px",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <p>{isWearingVest ? "With Safety Vest" : "Without Safety Vest"}</p>
          </div>

          <div
            style={{
              border: "2px solid",
              borderColor: isWearingMask === null ? "gray" : isWearingMask ? "green" : "red",
              borderRadius: "8px",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <p>{isWearingMask ? "With Mask" : "Without Mask"}</p>
          </div> */}
<div style={{ display: "flex", gap: "20px" }}>
<button
              style={{
                flex: 1,
                padding: "10px",
                background: isWearingHelmet === true ? "green" : "white",
                color: isWearingHelmet === true ? "white" : "black",
                border: "1px solid black",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
                Wearing Helmet
            </button>
            <button
              style={{
                flex: 1,
                padding: "10px",
                background: isWearingHelmet === false ? "red" : "white",
                color: isWearingHelmet === false ? "white" : "black",
                border: "1px solid black",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
             Not Wearing Helmet
            </button>      
</div>
<br/>
<div style={{ display: "flex", gap: "20px" }}>
<button
              style={{
                flex: 1,
                padding: "10px",
                background: isWearingVest === true ? "green" : "white",
                color: isWearingVest === true ? "white" : "black",
                border: "1px solid black",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
                Wearing Safety Vest
            </button>
            <button
              style={{
                flex: 1,
                padding: "10px",
                background: isWearingVest === false ? "red" : "white",
                color: isWearingVest === false ? "white" : "black",
                border: "1px solid black",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
             Not Wearing Safety Vest
            </button>      
</div>
<br/>
<div style={{ display: "flex", gap: "20px" }}>
<button
              style={{
                flex: 1,
                padding: "10px",
                background: isWearingMask === true ? "green" : "white",
                color: isWearingMask === true ? "white" : "black",
                border: "1px solid black",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
                Wearing Mask
            </button>
            <button
              style={{
                flex: 1,
                padding: "10px",
                background: isWearingMask === false ? "red" : "white",
                color: isWearingMask === false ? "white" : "black",
                border: "1px solid black",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Not Wearing Mask
            </button>      
</div>
          <div
            style={{
              marginTop: "20px",
              padding: "10px",
              background: isSafe ? "green" : "red",
              color: "white",
              textAlign: "center",
              borderRadius: "8px",
              fontSize:"25px"
            }}
          >
            <p>{isSafe ? "You are good to go!" : "Not safe to go"}</p>
          </div>

             {/* Uploaded Image Preview */}
             {uploadedImage && (
            <div style={{ marginTop: "20px" }}>
              <h3>Uploaded Image</h3>
              <img
                src={uploadedImage}
                alt="Uploaded"
                style={{ width: "60%", border: "1px solid black", borderRadius: "8px" }}
              />
            </div>
          )}

          {capturedImage && (
            <div style={{ marginTop: "20px" }}>
              <h3>Captured Image</h3>
              <img
                src={capturedImage}
                alt="Captured"
                style={{ width: "60%", border: "1px solid black", borderRadius: "8px" }}
              />
            </div>
          )}
        </div>
      </div>
             {/* Error Modal */}
      <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{errorMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default Dashboard;




