import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, 
  X, 
  Bell, 
  User, 
  LogOut, 
  Settings, 
  Shield,
  Users as UsersIcon
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import NotificationBell from './NotificationBell'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { user, logout, isAdmin, isNGO, isRecycler, isHousehold } = useAuth()
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/', current: location.pathname === '/' },
    { name: 'Exchange', href: '/exchange', current: location.pathname === '/exchange' },
    { name: 'Complaints', href: '/complaints', current: location.pathname === '/complaints' },
    { name: 'Schedule', href: '/schedule', current: location.pathname === '/schedule' },
    { name: 'Community', href: '/community', current: location.pathname === '/community' },
  ]

  const handleLogout = () => {
    logout()
    setIsUserMenuOpen(false)
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <nav className="bg-white shadow-soft border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center"
          >
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-eco-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-soft group-hover:shadow-medium transition-all duration-300">
                <span className="text-white text-xl font-bold">♻</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 group-hover:text-eco-600 transition-colors duration-200">
                  RecyConnect
                </h1>
                <p className="text-xs text-gray-500 -mt-1">Smart Waste Exchange</p>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  item.current
                    ? 'bg-eco-50 text-eco-700 border border-eco-200'
                    : 'text-gray-600 hover:text-eco-600 hover:bg-eco-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side - Auth/User */}
          <div className="flex items-center space-x-4">
            {/* Notification Bell */}
            {user && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <NotificationBell />
              </motion.div>
            )}

            {/* User Menu or Auth Buttons */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-eco-500 focus:ring-offset-2"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-eco-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <div className="flex items-center space-x-1">
                      {isAdmin ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          <Shield className="w-3 h-3 mr-1" />
                          Admin
                        </span>
                      ) : isNGO ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <UsersIcon className="w-3 h-3 mr-1" />
                          NGO
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <User className="w-3 h-3 mr-1" />
                          User
                        </span>
                      )}
                    </div>
                  </div>
                </button>

                {/* User Dropdown Menu */}
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-strong border border-gray-200 py-2 z-50"
                    >
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                      
                      <div className="py-1">
                        {isAdmin && (
                          <Link
                            to="/dashboard"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-eco-50 hover:text-eco-700 transition-colors duration-200"
                          >
                            <User className="mr-3 h-4 w-4" />
                            Dashboard
                          </Link>
                        )}
                        {(isAdmin || isRecycler || isNGO) && (
                          <Link
                            to="/recycler-dashboard"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-eco-50 hover:text-eco-700 transition-colors duration-200"
                          >
                            <UsersIcon className="mr-3 h-4 w-4" />
                            {isNGO ? 'NGO Dashboard' : isAdmin ? 'Admin Dashboard' : 'Recycler Dashboard'}
                          </Link>
                        )}
                        {isAdmin ? (
                          <Link
                            to="/dashboard/profile"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-eco-50 hover:text-eco-700 transition-colors duration-200"
                          >
                            <Settings className="mr-3 h-4 w-4" />
                            Settings
                          </Link>
                        ) : (
                          <Link
                            to="/profile"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-eco-50 hover:text-eco-700 transition-colors duration-200"
                          >
                            <Settings className="mr-3 h-4 w-4" />
                            Settings
                          </Link>
                        )}
                      </div>
                      
                      <div className="border-t border-gray-200 py-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                        >
                          <LogOut className="mr-3 h-4 w-4" />
                          Sign out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/auth"
                  className="btn-outline px-4 py-2 text-sm"
                >
                  Sign in
                </Link>
                <Link
                  to="/auth"
                  className="btn-primary px-4 py-2 text-sm"
                >
                  Sign up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-eco-600 hover:bg-eco-50 transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-200 shadow-soft"
          >
            <div className="px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                    item.current
                      ? 'bg-eco-50 text-eco-700 border border-eco-200'
                      : 'text-gray-600 hover:text-eco-600 hover:bg-eco-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {user && (
                <div className="pt-4 border-t border-gray-200">
                  {isAdmin && (
                    <Link
                      to="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 rounded-lg text-base font-medium text-gray-600 hover:text-eco-600 hover:bg-eco-50 transition-colors duration-200"
                    >
                      Dashboard
                    </Link>
                  )}
                  {(isAdmin || isRecycler || isNGO) && (
                    <Link
                      to="/recycler-dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 rounded-lg text-base font-medium text-gray-600 hover:text-eco-600 hover:bg-eco-50 transition-colors duration-200"
                    >
                      {isNGO ? 'NGO Dashboard' : isAdmin ? 'Admin Dashboard' : 'Recycler Dashboard'}
                    </Link>
                  )}
                  <Link
                    to={isAdmin ? "/dashboard/profile" : "/profile"}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg text-base font-medium text-gray-600 hover:text-eco-600 hover:bg-eco-50 transition-colors duration-200"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-3 rounded-lg text-base font-medium text-red-600 hover:bg-red-50 transition-colors duration-200"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
