import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer'
import { useAuth } from '../contexts/AuthContext'

const Layout = () => {
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex">
        {isAuthenticated && <Sidebar />}
        
        <main className={`flex-1 ${isAuthenticated ? 'ml-64' : ''} transition-all duration-300`}>
          <div className="container mx-auto px-4 py-8">
            <Outlet />
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  )
}

export default Layout
