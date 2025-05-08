#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Setting up Open WebUI Development Environment${NC}"

# Check if conda is available
if ! command -v conda &> /dev/null; then
    echo -e "${RED}Conda is not installed or not in PATH. Please install conda first.${NC}"
    exit 1
fi

# Check if open-webui environment exists
if ! conda info --envs | grep -q "open-webui"; then
    echo -e "${YELLOW}Creating conda environment 'open-webui' with Python 3.11...${NC}"
    conda create -y --name open-webui python=3.11
else
    echo -e "${GREEN}Using existing conda environment 'open-webui'${NC}"
fi

echo -e "${YELLOW}Activating conda environment and installing dependencies...${NC}"

# Run frontend in a separate terminal
echo -e "${YELLOW}Starting frontend development server...${NC}"
echo -e "${YELLOW}Run this in a separate terminal:${NC}"
echo -e "${GREEN}cd $(pwd) && npm install && npm run dev${NC}"

# Run backend with conda
echo -e "${YELLOW}To start the Python backend, run this in a separate terminal:${NC}"
echo -e "${GREEN}cd $(pwd) && conda activate open-webui && cd backend && pip install -r requirements.txt && python -m uvicorn open_webui.main:app --host 0.0.0.0 --port 8080 --reload${NC}"

echo -e "${GREEN}Access the frontend at:${NC} http://localhost:3000"
echo -e "${GREEN}Backend API will be available at:${NC} http://localhost:8080"
echo -e "${YELLOW}Make sure to have the Python changes for getLevelNamesMapping() compatibility in place.${NC}" 