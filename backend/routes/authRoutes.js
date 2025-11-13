import express from 'express'
import { 
  register, 
  login, 
  getMe, 
  updatePassword, 
  updateProfile,
  logout 
} from '../controllers/authController.js'
import { protect } from '../middleware/authMiddleware.js'
import { isAdmin } from '../middleware/roleMiddleware.js'

const router = express.Router()

// Public routes
router.post('/login', login)

// Protected routes
router.get('/me', protect, getMe)
router.put('/updatepassword', protect, updatePassword)
router.put('/updateprofile', protect, updateProfile)
router.post('/logout', protect, logout)

// Admin only routes
router.post('/register', protect, isAdmin, register)

export default router