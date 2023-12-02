import cv2 
import numpy as np 
import matplotlib.pyplot as plt 
  
image = cv2.imread('./img/aersh.jpg') 
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY) 
blur = cv2.GaussianBlur(gray, (11, 11), 0) 
canny = cv2.Canny(blur, 30, 150, 3) 
dilated = cv2.dilate(canny, (1, 1), iterations=0)
contours, _  = cv2.findContours(dilated.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE) 
threshold = 100
filtered_contours = [c for c in contours if cv2.contourArea(c) >= threshold]
image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB) 
cv2.drawContours(image, filtered_contours, -1, (0, 255, 0), 2) 
plt.imshow(image)
plt.show()



# import cv2 
# import numpy as np 
# import matplotlib.pyplot as plt 

# image = cv2.imread('./img/aersh.jpg') 
# gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY) 
# plt.imshow(gray) 
# plt.show()

# # Utilizar un detector de bordes, como Canny
# edges = cv2.Canny(gray, 50, 150)

# # Encontrar contornos en la imagen
# contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

# # Definir un área mínima
# area_minima = 10  # Ajusta este valor según tus necesidades

# # Filtrar contornos por área mínima
# filtered_contours = [cnt for cnt in contours if cv2.contourArea(cnt) > area_minima]

# # Dibujar los contornos filtrados en la imagen original
# cv2.drawContours(image, filtered_contours, -1, (0, 255, 0), 2)

# # Dibujar los centroides
# for cnt in filtered_contours:
#     # Calcular el momento del contorno
#     M = cv2.moments(cnt)
    
#     # Evitar la división por cero al calcular el centroide
#     if M["m00"] != 0:
#         cx = int(M["m10"] / M["m00"])
#         cy = int(M["m01"] / M["m00"])
        
#         # Dibujar un círculo en el centroide
#         cv2.circle(image, (cx, cy), 5, (255, 0, 0), -1)

# # Mostrar la imagen resultante
# cv2.imshow('Objetos Identificados con Centroides', image)
# cv2.waitKey(0)
# cv2.destroyAllWindows()

