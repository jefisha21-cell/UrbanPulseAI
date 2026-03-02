# Quick Reference Guide

## 🚀 Start Commands

### Windows
```bash
# Backend
start-backend.bat

# Frontend (new terminal)
start-frontend.bat
```

### macOS/Linux
```bash
# Backend
chmod +x start-backend.sh
./start-backend.sh

# Frontend (new terminal)
chmod +x start-frontend.sh
./start-frontend.sh
```

---

## 🌐 URLs

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

---

## 📂 File Locations

### Frontend
- Pages: `frontend/src/pages/`
- Components: `frontend/src/layout/`
- API: `frontend/src/services/api.js`
- Styles: `frontend/src/index.css`

### Backend
- Main API: `backend/main.py`
- Dependencies: `backend/requirements.txt`

### Data
- Sample CSVs: `sample-data/`

---

## 🎨 Color Codes

```css
Primary: #2563eb
Success: #10b981
Warning: #f59e0b
Danger: #ef4444
Light: #f8fafc
```

---

## 📊 Risk Formula

```
Risk = 0.25×stress + 0.20×traffic + 0.15×corrosion + 
       0.15×weather + 0.15×maintenance + 0.10×incident
```

---

## 🏥 Health Status

- **< 40**: Healthy (Green)
- **40-70**: Degraded (Yellow)
- **> 70**: Critical (Red)

---

## 🔌 API Endpoints

```
GET  /                          # Health check
POST /api/upload                # Upload CSVs
GET  /api/dashboard/overview    # Dashboard data
GET  /api/anomalies             # Get anomalies
GET  /api/assets/{id}           # Asset details
GET  /api/predictive/risk       # Predictions
GET  /api/map/data              # Map data
POST /api/maintenance/plan      # Maintenance plan
```

---

## 📦 Dependencies

### Frontend
```bash
npm install
```

### Backend
```bash
pip install -r requirements.txt
```

---

## 🐛 Troubleshooting

### Port Already in Use
- Backend: Change port in `main.py`
- Frontend: Vite auto-selects next port

### Module Not Found
```bash
# Backend
pip install -r requirements.txt --force-reinstall

# Frontend
rm -rf node_modules
npm install
```

### CORS Error
- Verify backend is on port 8000
- Check CORS settings in `main.py`

---

## 🎯 Page Routes

```
/                  # Landing
/upload            # Upload
/dashboard         # Dashboard
/anomalies         # Anomalies
/asset/:id         # Asset Detail
/predictive        # Predictive Risk
/map               # Geo Map
/maintenance       # Maintenance Planner
```

---

## 📝 CSV Format

### assets.csv
```csv
asset_id,district,asset_type,location
TN_ASSET_001,Chennai,Bridge,Location
```

### sensor.csv
```csv
asset_id,timestamp,structural_stress,traffic_load,corrosion_index,weather_severity,maintenance_delay,incident_severity
TN_ASSET_001,2024-03-01,75,82,65,45,60,30
```

---

## 🔧 Build Commands

### Development
```bash
# Frontend
npm run dev

# Backend
python main.py
```

### Production
```bash
# Frontend
npm run build
npm run preview

# Backend
uvicorn main:app --host 0.0.0.0 --port 8000
```

---

## 📱 Keyboard Shortcuts

- **Ctrl+C**: Stop server
- **Ctrl+Shift+R**: Hard refresh browser
- **F12**: Open DevTools

---

## 🎬 Animation Durations

- Page transition: 300ms
- Card hover: 200ms
- Button click: 150ms
- Chart render: 500ms

---

## 🗂 Component Structure

```jsx
<Layout>
  <Navbar />
  <Sidebar />
  <MainContent>
    <Page />
  </MainContent>
</Layout>
```

---

## 🔐 Environment Variables

Create `.env` files for:
- API URLs
- API keys
- Database credentials
- Secret keys

---

## 📊 Sample Data

Location: `sample-data/`
- `assets.csv` - 15 sample assets
- `sensor.csv` - Sensor readings

---

## 🎨 Tailwind Classes

### Common Patterns
```jsx
// Card
className="bg-white rounded-2xl shadow-xl p-6"

// Button
className="px-4 py-2 bg-primary text-white rounded-xl"

// Status Badge
className="px-3 py-1 rounded-full text-xs font-medium"
```

---

## 🔄 Git Commands

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <url>
git push -u origin main
```

---

## 📚 Documentation Files

1. `README.md` - Overview
2. `INSTALLATION.md` - Setup
3. `API_DOCUMENTATION.md` - API
4. `FEATURES.md` - Features
5. `PROJECT_SUMMARY.md` - Summary
6. `QUICK_REFERENCE.md` - This file

---

## 🎯 Demo Checklist

- [ ] Backend running
- [ ] Frontend running
- [ ] Sample data ready
- [ ] Browser open
- [ ] All pages tested
- [ ] Animations smooth
- [ ] No console errors

---

## 💡 Pro Tips

1. Use Chrome DevTools for debugging
2. Check Network tab for API calls
3. Use React DevTools extension
4. Monitor console for errors
5. Test on different screen sizes
6. Clear cache if styles don't update

---

## 🚨 Common Issues

### Issue: White screen
**Fix**: Check console, verify API connection

### Issue: Styles not loading
**Fix**: Restart dev server, clear cache

### Issue: Map not showing
**Fix**: Check internet connection, verify Leaflet CSS

### Issue: Upload fails
**Fix**: Verify CSV format, check file size

---

## 📞 Quick Help

### Need to...

**Change colors?**
→ Edit `tailwind.config.js`

**Add new page?**
→ Create in `src/pages/`, add route in `App.jsx`

**Modify API?**
→ Edit `backend/main.py`

**Change animations?**
→ Update Framer Motion props

**Fix layout?**
→ Check `src/layout/Layout.jsx`

---

## ⚡ Performance Tips

1. Lazy load routes
2. Memoize components
3. Optimize images
4. Use production build
5. Enable compression
6. Cache API responses

---

## 🎓 Learning Resources

- React: https://react.dev
- Tailwind: https://tailwindcss.com
- Framer Motion: https://www.framer.com/motion
- FastAPI: https://fastapi.tiangolo.com
- Recharts: https://recharts.org
- Leaflet: https://leafletjs.com

---

**Last Updated**: March 2024  
**Version**: 1.0.0

---

**Need more help?** Check the full documentation files!
