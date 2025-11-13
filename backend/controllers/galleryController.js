import Gallery from '../models/Gallery.js'
import { deleteFromCloudinary, uploadToCloudinary } from '../config/cloudinary.js'

// @desc    Get all gallery images
// @route   GET /api/gallery
// @access  Public
export const getGalleryImages = async (req, res) => {
  try {
    const { category, page = 1, limit = 12 } = req.query

    const query = { isActive: true }
    if (category && category !== 'All') {
      query.category = category
    }

    const total = await Gallery.countDocuments(query)
    const images = await Gallery.find(query)
      .populate('uploadedBy', 'name email')
      .sort({ order: -1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    res.status(200).json({
      success: true,
      count: images.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      data: images,
    })
  } catch (error) {
    console.error('Get gallery images error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching gallery images',
    })
  }
}

// @desc    Get single gallery image
// @route   GET /api/gallery/:id
// @access  Public
export const getGalleryImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id)
      .populate('uploadedBy', 'name email role')

    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Image not found',
      })
    }

    image.views += 1
    await image.save()

    res.status(200).json({
      success: true,
      data: image,
    })
  } catch (error) {
    console.error('Get gallery image error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching image',
    })
  }
}

// @desc    Create/Upload gallery image
// @route   POST /api/gallery
// @access  Private (Staff and above)
export const createGalleryImage = async (req, res) => {
  try {
    const { title, description, category, order } = req.body

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image file',
      })
    }

    // Upload to Cloudinary
    const uploadResult = await uploadToCloudinary(
      req.file.buffer,
      'sgps/gallery',
      { width: 1200, height: 800, crop: 'limit', quality: 'auto:best' }
    )

    // Create gallery image
    const image = await Gallery.create({
      title,
      description,
      category,
      order: order || 0,
      image: {
        url: uploadResult.url,
        public_id: uploadResult.public_id,
      },
      uploadedBy: req.user.id,
    })

    res.status(201).json({
      success: true,
      message: 'Image uploaded successfully',
      data: image,
    })
  } catch (error) {
    console.error('Create gallery image error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error uploading image',
    })
  }
}

// @desc    Update gallery image
// @route   PUT /api/gallery/:id
// @access  Private (Staff and above)
export const updateGalleryImage = async (req, res) => {
  try {
    let image = await Gallery.findById(req.params.id)

    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Image not found',
      })
    }

    const { title, description, category, order, isActive } = req.body

    // If new image is uploaded
    if (req.file) {
      // Delete old image
      await deleteFromCloudinary(image.image.public_id)
      
      // Upload new image
      const uploadResult = await uploadToCloudinary(
        req.file.buffer,
        'sgps/gallery',
        { width: 1200, height: 800, crop: 'limit', quality: 'auto:best' }
      )
      
      image.image = {
        url: uploadResult.url,
        public_id: uploadResult.public_id,
      }
    }

    // Update fields
    image.title = title || image.title
    image.description = description || image.description
    image.category = category || image.category
    image.order = order !== undefined ? order : image.order
    image.isActive = isActive !== undefined ? isActive : image.isActive

    await image.save()

    res.status(200).json({
      success: true,
      message: 'Image updated successfully',
      data: image,
    })
  } catch (error) {
    console.error('Update gallery image error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating image',
    })
  }
}

// @desc    Delete gallery image
// @route   DELETE /api/gallery/:id
// @access  Private (Staff and above)
export const deleteGalleryImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id)

    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Image not found',
      })
    }

    // Delete from Cloudinary
    await deleteFromCloudinary(image.image.public_id)

    // Delete from database
    await image.deleteOne()

    res.status(200).json({
      success: true,
      message: 'Image deleted successfully',
      data: {},
    })
  } catch (error) {
    console.error('Delete gallery image error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error deleting image',
    })
  }
}

// @desc    Get gallery categories
// @route   GET /api/gallery/categories
// @access  Public
export const getGalleryCategories = async (req, res) => {
  try {
    const categories = await Gallery.distinct('category', { isActive: true })

    res.status(200).json({
      success: true,
      data: ['All', ...categories],
    })
  } catch (error) {
    console.error('Get categories error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching categories',
    })
  }
}