#!/bin/bash

# Build Frontend
echo "Building Frontend..."
cd frontend
npm install
npm run build
cd ..

# Build Backend
echo "Building Backend..."
cd backend
npm install
npm run build
cd .. 