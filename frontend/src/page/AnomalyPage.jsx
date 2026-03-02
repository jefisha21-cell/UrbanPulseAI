import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { getAnomalies } from '../services/api'

const AnomalyPage = () => {
  const [anomalies, setAnomalies] = useState([])
  const [filters, setFilters] = useState({
    district: '',
    assetType: '',
    severity: '',
  })

  useEffect(() => {
    fetchAnomalies()
  }, [filters])

  const fetchAnomalies = async () => {
    try {
      const response = await getAnomalies(filters)
      setAnomalies(response.data)
    } catch (error) {
      // Mock data
      setAnomalies([
        { id: 1, assetId: 'TN_ASSET_014', district: 'Chennai', issue: 'High Structural Stress', value: 92, status: 'Critical', time: '2h ago' },
        { id: 2, assetId: 'TN_ASSET_089', district: 'Coimbatore', issue: 'Corrosion Detected', value: 78, status: 'Critical', time: '4h ago' },
        { id: 3, assetId: 'TN_ASSET_156', district: 'Madurai', issue: 'Traffic Overload', value: 85, status: 'Critical', time: '6h ago' },
        { id: 4, assetId: 'TN_ASSET_203', district: 'Trichy', issue: 'Maintenance Delay', value: 65, status: 'Degraded', time: '8h ago' },
        { id: 5, assetId: 'TN_ASSET_312', district: 'Salem', issue: 'Weather Impact', value: 58, status: 'Degraded', time: '10h ago' },
      ])
    }
  }

  const trendData = [
    { time: '00:00', value: 45 },
    { time: '04:00', value: 52 },
    { time: '08:00', value: 78 },
    { time: '12:00', value: 92 },
    { time: '16:00', value: 85 },
    { time: '20:00', value: 68 },
    { time: '24:00', value: 55 },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Anomaly Detection
        </h1>
        <p className="text-gray-600">
          Real-time monitoring of abnormal infrastructure conditions
        </p>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-6"
      >
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              District
            </label>
            <select
              value={filters.district}
              onChange={(e) => setFilters({ ...filters, district: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">All Districts</option>
              <option value="Chennai">Chennai</option>
              <option value="Coimbatore">Coimbatore</option>
              <option value="Madurai">Madurai</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Asset Type
            </label>
            <select
              value={filters.assetType}
              onChange={(e) => setFilters({ ...filters, assetType: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">All Types</option>
              <option value="Bridge">Bridge</option>
              <option value="Road">Road</option>
              <option value="Building">Building</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Severity
            </label>
            <select
              value={filters.severity}
              onChange={(e) => setFilters({ ...filters, severity: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">All Severities</option>
              <option value="Critical">Critical</option>
              <option value="Degraded">Degraded</option>
              <option value="Healthy">Healthy</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full px-4 py-2 bg-primary text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
              <Search size={20} />
              Search
            </button>
          </div>
        </div>
      </motion.div>

      {/* Anomaly Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Asset ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">District</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Issue Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Value</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {anomalies.map((anomaly, index) => (
                <motion.tr
                  key={anomaly.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className={`hover:bg-gray-50 transition-colors cursor-pointer ${
                    anomaly.status === 'Critical' ? 'bg-red-50' : ''
                  }`}
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{anomaly.assetId}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{anomaly.district}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{anomaly.issue}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{anomaly.value}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        anomaly.status === 'Critical'
                          ? 'bg-red-100 text-danger'
                          : 'bg-yellow-100 text-warning'
                      }`}
                    >
                      {anomaly.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{anomaly.time}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Trend Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Anomaly Trend (24 Hours)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="time" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#ef4444"
              strokeWidth={3}
              dot={{ fill: '#ef4444', r: 6 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  )
}

export default AnomalyPage
