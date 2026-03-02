# Installation Guide

## Quick Start (5 Minutes)

### Step 1: Clone or Download
Download the project to your local machine.

### Step 2: Backend Setup

```bash
# Navigate to backend folder
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run backend server
python main.py
```

✅ Backend should now be running on `http://localhost:8000`

### Step 3: Frontend Setup (New Terminal)

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

✅ Frontend should now be running on `http://localhost:3000`

### Step 4: Access Application

Open your browser and go to: `http://localhost:3000`

## Detailed Installation

### System Requirements

- **Node.js**: v18.0.0 or higher
- **Python**: v3.9.0 or higher
- **npm**: v9.0.0 or higher (comes with Node.js)
- **RAM**: Minimum 4GB
- **Disk Space**: 500MB free space

### Verify Prerequisites

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check Python version
python --version
```

### Backend Installation (Detailed)

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Create Python virtual environment**
```bash
python -m venv venv
```

3. **Activate virtual environment**

Windows (Command Prompt):
```bash
venv\Scripts\activate.bat
```

Windows (PowerShell):
```bash
venv\Scripts\Activate.ps1
```

macOS/Linux:
```bash
source venv/bin/activate
```

4. **Upgrade pip (recommended)**
```bash
python -m pip install --upgrade pip
```

5. **Install Python dependencies**
```bash
pip install -r requirements.txt
```

6. **Verify installation**
```bash
pip list
```

You should see:
- fastapi
- uvicorn
- pandas
- numpy
- scikit-learn
- python-multipart

7. **Run the backend server**
```bash
python main.py
```

Expected output:
```
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000
```

8. **Test backend API**

Open browser and visit: `http://localhost:8000`

You should see:
```json
{
  "message": "Smart Infrastructure Monitoring API",
  "status": "active"
}
```

### Frontend Installation (Detailed)

1. **Open new terminal** (keep backend running)

2. **Navigate to frontend directory**
```bash
cd frontend
```

3. **Install Node.js dependencies**
```bash
npm install
```

This will install:
- React and React DOM
- Vite
- Tailwind CSS
- Framer Motion
- React Router
- Recharts
- Leaflet
- Axios
- Lucide React

4. **Verify installation**
```bash
npm list --depth=0
```

5. **Run development server**
```bash
npm run dev
```

Expected output:
```
VITE v5.0.8  ready in 500 ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

6. **Access the application**

Open browser and visit: `http://localhost:3000`

You should see the landing page with:
- "Smart Infrastructure Health & Anomaly Monitoring"
- Feature cards
- "Upload Infrastructure Data" button

## Troubleshooting

### Backend Issues

**Problem**: `python: command not found`
- **Solution**: Install Python from python.org or use `python3` instead

**Problem**: `pip: command not found`
- **Solution**: Use `python -m pip` instead of `pip`

**Problem**: Port 8000 already in use
- **Solution**: Kill the process or change port in `main.py`:
```python
uvicorn.run(app, host="0.0.0.0", port=8001)
```

**Problem**: Module not found errors
- **Solution**: Ensure virtual environment is activated and run:
```bash
pip install -r requirements.txt --force-reinstall
```

### Frontend Issues

**Problem**: `npm: command not found`
- **Solution**: Install Node.js from nodejs.org

**Problem**: Port 3000 already in use
- **Solution**: Vite will automatically use next available port (3001, 3002, etc.)

**Problem**: Module resolution errors
- **Solution**: Delete `node_modules` and reinstall:
```bash
rm -rf node_modules
npm install
```

**Problem**: Tailwind styles not loading
- **Solution**: Restart dev server:
```bash
# Press Ctrl+C to stop
npm run dev
```

### CORS Issues

If you see CORS errors in browser console:

1. Verify backend is running on port 8000
2. Check `backend/main.py` CORS settings:
```python
allow_origins=["http://localhost:3000"]
```

3. Restart both servers

### Map Not Loading

If Leaflet map doesn't display:

1. Check browser console for errors
2. Verify internet connection (map tiles load from CDN)
3. Clear browser cache

## Production Build

### Backend Production

```bash
cd backend
pip install gunicorn
gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### Frontend Production

```bash
cd frontend
npm run build
```

Build output will be in `frontend/dist/`

Serve with:
```bash
npm run preview
```

Or use any static file server:
```bash
npx serve dist
```

## Docker Setup (Optional)

### Backend Dockerfile

```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python", "main.py"]
```

### Frontend Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "dev", "--", "--host"]
```

### Docker Compose

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
```

Run with:
```bash
docker-compose up
```

## Next Steps

1. Upload sample data from `sample-data/` folder
2. Explore all pages using sidebar navigation
3. Test anomaly detection and predictive features
4. Customize for your specific use case

## Support

For issues or questions:
1. Check this installation guide
2. Review README.md
3. Check browser console for errors
4. Verify all prerequisites are installed

---

**Happy Monitoring! 🚀**
