#!/bin/bash

# Detener el script si hay errores
set -e

echo "🚀 Iniciando instalación y ejecución del proyecto NoteVault..."

# Iniciar BACKEND
echo "📦 Instalando dependencias del backend..."
cd backend
npm install

echo "🖥️ Levantando el backend..."
npm run dev &

# Iniciar FRONTEND
echo "📦 Instalando dependencias del frontend..."
cd ../frontend
npm install

echo "🖥️ Levantando el frontend..."
npm run dev
