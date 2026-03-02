import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { X, MapPin, Activity } from 'lucide-react'
import { getGeoMapData } from '../services/api'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Custom marker icons
const createCustomIcon = (color) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  })
}

const GeoMapPage = () => {
  const [assets, setAssets] = useState([])
  const [selectedAsset, setSelectedAsset] = useState(null)
  const [showPanel, setShowPanel] = useState(false)

  useEffect(() => {
    fetchMapData()
  }, [])

  const fetchMapData = async () => {
    try {
      const response = await getGeoMapData()
      setAssets(response.data)
    } catch (error) {
      // Mock data - Tamil Nadu coordinates
      setAssets([
        { id: 'TN_ASSET_014', name: 'Chennai Metro Bridge', lat: 13.0827, lng: 80.2707, status: 'Critical', risk: 87, district: 'Chennai' },
        { id: 'TN_ASSET_089', name: 'Coimbatore Highway', lat: 11.0168, lng: 76.9558, status: 'Critical', risk: 82, district: 'Coimbatore' },
        { id: 'TN_ASSET_156', name: 'Madurai Junction', lat: 9.9252, lng: 78.1198, status: 'Critical', risk: 78, district: 'Madurai' },
        { id: 'TN_ASSET_203', name: 'Trichy Bridge', lat: 10.7905, lng: 78.7047, status: 'Degraded', risk: 65, district: 'Trichy' },
        { id: 'TN_ASSET_312', name: 'Salem Road', lat: 11.6643, lng: 78.1460, status: 'Degraded', risk: 58, district: 'Salem' },
        { id: 'TN_ASSET_445', name: 'Vellore Infrastructure', lat: 12.9165, lng: 79.1325, status: 'Healthy', risk: 32, district: 'Vellore' },
        { id: 'TN_ASSET_567', name: 'Thanjavur Complex', lat: 10.7870, lng: 79.1378, status: 'Healthy', risk: 28, district: 'Thanjavur' },
      ])
    }
  }

  const getMarkerColor = (status) => {
    switch (status) {
      case 'Critical':
        return '#ef4444'
      case 'Degraded':
        return '#f59e0b'
      default:
        return '#10b981'
    }
  }

  const handleMarkerClick = (asset) => {
    setSelectedAsset(asset)
    setShowPanel(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Geographic Asset Map
        </h1>
        <p className="text-gray-600">
          Interactive map of infrastructure assets across Tamil Nadu
        </p>
      </div>

      <div className="relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          style={{ height: '600px' }}
        >
          <MapContainer
            center={[11.1271, 78.6569]}
            zoom={7}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {assets.map((asset) => (
              <Marker
                key={asset.id}
                position={[asset.lat, asset.lng]}
                icon={createCustomIcon(getMarkerColor(asset.status))}
                eventHandlers={{
                  click: () => handleMarkerClick(asset),
                }}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-semibold text-gray-900">{asset.name}</h3>
                    <p className="text-sm text-gray-600">{asset.district}</p>
                    <p className="text-sm">
                      <span className="font-medium">Risk:</span> {asset.risk}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </motion.div>

        {/* Side Panel */}
        <AnimatePresence>
          {showPanel && selectedAsset && (
            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="absolute top-0 right-0 w-96 h-full bg-white rounded-2xl shadow-2xl p-6 overflow-y-auto"
            >
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Asset Details
                </h2>
                <button
                  onClick={() => setShowPanel(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={18} className="text-gray-600" />
                    <h3 className="font-semibold text-gray-900">
                      {selectedAsset.name}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 ml-6">
                    {selectedAsset.id}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">District</span>
                    <span className="font-semibold text-gray-900">
                      {selectedAsset.district}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Risk Score</span>
                    <span className="text-2xl font-bold text-gray-900">
                      {selectedAsset.risk}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        selectedAsset.status === 'Critical'
                          ? 'bg-red-100 text-danger'
                          : selectedAsset.status === 'Degraded'
                          ? 'bg-yellow-100 text-warning'
                          : 'bg-green-100 text-success'
                      }`}
                    >
                      {selectedAsset.status}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity size={18} className="text-primary" />
                    <h4 className="font-semibold text-gray-900">
                      Quick Actions
                    </h4>
                  </div>
                  <div className="space-y-2">
                    <button className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      View Full Details
                    </button>
                    <button className="w-full px-4 py-2 bg-white text-primary border border-primary rounded-lg hover:bg-blue-50 transition-colors text-sm">
                      Schedule Maintenance
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Location
                  </h4>
                  <p className="text-sm text-gray-600">
                    Latitude: {selectedAsset.lat.toFixed(4)}
                  </p>
                  <p className="text-sm text-gray-600">
                    Longitude: {selectedAsset.lng.toFixed(4)}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-xl p-6"
      >
        <h3 className="font-semibold text-gray-900 mb-4">Map Legend</h3>
        <div className="flex gap-8">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-danger rounded-full"></div>
            <span className="text-sm text-gray-600">Critical</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-warning rounded-full"></div>
            <span className="text-sm text-gray-600">Degraded</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-success rounded-full"></div>
            <span className="text-sm text-gray-600">Healthy</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default GeoMapPage
