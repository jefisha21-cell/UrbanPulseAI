# Smart Infrastructure Health & Anomaly Monitoring System - Tamil Nadu

A professional, enterprise-level web application for real-time infrastructure monitoring, anomaly detection, and predictive maintenance planning across Tamil Nadu.

## 🎯 Features

- **Real-time Dashboard**: Executive overview with health metrics and risk distribution
- **Anomaly Detection**: AI-powered detection using Z-score and moving average methods
- **Predictive Risk Analysis**: Forecast potential failures with ML algorithms
- **Geographic Visualization**: Interactive Tamil Nadu map with color-coded asset markers
- **Maintenance Planner**: Smart resource allocation and decision support
- **Asset Details**: Deep dive into individual asset health trends and risk factors
- **Multi-page Navigation**: Smooth animated transitions between pages
- **Light Theme**: Clean, modern enterprise design

## 🛠 Tech Stack

### Frontend
- **React.js** with Vite
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **Recharts** for data visualization
- **Leaflet** for geographic maps
- **Axios** for API calls
- **Lucide React** for icons

### Backend
- **FastAPI** (Python)
- **Pandas** for data processing
- **NumPy** for numerical operations
- **Scikit-learn** for anomaly detection
- **Uvicorn** ASGI server

## 📁 Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── UploadPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── AnomalyPage.jsx
│   │   │   ├── AssetDetailPage.jsx
│   │   │   ├── PredictiveRiskPage.jsx
│   │   │   ├── GeoMapPage.jsx
│   │   │   └── MaintenancePlannerPage.jsx
│   │   ├── layout/
│   │   │   ├── Layout.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── index.html
├── backend/
│   ├── main.py
│   └── requirements.txt
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- Python (v3.9 or higher)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
```

3. Activate virtual environment:
- Windows:
```bash
venv\Scripts\activate
```
- macOS/Linux:
```bash
source venv/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Run the backend server:
```bash
python main.py
```

Backend will run on `http://localhost:8000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## 📊 API Endpoints

### Upload Data
```
POST /api/upload
Content-Type: multipart/form-data

Files:
- assets (required): CSV file with asset information
- sensor (required): CSV file with sensor readings
- maintenance (optional): CSV file with maintenance records
- weather (optional): CSV file with weather data
- traffic (optional): CSV file with traffic data
- environmental (optional): CSV file with environmental data
- incident (optional): CSV file with incident reports
```

### Dashboard Overview
```
GET /api/dashboard/overview

Response:
{
  "totalAssets": 1247,
  "healthy": 856,
  "degraded": 289,
  "critical": 102,
  "riskDistribution": [...],
  "topRiskAssets": [...],
  "trendData": [...]
}
```

### Get Anomalies
```
GET /api/anomalies?district=Chennai&severity=Critical

Response: Array of anomaly objects
```

### Asset Details
```
GET /api/assets/{asset_id}

Response: Detailed asset information with trends and risk breakdown
```

### Predictive Risk
```
GET /api/predictive/risk

Response: Failure probability and forecast data
```

### Geographic Map Data
```
GET /api/map/data

Response: Array of assets with coordinates and status
```

### Maintenance Plan
```
POST /api/maintenance/plan
Content-Type: application/json

Body:
{
  "budget": 5000000,
  "teams": 10,
  "capacity": 5
}

Response: Priority ranking and recommendations
```

## 🧮 Risk Calculation Formula

```
Risk Score = 
  0.25 × structural_stress +
  0.20 × traffic_load +
  0.15 × corrosion_index +
  0.15 × weather_severity +
  0.15 × maintenance_delay +
  0.10 × incident_severity
```

## 🏥 Health Classification

- **Healthy**: Risk Score < 40
- **Degraded**: Risk Score 40-70
- **Critical**: Risk Score > 70

## 🎨 Design Features

- **Light Theme**: Clean white/light gray background with soft blue accents
- **Smooth Animations**: Page transitions, card hover effects, animated counters
- **Responsive Layout**: Desktop and tablet optimized
- **Modern UI**: Rounded cards, soft shadows, clean typography
- **Status Colors**:
  - Healthy: Green (#10b981)
  - Degraded: Amber (#f59e0b)
  - Critical: Red (#ef4444)

## 📝 Sample CSV Format

### Assets CSV
```csv
asset_id,district,asset_type,location
TN_ASSET_001,Chennai,Bridge,Anna Salai
TN_ASSET_002,Coimbatore,Road,RS Puram
```

### Sensor CSV
```csv
asset_id,timestamp,structural_stress,traffic_load,corrosion_index
TN_ASSET_001,2024-03-01,75,82,65
TN_ASSET_002,2024-03-01,45,60,30
```

## 🔧 Development


## 🚀 Quick Steps to Run the Project

### Step 1: Start Backend
Open Command Prompt or PowerShell and run:

cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python main.py
Wait for: Uvicorn running on http://0.0.0.0:8000

### Step 2: Start Frontend
Open a NEW Command Prompt/PowerShell window and run:

cd frontend
npm install
npm run dev
Wait for: Local: http://localhost:3000/

### Step 3: Open Browser
Go to: http://localhost:3000


```

### ⚡ Even Faster (One-Click)
Backend:
Double-click: start-backend.bat

Frontend:
Double-click: start-frontend.bat


```

### ✅ Verify It's Working
Backend Check: http://localhost:8000

Should show: {"message": "Smart Infrastructure Monitoring API", "status": "active"}
Frontend Check: http://localhost:3000

Should show: Beautiful landing page with "Smart Infrastructure Health & Anomaly Monitoring"


``


### 🎯 Quick Demo Flow
Click "Upload Infrastructure Data"
Upload 
the datasets in testing_csv or ""the sample datasets are already loaded inside"" 
Click "Process & Analyze"
Explore all pages via sidebar

## 🎯 Key Pages

1. **Landing Page**: Hero section with feature cards
2. **Upload Page**: Drag & drop file upload with progress
3. **Dashboard**: Overview with stats, charts, and top risk assets
4. **Anomaly Detection**: Filtered table with trend visualization
5. **Asset Detail**: Individual asset analysis with AI explanation
6. **Predictive Risk**: Failure probability with forecast graph
7. **Geo Map**: Interactive Tamil Nadu map with asset markers
8. **Maintenance Planner**: Resource allocation and smart recommendations

## 🚨 Anomaly Detection Methods

1. **Z-Score Method**: Detects outliers based on standard deviation
2. **Moving Average Deviation**: Identifies trend anomalies
3. **Threshold-based Alerts**: Configurable warning levels

## 💡 AI Features

- Risk score calculation with weighted factors
- Health status classification
- Human-readable explanations
- Predictive failure probability
- Smart maintenance recommendations
- Priority ranking algorithm

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🤝 Contributing

This is a demonstration project for Tamil Nadu Government Infrastructure Monitoring.

## 📄 License

MIT License



---

**Built with ❤️ for Tamil Nadu Government Initiative**
