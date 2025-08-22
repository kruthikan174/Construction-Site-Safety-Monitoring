🦺 Vision-Based Construction Site Safety Monitoring


📌 Overview

This project is an AI-powered surveillance system for construction site safety.

It automatically detects Personal Protective Equipment (PPE) compliance (helmet, vest, mask, boots) using YOLOv8, and identifies fall-prone postures using MediaPipe Pose.

Supervisors can monitor compliance via a React.js dashboard that integrates with a Flask backend, with real-time alerts (<1.5s latency) through Socket.IO and email notifications.


🚀 Features

✅ PPE Detection (Helmet, Mask, Vest, Boots) using YOLOv8

🧍 Fall-prone posture detection using MediaPipe Pose

⚡ Real-time dashboard with alerts <1.5s

📩 Automated email alerts to supervisors (SMTP)

🎥 Works on images, video files, and CCTV/IP feeds

📊 Achieved 94.6% mAP@0.5 on PPE detection and >90% accuracy in fall detection


🛠 Tech Stack

AI/ML

YOLOv8 (Ultralytics) → PPE object detection

MediaPipe Pose → Fall detection (33 body landmarks)

Backend

Flask (Python) → REST API endpoints

SMTP (Gmail) → Email notifications

Frontend
React.js → Dashboard UI

Socket.IO → Real-time alerts

Other Tools
OpenCV → Video frame preprocessing

Numpy / Pandas → Data handling


⚙️ How It Works

🎥 Video/Image captured (CCTV, webcam, or upload)

📦 YOLOv8 → Detect PPE compliance (helmet/vest/mask/boots)

🧍 MediaPipe Pose → Check head vs hip alignment → detect falls

🌐 Flask API returns detection results as JSON

📊 React.js dashboard displays live alerts

📩 Email alert sent to supervisors if violation/fall detected


📊 Results

PPE Detection: 94.6% mAP@0.5

Fall Detection: >90% accuracy

Latency: Alerts within <1.5s

False Positives: Reduced by 22% (post-processing filters)


🎯 Future Enhancements

Deployment on edge devices (Jetson Nano / Raspberry Pi)

Integration with cloud storage (Firebase/AWS) for logs

Worker face recognition for attendance + safety mapping

Mobile app for supervisor alerts
