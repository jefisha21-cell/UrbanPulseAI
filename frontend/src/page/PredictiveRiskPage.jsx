import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { AlertTriangle, TrendingUp } from 'lucide-react'
import { getPredictiveRisk } from '../services/api'

const PredictiveRiskPage = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await getPredictiveRisk()
      setData(response.data)
    } catch (error) {
      // Mock data
      setData({
        failureProbability: 72,
        earlyWarningScore: 85,
        forecastData: [
          { day: 'Today', risk: 62, predicted: 62 },
          { day: 'Day 1', risk: null, predicted: 65 },
          { day: 'Day 2', risk: null, predicted: 68 },
          { day: 'Day 3', risk: null, predicted: 72 },
          { day: 'Day 4', risk: null, predicted: 75 },
          { day: 'Day 5', risk: null, predicted: 78 },
          { day: 'Day 6', risk: null, predicted: 82 },
          { day: 'Day 7', risk: null, predicted: 85 },
        ],
        topRiskAssets: [
          { id: 'TN_ASSET_014', probability: 87, days: 3 },
          { id: 'TN_ASSET_089', probability: 82, days: 5 },
          { id: 'TN_ASSET_156', probability: 78, days: 7 },
          { id: 'TN_ASSET_203', probability: 74, days: 10 },
          { id: 'TN_ASSET_312', probability: 71, days: 12 },
        ],
      })
    }
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  const CircularProgress = ({ value, size = 200 }) => {
    const radius = (size - 20) / 2
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (value / 100) * circumference

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="12"
            fill="none"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={value > 70 ? '#ef4444' : value > 40 ? '#f59e0b' : '#10b981'}
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="text-5xl font-bold text-gray-900"
          >
            {value}%
          </motion.span>
          <span className="text-gray-600 text-sm mt-1">Risk Score</span>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Predictive Risk Analysis
        </h1>
        <p className="text-gray-600">
          AI-powered forecasting of infrastructure failure probability
        </p>
      </div>

      {/* Top Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Failure Probability */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Failure Probability (Next 7 Days)
          </h2>
          <CircularProgress value={data.failureProbability} />
          {data.failureProbability > 70 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-6 px-4 py-2 bg-red-100 text-danger rounded-xl flex items-center gap-2"
            >
              <AlertTriangle size={20} />
              <span className="font-medium">High Risk Alert</span>
            </motion.div>
          )}
        </motion.div>

        {/* Early Warning Score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Early Warning Score
          </h2>
          <CircularProgress value={data.earlyWarningScore} />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-6 text-center"
          >
            <p className="text-gray-600">
              Immediate action recommended for critical assets
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Forecast Graph */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl shadow-xl p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <TrendingUp className="text-primary" />
          Risk Forecast Trajectory
        </h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data.forecastData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="risk"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ fill: '#2563eb', r: 6 }}
              name="Current"
            />
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="#ef4444"
              strokeWidth={3}
              strokeDasharray="5 5"
              dot={{ fill: '#ef4444', r: 6 }}
              name="Predicted"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Top Risk Assets */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Assets with Highest Failure Probability
        </h2>
        <div className="space-y-4">
          {data.topRiskAssets.map((asset, index) => (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.05 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <AlertTriangle size={24} className="text-danger" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{asset.id}</p>
                  <p className="text-sm text-gray-600">
                    Estimated failure in {asset.days} days
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-danger">
                  {asset.probability}%
                </p>
                <p className="text-sm text-gray-600">Probability</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default PredictiveRiskPage
