@echo off

REM Iniciar MongoDB de manera oculta
start /B "" mongod

REM Esperar unos segundos para que MongoDB se inicie completamente
timeout /t 5

REM Navegar al directorio del backend y ejecutar el servidor de manera oculta
cd "C:\Users\ALBERTO\Documents\Aplicacion_ICTEC\app-ictec-2\app-ictec\app-ictec"
start /B "" npm run dev

REM Esperar unos segundos para que el servidor backend se inicie
timeout /t 5

REM Navegar al directorio del frontend y ejecutar el servidor de manera oculta
cd "C:\Users\ALBERTO\Documents\Aplicacion_ICTEC\app-ictec-2\app-ictec\app-ictec\client"
start /B "" npm run dev

REM Esperar unos segundos para que el servidor frontend se inicie
timeout /t 5

REM Abrir la página web en Google Chrome
start /B chrome "http://localhost:5173"
