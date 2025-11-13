export const authorize = (...roles) => {
  return (req, res, next) => {
    // Check if user exists (from protect middleware)
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized. Please login first.',
      })
    }

    // Check if user role is authorized
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. User role '${req.user.role}' is not authorized to access this route. Required roles: ${roles.join(', ')}`,
      })
    }

    // User is authorized, proceed
    next()
  }
}

// Role-based middleware shortcuts
export const isChairman = authorize('chairman')
export const isPrincipal = authorize('chairman', 'principal')
export const isTeacher = authorize('chairman', 'principal', 'teacher')
export const isStaff = authorize('chairman', 'principal', 'teacher', 'staff')
export const isAdmin = authorize('chairman', 'principal', 'admin')