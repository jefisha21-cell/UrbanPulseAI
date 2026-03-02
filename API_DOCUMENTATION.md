# API Documentation

## Base URL
```
http://localhost:8000
```

## Endpoints

### 1. Health Check

**GET** `/`

Check if API is running.

**Response:**
```json
{
  "message": "Smart Infrastructure Monitoring API",
  "status": "active"
}
```

---

### 2. Upload Datasets

**POST** `/api/upload`

Upload infrastructure datasets for analysis.

**Content-Type:** `multipart/form-data`

**Parameters:**
- `assets` (required): CSV file with asset information
- `sensor` (required): CSV file with sensor readings
- `maintenance` (optional): CSV file with maintenance records
- `weather` (optional): CSV file with weather data
- `traffic` (optional): CSV file with traffic data
- `environmental` (optional): CSV file with environmental data
- `incident` (optional): CSV file with incident reports

**Example Request (cURL):**
```bash
curl -X POST http://localhost:8000/api/upload \
  -F "assets=@assets.csv" \
  -F "sensor=@sensor.csv"
```

**Response:**
```json
{
  "message": "Data uploaded and processed successfully",
  "total_assets": 15,
  "status": "success"
}
```

---

### 3. Dashboard Overview

**GET** `/api/dashboard/overview`

Get dashboard statistics and overview data.

**Response:**
```json
{
  "totalAssets": 1247,
  "healthy": 856,
  "degraded": 289,
  "critical": 102,
  "riskDistribution": [
    {
      "name": "Healthy",
      "value": 856,
      "color": "#10b981"
    },
    {
      "name": "Degraded",
      "value": 289,
      "color": "#f59e0b"
    },
    {
      "name": "Critical",
      "value": 102,
      "color": "#ef4444"
    }
  ],
  "topRiskAssets": [
    {
      "id": "TN_ASSET_014",
      "district": "Chennai",
      "risk": 87,
      "status": "Critical"
    }
  ],
  "trendData": [
    {
      "day": "Day 1",
      "risk": 45
    }
  ]
}
```

---

### 4. Get Anomalies

**GET** `/api/anomalies`

Get detected anomalies with optional filtering.

**Query Parameters:**
- `district` (optional): Filter by district name
- `assetType` (optional): Filter by asset type
- `severity` (optional): Filter by severity (Critical, Degraded, Healthy)

**Example Request:**
```bash
curl "http://localhost:8000/api/anomalies?district=Chennai&severity=Critical"
```

**Response:**
```json
[
  {
    "id": 1,
    "assetId": "TN_ASSET_014",
    "district": "Chennai",
    "issue": "High Structural Stress",
    "value": 92,
    "status": "Critical",
    "time": "2h ago"
  }
]
```

---

### 5. Asset Details

**GET** `/api/assets/{asset_id}`

Get detailed information for a specific asset.

**Path Parameters:**
- `asset_id`: Asset identifier (e.g., TN_ASSET_014)

**Example Request:**
```bash
curl http://localhost:8000/api/assets/TN_ASSET_014
```

**Response:**
```json
{
  "id": "TN_ASSET_014",
  "name": "Chennai Metro Bridge",
  "district": "Chennai",
  "type": "Bridge",
  "healthScore": 32,
  "riskScore": 87,
  "status": "Critical",
  "lastInspection": "2024-02-15",
  "healthTrend": [
    {
      "month": "Jan",
      "score": 65
    }
  ],
  "riskBreakdown": [
    {
      "factor": "Structural Stress",
      "value": 92
    }
  ],
  "maintenanceTimeline": [
    {
      "date": "2024-01-10",
      "event": "Routine Inspection",
      "status": "completed"
    }
  ],
  "aiExplanation": "This asset is classified as CRITICAL..."
}
```

---

### 6. Predictive Risk Analysis

**GET** `/api/predictive/risk`

Get predictive risk analysis and failure probability.

