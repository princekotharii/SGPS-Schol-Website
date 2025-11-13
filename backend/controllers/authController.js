import User from '../models/User.js'
import { generateToken } from '../config/auth.js'

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Private (Admin/Chairman/Principal only)
export const register = async (req, res) => {
  try {
    const { name, email, password, role, phone, department, designation } = req.body

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password',
      })
    }

    // Check if user already exists
    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email address',
      })
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'staff',
      phone,
      department,
      designation,
    })

    // Generate token
    const token = generateToken(user._id)

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user,
        token,
      },
    })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error registering user',
    })
  }
}

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      })
    }

    // Check for user (include password field)
    const user = await User.findOne({ email }).select('+password')
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      })
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Your account has been deactivated. Please contact administrator.',
      })
    }

    // Check if password matches
    const isPasswordMatch = await user.comparePassword(password)
    
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      })
    }

    // Update last login
    user.lastLogin = new Date()
    await user.save()

    // Generate token
    const token = generateToken(user._id)

    // Remove password from output
    user.password = undefined

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user,
        token,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error logging in',
    })
  }
}

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    res.status(200).json({
      success: true,
      data: user,
    })
  } catch (error) {
    console.error('Get me error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching user data',
    })
  }
}

// @desc    Update password
// @route   PUT /api/auth/updatepassword
// @access  Private
export const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body

    // Validation
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both current and new password',
      })
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long',
      })
    }

    // Get user with password
    const user = await User.findById(req.user.id).select('+password')

    // Check current password
    const isMatch = await user.comparePassword(currentPassword)
    
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect',
      })
    }

    // Update password
    user.password = newPassword
    await user.save()

    // Generate new token
    const token = generateToken(user._id)

    res.status(200).json({
      success: true,
      message: 'Password updated successfully',
      data: { token },
    })
  } catch (error) {
    console.error('Update password error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating password',
    })
  }
}

// @desc    Update user profile
// @route   PUT /api/auth/updateprofile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const { name, phone, department, designation } = req.body

    const user = await User.findById(req.user.id)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    // Update fields
    if (name) user.name = name
    if (phone) user.phone = phone
    if (department) user.department = department
    if (designation) user.designation = designation

    await user.save()

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: user,
    })
  } catch (error) {
    console.error('Update profile error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating profile',
    })
  }
}

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
      data: {},
    })
  } catch (error) {
    console.error('Logout error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error logging out',
    })
  }
}