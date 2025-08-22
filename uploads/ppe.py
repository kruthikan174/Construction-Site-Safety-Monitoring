from ultralytics import YOLO
import cv2
import math
import cvzone

# Load the YOLO model
breakpoint()
model = YOLO('best.pt')

# Define class names
classNames = ['Boots', 'Hardhat', 'Hook', 'Machinary', 'Mask', 'No-Hardhat', 'No-mask', 'No-safetyvest', 'Person', 'Safetyvest']

# Load the input image
input_image_path = "img6.jpg"
output_image_path = "output_4.jpeg"
img = cv2.imread(input_image_path)

# Perform detection
results = model(img)

# Initialize the helmet detection flag
helmet_present = False

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
        print(cls)
        
        # Check if a hardhat is present
        if currentClass == 'Hardhat' and conf >= 0.5:
            helmet_present = True

        # Set color based on class
        if conf >= 0.5:
            if currentClass in ['Hardhat', 'Boots', 'Hook', 'Machinary', 'Safetyvest', 'Mask']:
                myColor = (0, 255, 0)  # Green
            elif currentClass == 'Person':
                myColor = (255, 0, 0)  # Blue
            else:
                myColor = (0, 0, 255)  # Red

            # Draw bounding box and label
            cvzone.putTextRect(img, f'{classNames[cls]} {conf}',
                               (max(0, x1), max(35, y1)),
                               scale=1, thickness=2, colorB=myColor, colorT=(255, 255, 255), colorR=myColor, offset=5)
            cv2.rectangle(img, (x1, y1), (x2, y2), myColor, 3)

# Resize the image
scale_percent = 150  # Resize scale (e.g., 150% larger)
width = int(img.shape[1] * scale_percent / 100)
height = int(img.shape[0] * scale_percent / 100)
dim = (width, height)
resized_img = cv2.resize(img, dim, interpolation=cv2.INTER_LINEAR)

print(helmet_present)

# Save and display the resized output image
# cv2.imwrite(output_image_path, resized_img)
# cv2.imshow("Detected Image", resized_img)
# cv2.waitKey(0)
# cv2.destroyAllWindows()
