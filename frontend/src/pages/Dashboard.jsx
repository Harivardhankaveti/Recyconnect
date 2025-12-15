import { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  Users, 
  RefreshCw, 
  AlertTriangle, 
  TrendingUp,
  Calendar,
  Settings,
  User,
  Eye,
  Edit,
  Trash2,
  Plus,
  Shield,
  Info
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const Dashboard = () => {
  const { user, isAdmin, isNGO, isHousehold } = useAuth()
  const location = useLocation()

  // Redirect non-authenticated users
  if (!user) {
    return <Navigate to="/auth" replace />
  }

  // Mock analytics data - replace with real API calls
  const analyticsData = {
    exchanges: [
      { month: 'Jan', items: 45, requests: 32 },
      { month: 'Feb', items: 52, requests: 38 },
      { month: 'Mar', items: 48, requests: 35 },
      { month: 'Apr', items: 61, requests: 42 },
      { month: 'May', items: 55, requests: 39 },
      { month: 'Jun', items: 67, requests: 48 }
    ],
    complaints: [
      { month: 'Jan', reported: 23, resolved: 18 },
      { month: 'Feb', reported: 28, resolved: 22 },
      { month: 'Mar', reported: 25, resolved: 20 },
      { month: 'Apr', reported: 31, resolved: 25 },
      { month: 'May', reported: 29, resolved: 24 },
      { month: 'Jun', reported: 35, resolved: 28 }
    ],
    users: [
      { month: 'Jan', new: 45, active: 120 },
      { month: 'Feb', new: 52, active: 135 },
      { month: 'Mar', new: 48, active: 142 },
      { month: 'Apr', new: 61, active: 158 },
      { month: 'May', new: 55, active: 165 },
      { month: 'Jun', new: 67, active: 178 }
    ]
  }

  const stats = [
    { name: 'Total Users', value: '2,847', change: '+12%', changeType: 'positive', icon: Users, adminOnly: true },
    { name: 'Items Exchanged', value: '1,234', change: '+8%', changeType: 'positive', icon: RefreshCw, adminOnly: false },
    { name: 'Complaints Resolved', value: '456', change: '+15%', changeType: 'positive', icon: AlertTriangle, adminOnly: false },
    { name: 'Waste Diverted', value: '89.2 tons', change: '+23%', changeType: 'positive', icon: TrendingUp, adminOnly: false }
  ]

  const recentUsers = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah@email.com', role: 'household', status: 'active', joinDate: '2024-01-15' },
    { id: 2, name: 'Mike Chen', email: 'mike@email.com', role: 'recycler', status: 'active', joinDate: '2024-01-14' },
    { id: 3, name: 'Emma Wilson', email: 'emma@email.com', role: 'ngo', status: 'pending', joinDate: '2024-01-13' },
    { id: 4, name: 'John Davis', email: 'john@email.com', role: 'household', status: 'active', joinDate: '2024-01-12' }
  ]

  const recentItems = [
    { id: 1, title: 'Cardboard Boxes', category: 'recyclable', postedBy: 'Sarah J.', status: 'claimed', postedDate: '2024-01-15' },
    { id: 2, title: 'Glass Bottles', category: 'recyclable', postedBy: 'Mike C.', status: 'available', postedDate: '2024-01-14' },
    { id: 3, title: 'Wooden Pallets', category: 'reusable', postedBy: 'Emma W.', status: 'claimed', postedDate: '2024-01-13' }
  ]

  const recentComplaints = [
    { id: 1, title: 'Broken Street Light', type: 'infrastructure', reportedBy: 'John D.', status: 'in-progress', reportedDate: '2024-01-15' },
    { id: 2, title: 'Garbage Pile', type: 'waste', reportedBy: 'Lisa M.', status: 'resolved', reportedDate: '2024-01-14' },
    { id: 3, title: 'Stray Dogs', type: 'animals', reportedBy: 'Mike R.', status: 'pending', reportedDate: '2024-01-13' }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'suspended': return 'bg-red-100 text-red-800'
      case 'available': return 'bg-blue-100 text-blue-800'
      case 'claimed': return 'bg-green-100 text-green-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      case 'resolved': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  // Filter stats based on user role
  const filteredStats = isAdmin ? stats : stats.filter(stat => !stat.adminOnly)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.name}!</p>
              <div className="flex items-center mt-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  isAdmin ? 'bg-purple-100 text-purple-800' : 
                  isNGO ? 'bg-blue-100 text-blue-800' : 
                  'bg-green-100 text-green-800'
                }`}>
                  {isAdmin ? <Shield className="w-3 h-3 mr-1" /> : 
                   isNGO ? <Users className="w-3 h-3 mr-1" /> : 
                   <User className="w-3 h-3 mr-1" />}
                  {isAdmin ? 'Administrator' : isNGO ? 'NGO Member' : 'Household Member'}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {isAdmin && (
                <button className="inline-flex items-center px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 transition-colors duration-200">
                  <Plus className="h-4 w-4 mr-2" />
                  Admin Action
                </button>
              )}
              <button className="inline-flex items-center px-4 py-2 bg-eco-600 text-white text-sm font-medium rounded-md hover:bg-eco-700 transition-colors duration-200">
                <Plus className="h-4 w-4 mr-2" />
                Quick Action
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Dashboard Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <Link
              to="/dashboard"
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                location.pathname === '/dashboard'
                  ? 'border-eco-500 text-eco-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <BarChart3 className="inline-block w-4 h-4 mr-2" />
              Overview
            </Link>
            {isAdmin && (
              <>
                <Link
                  to="/dashboard/users"
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    location.pathname === '/dashboard/users'
                      ? 'border-eco-500 text-eco-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Users className="inline-block w-4 h-4 mr-2" />
                  Users
                </Link>
                <Link
                  to="/dashboard/analytics"
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    location.pathname === '/dashboard/analytics'
                      ? 'border-eco-500 text-eco-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <TrendingUp className="inline-block w-4 h-4 mr-2" />
                  Analytics
                </Link>
              </>
            )}
            <Link
              to="/dashboard/profile"
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                location.pathname === '/dashboard/profile'
                  ? 'border-eco-500 text-eco-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <User className="inline-block w-4 h-4 mr-2" />
              Profile
            </Link>
            <Link
              to="/dashboard/settings"
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                location.pathname === '/dashboard/settings'
                  ? 'border-eco-500 text-eco-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Settings className="inline-block w-4 h-4 mr-2" />
              Settings
            </Link>
          </nav>
        </div>
      </div>

      {/* Dashboard Content */}
      <Routes>
        <Route path="/" element={<DashboardOverview stats={filteredStats} analyticsData={analyticsData} recentUsers={recentUsers} recentItems={recentItems} recentComplaints={recentComplaints} getStatusColor={getStatusColor} formatDate={formatDate} isAdmin={isAdmin} />} />
        {isAdmin && <Route path="/users" element={<UsersManagement users={recentUsers} getStatusColor={getStatusColor} formatDate={formatDate} />} />}
        {isAdmin && <Route path="/analytics" element={<AnalyticsPage analyticsData={analyticsData} />} />}
        <Route path="/profile" element={<ProfilePage user={user} />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </div>
  )
}

// Dashboard Overview Component
const DashboardOverview = ({ stats, analyticsData, recentUsers, recentItems, recentComplaints, getStatusColor, formatDate, isAdmin }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-md border border-gray-200 p-6"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-eco-100 rounded-lg flex items-center justify-center">
                  <stat.icon className="h-5 w-5 text-eco-600" />
                </div>
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
            <div className="mt-4">
              <span className={`text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-1">from last month</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
      >
        {/* Exchange Trends */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exchange Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={analyticsData.exchanges}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="items" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} />
              <Area type="monotone" dataKey="requests" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Complaint Resolution */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Complaint Resolution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.complaints}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="reported" fill="#ef4444" />
              <Bar dataKey="resolved" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Recent Users - Admin Only */}
        {isAdmin && (
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Users</h3>
              <Link to="/dashboard/users" className="text-eco-600 hover:text-eco-700 text-sm font-medium">
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {recentUsers.slice(0, 3).map((user) => (
                <div key={user.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-eco-100 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-eco-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                    {user.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Items */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Items</h3>
            <Link to="/exchange" className="text-eco-600 hover:text-eco-700 text-sm font-medium">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {recentItems.slice(0, 3).map((item) => (
              <div key={item.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <RefreshCw className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.category}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Complaints */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Complaints</h3>
            <Link to="/complaints" className="text-eco-600 hover:text-eco-700 text-sm font-medium">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {recentComplaints.slice(0, 3).map((complaint) => (
              <div key={complaint.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{complaint.title}</p>
                  <p className="text-xs text-gray-500">{complaint.type}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                  {complaint.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// Users Management Component
const UsersManagement = ({ users, getStatusColor, formatDate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
            <button className="inline-flex items-center px-4 py-2 bg-eco-600 text-white text-sm font-medium rounded-md hover:bg-eco-700 transition-colors duration-200">
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-eco-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-eco-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900 capitalize">{user.role}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(user.joinDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-eco-600 hover:text-eco-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// Analytics Page Component
const AnalyticsPage = ({ analyticsData }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Detailed Analytics</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Growth */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">User Growth</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData.users}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="new" stroke="#22c55e" strokeWidth={2} />
                <Line type="monotone" dataKey="active" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Category Distribution */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">User Role Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Household', value: 65 },
                    { name: 'Recycler', value: 20 },
                    { name: 'NGO', value: 10 },
                    { name: 'Admin', value: 5 }
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

// Profile Page Component
const ProfilePage = ({ user }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Settings</h2>
        
        <div className="space-y-6">
          <div className="flex items-center space-x-6">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}
              alt={user?.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-medium text-gray-900">{user?.name}</h3>
              <p className="text-gray-500">{user?.email}</p>
              <p className="text-sm text-gray-400 capitalize">Role: {user?.role}</p>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <p className="text-gray-600">Profile editing functionality will be implemented here.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Settings Page Component
const SettingsPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Settings</h2>
        
        <div className="space-y-6">
          <p className="text-gray-600">Settings functionality will be implemented here.</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
