import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Calendar, MapPin, Activity } from 'lucide-react'
import { getAssetDetails } from '../services/api'

const AssetDetailPage = () => {
  const { id } = useParams()
  const [asset, setAsset] = useState(null)

  useEffect(() => {
    fetchAssetDetails()
  }, [id])

  const fetchAssetDetails = async () => {
    try {
      const response = await getAssetDetails(id)
      setAsset(response.data)
    } catch (error) {
      // Mock data
      setAsset({
        id: 'TN_ASSET_014',
        name: 'Chennai Metro Bridge',
        district: 'Chennai',
        type: 'Bridge',
        healthScore: 32,
        riskScore: 87,
        status: 'Critical',
        lastInspection: '2024-02-15',
        healthTrend: [
          { month: 'Jan', score: 65 },
          { month: 'Feb', score: 58 },
          { month: 'Mar', score: 52 },
          { month: 'Apr', score: 45 },
          { month: 'May', score: 38 },
          { month: 'Jun', score: 32 },
        ],
        riskBreakdown: [
          { factor: 'Structural Stress', value: 92 },
          { factor: 'Corrosion', value: 78 },
          { factor: 'Traffic Load', value: 85 },
          { factor: 'Weather Impact', value: 65 },
          { factor: 'Maintenance Delay', value: 88 },
        ],
        maintenanceTimeline: [
          { date: '2024-01-10', event: 'Routine Inspection', status: 'completed' },
          { date: '2024-02-15', event: 'Structural Assessment', status: 'completed' },
          { date: '2024-03-20', event: 'Repair Work Scheduled', status: 'pending' },
          { date: '2024-04-05', event: 'Major Maintenance', status: 'upcoming' },
        ],
        aiExplanation: 'This asset is classified as CRITICAL due to multiple high-risk factors. The structural stress level has exceeded safe thresholds (92/100), indicating potential structural integrity issues. Combined with high corrosion index (78/100) and significant maintenance delays (88/100), immediate intervention is recommended. The traffic load is also above normal capacity (85/100), which accelerates deterioration. Priority maintenance should focus on structural reinforcement and corrosion treatment within the next 7 days to prevent potential failure.',
      })
    }
  }

  if (!asset) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Asset Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-6"
      >
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{asset.name}</h1>
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <span>{asset.district}</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity size={18} />
                <span>{asset.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>Last Inspection: {asset.lastInspection}</span>
              </div>
            </div>
          </div>
          <motion.div
            animate={asset.status === 'Critical' ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
            className={`px-6 py-3 rounded-2xl font-semibold text-lg ${
              asset.status === 'Critical'
                ? 'bg-red-100 text-danger'
                : asset.status === 'Degraded'
                ? 'bg-yellow-100 text-warning'
                : 'bg-green-100 text-success'
            }`}
          >
            {asset.status}
          </motion.div>
        </div>
      </motion.div>

      {/* Two Column Layout */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Health Trend */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Health Trend (6 Months)
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={asset.healthTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ fill: '#2563eb', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Risk Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Risk Factor Breakdown
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={asset.riskBreakdown} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" stroke="#6b7280" />
              <YAxis dataKey="factor" type="category" width={120} stroke="#6b7280" />
              <Tooltip />
              <Bar dataKey="value" fill="#ef4444" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Maintenance Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl shadow-xl p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Maintenance Timeline
        </h2>
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          <div className="space-y-6">
            {asset.maintenanceTimeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="relative flex items-start gap-6"
              >
                <div
                  className={`w-4 h-4 rounded-full mt-1 z-10 ${
                    item.status === 'completed'
                      ? 'bg-success'
                      : item.status === 'pending'
                      ? 'bg-warning'
                      : 'bg-primary'
                  }`}
                ></div>
                <div className="flex-1 pb-6">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900">{item.event}</h3>
                    <span className="text-sm text-gray-600">{item.date}</span>
                  </div>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === 'completed'
                        ? 'bg-green-100 text-success'
                        : item.status === 'pending'
                        ? 'bg-yellow-100 text-warning'
                        : 'bg-blue-100 text-primary'
                    }`}
                  >
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* AI Explanation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-xl p-6 border-2 border-blue-200"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Activity className="text-primary" />
          AI Analysis & Recommendations
        </h2>
        <p className="text-gray-700 leading-relaxed">{asset.aiExplanation}</p>
      </motion.div>
    </motion.div>
  )
}

export default AssetDetailPage
