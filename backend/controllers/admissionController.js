import Admission from '../models/Admission.js'

// @desc    Submit admission application (Public)
// @route   POST /api/admissions
// @access  Public
export const submitAdmission = async (req, res) => {
  try {
    // Create admission application
    const admission = await Admission.create(req.body)

    res.status(201).json({
      success: true,
      message: 'Admission application submitted successfully. We will contact you soon.',
      data: {
        applicationNumber: admission.applicationNumber,
        studentName: admission.studentName,
        email: admission.email,
      },
    })
  } catch (error) {
    console.error('Submit admission error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error submitting admission application',
    })
  }
}

// @desc    Get all admission applications
// @route   GET /api/admissions
// @access  Private (Staff and above)
export const getAdmissions = async (req, res) => {
  try {
    const { status, page = 1, limit = 10, search } = req.query

    // Build query
    const query = {}
    if (status) query.status = status
    
    // Search by student name, email, or application number
    if (search) {
      query.$or = [
        { studentName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { applicationNumber: { $regex: search, $options: 'i' } },
      ]
    }

    // Get total count
    const total = await Admission.countDocuments(query)

    // Get paginated admissions
    const admissions = await Admission.find(query)
      .populate('reviewedBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    res.status(200).json({
      success: true,
      count: admissions.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      data: admissions,
    })
  } catch (error) {
    console.error('Get admissions error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching admissions',
    })
  }
}

// @desc    Get single admission application
// @route   GET /api/admissions/:id
// @access  Private (Staff and above)
export const getAdmission = async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id)
      .populate('reviewedBy', 'name email role')

    if (!admission) {
      return res.status(404).json({
        success: false,
        message: 'Admission application not found',
      })
    }

    res.status(200).json({
      success: true,
      data: admission,
    })
  } catch (error) {
    console.error('Get admission error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching admission',
    })
  }
}

// @desc    Update admission status
// @route   PUT /api/admissions/:id
// @access  Private (Principal and above)
export const updateAdmissionStatus = async (req, res) => {
  try {
    const { status, remarks, admissionDate } = req.body

    const admission = await Admission.findById(req.params.id)

    if (!admission) {
      return res.status(404).json({
        success: false,
        message: 'Admission application not found',
      })
    }

    // Update fields
    admission.status = status || admission.status
    admission.remarks = remarks || admission.remarks
    admission.reviewedBy = req.user.id
    admission.reviewedAt = new Date()
    
    if (admissionDate) {
      admission.admissionDate = admissionDate
    }

    await admission.save()

    res.status(200).json({
      success: true,
      message: 'Admission status updated successfully',
      data: admission,
    })
  } catch (error) {
    console.error('Update admission error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating admission',
    })
  }
}

// @desc    Delete admission application
// @route   DELETE /api/admissions/:id
// @access  Private (Principal and above)
export const deleteAdmission = async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id)

    if (!admission) {
      return res.status(404).json({
        success: false,
        message: 'Admission application not found',
      })
    }

    await admission.deleteOne()

    res.status(200).json({
      success: true,
      message: 'Admission application deleted successfully',
      data: {},
    })
  } catch (error) {
    console.error('Delete admission error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error deleting admission',
    })
  }
}

// @desc    Get admission statistics
// @route   GET /api/admissions/stats
// @access  Private (Staff and above)
export const getAdmissionStats = async (req, res) => {
  try {
    const stats = await Admission.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ])

    const total = await Admission.countDocuments()

    res.status(200).json({
      success: true,
      data: {
        total,
        byStatus: stats,
      },
    })
  } catch (error) {
    console.error('Get admission stats error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching statistics',
    })
  }
}