import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './layout/Layout'
import LandingPage from './pages/LandingPage'
import UploadPage from './pages/UploadPage'
import DashboardPage from './pages/DashboardPage'
import AnomalyPage from './pages/AnomalyPage'
import AssetDetailPage from './pages/AssetDetailPage'
import PredictiveRiskPage from './pages/PredictiveRiskPage'
import GeoMapPage from './pages/GeoMapPage'
import MaintenancePlannerPage from './pages/MaintenancePlannerPage'

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/upload" element={<Layout><UploadPage /></Layout>} />
          <Route path="/dashboard" element={<Layout><DashboardPage /></Layout>} />
          <Route path="/anomalies" element={<Layout><AnomalyPage /></Layout>} />
          <Route path="/asset/:id" element={<Layout><AssetDetailPage /></Layout>} />
          <Route path="/predictive" element={<Layout><PredictiveRiskPage /></Layout>} />
          <Route path="/map" element={<Layout><GeoMapPage /></Layout>} />
          <Route path="/maintenance" element={<Layout><MaintenancePlannerPage /></Layout>} />
        </Routes>
      </AnimatePresence>
    </Router>
  )
}

export default App
