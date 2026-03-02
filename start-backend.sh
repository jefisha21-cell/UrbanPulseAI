#!/bin/bash

echo "Starting Smart Infrastructure Monitoring Backend..."
echo ""

cd backend

if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

echo "Activating virtual environment..."
source venv/bin/activate

echo "Installing dependencies..."
pip install -r requirements.txt

echo ""
echo "Starting FastAPI server on http://localhost:8000"
echo ""
python main.py
