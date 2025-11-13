import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide name'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide valid email'],
    },
    phone: {
      type: String,
      match: [/^[0-9]{10}$/, 'Please provide valid 10-digit phone number'],
    },
    subject: {
      type: String,
      required: [true, 'Please provide subject'],
      trim: true,
      maxlength: [200, 'Subject cannot be more than 200 characters']
    },
    message: {
      type: String,
      required: [true, 'Please provide message'],
      maxlength: [1000, 'Message cannot be more than 1000 characters']
    },
    category: {
      type: String,
      enum: ['General', 'Admission', 'Complaint', 'Suggestion', 'Other'],
      default: 'General',
    },
    status: {
      type: String,
      enum: {
        values: ['new', 'read', 'replied', 'closed'],
        message: '{VALUE} is not a valid status'
      },
      default: 'new',
    },
    reply: {
      type: String,
      maxlength: [1000, 'Reply cannot be more than 1000 characters']
    },
    repliedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    repliedAt: {
      type: Date,
    },
    ipAddress: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

// Indexes
contactSchema.index({ status: 1, createdAt: -1 })
contactSchema.index({ email: 1 })

export default mongoose.model('Contact', contactSchema)