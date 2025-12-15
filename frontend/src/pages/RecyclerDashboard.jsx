import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  RefreshCw, 
  MapPin, 
  Calendar, 
  User, 
  CheckCircle,
  XCircle,
  Eye,
  AlertTriangle,
  Shield
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom'

const RecyclerDashboard = () => {
  const { user, isAdmin, isRecycler, isNGO } = useAuth()
  const [wasteRequests, setWasteRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Only Admin, Recycler, and NGO can access this dashboard
  if (!user || (!isAdmin && !isRecycler && !isNGO)) {
    return <Navigate to="/" replace />
  }

  // Fetch waste requests from backend (filtered by role)
  useEffect(() => {
    const fetchWasteRequests = async () => {
      try {
        // Determine user role for filtering
        let userRole = 'household'
        if (isAdmin) userRole = 'admin'
        else if (isRecycler) userRole = 'recycler'
        else if (isNGO) userRole = 'ngo'

        const response = await fetch(`http://localhost:5000/api/waste-requests?role=${userRole}`)
        if (response.ok) {
          const data = await response.json()
          setWasteRequests(data)
        } else {
          setError('Failed to fetch waste requests')
        }
      } catch (error) {
        console.error('Error fetching waste requests:', error)
        setError('Network error. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchWasteRequests()
  }, [isAdmin, isRecycler, isNGO])

  // Update waste request status
  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:5000/api/waste-requests/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status })
      })

      if (response.ok) {
        // Refresh the list
        let userRole = 'household'
        if (isAdmin) userRole = 'admin'
        else if (isRecycler) userRole = 'recycler'
        else if (isNGO) userRole = 'ngo'

        const refreshResponse = await fetch(`http://localhost:5000/api/waste-requests?role=${userRole}`)
        if (refreshResponse.ok) {
          const data = await refreshResponse.json()
          setWasteRequests(data)
        }
        alert('Status updated successfully!')
      } else {
        const errorData = await response.json()
        alert('Failed to update status: ' + errorData.error)
      }
    } catch (error) {
      alert('Network error. Please try again.')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending Pickup': return 'bg-yellow-100 text-yellow-800'
      case 'Pickup Accepted': return 'bg-blue-100 text-blue-800'
      case 'Processed': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 text-eco-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading waste requests...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {isNGO ? 'NGO Dashboard' : isAdmin ? 'Admin Dashboard' : 'Recycler Dashboard'}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {isNGO 
                ? 'Manage food waste and cloth waste requests. Accept requests and track their progress.'
                : 'Manage waste pickups and processing. Accept requests and track their progress.'}
            </p>
            {isNGO && (
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3 max-w-2xl mx-auto">
                <p className="text-sm text-blue-800">
                  <Shield className="inline-block h-4 w-4 mr-2" />
                  NGO View: You can only see and accept Food Waste and Cloth Waste requests.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending Pickup</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {wasteRequests.filter(r => r.status === 'Pending Pickup').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <RefreshCw className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Accepted</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {wasteRequests.filter(r => r.status === 'Pickup Accepted').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Processed</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {wasteRequests.filter(r => r.status === 'Processed').length}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        {/* Waste Requests List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-lg shadow-md border border-gray-200"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Incoming Waste Listings</h2>
          </div>

          {wasteRequests.length === 0 ? (
            <div className="text-center py-12">
              <RefreshCw className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No waste requests found</h3>
              <p className="text-gray-600">New waste pickup requests will appear here</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {wasteRequests.map((waste, index) => (
                <motion.div
                  key={waste._id || waste.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-6 hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-6">
                    {/* Waste Image */}
                    <div className="flex-shrink-0">
                      <img
                        className="w-32 h-24 rounded-lg object-cover"
                        src={waste.image ? `http://localhost:5000${waste.image}` : 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=150&fit=crop'}
                        alt="Waste"
                      />
                    </div>

                    {/* Waste Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-medium text-gray-900">
                          {waste.waste_type}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(waste.status)}`}>
                          {waste.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-2">
                        <div className="flex items-center">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Quantity: {waste.quantity} kg
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {waste.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          {formatDate(waste.createdAt || waste.created_at || new Date().toISOString())}
                        </div>
                      </div>
                      {waste.wasteCategory && (
                        <div className="mt-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            Category: {waste.wasteCategory}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex-shrink-0 flex space-x-2">
                      {waste.status === 'Pending Pickup' && (
                        <button
                          onClick={() => updateStatus(waste._id || waste.id, 'Pickup Accepted')}
                          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Accept
                        </button>
                      )}
                      
                      {waste.status === 'Pickup Accepted' && (
                        <button
                          onClick={() => updateStatus(waste._id || waste.id, 'Processed')}
                          className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors duration-200"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Mark as Processed
                        </button>
                      )}
                      
                      <button className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors duration-200">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-500">
            <p>&copy; 2025 WasteConnect. Empowering Recyclers.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default RecyclerDashboard


