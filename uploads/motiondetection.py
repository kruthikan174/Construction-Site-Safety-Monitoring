# import cv2
# import mediapipe as mp

# # Initialize MediaPipe pose detection model
# mp_pose = mp.solutions.pose
# pose = mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5)

# # Start video capture (you can replace this with a video file path if needed)
# # cap = cv2.VideoCapture(0)

# cap=cv2.VideoCapture('v1.mp4')

# while cap.isOpened():
#     ret, frame = cap.read()
#     if not ret:
#         break

#     # Convert frame to RGB (MediaPipe expects RGB images)
#     rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
#     results = pose.process(rgb_frame)

#     # Check if landmarks were found
#     if results.pose_landmarks:
#         for landmark in results.pose_landmarks.landmark:
#             # Access coordinates of key points such as shoulders, hips, etc.
#             # Example: x, y of the left shoulder
#             shoulder_x = results.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_SHOULDER].x
#             shoulder_y = results.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_SHOULDER].y
#             # For simplicity, we print the coordinates of key body parts
#             print(f"Left Shoulder: x={shoulder_x}, y={shoulder_y}")

#         # You can analyze the relative position of body parts to detect a fall
#         # Example logic: If the distance between key body parts changes dramatically (lying down), trigger a fall alarm.

#     # Display the frame with pose landmarks
#     mp.solutions.drawing_utils.draw_landmarks(frame, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)
    
#     cv2.imshow('Fall Detection', frame)

#     # Exit on pressing 'q'
#     if cv2.waitKey(1) & 0xFF == ord('q'):
#         break

# cap.release()
# cv2.destroyAllWindows()


import cv2
import mediapipe as mp
import numpy as np
from collections import deque
# Initialize MediaPipe pose detection model
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5)
mp_drawing = mp.solutions.drawing_utils
landmark_history = deque(maxlen=10)

# Function to check for a fall
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


# Start video capture (user-provided video file)
#video_path = input("Enter the path to the video file: ")
cap = cv2.VideoCapture('v8.mp4')

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
            cv2.putText(frame, "FALL DETECTED!", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

        # Draw pose landmarks
        mp_drawing.draw_landmarks(frame, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)

    # Display the frame
    cv2.imshow('Fall Detection', frame)

    # Exit on pressing 'q'
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()

if fall_detected:
    print("Fall detected in the video!")
else:
    print("No fall detected in the video.")

