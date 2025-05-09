#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting Open WebUI Development Environment${NC}"

# Check if ports are available
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo -e "${RED}Port 3000 is already in use. Please free it and try again.${NC}"
    exit 1
fi

if lsof -Pi :8080 -sTCP:LISTEN -t >/dev/null ; then
    echo -e "${RED}Port 8080 is already in use. Please free it and try again.${NC}"
    exit 1
fi

# Create necessary directories
mkdir -p backend/data
chmod -R 777 backend/data

# Start the Python backend in a background terminal
echo -e "${YELLOW}Starting Python backend...${NC}"
cd backend
pip install -r requirements.txt
python -m uvicorn open_webui.main:app --host 0.0.0.0 --port 8080 --reload &
BACKEND_PID=$!
cd ..

# Wait for backend to initialize
echo -e "${YELLOW}Waiting for backend to initialize...${NC}"
sleep 5

# Start the frontend development server in a background terminal
echo -e "${YELLOW}Starting frontend development server...${NC}"
npm install
npm run dev &
FRONTEND_PID=$!

# Function to handle script termination
cleanup() {
    echo -e "${YELLOW}Shutting down servers...${NC}"
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    echo -e "${GREEN}Development environment stopped${NC}"
    exit 0
}

# Catch termination signals
trap cleanup SIGINT SIGTERM

echo -e "${GREEN}Development environment is running!${NC}"
echo -e "${YELLOW}Frontend:${NC} http://localhost:3000"
echo -e "${YELLOW}Backend:${NC} http://localhost:8080"
echo -e "${YELLOW}Press Ctrl+C to stop both servers${NC}"

# Keep the script running
wait $FRONTEND_PID $BACKEND_PID 