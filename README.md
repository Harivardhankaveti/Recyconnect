HEAD
# ♻ WasteConnect - Smart Waste Exchange & Sustainability Hub

A modern React-based waste management platform that connects communities for sustainable waste management, civic reporting, and environmental consciousness.

## 🚀 Features

- **Smart Waste Exchange**: Post and browse waste items for recycling/reuse
- **Recycler Dashboard**: Manage waste pickup requests and processing
- **Community Reporting**: Report civic issues and track resolutions
- **User Authentication**: Role-based access (Household, Recycler, NGO, Admin)
- **Real-time Notifications**: Stay updated on your requests and community activity
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Technology Stack

### Frontend
- **React 18** with Vite for fast development
- **Tailwind CSS** for modern styling
- **Framer Motion** for smooth animations
- **React Router** for navigation
- **Lucide React** for icons
- **Recharts** for data visualization

### Backend
- **Node.js** with Express.js
- **MySQL** database
- **Multer** for file uploads
- **CORS** for cross-origin requests

## 📋 Prerequisites

Before running the project, ensure you have:

1. **Node.js** (v16 or higher)
2. **MySQL** server running
3. **npm** or **yarn** package manager

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd waste-smart
```

### 2. Setup Database
1. Create a MySQL database named `wasteconnect_db`
2. Execute the SQL script in `backend/database.sql` to create tables and sample data

### 3. Install Dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 4. Start the Application

#### Option A: Using the setup script (Windows)
```bash
# Run the setup script
setup.bat
```

#### Option B: Manual setup
```bash
# Terminal 1: Start the backend server
cd backend
npm start

# Terminal 2: Start the frontend development server
cd frontend
npm start
```

### 5. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📁 Project Structure

```
waste-smart/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts (Auth, etc.)
│   │   └── main.jsx        # Application entry point
│   ├── package.json
│   └── vite.config.js
├── backend/                 # Node.js backend API
│   ├── server.js           # Express server setup
│   ├── db.js              # Database connection
│   ├── config.js          # Configuration
│   ├── database.sql       # Database schema
│   └── package.json
├── setup.bat              # Windows setup script
└── README.md
```

## 🔧 Configuration

### Backend Configuration
Edit `backend/config.js` to update database credentials:

```javascript
module.exports = {
  database: {
    host: 'localhost',
    user: 'root',
    password: '', // Your MySQL password
    database: 'wasteconnect_db'
  },
  port: 5000
};
```

### Frontend Configuration
The frontend automatically connects to the backend API at `http://localhost:5000`. Update API endpoints in components if needed.

## 🎯 Key Features Explained

### Waste Exchange System
- Users can post waste items with images
- Recyclers can browse and accept pickup requests
- Status tracking: Pending → Accepted → Processed

### Recycler Dashboard
- View all waste pickup requests
- Accept or process requests
- Track request status
- Upload and manage images

### User Roles
- **Household**: Post waste items, report issues
- **Recycler**: Manage pickup requests, process waste
- **NGO**: Community management, analytics
- **Admin**: Full system access, user management

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure MySQL is running
   - Check database credentials in `backend/config.js`
   - Verify database `wasteconnect_db` exists

2. **Port Already in Use**
   - Backend (5000): Change port in `backend/config.js`
   - Frontend (3000): Vite will automatically use next available port

3. **CORS Issues**
   - Backend CORS is configured for `localhost:3000`
   - Update CORS settings in `backend/server.js` if using different ports

4. **File Upload Issues**
   - Ensure `backend/uploads/` directory exists
   - Check file size limits (2MB default)
   - Verify file type restrictions

## 🔄 API Endpoints

### Waste Requests
- `GET /api/waste-requests` - Get all waste requests
- `POST /api/waste-requests` - Submit new waste request
- `PUT /api/waste-requests/:id/status` - Update request status

### Health Check
- `GET /api/health` - Check server and database status

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by sustainable waste management practices
- Community-driven development approach

---

**Happy Recycling! ♻️**


# AAC
