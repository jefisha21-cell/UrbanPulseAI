import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Activity, Shield, TrendingUp, Upload } from 'lucide-react'

const LandingPage = () => {
  const navigate = useNavigate()

  const features = [
    {
      icon: Activity,
      title: 'Real-time Anomaly Detection',
      description: 'AI-powered monitoring detects infrastructure issues instantly',
    },
    {
      icon: TrendingUp,
      title: 'Predictive Risk Analysis',
      description: 'Forecast potential failures before they occur',
    },
    {
      icon: Shield,
      title: 'Decision Support System',
      description: 'Smart recommendations for maintenance planning',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Floating shapes animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 left-20 w-64 h-64 bg-blue-200 rounded-full opacity-20 blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            x: [0, -10, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-200 rounded-full opacity-20 blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4 px-4 py-2 bg-blue-100 text-primary rounded-full text-sm font-medium"
          >
            Tamil Nadu Government Initiative
          </motion.div>
          
          <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Smart Infrastructure Health &
            <span className="text-primary"> Anomaly Monitoring</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Advanced AI-powered system for real-time infrastructure monitoring,
            anomaly detection, and predictive maintenance across Tamil Nadu
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/upload')}
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all"
          >
            <Upload size={24} />
            Upload Infrastructure Data
          </motion.button>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <feature.icon size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default LandingPage
