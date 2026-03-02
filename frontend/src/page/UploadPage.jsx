import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Upload, CheckCircle, FileText, Loader } from 'lucide-react'
import { uploadDatasets } from '../services/api'

const UploadPage = () => {
  const navigate = useNavigate()
  const [files, setFiles] = useState({})
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [success, setSuccess] = useState(false)

  const fileTypes = [
    { key: 'assets', label: 'Assets CSV', required: true },
    { key: 'sensor', label: 'Sensor Data CSV', required: true },
    { key: 'maintenance', label: 'Maintenance CSV', required: false },
    { key: 'weather', label: 'Weather CSV', required: false },
    { key: 'traffic', label: 'Traffic CSV', required: false },
    { key: 'environmental', label: 'Environmental CSV', required: false },
    { key: 'incident', label: 'Incident CSV', required: false },
  ]

  const handleFileChange = (key, file) => {
    setFiles({ ...files, [key]: file })
  }

  const handleUpload = async () => {
    if (!files.assets || !files.sensor) {
      alert('Please upload required files (Assets and Sensor Data)')
      return
    }

    setUploading(true)
    setProgress(0)

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval)
          return prev
        }
        return prev + 10
      })
    }, 200)

    try {
      await uploadDatasets(files)
      setProgress(100)
      setSuccess(true)
      
      setTimeout(() => {
        navigate('/dashboard')
      }, 1500)
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Upload failed. Please try again.')
      setUploading(false)
      clearInterval(interval)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Upload Infrastructure Datasets
        </h1>
        <p className="text-gray-600">
          Upload your CSV files to begin analysis and monitoring
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="space-y-4 mb-8">
          {fileTypes.map((type, index) => (
            <motion.div
              key={type.key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-primary transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    {files[type.key] ? (
                      <CheckCircle size={24} className="text-success" />
                    ) : (
                      <FileText size={24} className="text-gray-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {type.label}
                      {type.required && (
                        <span className="text-danger ml-1">*</span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {files[type.key]
                        ? files[type.key].name
                        : 'No file selected'}
                    </p>
                  </div>
                </div>
                <label className="cursor-pointer px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                  <span className="text-sm font-medium">Choose File</span>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={(e) =>
                      handleFileChange(type.key, e.target.files[0])
                    }
                    className="hidden"
                  />
                </label>
              </div>
            </motion.div>
          ))}
        </div>

        {uploading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Uploading...
              </span>
              <span className="text-sm font-medium text-primary">
                {progress}%
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-primary"
              />
            </div>
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3"
          >
            <CheckCircle size={24} className="text-success" />
            <span className="text-success font-medium">
              Upload successful! Redirecting to dashboard...
            </span>
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleUpload}
          disabled={uploading || success}
          className="w-full py-4 bg-primary text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {uploading ? (
            <>
              <Loader size={24} className="animate-spin" />
              Processing...
            </>
          ) : success ? (
            <>
              <CheckCircle size={24} />
              Success!
            </>
          ) : (
            <>
              <Upload size={24} />
              Process & Analyze
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  )
}

export default UploadPage
