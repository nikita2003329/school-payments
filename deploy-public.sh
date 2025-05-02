#!/bin/bash

# Check if Vercel token is set
if [ -z "$VERCEL_TOKEN" ]; then
    echo "Error: VERCEL_TOKEN environment variable is not set"
    exit 1
fi

# Set project path
cd /Users/nikitasairam/Downloads/lmsys-chatbot-arena/Projects/job

# Remove existing .vercel directory to start fresh
rm -rf .vercel

# Deploy with public access
echo "Deploying with public access..."
vercel --prod --confirm --public --token $VERCEL_TOKEN

echo "Deployment complete! Your site should now be publicly accessible." 