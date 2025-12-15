import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Bell, 
  Check, 
  Trash2, 
  Filter,
  Search,
  Settings,
  RefreshCw
} from 'lucide-react'

const Notifications = () => {
  const [notifications, setNotifications] = useState([])
  const [filteredNotifications, setFilteredNotifications] = useState([])
  const [selectedType, setSelectedType] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Mock notifications data - replace with real data from backend
  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        title: 'Item Claimed',
        message: 'Your cardboard boxes have been claimed by Sarah M. They will pick up tomorrow at 2 PM.',
        type: 'success',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        read: false,
        action: 'View Details'
      },
      {
        id: 2,
        title: 'Complaint Updated',
        message: 'Your street light complaint has been resolved. The light is now working properly.',
        type: 'info',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        read: false,
        action: 'View Complaint'
      },
      {
        id: 3,
        title: 'New Pickup Scheduled',
        message: 'Recycling pickup has been scheduled for tomorrow at 9 AM. Please have items ready.',
        type: 'reminder',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        read: true,
        action: 'View Schedule'
      },
      {
        id: 4,
        title: 'Community Event',
        message: 'Join our sustainability workshop this weekend! Learn about composting and waste reduction.',
        type: 'event',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
        read: true,
        action: 'Learn More'
      },
      {
        id: 5,
        title: 'Nearby Waste Alert',
        message: 'New recyclable items posted near your location. Check them out!',
        type: 'alert',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
        read: true,
        action: 'Browse Items'
      }
    ]
    
    setNotifications(mockNotifications)
    setFilteredNotifications(mockNotifications)
  }, [])

  // Filter notifications
  useEffect(() => {
    let filtered = notifications

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(notif =>
        notif.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notif.message.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(notif => notif.type === selectedType)
    }

    setFilteredNotifications(filtered)
  }, [notifications, searchTerm, selectedType])

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })))
  }

  const formatTimestamp = (timestamp) => {
    const now = new Date()
    const diff = now - timestamp
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'success': return 'text-green-600 bg-green-100'
      case 'info': return 'text-blue-600 bg-blue-100'
      case 'reminder': return 'text-yellow-600 bg-yellow-100'
      case 'event': return 'text-purple-600 bg-purple-100'
      case 'alert': return 'text-orange-600 bg-orange-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'success': return '✓'
      case 'info': return 'ℹ'
      case 'reminder': return '⏰'
      case 'event': return '🎉'
      case 'alert': return '⚠'
      default: return '•'
    }
  }

  const notificationTypes = [
    { value: 'all', label: 'All Types', color: 'bg-gray-100 text-gray-800' },
    { value: 'success', label: 'Success', color: 'bg-green-100 text-green-800' },
    { value: 'info', label: 'Info', color: 'bg-blue-100 text-blue-800' },
    { value: 'reminder', label: 'Reminder', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'event', label: 'Event', color: 'bg-purple-100 text-purple-800' },
    { value: 'alert', label: 'Alert', color: 'bg-orange-100 text-orange-800' }
  ]

  const unreadCount = notifications.filter(n => !n.read).length

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
              Notifications & Alerts
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stay updated with real-time notifications about your items, complaints, 
              and community events. Never miss important updates.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-8 flex justify-center"
          >
            <div className="bg-eco-50 border border-eco-200 rounded-lg p-4">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-eco-600">{notifications.length}</div>
                  <div className="text-sm text-eco-700">Total</div>
                </div>
                <div className="w-px h-12 bg-eco-200"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{unreadCount}</div>
                  <div className="text-sm text-orange-700">Unread</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search notifications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-500 focus:border-eco-500"
                  />
                </div>
              </div>

              {/* Type Filter */}
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                {notificationTypes.map((type) => (
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
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-eco-600 hover:text-eco-700 font-medium hover:bg-eco-50 rounded-md transition-colors duration-200"
                >
                  <Check className="h-4 w-4" />
                  Mark all as read
                </button>
              )}
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors duration-200">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredNotifications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filteredNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 ${
                  !notification.read ? 'ring-2 ring-eco-500 ring-opacity-50' : ''
                }`}
              >
                <div className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Type indicator */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${getTypeColor(notification.type).split(' ')[1]}`}>
                      {getTypeIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {notification.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                          {!notification.read && (
                            <span className="w-2 h-2 bg-eco-500 rounded-full"></span>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-3 leading-relaxed">
                        {notification.message}
                      </p>

                      {/* Action button */}
                      <div className="flex items-center justify-between">
                        <button className="text-eco-600 hover:text-eco-700 text-sm font-medium hover:underline transition-colors duration-200">
                          {notification.action}
                        </button>
                        
                        <div className="flex items-center gap-2">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-1 text-gray-400 hover:text-green-600 rounded transition-colors duration-200"
                              title="Mark as read"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-1 text-gray-400 hover:text-red-600 rounded transition-colors duration-200"
                            title="Delete notification"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Empty state for no notifications */}
      {notifications.length === 0 && (
        <div className="text-center py-20">
          <Bell className="h-20 w-20 text-gray-300 mx-auto mb-6" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No notifications yet</h3>
          <p className="text-gray-600 mb-6">
            You'll receive notifications here when you post items, report issues, or when there are updates.
          </p>
          <div className="flex justify-center gap-4">
            <button className="inline-flex items-center px-4 py-2 bg-eco-600 text-white text-sm font-medium rounded-md hover:bg-eco-700 transition-colors duration-200">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Notifications
