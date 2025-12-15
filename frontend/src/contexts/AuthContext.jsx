import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored user data on app load
    const storedUser = localStorage.getItem('recyconnect_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Error parsing stored user:', error)
        localStorage.removeItem('recyconnect_user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      // Simulate API call - replace with actual backend integration
      const mockUser = {
        id: '1',
        email,
        name: 'John Doe',
        role: 'household',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      }
      
      setUser(mockUser)
      localStorage.setItem('recyconnect_user', JSON.stringify(mockUser))
      return { success: true, user: mockUser }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const signup = async (userData) => {
    try {
      // Simulate API call - replace with actual backend integration
      const mockUser = {
        id: '1',
        email: userData.email,
        name: userData.name,
        role: userData.role,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      }
      
      setUser(mockUser)
      localStorage.setItem('recyconnect_user', JSON.stringify(mockUser))
      return { success: true, user: mockUser }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('recyconnect_user')
  }

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates }
    setUser(updatedUser)
    localStorage.setItem('recyconnect_user', JSON.stringify(updatedUser))
  }

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateUser,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isNGO: user?.role === 'ngo',
    isRecycler: user?.role === 'recycler',
    isHousehold: user?.role === 'household'
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
