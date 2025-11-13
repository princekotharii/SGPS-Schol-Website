import express from 'express'
import User from '../models/User.js'
import { protect } from '../middleware/authMiddleware.js'
import { isAdmin } from '../middleware/roleMiddleware.js'

const router = express.Router()

// @desc    Get all users
// @route   GET /api/users
// @access  Private (Admin only)
router.get('/', protect, isAdmin, async (req, res) => {
  try {
    const { role, isActive, page = 1, limit = 10 } = req.query

    const query = {}
    if (role) query.role = role
    if (isActive !== undefined) query.isActive = isActive === 'true'

    const total = await User.countDocuments(query)
    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    res.status(200).json({
      success: true,
      count: users.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      data: users,
    })
  } catch (error) {
    console.error('Get users error:', error)
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Error fetching users'
    })
  }
})

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private (Admin only)
router.get('/:id', protect, isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password')

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      })
    }

    res.status(200).json({
      success: true,
      data: user,
    })
  } catch (error) {
    console.error('Get user error:', error)
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Error fetching user'
    })
  }
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private (Admin only)
router.put('/:id', protect, isAdmin, async (req, res) => {
  try {
    const { password, ...updateData } = req.body

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    ).select('-password')

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      })
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: user,
    })
  } catch (error) {
    console.error('Update user error:', error)
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Error updating user'
    })
  }
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private (Admin only)
router.delete('/:id', protect, isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      })
    }

    // Prevent deleting yourself
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete your own account',
      })
    }

    await user.deleteOne()

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: {},
    })
  } catch (error) {
    console.error('Delete user error:', error)
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Error deleting user'
    })
  }
})

// @desc    Toggle user active status
// @route   PATCH /api/users/:id/toggle-status
// @access  Private (Admin only)
router.patch('/:id/toggle-status', protect, isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      })
    }

    // Prevent deactivating yourself
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'You cannot deactivate your own account',
      })
    }

    user.isActive = !user.isActive
    await user.save()

    res.status(200).json({
      success: true,
      message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`,
      data: user,
    })
  } catch (error) {
    console.error('Toggle status error:', error)
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Error toggling user status'
    })
  }
})

// @desc    Get user statistics
// @route   GET /api/users/stats/summary
// @access  Private (Admin only)
router.get('/stats/summary', protect, isAdmin, async (req, res) => {
  try {
    const stats = await User.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 },
        },
      },
    ])

    const total = await User.countDocuments()
    const active = await User.countDocuments({ isActive: true })
    const inactive = await User.countDocuments({ isActive: false })

    res.status(200).json({
      success: true,
      data: {
        total,
        active,
        inactive,
        byRole: stats,
      },
    })
  } catch (error) {
    console.error('Get user stats error:', error)
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Error fetching statistics'
    })
  }
})

export default router