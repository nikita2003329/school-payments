#!/bin/bash

# Set project path
cd /Users/nikitasairam/Downloads/lmsys-chatbot-arena/Projects/job

# Clean up previous builds
echo "Cleaning up previous builds..."
rm -rf frontend/dist
rm -rf backend/dist
rm -rf .vercel

# Build frontend
echo "Building frontend..."
cd frontend
npm install
npm run build
cd ..

# Build backend
echo "Building backend..."
cd backend
npm install
npm run build
cd ..

# Copy frontend build files to the root directory
echo "Copying frontend build files..."
cp -r frontend/dist/* .

# Deploy to Vercel
echo "Deploying to Vercel..."
vercel --prod

echo "Deployment complete! Your site should now be accessible." 