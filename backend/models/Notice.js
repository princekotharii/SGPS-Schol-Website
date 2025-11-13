import mongoose from 'mongoose'

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide notice title'],
      trim: true,
      maxlength: [150, 'Title cannot be more than 150 characters']
    },
    content: {
      type: String,
      required: [true, 'Please provide notice content'],
      maxlength: [2000, 'Content cannot be more than 2000 characters']
    },
    category: {
      type: String,
      enum: {
        values: ['General', 'Academic', 'Exam', 'Holiday', 'Event', 'Important', 'Urgent'],
        message: '{VALUE} is not a valid category'
      },
      default: 'General',
    },
    priority: {
      type: String,
      enum: {
        values: ['low', 'medium', 'high', 'urgent'],
        message: '{VALUE} is not a valid priority'
      },
      default: 'medium',
    },
    targetAudience: {
      type: [String],
      enum: ['Students', 'Parents', 'Teachers', 'Staff', 'All'],
      default: ['All'],
    },
    publishDate: {
      type: Date,
      default: Date.now,
    },
    expiryDate: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
    attachments: [{
      name: String,
      url: String,
      public_id: String,
    }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

// Indexes
noticeSchema.index({ isActive: 1, priority: -1, publishDate: -1 })
noticeSchema.index({ category: 1, isActive: 1 })

export default mongoose.model('Notice', noticeSchema)