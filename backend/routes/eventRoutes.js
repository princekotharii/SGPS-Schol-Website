import express from 'express'
import Event from '../models/Event.js'
import { protect } from '../middleware/authMiddleware.js'
import { isStaff } from '../middleware/roleMiddleware.js'
import { uploadEvent } from '../config/cloudinary.js'
import { deleteFromCloudinary, uploadToCloudinary } from '../config/cloudinary.js'

const router = express.Router()

// Get all events
router.get('/', async (req, res) => {
  try {
    const { category, page = 1, limit = 10, upcoming } = req.query

    const query = { isActive: true }
    
    if (category) query.category = category
    
    if (upcoming === 'true') {
      query.date = { $gte: new Date() }
    }

    const total = await Event.countDocuments(query)
    const events = await Event.find(query)
      .populate('createdBy', 'name email')
      .sort({ date: upcoming === 'true' ? 1 : -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    res.status(200).json({
      success: true,
      count: events.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      data: events,
    })
  } catch (error) {
    console.error('Get events error:', error)
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Error fetching events'
    })
  }
})

// Get single event
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('createdBy', 'name email role')

    if (!event) {
      return res.status(404).json({ 
        success: false, 
        message: 'Event not found' 
      })
    }

    res.status(200).json({
      success: true,
      data: event,
    })
  } catch (error) {
    console.error('Get event error:', error)
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Error fetching event'
    })
  }
})

// Create event
router.post('/', protect, isStaff, uploadEvent.single('image'), async (req, res) => {
  try {
    const eventData = {
      ...req.body,
      createdBy: req.user.id,
    }

    if (req.file) {
      const uploadResult = await uploadToCloudinary(
        req.file.buffer,
        'sgps/events',
        { width: 1000, height: 600, crop: 'limit', quality: 'auto:good' }
      )
      
      eventData.image = {
        url: uploadResult.url,
        public_id: uploadResult.public_id,
      }
    }

    const event = await Event.create(eventData)

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: event,
    })
  } catch (error) {
    console.error('Create event error:', error)
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Error creating event'
    })
  }
})

// Update event
router.put('/:id', protect, isStaff, uploadEvent.single('image'), async (req, res) => {
  try {
    let event = await Event.findById(req.params.id)

    if (!event) {
      return res.status(404).json({ 
        success: false, 
        message: 'Event not found' 
      })
    }

    if (req.file) {
      if (event.image?.public_id) {
        await deleteFromCloudinary(event.image.public_id)
      }
      
      const uploadResult = await uploadToCloudinary(
        req.file.buffer,
        'sgps/events',
        { width: 1000, height: 600, crop: 'limit', quality: 'auto:good' }
      )
      
      event.image = {
        url: uploadResult.url,
        public_id: uploadResult.public_id,
      }
    }

    Object.keys(req.body).forEach(key => {
      if (req.body[key] !== undefined) {
        event[key] = req.body[key]
      }
    })

    await event.save()

    res.status(200).json({
      success: true,
      message: 'Event updated successfully',
      data: event,
    })
  } catch (error) {
    console.error('Update event error:', error)
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Error updating event'
    })
  }
})

// Delete event
router.delete('/:id', protect, isStaff, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)

    if (!event) {
      return res.status(404).json({ 
        success: false, 
        message: 'Event not found' 
      })
    }

    if (event.image?.public_id) {
      await deleteFromCloudinary(event.image.public_id)
    }

    await event.deleteOne()

    res.status(200).json({
      success: true,
      message: 'Event deleted successfully',
      data: {},
    })
  } catch (error) {
    console.error('Delete event error:', error)
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Error deleting event'
    })
  }
})

// Get event statistics
router.get('/stats/summary', protect, isStaff, async (req, res) => {
  try {
    const stats = await Event.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ])

    const total = await Event.countDocuments({ isActive: true })
    const upcoming = await Event.countDocuments({
      isActive: true,
      date: { $gte: new Date() },
    })

    res.status(200).json({
      success: true,
      data: {
        total,
        upcoming,
        byCategory: stats,
      },
    })
  } catch (error) {
    console.error('Get event stats error:', error)
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Error fetching statistics'
    })
  }
})

export default router