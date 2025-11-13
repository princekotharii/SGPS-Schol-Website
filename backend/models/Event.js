import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide event title'],
      trim: true,
      maxlength: [150, 'Title cannot be more than 150 characters']
    },
    description: {
      type: String,
      required: [true, 'Please provide description'],
      maxlength: [1000, 'Description cannot be more than 1000 characters']
    },
    date: {
      type: Date,
      required: [true, 'Please provide event date'],
    },
    endDate: {
      type: Date,
    },
    time: {
      type: String,
      trim: true,
    },
    venue: {
      type: String,
      trim: true,
      maxlength: [100, 'Venue cannot be more than 100 characters']
    },
    category: {
      type: String,
      enum: {
        values: ['Academic', 'Sports', 'Cultural', 'Workshop', 'Competition', 'Holiday', 'Other'],
        message: '{VALUE} is not a valid category'
      },
      default: 'Other',
    },
    image: {
      url: String,
      public_id: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    registrationRequired: {
      type: Boolean,
      default: false,
    },
    maxParticipants: {
      type: Number,
    },
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
eventSchema.index({ date: -1, isActive: 1 })
eventSchema.index({ category: 1, isActive: 1 })

export default mongoose.model('Event', eventSchema)