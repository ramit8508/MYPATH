// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const authRoutes = require('./routes/auth');

// Create Express application
const app = express();

// Middleware Setup
// Parse incoming JSON data in request body
app.use(express.json());

// Enable CORS to allow frontend to make requests to this backend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true // Allow cookies and credentials
}));

// Connect to MongoDB Database
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB - School Student Database');
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1); // Exit if database connection fails
  });

// Routes
// All authentication routes (register, login) will be under /api/auth
app.use('/api/auth', authRoutes);

// Health check route - to verify server is running
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'School Backend Server is running',
    timestamp: new Date().toISOString()
  });
});

// Handle 404 - Route not found
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 School Backend Server is running on port ${PORT}`);
  console.log(`🌐 Access at: http://localhost:${PORT}`);
});
