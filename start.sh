#!/bin/bash

# iSING Lab Homepage Deployment Script
# Simple shell script to start the website

echo "🚀 Starting iSING Lab Homepage..."

# Check if Python is available
if ! command -v python3 &> /dev/null; then
    echo "❌ Error: Python 3 is not installed or not in PATH"
    echo "Please install Python 3 and try again"
    exit 1
fi

# Make the Python script executable
chmod +x deploy.py

# Start the server
python3 deploy.py "$@"
