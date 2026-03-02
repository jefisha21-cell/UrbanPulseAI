import { useState } from 'react'
import { motion } from 'framer-motion'
import { Wrench, DollarSign, Users, Calendar, CheckCircle } from 'lucide-react'
import { getMaintenancePlan } from '../services/api'

const MaintenancePlannerPage = () => {
  const [params, setParams] = useState({
    budget: 5000000,
    teams: 10,
    capacity: 5,
  })
  const [plan, setPlan] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const response = await getMaintenancePlan(params)
      setPlan(response.data)
    } catch (error) {
      // Mock data
      setPlan({
        priorityRanking: [
          { rank: 1, assetId: 'TN_ASSET_014', risk: 87, action: 'Immediate structural reinforcement', cost: 850000, days: 7 },
          { rank: 2, assetId: 'TN_ASSET_089', risk: 82, action: 'Corrosion treatment & repair', cost: 620000, days: 5 },
          { rank: 3, assetId: 'TN_ASSET_156', risk: 78, action: 'Traffic load redistribution', cost: 450000, days: 4 },
          { rank: 4, assetId: 'TN_ASSET_203', risk: 65, action: 'Routine maintenance & inspection', cost: 280000, days: 3 },
          { rank: 5, assetId: 'TN_ASSET_312', risk: 58, action: 'Weather protection upgrade', cost: 320000, days: 4 },
        ],
        totalCost: 2520000,
        totalDays: 23,
        recommendations: [
          'Prioritize TN_ASSET_014 for immediate intervention within 3 days',
          'Allocate 3 teams to critical assets (Rank 1-2) for parallel execution',
          'Schedule routine maintenance for degraded assets during off-peak hours',
          'Budget allocation is sufficient for top 5 priority assets',
          'Estimated completion: 23 working days with current capacity',
        ],
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Maintenance Planner
        </h1>
        <p className="text-gray-600">
          AI-powered decision support for optimal resource allocation
        </p>
      </div>

      {/* Input Panel */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Resource Parameters
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <DollarSign size={18} className="text-primary" />
              Available Budget (₹)
            </label>
            <input
              type="number"
              value={params.budget}
              onChange={(e) => setParams({ ...params, budget: parseInt(e.target.value) })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Users size={18} className="text-primary" />
              Available Teams
            </label>
            <input
              type="number"
              value={params.teams}
              onChange={(e) => setParams({ ...params, teams: parseInt(e.target.value) })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Calendar size={18} className="text-primary" />
              Repair Capacity/Day
            </label>
            <input
              type="number"
              value={params.capacity}
              onChange={(e) => setParams({ ...params, capacity: parseInt(e.target.value) })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGenerate}
          disabled={loading}
          className="mt-6 w-full py-4 bg-primary text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-3"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              Generating Plan...
            </>
          ) : (
            <>
              <Wrench size={24} />
              Generate Maintenance Plan
            </>
          )}
        </motion.button>
      </motion.div>

      {plan && (
        <>
          {/* Priority Ranking Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Priority Ranking
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Rank</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Asset ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Risk</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Suggested Action</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Cost (₹)</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {plan.priorityRanking.map((item, index) => (
                    <motion.tr
                      key={item.assetId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                          {item.rank}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.assetId}</td>
                      <td className="px-6 py-4">
                        <span className="text-lg font-bold text-danger">{item.risk}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.action}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        ₹{item.cost.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.days} days</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Estimated Cost</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{plan.totalCost.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Duration</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {plan.totalDays} days
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Budget Status</p>
                  <p className={`text-2xl font-bold ${
                    plan.totalCost <= params.budget ? 'text-success' : 'text-danger'
                  }`}>
                    {plan.totalCost <= params.budget ? 'Within Budget' : 'Over Budget'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-xl p-6 border-2 border-blue-200"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="text-primary" />
              Smart Recommendations
            </h2>
            <ul className="space-y-3">
              {plan.recommendations.map((rec, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-start gap-3 text-gray-700"
                >
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                    {index + 1}
                  </div>
                  <span className="leading-relaxed">{rec}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </>
      )}
    </motion.div>
  )
}

export default MaintenancePlannerPage
