import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  AlertTriangle, 
  Plus, 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  User, 
  Camera,
  Upload,
  X,
  CheckCircle,
  Clock,
  AlertCircle,
  MessageCircle
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import ImageUpload from '../components/ImageUpload'

const Complaints = () => {
  const { isAuthenticated } = useAuth()
  const [showReportForm, setShowReportForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [complaints, setComplaints] = useState([])
  const [filteredComplaints, setFilteredComplaints] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)

  // Mock data - replace with real API calls
  useEffect(() => {
    const mockComplaints = [
      {
        id: 1,
        title: 'Broken Street Light',
        description: 'Street light on Main Street near the park is not working. It\'s been dark for the past week.',
        type: 'infrastructure',
        status: 'in-progress',
        location: 'Main Street & Park Avenue',
        reportedBy: 'John D.',
        reportedDate: '2024-01-15',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
        priority: 'medium',
        updates: [
          { date: '2024-01-16', message: 'Issue has been reported to city maintenance', status: 'in-progress' }
        ]
      },
      {
        id: 2,
        title: 'Garbage Pile on Sidewalk',
        description: 'Large pile of garbage has been left on the sidewalk for days. It\'s blocking pedestrian access.',
        type: 'waste',
        status: 'resolved',
        location: 'Oak Street, Downtown',
        reportedBy: 'Sarah M.',
        reportedDate: '2024-01-10',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
        priority: 'high',
        updates: [
          { date: '2024-01-12', message: 'Garbage has been cleared by city workers', status: 'resolved' }
        ]
      },
      {
        id: 3,
        title: 'Stray Dogs in Neighborhood',
        description: 'Several stray dogs have been roaming the neighborhood. They seem aggressive and may pose a safety risk.',
        type: 'animals',
        status: 'pending',
        location: 'Maple Drive',
        reportedBy: 'Mike R.',
        reportedDate: '2024-01-14',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
        priority: 'medium',
        updates: []
      },
      {
        id: 4,
        title: 'Pothole on Highway',
        description: 'Large pothole on the highway exit ramp. It\'s causing damage to vehicles and is a safety hazard.',
        type: 'roads',
        status: 'in-progress',
        location: 'Highway 101 Exit Ramp',
        reportedBy: 'Emma L.',
        reportedDate: '2024-01-13',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
        priority: 'high',
        updates: [
          { date: '2024-01-15', message: 'Road crew has been dispatched to assess the damage', status: 'in-progress' }
        ]
      }
    ]
    
    setComplaints(mockComplaints)
    setFilteredComplaints(mockComplaints)
  }, [])

  // Filter and search complaints
  useEffect(() => {
    let filtered = complaints

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(complaint =>
        complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        complaint.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(complaint => complaint.status === selectedStatus)
    }

    // Type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(complaint => complaint.type === selectedType)
    }

    setFilteredComplaints(filtered)
  }, [complaints, searchTerm, selectedStatus, selectedType])

  const complaintTypes = [
    { value: 'all', label: 'All Types', color: 'bg-gray-100 text-gray-800' },
    { value: 'roads', label: 'Roads', color: 'bg-orange-100 text-orange-800' },
    { value: 'infrastructure', label: 'Infrastructure', color: 'bg-blue-100 text-blue-800' },
    { value: 'waste', label: 'Waste', color: 'bg-red-100 text-red-800' },
    { value: 'animals', label: 'Animals', color: 'bg-purple-100 text-purple-800' }
  ]

  const statuses = [
    { value: 'all', label: 'All Statuses', color: 'bg-gray-100 text-gray-800' },
    { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'in-progress', label: 'In Progress', color: 'bg-blue-100 text-blue-800' },
    { value: 'resolved', label: 'Resolved', color: 'bg-green-100 text-green-800' },
    { value: 'closed', label: 'Closed', color: 'bg-gray-100 text-gray-800' }
  ]

  const priorities = [
    { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'high', label: 'High', color: 'bg-red-100 text-red-800' }
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />
      case 'in-progress': return <AlertCircle className="h-4 w-4" />
      case 'resolved': return <CheckCircle className="h-4 w-4" />
      case 'closed': return <X className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString()
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
              Civic Reporting & Complaints
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Report community issues, track their resolution, and help improve your neighborhood. 
              Your reports make a difference.
            </p>
          </motion.div>

          {/* Report Issue Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-8 text-center"
          >
            {isAuthenticated ? (
              <button
                onClick={() => setShowReportForm(true)}
                className="inline-flex items-center px-6 py-3 bg-eco-600 text-white font-semibold rounded-lg hover:bg-eco-700 transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                <Plus className="mr-2 h-5 w-5" />
                Report New Issue
              </button>
            ) : (
              <div className="bg-eco-50 border border-eco-200 rounded-lg p-4">
                <p className="text-eco-800 mb-3">
                  Sign in to report issues and track their resolution
                </p>
                <button className="inline-flex items-center px-4 py-2 bg-eco-600 text-white text-sm font-medium rounded-md hover:bg-eco-700 transition-colors duration-200">
                  Sign In
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search complaints..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-500 focus:border-eco-500"
                />
              </div>
            </div>

            {/* Type Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {complaintTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setSelectedType(type.value)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                    selectedType === type.value
                      ? 'bg-eco-600 text-white'
                      : type.color + ' hover:bg-gray-200'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-500 focus:border-eco-500"
            >
              {statuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Complaints List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredComplaints.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <AlertTriangle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No complaints found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {filteredComplaints.map((complaint, index) => (
              <motion.div
                key={complaint.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {complaint.title}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorities.find(p => p.value === complaint.priority)?.color}`}>
                          {priorities.find(p => p.value === complaint.priority)?.label}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {complaint.location}
                        </div>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {complaint.reportedBy}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(complaint.reportedDate)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statuses.find(s => s.value === complaint.status)?.color}`}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(complaint.status)}
                          {statuses.find(s => s.value === complaint.status)?.label}
                        </div>
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {complaint.description}
                  </p>

                  {/* Image */}
                  {complaint.image && (
                    <div className="mb-4">
                      <img
                        src={complaint.image}
                        alt={complaint.title}
                        className="w-full max-w-md h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  {/* Updates */}
                  {complaint.updates.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Updates</h4>
                      <div className="space-y-2">
                        {complaint.updates.map((update, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              update.status === 'resolved' ? 'bg-green-500' : 'bg-blue-500'
                            }`} />
                            <div className="flex-1">
                              <p className="text-sm text-gray-700">{update.message}</p>
                              <p className="text-xs text-gray-500 mt-1">{formatDate(update.date)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-eco-600 transition-colors duration-200">
                        <MessageCircle className="h-4 w-4" />
                        Add Update
                      </button>
                    </div>
                    
                    <button className="px-4 py-2 bg-eco-600 text-white text-sm font-medium rounded-md hover:bg-eco-700 transition-colors duration-200">
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Report Issue Modal */}
      <AnimatePresence>
        {showReportForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Report New Issue</h2>
                <button
                  onClick={() => setShowReportForm(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <form className="space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Issue Title *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eco-500 focus:border-eco-500"
                      placeholder="Brief description of the issue"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Detailed Description *
                    </label>
                    <textarea
                      rows={4}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eco-500 focus:border-eco-500"
                      placeholder="Provide detailed information about the issue, location, and any safety concerns..."
                    />
                  </div>

                  {/* Type and Priority */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Issue Type *
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eco-500 focus:border-eco-500">
                        {complaintTypes.slice(1).map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Priority Level *
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eco-500 focus:border-eco-500">
                        {priorities.map((priority) => (
                          <option key={priority.value} value={priority.value}>
                            {priority.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eco-500 focus:border-eco-500"
                      placeholder="Street address or area description"
                    />
                  </div>

                  {/* Photo Upload */}
                  <ImageUpload
                    onImageSelect={setSelectedImage}
                    multiple={false}
                    maxSize={10}
                    label="Photo Evidence"
                    className="mb-4"
                  />

                  {/* Submit Button */}
                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowReportForm(false)}
                      className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-eco-600 text-white font-medium rounded-md hover:bg-eco-700 transition-colors duration-200"
                    >
                      Submit Report
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Complaints
