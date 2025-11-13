import express from 'express'
import {
  submitAdmission,
  getAdmissions,
  getAdmission,
  updateAdmissionStatus,
  deleteAdmission,
  getAdmissionStats,
} from '../controllers/admissionController.js'
import { protect } from '../middleware/authMiddleware.js'
import { isStaff, isPrincipal } from '../middleware/roleMiddleware.js'

const router = express.Router()

// Public routes
router.post('/', submitAdmission)

// Protected routes (Staff and above)
router.get('/', protect, isStaff, getAdmissions)
router.get('/stats', protect, isStaff, getAdmissionStats)
router.get('/:id', protect, isStaff, getAdmission)

// Protected routes (Principal and above)
router.put('/:id', protect, isPrincipal, updateAdmissionStatus)
router.delete('/:id', protect, isPrincipal, deleteAdmission)

export default router