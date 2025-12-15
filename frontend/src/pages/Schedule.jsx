import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Plus,
  Filter,
  Search
} from 'lucide-react'

const Schedule = () => {
  const [events, setEvents] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState('month')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')

  // Mock events data - replace with real API calls
  useEffect(() => {
    const mockEvents = [
      {
        id: 1,
        title: 'Recycling Pickup',
        type: 'pickup',
        date: '2024-01-20',
        time: '09:00',
        location: 'Downtown Area',
        description: 'Weekly recycling pickup. Please have items ready by 8:30 AM.',
        participants: 45,
        status: 'upcoming'
      },
      {
        id: 2,
        title: 'Sustainability Workshop',
        type: 'event',
        date: '2024-01-22',
        time: '14:00',
        location: 'Community Center',
        description: 'Learn about composting and waste reduction techniques.',
        participants: 28,
        status: 'upcoming'
      },
      {
        id: 3,
        title: 'NGO Drive - Electronics',
        type: 'drive',
        date: '2024-01-25',
        time: '10:00',
        location: 'City Hall Parking',
        description: 'Electronic waste collection drive by Green Earth NGO.',
        participants: 67,
        status: 'upcoming'
      },
      {
        id: 4,
        title: 'Composting Class',
        type: 'event',
        date: '2024-01-18',
        time: '16:00',
        location: 'Botanical Gardens',
        description: 'Hands-on composting workshop for beginners.',
        participants: 15,
        status: 'completed'
      }
    ]
    
    setEvents(mockEvents)
  }, [])

  const eventTypes = [
    { value: 'all', label: 'All Events', color: 'bg-gray-100 text-gray-800' },
    { value: 'pickup', label: 'Pickup', color: 'bg-blue-100 text-blue-800' },
    { value: 'event', label: 'Event', color: 'bg-green-100 text-green-800' },
    { value: 'drive', label: 'Drive', color: 'bg-purple-100 text-purple-800' }
  ]

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'pickup': return 'bg-blue-100 text-blue-800'
      case 'event': return 'bg-green-100 text-green-800'
      case 'drive': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const getUpcomingEvents = () => {
    const today = new Date()
    return events.filter(event => new Date(event.date) >= today)
  }

  const getCompletedEvents = () => {
    const today = new Date()
    return events.filter(event => new Date(event.date) < today)
  }

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'all' || event.type === selectedType
    return matchesSearch && matchesType
  })

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
              Waste Management Schedule
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stay organized with upcoming pickups, community events, and NGO drives. 
              Never miss an important waste management activity.
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-eco-50 border border-eco-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-eco-600">{getUpcomingEvents().length}</div>
              <div className="text-sm text-eco-700">Upcoming Events</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{getCompletedEvents().length}</div>
              <div className="text-sm text-blue-700">Completed Events</div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{events.length}</div>
              <div className="text-sm text-purple-700">Total Events</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filters and Search */}
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
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-500 focus:border-eco-500"
                  />
                </div>
              </div>

              {/* Type Filter */}
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                {eventTypes.map((type) => (
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

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('month')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  viewMode === 'month'
                    ? 'bg-eco-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  viewMode === 'list'
                    ? 'bg-eco-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar View */}
      {viewMode === 'month' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-lg shadow-md border border-gray-200 p-6"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Day headers */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}

              {/* Calendar days */}
              {Array.from({ length: 35 }, (_, i) => {
                const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
                const firstDay = date.getDay()
                const dayNumber = i - firstDay + 1
                const currentDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), dayNumber)
                
                // Check if there are events on this date
                const dayEvents = events.filter(event => {
                  const eventDate = new Date(event.date)
                  return eventDate.toDateString() === currentDate.toDateString()
                })

                return (
                  <div
                    key={i}
                    className={`p-2 min-h-[80px] border border-gray-200 ${
                      dayNumber < 1 || dayNumber > new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate()
                        ? 'bg-gray-50 text-gray-400'
                        : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    {dayNumber > 0 && (
                      <>
                        <div className="text-sm font-medium text-gray-900 mb-1">
                          {dayNumber}
                        </div>
                        {dayEvents.map((event) => (
                          <div
                            key={event.id}
                            className={`text-xs p-1 rounded mb-1 truncate ${getEventTypeColor(event.type)}`}
                            title={event.title}
                          >
                            {event.title}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {filteredEvents.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">
                            {event.title}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-3 leading-relaxed">
                          {event.description}
                        </p>

                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(event.date)}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {event.time}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {event.location}
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {event.participants} participants
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-4">
                        <button className="text-eco-600 hover:text-eco-700 text-sm font-medium hover:underline transition-colors duration-200">
                          View Details
                        </button>
                        <button className="text-eco-600 hover:text-eco-700 text-sm font-medium hover:underline transition-colors duration-200">
                          Join Event
                        </button>
                      </div>
                      
                      <button className="px-4 py-2 bg-eco-600 text-white text-sm font-medium rounded-md hover:bg-eco-700 transition-colors duration-200">
                        Remind Me
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add Event Button */}
      <div className="fixed bottom-6 right-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-eco-600 text-white rounded-full shadow-lg hover:bg-eco-700 transition-colors duration-200 flex items-center justify-center"
        >
          <Plus className="h-6 w-6" />
        </motion.button>
      </div>
    </div>
  )
}

export default Schedule
