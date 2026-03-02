import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Building2, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react'
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { getDashboardOverview } from '../services/api'

const DashboardPage = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await getDashboardOverview()
      setData(response.data)
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
      // Mock data for demo
      setData({
        totalAssets: 1247,
        healthy: 856,
        degraded: 289,
        critical: 102,
        riskDistribution: [
          { name: 'Healthy', value: 856, color: '#10b981' },
          { name: 'Degraded', value: 289, color: '#f59e0b' },
          { name: 'Critical', value: 102, color: '#ef4444' },
        ],
        topRiskAssets: [
          { id: 'TN_ASSET_014', district: 'Chennai', risk: 87, status: 'Critical' },
          { id: 'TN_ASSET_089', district: 'Coimbatore', risk: 82, status: 'Critical' },
          { id: 'TN_ASSET_156', district: 'Madurai', risk: 78, status: 'Critical' },
          { id: 'TN_ASSET_203', district: 'Trichy', risk: 74, status: 'Degraded' },
          { id: 'TN_ASSET_312', district: 'Salem', risk: 71, status: 'Degraded' },
        ],
        trendData: [
          { day: 'Day 1', risk: 45 },
          { day: 'Day 5', risk: 48 },
          { day: 'Day 10', risk: 52 },
          { day: 'Day 15', risk: 49 },
          { day: 'Day 20', risk: 55 },
          { day: 'Day 25', risk: 58 },
          { day: 'Day 30', risk: 62 },
        ],
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  const stats = [
    {
      label: 'Total Assets',
      value: data.totalAssets,
      icon: Building2,
      color: 'bg-blue-100',
      textColor: 'text-primary',
    },
    {
      label: 'Healthy',
      value: data.healthy,
      icon: CheckCircle,
      color: 'bg-green-100',
      textColor: 'text-success',
    },
    {
      label: 'Degraded',
      value: data.degraded,
      icon: AlertTriangle,
      color: 'bg-yellow-100',
      textColor: 'text-warning',
    },
    {
      label: 'Critical',
      value: data.critical,
      icon: AlertTriangle,
      color: 'bg-red-100',
      textColor: 'text-danger',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600">
          Real-time infrastructure health monitoring
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white rounded-2xl shadow-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon size={24} className={stat.textColor} />
              </div>
            </div>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className={`text-3xl font-bold ${stat.textColor} mb-1`}
            >
              {stat.value.toLocaleString()}
            </motion.h3>
            <p className="text-gray-600 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Risk Distribution */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Risk Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.riskDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {data.riskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Top 5 Risk Assets
          </h2>
          <div className="space-y-3">
            {data.topRiskAssets.map((asset, index) => (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.05 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div>
                  <p className="font-semibold text-gray-900">{asset.id}</p>
                  <p className="text-sm text-gray-600">{asset.district}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-gray-900">
                    {asset.risk}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      asset.status === 'Critical'
                        ? 'bg-red-100 text-danger'
                        : 'bg-yellow-100 text-warning'
                    }`}
                  >
                    {asset.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Trend Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-2xl shadow-xl p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Overall Risk Trend (Last 30 Days)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="risk"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ fill: '#2563eb', r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  )
}

export default DashboardPage
