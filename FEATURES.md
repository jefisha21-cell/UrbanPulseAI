# Features Documentation

## 🎯 Core Features

### 1. Landing Page
**Purpose**: First impression and entry point

**Features**:
- Hero section with animated headline
- Smooth fade-in and slide-up animations
- Floating background shapes with motion
- Three feature cards with hover effects
- Call-to-action button with scale animation
- Clean, modern design with gradient background

**Animations**:
- Page fade-in on load
- Staggered card animations
- Floating background elements
- Button hover scale effect

---

### 2. Upload Page
**Purpose**: Data ingestion interface

**Features**:
- Drag & drop file upload areas
- Support for 7 different CSV file types
- Required vs optional file indicators
- Real-time upload progress bar
- File validation
- Success animation with auto-redirect
- Visual feedback for selected files

**File Types Supported**:
1. Assets CSV (required)
2. Sensor Data CSV (required)
3. Maintenance CSV (optional)
4. Weather CSV (optional)
5. Traffic CSV (optional)
6. Environmental CSV (optional)
7. Incident CSV (optional)

**User Experience**:
- Clear visual hierarchy
- Instant feedback on file selection
- Animated progress indicator
- Success confirmation before redirect

---

### 3. Dashboard Overview
**Purpose**: Executive summary and KPIs

**Features**:
- Four key metric cards with animated counters
- Pie chart for risk distribution
- Top 5 risk assets table
- 30-day trend line chart
- Color-coded status indicators
- Hover effects on all interactive elements

**Metrics Displayed**:
- Total Assets count
- Healthy assets count
- Degraded assets count
- Critical assets count

**Visualizations**:
- Risk distribution pie chart (Recharts)
- Historical trend line chart
- Priority asset ranking

**Animations**:
- Staggered card entrance
- Number counter animation
- Chart smooth rendering
- Card lift on hover

---

### 4. Anomaly Detection Page
**Purpose**: Real-time issue monitoring

**Features**:
- Advanced filtering system (District, Type, Severity)
- Sortable data table
- Highlighted critical rows
- Time-series trend graph
- Status badges with color coding
- Search functionality

**Detection Methods**:
- Z-score anomaly detection
- Moving average deviation
- Threshold-based alerts

**Table Columns**:
- Asset ID
- District
- Issue Type
- Value
- Status
- Time

**Filters**:
- District dropdown
- Asset Type dropdown
- Severity dropdown
- Date range (future enhancement)

**Visual Indicators**:
- Red background for critical anomalies
- Yellow for degraded status
- Animated graph spikes

---

### 5. Asset Detail Page
**Purpose**: Deep dive into individual assets

**Features**:
- Asset header with key information
- Health trend graph (6 months)
- Risk factor breakdown bar chart
- Maintenance timeline with icons
- AI-generated explanation panel
- Status badge with pulse animation for critical assets

**Information Sections**:
1. **Header**: Name, location, type, last inspection
2. **Health Trend**: Historical performance graph
3. **Risk Breakdown**: Factor-by-factor analysis
4. **Timeline**: Maintenance history and schedule
5. **AI Explanation**: Human-readable risk analysis

**Risk Factors Analyzed**:
- Structural Stress
- Corrosion Index
- Traffic Load
- Weather Impact
- Maintenance Delay

**Timeline Events**:
- Completed inspections
- Pending repairs
- Upcoming maintenance
- Historical incidents

---

### 6. Predictive Risk Page
**Purpose**: Future failure forecasting

**Features**:
- Circular progress indicators
- 7-day risk forecast graph
- Failure probability percentage
- Early warning score
- Top risk assets with estimated failure days
- Animated progress rings
- Alert badges for high-risk scenarios

**Predictions**:
- Failure probability (%)
- Days until potential failure
- Risk trajectory forecast
- Early warning indicators

**Visualizations**:
- Circular progress (custom component)
- Dual-line forecast chart (current vs predicted)
- Risk asset cards with probability

**Alert System**:
- High risk alert (>70%)
- Medium risk warning (40-70%)
- Low risk monitoring (<40%)

---

### 7. Geographic Map Page
**Purpose**: Spatial visualization of assets

**Features**:
- Interactive Tamil Nadu map (Leaflet)
- Color-coded markers by status
- Clickable markers with popups
- Slide-in detail panel
- Zoom and pan controls
- Map legend
- Quick action buttons

**Map Features**:
- Custom marker icons
- Status-based coloring
- Smooth marker transitions
- Popup information cards
- Animated side panel

**Marker Colors**:
- Red: Critical status
- Yellow: Degraded status
- Green: Healthy status

**Side Panel Info**:
- Asset name and ID
- District location
- Risk score
- Status badge
- Quick action buttons
- Coordinates

**Districts Covered**:
- Chennai
- Coimbatore
- Madurai
- Trichy
- Salem
- Vellore
- Thanjavur

---

### 8. Maintenance Planner Page
**Purpose**: Resource allocation and decision support

**Features**:
- Resource parameter inputs
- Priority ranking algorithm
- Cost estimation
- Timeline calculation
- Smart recommendations
- Budget status indicator
- Action suggestions

**Input Parameters**:
- Available Budget (₹)
- Number of Teams
- Repair Capacity per Day

**Output**:
- Priority-ranked asset list
- Suggested actions per asset
- Cost breakdown
- Duration estimates
- Total cost and timeline
- Budget compliance status

