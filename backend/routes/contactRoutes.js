import express from 'express'
import {
  submitContact,
  getContacts,
  getContact,
  replyToContact,
  deleteContact,
  getContactStats,
} from '../controllers/contactController.js'
import { protect } from '../middleware/authMiddleware.js'
import { isStaff, isPrincipal } from '../middleware/roleMiddleware.js'

const router = express.Router()

// Public routes
router.post('/', submitContact)

// Protected routes (Staff and above)
router.get('/', protect, isStaff, getContacts)
router.get('/stats', protect, isStaff, getContactStats)
router.get('/:id', protect, isStaff, getContact)
router.put('/:id/reply', protect, isStaff, replyToContact)

// Protected routes (Principal and above)
router.delete('/:id', protect, isPrincipal, deleteContact)

export default router