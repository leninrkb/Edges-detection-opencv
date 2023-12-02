import cv2
import numpy as np

# Cargar la imagen
image = cv2.imread("D:/downloads/WhatsApp Image 2023-12-01 at 22.08.58.jpeg")

# Convertir la imagen a escala de grises
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Utilizar un detector de bordes, como Canny
edges = cv2.Canny(gray, 50, 150)

# Encontrar contornos en la imagen
contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

# Definir un área mínima
area_minima = 10  # Ajusta este valor según tus necesidades

# Filtrar contornos por área mínima
filtered_contours = [cnt for cnt in contours if cv2.contourArea(cnt) > area_minima]

# Dibujar los contornos filtrados en la imagen original
cv2.drawContours(image, filtered_contours, -1, (0, 255, 0), 2)

# Dibujar los centroides
for cnt in filtered_contours:
    # Calcular el momento del contorno
    M = cv2.moments(cnt)
    
    # Evitar la división por cero al calcular el centroide
    if M["m00"] != 0:
        cx = int(M["m10"] / M["m00"])
        cy = int(M["m01"] / M["m00"])
        
        # Dibujar un círculo en el centroide
        cv2.circle(image, (cx, cy), 5, (255, 0, 0), -1)

# Mostrar la imagen resultante
cv2.imshow('Objetos Identificados con Centroides', image)
cv2.waitKey(0)
cv2.destroyAllWindows()

