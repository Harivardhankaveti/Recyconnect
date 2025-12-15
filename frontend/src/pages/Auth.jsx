import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Eye, 
  EyeOff, 
  User, 
  Mail, 
  Lock, 
  Building2, 
  Home,
  RefreshCw,
  Shield,
  CheckCircle
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const Auth = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { login, signup, isAuthenticated } = useAuth()
  const [mode, setMode] = useState('login')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'household'
  })

  useEffect(() => {
    const modeParam = searchParams.get('mode')
    if (modeParam === 'signup') {
      setMode('signup')
    }
  }, [searchParams])

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      if (mode === 'signup') {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match')
          setLoading(false)
          return
        }

        const result = await signup(formData)
        if (result.success) {
          setSuccess('Account created successfully! Redirecting...')
          setTimeout(() => navigate('/dashboard'), 2000)
        } else {
          setError(result.error || 'Failed to create account')
        }
      } else {
        const result = await login(formData.email, formData.password)
        if (result.success) {
          setSuccess('Login successful! Redirecting...')
          setTimeout(() => navigate('/dashboard'), 2000)
        } else {
          setError(result.error || 'Invalid credentials')
        }
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const roles = [
    { value: 'household', label: 'Household', icon: Home, description: 'Individual or family looking to recycle and report issues' },
    { value: 'recycler', label: 'Recycler', icon: RefreshCw, description: 'Business or individual focused on waste collection and processing' },
    { value: 'ngo', label: 'NGO', icon: Building2, description: 'Non-profit organization working on environmental causes' },
    { value: 'admin', label: 'Admin', icon: Shield, description: 'Platform administrator with full access' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-50 via-white to-earth-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-eco-500 to-eco-600 rounded-full mb-4 shadow-lg"
          >
            <span className="text-white text-2xl font-bold">♻</span>
          </motion.div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {mode === 'login' ? 'Welcome Back' : 'Join RecyConnect'}
          </h2>
          <p className="text-gray-600">
            {mode === 'login' 
              ? 'Sign in to your account to continue' 
              : 'Create your account and start making a difference'
            }
          </p>
        </motion.div>

        {/* Mode Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-lg p-1 shadow-sm border border-gray-200"
        >
          <div className="flex">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
                mode === 'login'
                  ? 'bg-eco-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
                mode === 'signup'
                  ? 'bg-eco-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sign Up
            </button>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg border border-gray-200 p-6"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name field (signup only) */}
            <AnimatePresence>
              {mode === 'signup' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eco-500 focus:border-eco-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eco-500 focus:border-eco-500"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eco-500 focus:border-eco-500"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password field (signup only) */}
            <AnimatePresence>
              {mode === 'signup' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eco-500 focus:border-eco-500"
                      placeholder="Confirm your password"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Role selection (signup only) */}
            <AnimatePresence>
              {mode === 'signup' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3"
                >
                  <label className="block text-sm font-medium text-gray-700">
                    Select Your Role
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {roles.map((role) => (
                      <label
                        key={role.value}
                        className={`relative flex flex-col p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                          formData.role === role.value
                            ? 'border-eco-500 bg-eco-50 ring-2 ring-eco-500 ring-opacity-50'
                            : 'border-gray-300 hover:border-eco-300 hover:bg-eco-25'
                        }`}
                      >
                        <input
                          type="radio"
                          name="role"
                          value={role.value}
                          checked={formData.role === role.value}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className="flex items-center mb-2">
                          <role.icon className="h-5 w-5 text-eco-600 mr-2" />
                          <span className="text-sm font-medium text-gray-900">{role.label}</span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">{role.description}</p>
                        
                        {formData.role === role.value && (
                          <CheckCircle className="absolute top-2 right-2 h-5 w-5 text-eco-600" />
                        )}
                      </label>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error/Success messages */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-red-50 border border-red-200 rounded-md p-3"
                >
                  <p className="text-sm text-red-600">{error}</p>
                </motion.div>
              )}
              
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-green-50 border border-green-200 rounded-md p-3"
                >
                  <p className="text-sm text-green-600">{success}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-eco-600 hover:bg-eco-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eco-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {loading ? (
                <>
                  <RefreshCw className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  {mode === 'login' ? 'Signing In...' : 'Creating Account...'}
                </>
              ) : (
                mode === 'login' ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>
        </motion.div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <p className="text-sm text-gray-600">
            {mode === 'login' ? (
              <>
                Don't have an account?{' '}
                <button
                  onClick={() => setMode('signup')}
                  className="font-medium text-eco-600 hover:text-eco-500"
                >
                  Sign up here
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => setMode('login')}
                  className="font-medium text-eco-600 hover:text-eco-500"
                >
                  Sign in here
                </button>
              </>
            )}
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default Auth
