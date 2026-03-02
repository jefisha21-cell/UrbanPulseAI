from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import json

app = FastAPI(title="Smart Infrastructure Monitoring API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for demo
data_store = {
    "assets": None,
    "sensor": None,
    "merged": None,
}


# Helper Functions
def calculate_risk_score(row):
    """Calculate risk score based on weighted formula"""
    risk = (
        0.25 * row.get('structural_stress', 0) +
        0.20 * row.get('traffic_load', 0) +
        0.15 * row.get('corrosion_index', 0) +
        0.15 * row.get('weather_severity', 0) +
        0.15 * row.get('maintenance_delay', 0) +
        0.10 * row.get('incident_severity', 0)
    )
    return min(100, max(0, risk))


def classify_health(risk_score):
    """Classify health status based on risk score"""
    if risk_score < 40:
        return 'Healthy'
    elif risk_score <= 70:
        return 'Degraded'
    else:
        return 'Critical'


def detect_anomalies_zscore(df, column, threshold=2):
    """Detect anomalies using Z-score method"""
    if column not in df.columns:
        return []
    
    mean = df[column].mean()
    std = df[column].std()
    
    if std == 0:
        return []
    
    z_scores = np.abs((df[column] - mean) / std)
    anomalies = df[z_scores > threshold].to_dict('records')
    return anomalies


def generate_explanation(row):
    """Generate human-readable explanation for risk"""
    explanations = []
    
    if row.get('structural_stress', 0) > 70:
        explanations.append(f"High structural stress detected ({row.get('structural_stress', 0):.0f}/100)")
    
    if row.get('corrosion_index', 0) > 60:
        explanations.append(f"Significant corrosion present ({row.get('corrosion_index', 0):.0f}/100)")
    
    if row.get('traffic_load', 0) > 70:
        explanations.append(f"Traffic load exceeds normal capacity ({row.get('traffic_load', 0):.0f}/100)")
    
    if row.get('maintenance_delay', 0) > 60:
        explanations.append(f"Maintenance significantly delayed ({row.get('maintenance_delay', 0):.0f}/100)")
    
    if row.get('weather_severity', 0) > 60:
        explanations.append(f"Adverse weather impact ({row.get('weather_severity', 0):.0f}/100)")
    
    status = classify_health(row.get('risk_score', 0))
    
    if status == 'Critical':
        action = "Immediate intervention required within 7 days to prevent potential failure."
    elif status == 'Degraded':
        action = "Schedule maintenance within 30 days to prevent further deterioration."
    else:
        action = "Continue routine monitoring and maintenance schedule."
    
    explanation = " ".join(explanations) + " " + action if explanations else action
    return explanation


# API Endpoints
@app.get("/")
def read_root():
    return {"message": "Smart Infrastructure Monitoring API", "status": "active"}


@app.post("/api/upload")
async def upload_datasets(
    assets: Optional[UploadFile] = File(None),
    sensor: Optional[UploadFile] = File(None),
    maintenance: Optional[UploadFile] = File(None),
    weather: Optional[UploadFile] = File(None),
    traffic: Optional[UploadFile] = File(None),
    environmental: Optional[UploadFile] = File(None),
    incident: Optional[UploadFile] = File(None),
):
    """Upload and process infrastructure datasets"""
    try:
        # Read required files
        if not assets or not sensor:
            raise HTTPException(status_code=400, detail="Assets and Sensor data are required")
        
        df_assets = pd.read_csv(assets.file)
        df_sensor = pd.read_csv(sensor.file)
        
        # Store in memory
        data_store["assets"] = df_assets
        data_store["sensor"] = df_sensor
        
        # Merge datasets (simplified - assumes common columns exist)
        merged = df_assets.copy()
        
        # Add mock sensor data if columns don't exist
        if 'structural_stress' not in merged.columns:
            merged['structural_stress'] = np.random.randint(20, 95, len(merged))
        if 'traffic_load' not in merged.columns:
            merged['traffic_load'] = np.random.randint(30, 90, len(merged))
        if 'corrosion_index' not in merged.columns:
            merged['corrosion_index'] = np.random.randint(15, 85, len(merged))
        if 'weather_severity' not in merged.columns:
            merged['weather_severity'] = np.random.randint(20, 75, len(merged))
        if 'maintenance_delay' not in merged.columns:
            merged['maintenance_delay'] = np.random.randint(10, 90, len(merged))
        if 'incident_severity' not in merged.columns:
            merged['incident_severity'] = np.random.randint(5, 70, len(merged))
        
        # Calculate risk scores
        merged['risk_score'] = merged.apply(calculate_risk_score, axis=1)
        merged['health_status'] = merged['risk_score'].apply(classify_health)
        merged['explanation'] = merged.apply(generate_explanation, axis=1)
        
        data_store["merged"] = merged
        
        return {
            "message": "Data uploaded and processed successfully",
            "total_assets": len(merged),
            "status": "success"
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/dashboard/overview")
def get_dashboard_overview():
    """Get dashboard overview statistics"""
    if data_store["merged"] is None:
        # Return mock data if no data uploaded
        return {
            "totalAssets": 1247,
            "healthy": 856,
            "degraded": 289,
            "critical": 102,
            "riskDistribution": [
                {"name": "Healthy", "value": 856, "color": "#10b981"},
                {"name": "Degraded", "value": 289, "color": "#f59e0b"},
                {"name": "Critical", "value": 102, "color": "#ef4444"},
            ],
            "topRiskAssets": [
                {"id": "TN_ASSET_014", "district": "Chennai", "risk": 87, "status": "Critical"},
                {"id": "TN_ASSET_089", "district": "Coimbatore", "risk": 82, "status": "Critical"},
                {"id": "TN_ASSET_156", "district": "Madurai", "risk": 78, "status": "Critical"},
                {"id": "TN_ASSET_203", "district": "Trichy", "risk": 74, "status": "Degraded"},
                {"id": "TN_ASSET_312", "district": "Salem", "risk": 71, "status": "Degraded"},
            ],
            "trendData": [
                {"day": "Day 1", "risk": 45},
                {"day": "Day 5", "risk": 48},
                {"day": "Day 10", "risk": 52},
                {"day": "Day 15", "risk": 49},
                {"day": "Day 20", "risk": 55},
                {"day": "Day 25", "risk": 58},
                {"day": "Day 30", "risk": 62},
            ],
        }
    
    df = data_store["merged"]
    
    healthy = len(df[df['health_status'] == 'Healthy'])
    degraded = len(df[df['health_status'] == 'Degraded'])
    critical = len(df[df['health_status'] == 'Critical'])
    
    top_risk = df.nlargest(5, 'risk_score')[['asset_id', 'district', 'risk_score', 'health_status']].to_dict('records')
    
    return {
        "totalAssets": len(df),
        "healthy": healthy,
        "degraded": degraded,
        "critical": critical,
        "riskDistribution": [
            {"name": "Healthy", "value": healthy, "color": "#10b981"},
            {"name": "Degraded", "value": degraded, "color": "#f59e0b"},
            {"name": "Critical", "value": critical, "color": "#ef4444"},
        ],
        "topRiskAssets": [
            {
                "id": item['asset_id'],
                "district": item.get('district', 'Unknown'),
                "risk": int(item['risk_score']),
                "status": item['health_status']
            }
            for item in top_risk
        ],
        "trendData": [
            {"day": f"Day {i*5}", "risk": int(45 + i * 3 + np.random.randint(-2, 3))}
            for i in range(7)
        ],
    }


@app.get("/api/anomalies")
def get_anomalies(district: Optional[str] = None, assetType: Optional[str] = None, severity: Optional[str] = None):
    """Get detected anomalies"""
    # Return mock data for demo
    anomalies = [
        {"id": 1, "assetId": "TN_ASSET_014", "district": "Chennai", "issue": "High Structural Stress", "value": 92, "status": "Critical", "time": "2h ago"},
        {"id": 2, "assetId": "TN_ASSET_089", "district": "Coimbatore", "issue": "Corrosion Detected", "value": 78, "status": "Critical", "time": "4h ago"},
        {"id": 3, "assetId": "TN_ASSET_156", "district": "Madurai", "issue": "Traffic Overload", "value": 85, "status": "Critical", "time": "6h ago"},
        {"id": 4, "assetId": "TN_ASSET_203", "district": "Trichy", "issue": "Maintenance Delay", "value": 65, "status": "Degraded", "time": "8h ago"},
        {"id": 5, "assetId": "TN_ASSET_312", "district": "Salem", "issue": "Weather Impact", "value": 58, "status": "Degraded", "time": "10h ago"},
    ]
    
    # Apply filters
    if district:
        anomalies = [a for a in anomalies if a['district'] == district]
    if severity:
        anomalies = [a for a in anomalies if a['status'] == severity]
    
    return anomalies


@app.get("/api/assets/{asset_id}")
def get_asset_details(asset_id: str):
    """Get detailed information for a specific asset"""
    # Return mock data
    return {
        "id": asset_id,
        "name": f"{asset_id.replace('_', ' ')} Infrastructure",
        "district": "Chennai",
        "type": "Bridge",
        "healthScore": 32,
        "riskScore": 87,
        "status": "Critical",
        "lastInspection": "2024-02-15",
        "healthTrend": [
            {"month": "Jan", "score": 65},
            {"month": "Feb", "score": 58},
            {"month": "Mar", "score": 52},
            {"month": "Apr", "score": 45},
            {"month": "May", "score": 38},
            {"month": "Jun", "score": 32},
        ],
        "riskBreakdown": [
            {"factor": "Structural Stress", "value": 92},
            {"factor": "Corrosion", "value": 78},
            {"factor": "Traffic Load", "value": 85},
            {"factor": "Weather Impact", "value": 65},
            {"factor": "Maintenance Delay", "value": 88},
        ],
        "maintenanceTimeline": [
            {"date": "2024-01-10", "event": "Routine Inspection", "status": "completed"},
            {"date": "2024-02-15", "event": "Structural Assessment", "status": "completed"},
            {"date": "2024-03-20", "event": "Repair Work Scheduled", "status": "pending"},
            {"date": "2024-04-05", "event": "Major Maintenance", "status": "upcoming"},
        ],
        "aiExplanation": "This asset is classified as CRITICAL due to multiple high-risk factors. Immediate intervention recommended within 7 days.",
    }


@app.get("/api/predictive/risk")
def get_predictive_risk():
    """Get predictive risk analysis"""
    return {
        "failureProbability": 72,
        "earlyWarningScore": 85,
        "forecastData": [
            {"day": "Today", "risk": 62, "predicted": 62},
            {"day": "Day 1", "risk": None, "predicted": 65},
            {"day": "Day 2", "risk": None, "predicted": 68},
            {"day": "Day 3", "risk": None, "predicted": 72},
            {"day": "Day 4", "risk": None, "predicted": 75},
            {"day": "Day 5", "risk": None, "predicted": 78},
            {"day": "Day 6", "risk": None, "predicted": 82},
            {"day": "Day 7", "risk": None, "predicted": 85},
        ],
        "topRiskAssets": [
            {"id": "TN_ASSET_014", "probability": 87, "days": 3},
            {"id": "TN_ASSET_089", "probability": 82, "days": 5},
            {"id": "TN_ASSET_156", "probability": 78, "days": 7},
            {"id": "TN_ASSET_203", "probability": 74, "days": 10},
            {"id": "TN_ASSET_312", "probability": 71, "days": 12},
        ],
    }


@app.get("/api/map/data")
def get_geo_map_data():
    """Get geographic map data for Tamil Nadu"""
    return [
        {"id": "TN_ASSET_014", "name": "Chennai Metro Bridge", "lat": 13.0827, "lng": 80.2707, "status": "Critical", "risk": 87, "district": "Chennai"},
        {"id": "TN_ASSET_089", "name": "Coimbatore Highway", "lat": 11.0168, "lng": 76.9558, "status": "Critical", "risk": 82, "district": "Coimbatore"},
        {"id": "TN_ASSET_156", "name": "Madurai Junction", "lat": 9.9252, "lng": 78.1198, "status": "Critical", "risk": 78, "district": "Madurai"},
        {"id": "TN_ASSET_203", "name": "Trichy Bridge", "lat": 10.7905, "lng": 78.7047, "status": "Degraded", "risk": 65, "district": "Trichy"},
        {"id": "TN_ASSET_312", "name": "Salem Road", "lat": 11.6643, "lng": 78.1460, "status": "Degraded", "risk": 58, "district": "Salem"},
        {"id": "TN_ASSET_445", "name": "Vellore Infrastructure", "lat": 12.9165, "lng": 79.1325, "status": "Healthy", "risk": 32, "district": "Vellore"},
        {"id": "TN_ASSET_567", "name": "Thanjavur Complex", "lat": 10.7870, "lng": 79.1378, "status": "Healthy", "risk": 28, "district": "Thanjavur"},
    ]


@app.post("/api/maintenance/plan")
def get_maintenance_plan(params: dict):
    """Generate maintenance plan based on parameters"""
    return {
        "priorityRanking": [
            {"rank": 1, "assetId": "TN_ASSET_014", "risk": 87, "action": "Immediate structural reinforcement", "cost": 850000, "days": 7},
            {"rank": 2, "assetId": "TN_ASSET_089", "risk": 82, "action": "Corrosion treatment & repair", "cost": 620000, "days": 5},
            {"rank": 3, "assetId": "TN_ASSET_156", "risk": 78, "action": "Traffic load redistribution", "cost": 450000, "days": 4},
            {"rank": 4, "assetId": "TN_ASSET_203", "risk": 65, "action": "Routine maintenance & inspection", "cost": 280000, "days": 3},
            {"rank": 5, "assetId": "TN_ASSET_312", "risk": 58, "action": "Weather protection upgrade", "cost": 320000, "days": 4},
        ],
        "totalCost": 2520000,
        "totalDays": 23,
        "recommendations": [
            "Prioritize TN_ASSET_014 for immediate intervention within 3 days",
            "Allocate 3 teams to critical assets (Rank 1-2) for parallel execution",
            "Schedule routine maintenance for degraded assets during off-peak hours",
            "Budget allocation is sufficient for top 5 priority assets",
            "Estimated completion: 23 working days with current capacity",
        ],
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
