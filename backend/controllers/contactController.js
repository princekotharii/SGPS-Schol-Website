import Contact from '../models/Contact.js'

// @desc    Submit contact form (Public)
// @route   POST /api/contact
// @access  Public
export const submitContact = async (req, res) => {
  try {
    // Get IP address
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress

    // Create contact
    const contact = await Contact.create({
      ...req.body,
      ipAddress,
    })

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully. We will get back to you soon.',
      data: {
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
      },
    })
  } catch (error) {
    console.error('Submit contact error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error submitting contact form',
    })
  }
}

// @desc    Get all contacts
// @route   GET /api/contact
// @access  Private (Staff and above)
export const getContacts = async (req, res) => {
  try {
    const { status, page = 1, limit = 10, search } = req.query

    // Build query
    const query = {}
    if (status) query.status = status
    
    // Search by name, email, or subject
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
      ]
    }

    // Get total count
    const total = await Contact.countDocuments(query)

    // Get paginated contacts
    const contacts = await Contact.find(query)
      .populate('repliedBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    res.status(200).json({
      success: true,
      count: contacts.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      data: contacts,
    })
  } catch (error) {
    console.error('Get contacts error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching contacts',
    })
  }
}

// @desc    Get single contact
// @route   GET /api/contact/:id
// @access  Private (Staff and above)
export const getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
      .populate('repliedBy', 'name email role')

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      })
    }

    // Mark as read if status is 'new'
    if (contact.status === 'new') {
      contact.status = 'read'
      await contact.save()
    }

    res.status(200).json({
      success: true,
      data: contact,
    })
  } catch (error) {
    console.error('Get contact error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching contact',
    })
  }
}

// @desc    Reply to contact
// @route   PUT /api/contact/:id/reply
// @access  Private (Staff and above)
export const replyToContact = async (req, res) => {
  try {
    const { reply } = req.body

    if (!reply) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a reply message',
      })
    }

    const contact = await Contact.findById(req.params.id)

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      })
    }

    // Update contact
    contact.reply = reply
    contact.status = 'replied'
    contact.repliedBy = req.user.id
    contact.repliedAt = new Date()

    await contact.save()

    res.status(200).json({
      success: true,
      message: 'Reply sent successfully',
      data: contact,
    })
  } catch (error) {
    console.error('Reply to contact error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error sending reply',
    })
  }
}

// @desc    Delete contact
// @route   DELETE /api/contact/:id
// @access  Private (Principal and above)
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      })
    }

    await contact.deleteOne()

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully',
      data: {},
    })
  } catch (error) {
    console.error('Delete contact error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error deleting contact',
    })
  }
}

// @desc    Get contact statistics
// @route   GET /api/contact/stats
// @access  Private (Staff and above)
export const getContactStats = async (req, res) => {
  try {
    const stats = await Contact.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ])

    const total = await Contact.countDocuments()

    res.status(200).json({
      success: true,
      data: {
        total,
        byStatus: stats,
      },
    })
  } catch (error) {
    console.error('Get contact stats error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching statistics',
    })
  }
}