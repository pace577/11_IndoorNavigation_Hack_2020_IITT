import cv2
from PIL import Image
img = cv2. imread('resized_floor1.png',2)
ret, img = cv2. threshold(img,240,255,cv2. THRESH_BINARY)

width =100
height =100

dimension = (width,height)
img=cv2.resize(img,dimension,interpolation=cv2.INTER_AREA)

print(img.shape)

cv2.imwrite("BW.jpg",img)

cv2. waitKey(0)
cv2. destroyAllWindows()