**Recommendations Include**:
- Immediate action priorities
- Team allocation suggestions
- Scheduling optimization
- Budget utilization advice
- Completion estimates

**Priority Ranking Factors**:
- Risk score
- Asset criticality
- Maintenance urgency
- Resource availability
- Cost-effectiveness

---

## 🎨 Design System

### Color Palette

**Primary Colors**:
- Primary Blue: `#2563eb`
- Light Background: `#f8fafc`
- White: `#ffffff`

**Status Colors**:
- Success/Healthy: `#10b981` (Green)
- Warning/Degraded: `#f59e0b` (Amber)
- Danger/Critical: `#ef4444` (Red)

**Neutral Colors**:
- Gray 900: `#1e293b`
- Gray 600: `#64748b`
- Gray 300: `#cbd5e1`
- Gray 100: `#f1f5f9`

### Typography

**Font Family**: Inter (Google Fonts)

**Font Weights**:
- Light: 300
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

**Font Sizes**:
- Heading 1: 3xl (30px)
- Heading 2: 2xl (24px)
- Heading 3: xl (20px)
- Body: base (16px)
- Small: sm (14px)
- Extra Small: xs (12px)

### Spacing

**Padding/Margin Scale**:
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px

### Border Radius

- Small: 8px
- Medium: 12px
- Large: 16px
- XL: 20px
- 2XL: 24px
- Full: 9999px (circular)

### Shadows

- Small: `shadow-sm`
- Medium: `shadow-md`
- Large: `shadow-lg`
- XL: `shadow-xl`
- 2XL: `shadow-2xl`

---

## 🎬 Animations

### Page Transitions

**Type**: Fade
**Duration**: 300ms
**Easing**: ease-in-out

```jsx
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
```

### Card Animations

**Entrance**: Fade + Slide Up
**Hover**: Lift + Shadow Increase
**Duration**: 200ms

```jsx
whileHover={{ y: -5, scale: 1.02 }}
```

### Button Animations

**Hover**: Scale Up
**Tap**: Scale Down
**Duration**: 150ms

```jsx
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
```

### Counter Animations

**Type**: Number increment
**Duration**: 1000ms
**Easing**: ease-out

### Chart Animations

**Type**: Smooth render
**Duration**: 500ms
**Delay**: Staggered by 100ms

### Sidebar Animation

**Type**: Slide + Width Change
**Duration**: 300ms
**Easing**: spring (damping: 25)

---

## 🔧 Technical Features

### Frontend Architecture

**Framework**: React 18
**Build Tool**: Vite
**Routing**: React Router v6
**State Management**: React Hooks (useState, useEffect)
**Styling**: Tailwind CSS
**Animations**: Framer Motion
**Charts**: Recharts
**Maps**: React Leaflet
**HTTP Client**: Axios
**Icons**: Lucide React

### Backend Architecture

**Framework**: FastAPI
**Server**: Uvicorn
**Data Processing**: Pandas
**Numerical Operations**: NumPy
**ML Library**: Scikit-learn
**File Handling**: Python Multipart

### API Design

**Style**: RESTful
**Format**: JSON
**CORS**: Enabled for localhost:3000
**Error Handling**: HTTP status codes
**Validation**: Pydantic models

### Performance Optimizations

- Lazy loading for routes
- Memoized components
- Optimized re-renders
- Efficient data structures
- Compressed assets
- Code splitting

### Responsive Design

**Breakpoints**:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

**Grid System**: Tailwind CSS Grid
**Flexbox**: For component layouts

---

## 🔐 Security Features

### Current Implementation

- CORS protection
- Input validation
- File type validation
- Error handling
- Safe data processing

### Production Recommendations

- JWT authentication
- Rate limiting
- SQL injection prevention
- XSS protection
- HTTPS enforcement
- Environment variables for secrets
- Input sanitization
- File size limits
- Session management

---

## 📊 Data Processing

### Risk Score Algorithm

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

```python
if risk_score < 40:
    status = "Healthy"
elif risk_score <= 70:
    status = "Degraded"
else:
    status = "Critical"
```

### Anomaly Detection

**Z-Score Method**:
```python
z_score = (value - mean) / std_deviation
if abs(z_score) > threshold:
    flag_as_anomaly()
```

**Moving Average**:
```python
moving_avg = data.rolling(window=7).mean()
deviation = abs(current_value - moving_avg)
if deviation > threshold:
    flag_as_anomaly()
```

---

## 🚀 Future Enhancements

### Planned Features

1. **Real-time Updates**: WebSocket integration
2. **Advanced ML**: Deep learning models
3. **Mobile App**: React Native version
4. **Email Alerts**: Automated notifications
5. **Report Generation**: PDF exports
6. **User Management**: Multi-user support
7. **Role-based Access**: Permission system
8. **Historical Analysis**: Time-series deep dive
9. **Predictive Maintenance**: ML-based scheduling
10. **Integration APIs**: Third-party connections

### Scalability Improvements

- Database integration (PostgreSQL)
- Caching layer (Redis)
- Load balancing
- Microservices architecture
- Container orchestration (Kubernetes)
- CDN for static assets
- Message queue (RabbitMQ/Kafka)

---

**Version**: 1.0.0  
**Last Updated**: March 2024  
**Status**: Production Ready
