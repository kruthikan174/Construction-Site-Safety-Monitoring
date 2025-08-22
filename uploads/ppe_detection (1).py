from ultralytics import YOLO
import cv2
import cvzone
import math
#for webcam
cap=cv2.VideoCapture(0)
cap.set(3, 640)
cap.set(4, 480)
#cap=cv2.VideoCapture('../Videos/ppe-3-1.mp4')

model=YOLO('best.pt')

classNames = ['Boots', 'Hardhat', 'Hook', 'Machinary', 'No-Hardhat', 'No-mask', 'No-safetyvest', 'Person', 'Safetyvest']
myColor = (0,0,255)
while True:
    success, img= cap.read()
    results= model(img, stream=True)
    for r in results:
        boxes = r.boxes
        for box in boxes:
            #Bounding Box
            x1,y1,x2,y2= box.xyxy[0]
            x1, y1, x2, y2 = int(x1) ,int(y1),int(x2),int(y2)
            #cv2.rectangle(img, (x1, y1), (x2, y2), (255, 0, 255), 3)
            w,h = x2-x1, y2-y1
            #cvzone.cornerRect(img, (x1,y1,w,h))
            #Confidence
            conf= math.ceil((box.conf[0]*100))/100
            #Class name
            cls= int(box.cls[0])
            currentClass= classNames[cls]
            if conf >= 0.5:
                if currentClass == 'Hardhat' or currentClass == 'Boots' or currentClass == 'Hook' or currentClass == 'Machinary' or currentClass == 'Safetyvest':
                    myColor=(0,255,0)
                elif currentClass == 'Person':
                    myColor=(255,0,0)
                else:
                    myColor=(0,0,255)
                cvzone.putTextRect(img,f'{classNames[cls]} {conf}',(max(0,x1),max(35,y1)), scale=1, thickness=2, colorB=myColor, colorT=(255,255,255), colorR=myColor, offset=5)
                cv2.rectangle(img, (x1, y1), (x2, y2), myColor, 3)
    cv2.imshow("Image",img)
    cv2.waitKey(1)