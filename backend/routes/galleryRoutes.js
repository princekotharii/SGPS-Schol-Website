import express from 'express'
import {
  getGalleryImages,
  getGalleryImage,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
  getGalleryCategories,
} from '../controllers/galleryController.js'
import { protect } from '../middleware/authMiddleware.js'
import { isStaff } from '../middleware/roleMiddleware.js'
import { uploadGallery } from '../config/cloudinary.js'

const router = express.Router()

// Public routes
router.get('/', getGalleryImages)
router.get('/categories', getGalleryCategories)
router.get('/:id', getGalleryImage)

// Protected routes (Staff and above)
router.post('/', protect, isStaff, uploadGallery.single('image'), createGalleryImage)
router.put('/:id', protect, isStaff, uploadGallery.single('image'), updateGalleryImage)
router.delete('/:id', protect, isStaff, deleteGalleryImage)

export default router