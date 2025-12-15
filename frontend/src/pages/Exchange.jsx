import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  User, 
  RefreshCw,
  Heart,
  MessageCircle,
  Eye,
  X,
  Upload,
  Tag
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import ImageUpload from '../components/ImageUpload'

// Waste Submission Form Component
const WasteSubmissionForm = ({ user, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    wasteType: '',
    wasteCategory: '',
    quantity: '',
    location: '',
    image: null
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const wasteCategories = [
    'Food Waste',
    'Cloth Waste',
    'Plastic',
    'Glass',
    'Metal',
    'Electronic',
    'Paper',
    'Other'
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageSelect = (file) => {
    setFormData(prev => ({
      ...prev,
      image: file
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    // Validate form
    if (!formData.wasteType || !formData.wasteCategory || !formData.quantity || !formData.location) {
      setError('Please fill in all required fields')
      setIsSubmitting(false)
      return
    }

    if (parseInt(formData.quantity) <= 0) {
      setError('Quantity must be greater than 0')
      setIsSubmitting(false)
      return
    }

    try {
      const submitData = new FormData()
      submitData.append('wasteType', formData.wasteType)
      submitData.append('wasteCategory', formData.wasteCategory)
      submitData.append('quantity', formData.quantity)
      submitData.append('location', formData.location)
      if (user?.id) {
        submitData.append('postedBy', user.id)
      }
      
      if (formData.image) {
        submitData.append('image', formData.image)
      }

      const response = await fetch('http://localhost:5000/api/waste-requests', {
        method: 'POST',
        body: submitData
      })

      if (response.ok) {
        const result = await response.json()
        alert('Waste request submitted successfully!')
        onSuccess()
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to submit waste request')
      }
    } catch (error) {
      setError('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {/* Waste Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Waste Type *
        </label>
        <input
          type="text"
          name="wasteType"
          value={formData.wasteType}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eco-500 focus:border-eco-500"
          placeholder="e.g., Leftover Food, Old Clothes, Plastic Bottles"
        />
      </div>

      {/* Waste Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Waste Category *
        </label>
        <select
          name="wasteCategory"
          value={formData.wasteCategory}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eco-500 focus:border-eco-500"
        >
          <option value="">Select Category</option>
          {wasteCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Quantity */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quantity (kg) *
        </label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleInputChange}
          required
          min="1"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eco-500 focus:border-eco-500"
          placeholder="Enter weight in kilograms"
        />
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Location *
        </label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eco-500 focus:border-eco-500"
          placeholder="e.g., Downtown Area, Industrial Zone"
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Image (Optional)
        </label>
        <ImageUpload
          onImageSelect={handleImageSelect}
          multiple={false}
          maxSize={2}
          label="Waste Image"
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-eco-600 text-white font-medium rounded-md hover:bg-eco-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Request'}
        </button>
      </div>
    </form>
  )
}

const Exchange = () => {
  const { isAuthenticated, user, isHousehold } = useAuth()
  const [showPostForm, setShowPostForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [items, setItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)

  // Fetch waste requests from backend API
  useEffect(() => {
    const fetchWasteRequests = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/waste-requests')
        if (response.ok) {
          const data = await response.json()
          // Transform backend data to match frontend format
          const transformedItems = data.map(item => ({
            id: item._id || item.id,
            title: `${item.wasteType} (${item.quantity} kg)`,
            description: `Category: ${item.wasteCategory || 'N/A'} | Location: ${item.location}`,
            category: mapWasteCategoryToDisplayCategory(item.wasteCategory),
            condition: 'good',
            location: item.location,
            postedBy: 'Household User',
            postedDate: item.createdAt || new Date().toISOString(),
            image: item.image ? `http://localhost:5000${item.image}` : 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
            status: item.status === 'Pending Pickup' ? 'available' : 'claimed',
            wasteCategory: item.wasteCategory,
            originalData: item
          }))
          setItems(transformedItems)
          setFilteredItems(transformedItems)
        }
      } catch (error) {
        console.error('Error fetching waste requests:', error)
        // Keep empty state on error
        setItems([])
        setFilteredItems([])
      }
    }

    fetchWasteRequests()
  }, [])

  // Helper function to map waste category to display category
  const mapWasteCategoryToDisplayCategory = (wasteCategory) => {
    const mapping = {
      'Food Waste': 'bio-waste',
      'Cloth Waste': 'reusable',
      'Plastic': 'recyclable',
      'Glass': 'recyclable',
      'Metal': 'recyclable',
      'Electronic': 'recyclable',
      'Paper': 'recyclable',
      'Other': 'recyclable'
    }
    return mapping[wasteCategory] || 'recyclable'
  }

  // Filter and search items
  useEffect(() => {
    let filtered = items

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory)
    }

    // Sort items
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.postedDate) - new Date(a.postedDate)
        case 'oldest':
          return new Date(a.postedDate) - new Date(b.postedDate)
        case 'popular':
          return b.likes - a.likes
        default:
          return 0
      }
    })

    setFilteredItems(filtered)
  }, [items, searchTerm, selectedCategory, sortBy])

  const categories = [
    { value: 'all', label: 'All Categories', color: 'bg-gray-100 text-gray-800' },
    { value: 'recyclable', label: 'Recyclable', color: 'bg-blue-100 text-blue-800' },
    { value: 'reusable', label: 'Reusable', color: 'bg-green-100 text-green-800' },
    { value: 'upcyclable', label: 'Upcyclable', color: 'bg-purple-100 text-purple-800' },
    { value: 'bio-waste', label: 'Bio-waste', color: 'bg-amber-100 text-amber-800' }
  ]

  const conditions = [
    { value: 'excellent', label: 'Excellent', color: 'bg-green-100 text-green-800' },
    { value: 'good', label: 'Good', color: 'bg-blue-100 text-blue-800' },
    { value: 'fair', label: 'Fair', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'poor', label: 'Poor', color: 'bg-red-100 text-red-800' }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800'
      case 'claimed': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
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
              Smart Waste Exchange
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Turn your waste into someone else's treasure. Post items, browse listings, 
              and connect with eco-conscious community members.
            </p>
          </motion.div>

          {/* Post Item Button - Only for Household users */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-8 text-center"
          >
            {isAuthenticated && isHousehold ? (
              <button
                onClick={() => setShowPostForm(true)}
                className="inline-flex items-center px-6 py-3 bg-eco-600 text-white font-semibold rounded-lg hover:bg-eco-700 transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                <Plus className="mr-2 h-5 w-5" />
                Post Waste Request
              </button>
            ) : isAuthenticated ? (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800">
                  Only Household users can post waste requests. Switch to a Household account to submit requests.
                </p>
              </div>
            ) : (
              <div className="bg-eco-50 border border-eco-200 rounded-lg p-4">
                <p className="text-eco-800 mb-3">
                  Sign in as a Household user to post waste requests
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
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-500 focus:border-eco-500"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                    selectedCategory === category.value
                      ? 'bg-eco-600 text-white'
                      : category.color + ' hover:bg-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-500 focus:border-eco-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <RefreshCw className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-md hover:shadow-lg border border-gray-200 overflow-hidden transition-all duration-300"
              >
                {/* Item Image */}
                <div className="relative h-48 bg-gray-200">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                </div>

                {/* Item Details */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {item.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Category and Condition */}
                  <div className="flex gap-2 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${categories.find(c => c.value === item.category)?.color}`}>
                      {categories.find(c => c.value === item.category)?.label}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${conditions.find(c => c.value === item.condition)?.color}`}>
                      {conditions.find(c => c.value === item.condition)?.label}
                    </span>
                  </div>

                  {/* Location and Posted Info */}
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    {item.location}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {item.postedBy}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(item.postedDate)}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <button className="flex items-center hover:text-eco-600 transition-colors duration-200">
                        <Heart className="h-4 w-4 mr-1" />
                        {item.likes}
                      </button>
                      <button className="flex items-center hover:text-eco-600 transition-colors duration-200">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {item.requests}
                      </button>
                    </div>
                    
                    <button className="px-3 py-1 bg-eco-600 text-white text-sm font-medium rounded-md hover:bg-eco-700 transition-colors duration-200">
                      {item.status === 'available' ? 'Request' : 'View Details'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Post Item Modal */}
      <AnimatePresence>
        {showPostForm && (
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
                <h2 className="text-xl font-semibold text-gray-900">Post New Item</h2>
                <button
                  onClick={() => setShowPostForm(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <WasteSubmissionForm 
                  user={user}
                  onClose={() => setShowPostForm(false)}
                  onSuccess={() => {
                    setShowPostForm(false)
                    // Refresh the items list
                    window.location.reload()
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Exchange