**Response:**
```json
{
  "failureProbability": 72,
  "earlyWarningScore": 85,
  "forecastData": [
    {
      "day": "Today",
      "risk": 62,
      "predicted": 62
    },
    {
      "day": "Day 1",
      "risk": null,
      "predicted": 65
    }
  ],
  "topRiskAssets": [
    {
      "id": "TN_ASSET_014",
      "probability": 87,
      "days": 3
    }
  ]
}
```

---

### 7. Geographic Map Data

**GET** `/api/map/data`

Get geographic coordinates and status for all assets.

**Response:**
```json
[
  {
    "id": "TN_ASSET_014",
    "name": "Chennai Metro Bridge",
    "lat": 13.0827,
    "lng": 80.2707,
    "status": "Critical",
    "risk": 87,
    "district": "Chennai"
  }
]
```

---

### 8. Maintenance Plan

**POST** `/api/maintenance/plan`

Generate maintenance plan based on resource parameters.

**Content-Type:** `application/json`

**Request Body:**
```json
{
  "budget": 5000000,
  "teams": 10,
  "capacity": 5
}
```

**Response:**
```json
{
  "priorityRanking": [
    {
      "rank": 1,
      "assetId": "TN_ASSET_014",
      "risk": 87,
      "action": "Immediate structural reinforcement",
      "cost": 850000,
      "days": 7
    }
  ],
  "totalCost": 2520000,
  "totalDays": 23,
  "recommendations": [
    "Prioritize TN_ASSET_014 for immediate intervention within 3 days",
    "Allocate 3 teams to critical assets (Rank 1-2) for parallel execution"
  ]
}
```

---

## Error Responses

All endpoints may return error responses in the following format:

**400 Bad Request:**
```json
{
  "detail": "Assets and Sensor data are required"
}
```

**404 Not Found:**
```json
{
  "detail": "Asset not found"
}
```

**500 Internal Server Error:**
```json
{
  "detail": "Internal server error message"
}
```

---

## Data Models

### Risk Score Calculation

```
Risk Score = 
  0.25 × structural_stress +
  0.20 × traffic_load +
  0.15 × corrosion_index +
  0.15 × weather_severity +
  0.15 × maintenance_delay +
  0.10 × incident_severity
```

### Health Classification

- **Healthy**: Risk Score < 40
- **Degraded**: Risk Score 40-70
- **Critical**: Risk Score > 70

---

## Rate Limiting

Currently no rate limiting is implemented. For production use, consider implementing rate limiting middleware.

---

## Authentication

Currently no authentication is required. For production use, implement JWT or OAuth2 authentication.

---

## CORS Configuration

The API allows requests from:
- `http://localhost:3000` (development)

For production, update CORS settings in `main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-domain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## Testing the API

### Using cURL

```bash
# Health check
curl http://localhost:8000/

# Get dashboard
curl http://localhost:8000/api/dashboard/overview

# Get anomalies
curl http://localhost:8000/api/anomalies

# Get asset details
curl http://localhost:8000/api/assets/TN_ASSET_014
```

### Using Python

```python
import requests

# Health check
response = requests.get('http://localhost:8000/')
print(response.json())

# Upload files
files = {
    'assets': open('assets.csv', 'rb'),
    'sensor': open('sensor.csv', 'rb')
}
response = requests.post('http://localhost:8000/api/upload', files=files)
print(response.json())

# Get dashboard
response = requests.get('http://localhost:8000/api/dashboard/overview')
print(response.json())
```

### Using Postman

1. Import the API endpoints
2. Set base URL to `http://localhost:8000`
3. For file uploads, use form-data with file type
4. For JSON requests, set Content-Type to application/json

---

## WebSocket Support (Future)

Real-time updates can be implemented using WebSocket connections for:
- Live sensor data streaming
- Real-time anomaly alerts
- Dashboard auto-refresh

---

**API Version:** 1.0.0  
**Last Updated:** March 2024
