import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const AdminRoute = ({ children }) => {
  const { user, isAdmin, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-eco-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // If not authenticated, redirect to auth
  if (!user) {
    return <Navigate to="/auth" replace />
  }

  // If not admin, redirect to home with message
  if (!isAdmin) {
    return <Navigate to="/" replace />
  }

  return children
}

export default AdminRoute
