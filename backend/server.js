import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import connectDB from './config/db.js'
import { errorHandler } from './utils/errorHandler.js'

// Import routes
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import galleryRoutes from './routes/galleryRoutes.js'
import eventRoutes from './routes/eventRoutes.js'
import admissionRoutes from './routes/admissionRoutes.js'
import contactRoutes from './routes/contactRoutes.js'

// Load environment variables
dotenv.config()

// Connect to database
connectDB()

// Initialize express app
const app = express()

// Middleware
app.use(helmet()) // Security headers
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}))
app.use(morgan('dev')) // Logging
app.use(express.json()) // Parse JSON
app.use(express.urlencoded({ extended: true })) // Parse URL-encoded

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/gallery', galleryRoutes)
app.use('/api/events', eventRoutes)
app.use('/api/admissions', admissionRoutes)
app.use('/api/contact', contactRoutes)

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: '🚀 SGPS Backend API is running',
    timestamp: new Date().toISOString(),
    user: 'princekothari'
  })
})

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: '🏫 Welcome to Shivalik Ganges Public School API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      gallery: '/api/gallery',
      events: '/api/events',
      admissions: '/api/admissions',
      contact: '/api/contact'
    }
  })
})

// 404 handler
// ✅ NEW - Use this instead
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  })
})

// Error handler middleware
app.use(errorHandler)

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════╗
║   🏫 SGPS Backend Server Running          ║
║   📍 Port: ${PORT}                            ║
║   🌍 Mode: ${process.env.NODE_ENV}        ║
║   👤 User: princekothari                  ║
║   📅 ${new Date().toLocaleString()}              ║
╚════════════════════════════════════════════╝
  `)
})