import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Exchange from './pages/Exchange'
import Complaints from './pages/Complaints'
import Notifications from './pages/Notifications'
import Schedule from './pages/Schedule'
import Community from './pages/Community'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import RecyclerDashboard from './pages/RecyclerDashboard'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="exchange" element={<Exchange />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="community" element={<Community />} />
          <Route path="auth" element={<Auth />} />
          <Route 
            path="dashboard/*" 
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            } 
          />
          <Route 
            path="recycler-dashboard" 
            element={
              <ProtectedRoute>
                <RecyclerDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="settings" 
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } 
          />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
