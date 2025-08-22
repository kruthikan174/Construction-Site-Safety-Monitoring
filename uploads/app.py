from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
import ssl
import os
from ultralytics import YOLO
import cv2
import math
import mediapipe as mp
import numpy as np
from collections import deque

# Initialize MediaPipe pose detection model
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5)
mp_drawing = mp.solutions.drawing_utils
landmark_history = deque(maxlen=10)

app = Flask(__name__)
CORS(app)

# Load the YOLO model
model = YOLO('best.pt')
mask_model = YOLO('best2.pt')
# Define class names
classNames = ['Boots', 'Hardhat', 'Hook', 'Machinary', 'No-Hardhat', 'No-mask', 'No-safetyvest', 'Person', 'Safetyvest']
mask_classNames = ['cloth', 'kn95', 'mask_weared_incorrect', 'n95', 'surgical', 'with_mask', 'without_mask']
myColor = (0,0,255)

# Configure the upload folder
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

UPLOAD_VIDEOFOLDER = 'uploadsvideo'
if not os.path.exists(UPLOAD_VIDEOFOLDER):
    os.makedirs(UPLOAD_VIDEOFOLDER)

# Configure allowed file extensions (optional)
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

# Function to check if the file extension is allowed
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def detect_helmet(input_image_path):
    # input_image_path = "img4.jpeg"
    # output_image_path = "output_4.jpeg"
    img = cv2.imread(input_image_path)

    # Perform detection
    results = model(img)
    mask_results = mask_model(img)

    # Initialize the helmet detection flag
    helmet_present = False
    vest_present = False
    mask_present = False

    # Process results
    for r in results:
        boxes = r.boxes
        for box in boxes:
            # Bounding Box
            x1, y1, x2, y2 = box.xyxy[0]
            x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
            w, h = x2 - x1, y2 - y1

            # Confidence
            conf = math.ceil((box.conf[0] * 100)) / 100

            # Class name
            cls = int(box.cls[0])
            currentClass = classNames[cls]
            print(currentClass, conf)
            # Check if a hardhat is present
            if currentClass == 'Hardhat' and conf >= 0.5:
                helmet_present = True
            if currentClass == 'Safetyvest' and conf >= 0.5:
                vest_present = True
    
    for r in mask_results:
        boxes = r.boxes
        for box in boxes:
            # Bounding Box
            x1, y1, x2, y2 = box.xyxy[0]
            x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
            w, h = x2 - x1, y2 - y1

            # Confidence
            conf = math.ceil((box.conf[0] * 100)) / 100

            # Class name
            cls = int(box.cls[0])
            currentClass = mask_classNames[cls]
            print(currentClass)
            print(conf)
            # Check if a hardhat is present
            if currentClass == 'with_mask' and conf >= 0.5:
                mask_present = True
    return helmet_present, vest_present, mask_present

@app.route('/upload', methods=['POST'])
def upload_file():
    # Check if the post request has the file part
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']

    # If the user does not select a file, the browser submits an empty part without a filename
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file and allowed_file(file.filename):
        filename = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(filename)
        is_helmet_found, is_vest_found, is_mask_found = detect_helmet(filename)
        os.remove(filename)
        return jsonify({"message": "File uploaded successfully", "filename": file.filename, 'is_helmet_found': is_helmet_found, 'is_vest_found':is_vest_found, 'is_mask_found':is_mask_found}), 200
    else:
        return jsonify({"error": "File type not allowed"}), 400
    

    
@app.route('/upload_video', methods=['POST'])
def upload_videofile():
    # Check if the post request has the file part
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    url = (request.form.get("URL"))
    # If the user does not select a file, the browser submits an empty part without a filename
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file:
        filename = os.path.join(UPLOAD_VIDEOFOLDER, file.filename)
        file.save(filename)
        # is_helmet_found, is_vest_found, is_mask_found = detect_helmet(filename)
        is_fall_detected = detect_motion(filename)
        if is_fall_detected:
            send_email(url)
        os.remove(filename)
        return jsonify({"message": "File uploaded successfully", "filename": file.filename, 'is_fall_detected':is_fall_detected}), 200
    else:
        return jsonify({"error": "File type not allowed"}), 400



def detect_motion(filename):
    cap = cv2.VideoCapture(filename)

    if not cap.isOpened():
        print("Error: Unable to open video file.")
        exit()

    fall_detected = False

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        # Convert frame to RGB (MediaPipe expects RGB images)
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = pose.process(rgb_frame)

        # Check if pose landmarks were detected
        if results.pose_landmarks:
            landmarks = results.pose_landmarks.landmark

            # Detect fall
            if detect_fall(landmarks):
                fall_detected = True 
    return fall_detected

def detect_fall(landmarks):
    try:
        # Get key landmarks: Head and Hip
        head = landmarks[mp_pose.PoseLandmark.NOSE]
        left_hip = landmarks[mp_pose.PoseLandmark.LEFT_HIP]
        right_hip = landmarks[mp_pose.PoseLandmark.RIGHT_HIP]

        # Calculate average hip position (center of mass approximation)
        hip_y = (left_hip.y + right_hip.y) / 2

        # Simple heuristic: If head is below hips (falling or lying down)
        if head.y > hip_y + 0.1:  # Adjust threshold based on sensitivity
            return True
    except:
        pass
    return False 

def send_email(url):
    # Set your email credentials
    sender_email = "constructionsafety24@gmail.com"  # Replace with your email
    receiver_emails = ["sumikhaprasad@gmail.com" , "pranathikn31@gmail.com"]  # Replace with receiver's email 
    password = "jomd uuut xthm uddl"  # Use the app password generated, not your Gmail password

    subject = "Test Email"
    body = "Hello, this is a test email sent from Python!"

    # Set up the message
    message = f"""\
    Subject: {subject}

    {body}

    {url}
    """

    # Gmail's SMTP server details
    smtp_server = "smtp.gmail.com"
    smtp_port = 465  # For SSL

    # try:
    #     # Create a secure SSL context
    #     context = ssl.create_default_context()

    #     # Connect to Gmail's SMTP server
    #     with smtplib.SMTP_SSL(smtp_server, smtp_port, context=context) as server:
    #         server.login(sender_email, password)
    #         for rec in receiver_email:
    #             server.sendmail(sender_email, rec, message)
    #         print("Email sent successfully!")
    # except Exception as e:
    #     print(f"Error: {e}")

    try:
        # Create a secure SSL context
        context = ssl.create_default_context()

        # Connect to Gmail's SMTP server
        with smtplib.SMTP_SSL(smtp_server, smtp_port, context=context) as server:
            server.login(sender_email, password)

            # Send email to each recipient in the list
            for receiver_email in receiver_emails:
                server.sendmail(sender_email, receiver_email, message)
                print(f"Email sent to {receiver_email} successfully!")

    except Exception as e:
        print(f"Error: {e}")


# Call the function to send email
# send_email()

if __name__ == "__main__":
    app.run(debug=True)
    # send_email()




