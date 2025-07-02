#!/bin/bash

# Setup local environment for GitHub Pages testing
# Navigate to the script directory
cd "$(dirname "$0")"

# Ensure bundle is installed
if ! command -v bundle &> /dev/null; then
    echo "Bundler is not installed. Installing..."
    gem install bundler
fi

# Configure bundler to install gems locally
bundle config set --local path 'vendor/bundle'

# Install dependencies
echo "Installing dependencies..."
bundle install

# Check if a port is provided as argument, otherwise use default (4000)
PORT=${1:-4000}

# First, let's check if the port is already in use
if lsof -i:$PORT > /dev/null 2>&1; then
    echo "Port $PORT is already in use!"
    
    # Ask if user wants to kill the process using the port
    read -p "Do you want to kill the process using port $PORT? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        PID=$(lsof -t -i:$PORT)
        echo "Killing process $PID using port $PORT..."
        kill -9 $PID
        sleep 1
    else
        # Try another port
        PORT=$((PORT + 1))
        while lsof -i:$PORT > /dev/null 2>&1; do
            PORT=$((PORT + 1))
        done
        echo "Using alternative port: $PORT"
    fi
fi

# Run the Jekyll server
echo "Starting Jekyll server at http://127.0.0.1:$PORT/"
bundle exec jekyll serve --port $PORT

# To stop the server, press Ctrl+C
