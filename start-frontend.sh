#!/bin/bash

echo "Starting Smart Infrastructure Monitoring Frontend..."
echo ""

cd frontend

if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

echo ""
echo "Starting Vite dev server on http://localhost:3000"
echo ""
npm run dev
