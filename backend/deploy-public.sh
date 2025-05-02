#!/bin/bash

# Set project path
cd /Users/nikitasairam/Downloads/lmsys-chatbot-arena/Projects/job

# Remove existing .vercel directory to start fresh
rm -rf .vercel

# Get Vercel token
TOKEN=$(vercel whoami --token)

# Deploy with public access
echo "Deploying with public access..."
vercel --prod --confirm --public --token $TOKEN

echo "Deployment complete! Your site should now be publicly accessible." 