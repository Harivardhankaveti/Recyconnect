import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, MapPin, Calendar, Edit, Save, X } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const Profile = () => {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    location: user?.location || '',
    bio: user?.bio || ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = () => {
    // Here you would typically make an API call to update the user profile
    console.log('Saving profile:', formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      location: user?.location || '',
      bio: user?.bio || ''
    })
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-soft border border-gray-200 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-eco-600 to-emerald-600 px-6 py-8 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{user?.name}</h1>
                  <p className="text-eco-100 capitalize">{user?.role} Member</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-white hover:bg-opacity-30 transition-all duration-200"
              >
                {isEditing ? <X className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-500 focus:border-eco-500"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <User className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-900">{formData.name}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-500 focus:border-eco-500"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-900">{formData.email}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-500 focus:border-eco-500"
                        placeholder="Enter your location"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-900">{formData.location || 'Not specified'}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Member Since
                    </label>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-900">
                        {user?.joinDate ? new Date(user.joinDate).toLocaleDateString() : 'Recently joined'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio and Additional Info */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">About You</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio
                    </label>
                    {isEditing ? (
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-500 focus:border-eco-500"
                        placeholder="Tell us about yourself..."
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-lg min-h-[100px]">
                        <span className="text-gray-900">
                          {formData.bio || 'No bio added yet. Click edit to add your bio.'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Role-specific information */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Your Role</h3>
                    <div className="p-4 bg-eco-50 rounded-lg border border-eco-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-eco-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-eco-600" />
                        </div>
                        <div>
                          <p className="font-medium text-eco-800 capitalize">{user?.role} Member</p>
                          <p className="text-sm text-eco-600">
                            {user?.role === 'household' && 'You can post items, report issues, and participate in community activities.'}
                            {user?.role === 'ngo' && 'You can organize events, manage community projects, and coordinate with other members.'}
                            {user?.role === 'recycler' && 'You can collect and process recyclable materials from the community.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 mt-8">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-eco-600 text-white font-medium rounded-lg hover:bg-eco-700 transition-colors duration-200"
                >
                  <Save className="w-4 h-4 inline mr-2" />
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Profile
