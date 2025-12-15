import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Home, 
  RefreshCw, 
  AlertTriangle, 
  Calendar, 
  Users, 
  BarChart3,
  Settings,
  User,
  Shield,
  Info
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const Sidebar = () => {
  const location = useLocation()
  const { user, isAdmin, isNGO, isHousehold } = useAuth()

  // Admin-specific navigation (includes dashboard)
  const adminNavigation = [
    { name: 'Overview', href: '/dashboard', icon: BarChart3, current: location.pathname === '/dashboard' },
    { name: 'Users', href: '/dashboard/users', icon: Users, current: location.pathname === '/dashboard/users' },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3, current: location.pathname === '/dashboard/analytics' },
    { name: 'Profile', href: '/dashboard/profile', icon: User, current: location.pathname === '/dashboard/profile' },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings, current: location.pathname === '/dashboard/settings' },
  ]

  // NGO-specific navigation (no dashboard)
  const ngoNavigation = [
    { name: 'Community', href: '/community', icon: Users, current: location.pathname === '/community' },
    { name: 'Events', href: '/schedule', icon: Calendar, current: location.pathname === '/schedule' },
    { name: 'Profile', href: '/profile', icon: User, current: location.pathname === '/profile' },
    { name: 'Settings', href: '/settings', icon: Settings, current: location.pathname === '/settings' },
  ]

  // Household-specific navigation (no dashboard)
  const householdNavigation = [
    { name: 'My Items', href: '/exchange', icon: RefreshCw, current: location.pathname === '/exchange' },
    { name: 'My Reports', href: '/complaints', icon: AlertTriangle, current: location.pathname === '/complaints' },
    { name: 'Profile', href: '/profile', icon: User, current: location.pathname === '/profile' },
    { name: 'Settings', href: '/settings', icon: Settings, current: location.pathname === '/settings' },
  ]

  // Get the appropriate navigation based on user role
  const getNavigation = () => {
    if (isAdmin) return adminNavigation
    if (isNGO) return ngoNavigation
    if (isHousehold) return householdNavigation
    return []
  }

  const currentNavigation = getNavigation()

  return (
    <motion.div
      initial={{ x: -256 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-16 h-full w-64 bg-white shadow-lg border-r border-gray-200 z-40 overflow-y-auto"
    >
      <div className="p-4">
        {/* User info */}
        <div className="mb-6 p-4 bg-gradient-to-br from-eco-50 to-eco-100 rounded-lg border border-eco-200">
          <div className="flex items-center space-x-3">
            <img
              className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-sm"
              src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}
              alt={user?.name}
            />
            <div>
              <h3 className="text-sm font-semibold text-gray-900">{user?.name}</h3>
              <p className="text-xs text-eco-700 capitalize">{user?.role}</p>
              <div className="flex items-center mt-1">
                {isAdmin ? (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    <Shield className="w-3 h-3 mr-1" />
                    Administrator
                  </span>
                ) : isNGO ? (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <Users className="w-3 h-3 mr-1" />
                    NGO Member
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <User className="w-3 h-3 mr-1" />
                    Household Member
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {/* Main navigation */}
          <div>
            <h3 className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {isAdmin ? 'Dashboard' : 'Navigation'}
            </h3>
            {currentNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  item.current
                    ? 'bg-eco-100 text-eco-700 border-r-2 border-eco-600'
                    : 'text-gray-700 hover:text-eco-600 hover:bg-eco-50'
                }`}
              >
                <item.icon className={`mr-3 h-5 w-5 ${
                  item.current ? 'text-eco-600' : 'text-gray-400 group-hover:text-eco-600'
                }`} />
                {item.name}
              </Link>
            ))}
          </div>

          {/* Quick actions */}
          <div>
            <h3 className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <Link
                to="/exchange"
                className="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-eco-600 hover:bg-eco-50 rounded-md transition-colors duration-200"
              >
                <RefreshCw className="mr-3 h-5 w-5 text-gray-400 group-hover:text-eco-600" />
                Post Item
              </Link>
              <Link
                to="/complaints"
                className="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-eco-600 hover:bg-eco-50 rounded-md transition-colors duration-200"
              >
                <AlertTriangle className="mr-3 h-5 w-5 text-gray-400 group-hover:text-eco-600" />
                Report Issue
              </Link>
              <Link
                to="/schedule"
                className="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-eco-600 hover:bg-eco-50 rounded-md transition-colors duration-200"
              >
                <Calendar className="mr-3 h-5 w-5 text-gray-400 group-hover:text-eco-600" />
                View Schedule
              </Link>
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              ♻ Making waste valuable
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Sidebar
