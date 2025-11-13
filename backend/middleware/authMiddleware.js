import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const protect = async (req, res, next) => {
  try {
    let token

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    }

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route. Please login.',
      })
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from token (exclude password)
      req.user = await User.findById(decoded.id).select('-password')

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'User not found. Token invalid.',
        })
      }

      // Check if user is active
      if (!req.user.isActive) {
        return res.status(401).json({
          success: false,
          message: 'Your account has been deactivated. Please contact administrator.',
        })
      }

      // Proceed to next middleware
      next()
    } catch (error) {
      console.error('Token verification error:', error.message)
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token. Please login again.',
      })
    }
  } catch (error) {
    console.error('Authentication error:', error)
    return res.status(500).json({
      success: false,
      message: 'Server error in authentication',
    })
  }
}